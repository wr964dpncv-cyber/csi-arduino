import { Resend } from "resend";
import { adminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import {
  filterUnsubscribed,
  unsubscribeUrl,
  unsubscribePostUrl,
} from "@/lib/unsubscribe";
import {
  getTemplate,
  pickVariant,
  renderTemplate,
  type EmailTemplate,
  type TemplateVars,
} from "@/lib/emailTemplates";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DANIEL_EMAIL = process.env.DANIEL_EMAIL ?? "";
const FROM_EMAIL = process.env.NOTIFY_FROM_EMAIL ?? "onboarding@resend.dev";
const SITE_URL = process.env.SITE_URL ?? "https://csi-arduino.vercel.app";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

type NotificationKind = "interes" | "inscripcion" | "quiz" | "entrega";

async function isNotificationEnabled(kind: NotificationKind): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;
  try {
    const admin = adminClient();
    const { data } = await admin
      .from("notification_settings")
      .select("enabled")
      .eq("key", kind)
      .maybeSingle();
    if (!data) return true;
    return data.enabled !== false;
  } catch (err) {
    console.error("[notify] settings check failed:", err);
    return true;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wrap(
  title: string,
  bodyHtml: string,
  ctaLabel?: string,
  ctaUrl?: string,
  unsubUrl?: string
): string {
  const ctaBlock =
    ctaLabel && ctaUrl
      ? `<div style="margin-top:32px;">
            <a href="${ctaUrl}" style="display:inline-block;background:#f5b80c;color:#0b1a35;padding:12px 22px;text-decoration:none;font-weight:600;font-size:14px;">${ctaLabel} →</a>
          </div>`
      : "";
  const unsubBlock = unsubUrl
    ? `<div style="margin-top:10px;font-size:11px;color:#9d978a;">
         ¿No quieres recibir más correos del programa?
         <a href="${unsubUrl}" style="color:#6b6657;text-decoration:underline;">Darte de baja con un click</a>.
       </div>`
    : "";
  return `
<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#f4f1ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0b1a35;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e5dfd0;">
        <tr><td style="background:#0b1a35;color:#ffffff;padding:24px 28px;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#f5b80c;">CSI · Principios de Arduino</div>
          <div style="font-size:22px;font-weight:600;margin-top:6px;letter-spacing:-0.01em;">${title}</div>
        </td></tr>
        <tr><td style="padding:28px;">
          ${bodyHtml}
          ${ctaBlock}
        </td></tr>
        <tr><td style="padding:18px 28px;background:#f4f1ea;color:#6b6657;font-size:12px;border-top:1px solid #e5dfd0;">
          Notificación automática · csi-arduino.com
          ${unsubBlock}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;color:#6b6657;font-size:13px;width:140px;vertical-align:top;font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:0.1em;font-size:11px;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;color:#0b1a35;font-size:14px;vertical-align:top;">${value}</td>
  </tr>`;
}

type HtmlBuilder = (unsubUrl: string) => string;

async function sendUser(
  to: string | string[],
  subject: string,
  buildHtml: HtmlBuilder,
  text: string
): Promise<void> {
  if (!resend) {
    console.log("[notify:user] skipping (no RESEND_API_KEY):", subject);
    return;
  }
  const recipients = Array.isArray(to) ? to : [to];
  const valid = recipients
    .map((e) => e?.trim().toLowerCase())
    .filter((e) => e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
  if (valid.length === 0) {
    console.log("[notify:user] no valid recipients for:", subject);
    return;
  }

  const { allowed, blocked } = await filterUnsubscribed(valid);
  if (blocked.length > 0) {
    console.log(
      `[notify:user] skipping ${blocked.length} unsubscribed recipient(s):`,
      blocked
    );
  }
  if (allowed.length === 0) {
    console.log("[notify:user] all recipients unsubscribed, skipping:", subject);
    return;
  }

  // Send one email per recipient so each gets a personalized
  // unsubscribe link in the body AND a List-Unsubscribe header
  // (RFC 2369 / 8058 — one-click in Gmail/Outlook).
  for (const recipient of allowed) {
    const bodyUnsubUrl = unsubscribeUrl(recipient);
    const headerUnsubUrl = unsubscribePostUrl(recipient);
    const html = buildHtml(bodyUnsubUrl);
    try {
      const res = await resend.emails.send({
        from: `Programa CSI <${FROM_EMAIL}>`,
        to: recipient,
        replyTo: DANIEL_EMAIL || undefined,
        subject,
        html,
        text,
        headers: {
          "List-Unsubscribe": `<${headerUnsubUrl}>, <${bodyUnsubUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
      if (res.error) {
        console.error("[notify:user] resend error for", recipient, ":", res.error);
      }
    } catch (err) {
      console.error("[notify:user] send failed for", recipient, ":", err);
    }
  }
}

async function send(
  kind: NotificationKind,
  subject: string,
  html: string,
  text: string
): Promise<void> {
  const enabled = await isNotificationEnabled(kind);
  if (!enabled) {
    console.log(`[notify] ${kind} disabled in settings, skipping:`, subject);
    return;
  }
  if (!resend || !DANIEL_EMAIL) {
    console.log("[notify] skipping (missing RESEND_API_KEY or DANIEL_EMAIL):", subject);
    return;
  }
  try {
    const res = await resend.emails.send({
      from: `Reto CSI <${FROM_EMAIL}>`,
      to: DANIEL_EMAIL,
      subject,
      html,
      text,
    });
    if (res.error) {
      console.error("[notify] resend error:", res.error);
    }
  } catch (err) {
    console.error("[notify] send failed:", err);
  }
}

export type InscripcionPayload = {
  equipoNombre: string;
  escuela: string;
  region: string;
  integrantes: Array<{
    nombre: string;
    apellido: string;
    emailInstitucional: string;
    emailPersonal?: string;
    telefono: string;
  }>;
};

export async function notifyInscripcion(p: InscripcionPayload): Promise<void> {
  const integrantesHtml = p.integrantes
    .map(
      (m, i) => `
    <div style="padding:14px 0;border-top:1px solid #e5dfd0;">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#6b6657;text-transform:uppercase;letter-spacing:0.15em;">Integrante ${i + 1}</div>
      <div style="font-size:15px;margin-top:6px;font-weight:500;">${escapeHtml(m.nombre)} ${escapeHtml(m.apellido)}</div>
      <div style="font-size:13px;color:#6b6657;margin-top:4px;">
        ${escapeHtml(m.emailInstitucional)} · ${escapeHtml(m.telefono)}
      </div>
    </div>`
    )
    .join("");

  const body = `
    <div style="font-size:15px;line-height:1.6;color:#0b1a35;">
      Un nuevo equipo se inscribió al Reto Nacional.
    </div>
    <table cellpadding="0" cellspacing="0" style="margin-top:20px;width:100%;">
      ${row("Equipo", `<strong>${escapeHtml(p.equipoNombre)}</strong>`)}
      ${row("Escuela", escapeHtml(p.escuela))}
      ${row("Región", escapeHtml(p.region))}
    </table>
    <div style="margin-top:24px;">${integrantesHtml}</div>
  `;

  const text = [
    `Nueva inscripción al Reto Nacional`,
    ``,
    `Equipo: ${p.equipoNombre}`,
    `Escuela: ${p.escuela}`,
    `Región: ${p.region}`,
    ``,
    ...p.integrantes.map(
      (m, i) =>
        `Integrante ${i + 1}: ${m.nombre} ${m.apellido} · ${m.emailInstitucional} · ${m.telefono}`
    ),
    ``,
    `Ver en admin: ${SITE_URL}/admin/inscripciones`,
  ].join("\n");

  const html = wrap(
    `Nueva inscripción: ${p.equipoNombre}`,
    body,
    "Ver en admin",
    `${SITE_URL}/admin/inscripciones`
  );

  await send("inscripcion", `🏆 Nueva inscripción Reto: ${p.equipoNombre}`, html, text);
}

export type QuizPayload = {
  tallerN: number;
  tallerTitle: string;
  studentName: string;
  studentEmail: string;
  studentSchool: string | null;
  score: number;
  total: number;
};

export async function notifyQuiz(p: QuizPayload): Promise<void> {
  const pct = p.total > 0 ? Math.round((p.score / p.total) * 100) : 0;
  const passed = pct >= 60;

  const body = `
    <div style="font-size:15px;line-height:1.6;color:#0b1a35;">
      <strong>${escapeHtml(p.studentName)}</strong> entregó el quiz del Taller ${p.tallerN}.
    </div>
    <table cellpadding="0" cellspacing="0" style="margin-top:20px;width:100%;">
      ${row("Taller", `${p.tallerN} · ${escapeHtml(p.tallerTitle)}`)}
      ${row("Estudiante", escapeHtml(p.studentName))}
      ${row("Correo", escapeHtml(p.studentEmail))}
      ${row("Escuela", p.studentSchool ? escapeHtml(p.studentSchool) : "<em style='color:#6b6657;'>no indicada</em>")}
      ${row(
        "Resultado",
        `<span style="font-size:18px;font-weight:600;color:${passed ? "#047857" : "#9f1239"};">${p.score}/${p.total} · ${pct}%</span> ${passed ? "✓ Aprobado" : "✗ No aprobó"}`
      )}
    </table>
  `;

  const text = [
    `${p.studentName} entregó el quiz del Taller ${p.tallerN}`,
    ``,
    `Taller: ${p.tallerN} · ${p.tallerTitle}`,
    `Estudiante: ${p.studentName} (${p.studentEmail})`,
    `Escuela: ${p.studentSchool ?? "no indicada"}`,
    `Resultado: ${p.score}/${p.total} (${pct}%) ${passed ? "Aprobado" : "No aprobó"}`,
    ``,
    `Ver en admin: ${SITE_URL}/admin/respuestas`,
  ].join("\n");

  const html = wrap(
    `Quiz Taller ${p.tallerN}: ${p.studentName} ${pct}%`,
    body,
    "Ver en admin",
    `${SITE_URL}/admin/respuestas`
  );

  await send(
    "quiz",
    `📝 Quiz Taller ${p.tallerN} · ${p.studentName} · ${pct}%`,
    html,
    text
  );
}

export type EntregaPayload = {
  equipoNombre: string;
  proyectoNombre: string;
  tinkercadUrl: string;
  videoUrl: string;
  descripcion: string;
};

export async function notifyEntrega(p: EntregaPayload): Promise<void> {
  const body = `
    <div style="font-size:15px;line-height:1.6;color:#0b1a35;">
      El equipo <strong>${escapeHtml(p.equipoNombre)}</strong> entregó su proyecto del Reto Nacional.
    </div>
    <table cellpadding="0" cellspacing="0" style="margin-top:20px;width:100%;">
      ${row("Equipo", escapeHtml(p.equipoNombre))}
      ${row("Proyecto", `<strong>${escapeHtml(p.proyectoNombre)}</strong>`)}
      ${row("Tinkercad", `<a href="${escapeHtml(p.tinkercadUrl)}" style="color:#0b1a35;">${escapeHtml(p.tinkercadUrl)}</a>`)}
      ${row("Video", `<a href="${escapeHtml(p.videoUrl)}" style="color:#0b1a35;">${escapeHtml(p.videoUrl)}</a>`)}
    </table>
    <div style="margin-top:20px;padding:14px;background:#f4f1ea;border-left:3px solid #f5b80c;font-size:14px;line-height:1.6;color:#0b1a35;white-space:pre-wrap;">${escapeHtml(p.descripcion)}</div>
  `;

  const text = [
    `Nueva entrega del Reto Nacional`,
    ``,
    `Equipo: ${p.equipoNombre}`,
    `Proyecto: ${p.proyectoNombre}`,
    `Tinkercad: ${p.tinkercadUrl}`,
    `Video: ${p.videoUrl}`,
    ``,
    `Descripción:`,
    p.descripcion,
    ``,
    `Ver en admin: ${SITE_URL}/admin/entregas`,
  ].join("\n");

  const html = wrap(
    `Entrega: ${p.proyectoNombre}`,
    body,
    "Ver en admin",
    `${SITE_URL}/admin/entregas`
  );

  await send(
    "entrega",
    `🚀 Nueva entrega Reto · ${p.equipoNombre} · ${p.proyectoNombre}`,
    html,
    text
  );
}

export type InteresPayload = {
  nombre: string;
  email: string;
  telefono: string;
  escuela?: string;
  region?: string;
};

export async function notifyInteres(p: InteresPayload): Promise<void> {
  const body = `
    <div style="font-size:15px;line-height:1.6;color:#0b1a35;">
      <strong>${escapeHtml(p.nombre)}</strong> dejó su información esperando los detalles del Reto Nacional.
    </div>
    <table cellpadding="0" cellspacing="0" style="margin-top:20px;width:100%;">
      ${row("Nombre", `<strong>${escapeHtml(p.nombre)}</strong>`)}
      ${row("Correo", `<a href="mailto:${escapeHtml(p.email)}" style="color:#0b1a35;">${escapeHtml(p.email)}</a>`)}
      ${row("Teléfono", `<a href="tel:${escapeHtml(p.telefono)}" style="color:#0b1a35;">${escapeHtml(p.telefono)}</a>`)}
      ${p.escuela ? row("Escuela", escapeHtml(p.escuela)) : ""}
      ${p.region ? row("Región", escapeHtml(p.region)) : ""}
    </table>
  `;

  const text = [
    `Nuevo interesado en el Reto Nacional`,
    ``,
    `Nombre: ${p.nombre}`,
    `Correo: ${p.email}`,
    `Teléfono: ${p.telefono}`,
    p.escuela ? `Escuela: ${p.escuela}` : null,
    p.region ? `Región: ${p.region}` : null,
    ``,
    `Ver en admin: ${SITE_URL}/admin/interes`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = wrap(
    `Interés Reto Nacional: ${p.nombre}`,
    body,
    "Ver en admin",
    `${SITE_URL}/admin/interes`
  );

  await send("interes", `💡 Interés Reto · ${p.nombre}`, html, text);
}

// ============================================================
// User-facing confirmation emails
// ============================================================

export type QuizConfirmationPayload = {
  to: string;
  studentName: string;
  tallerN: number;
  tallerTitle: string;
  tallerSlug: string;
};

export async function sendQuizConfirmation(
  p: QuizConfirmationPayload
): Promise<void> {
  const body = `
    <div style="font-size:15px;line-height:1.6;color:#0b1a35;">
      ¡Hola <strong>${escapeHtml(p.studentName)}</strong>! Recibimos tu quiz del
      <strong>Taller ${p.tallerN}</strong>.
    </div>
    <table cellpadding="0" cellspacing="0" style="margin-top:20px;width:100%;">
      ${row("Taller", `${p.tallerN} · ${escapeHtml(p.tallerTitle)}`)}
    </table>
    <div style="margin-top:20px;padding:14px;background:#f4f1ea;border-left:3px solid #f5b80c;font-size:14px;line-height:1.6;color:#0b1a35;">
      Daniel revisará tu quiz y te contactará si necesitas algo. Si tienes
      dudas, escríbele directamente a Daniel:
      <a href="https://wa.me/50768641929" style="color:#0b1a35;font-weight:600;text-decoration:underline;">WhatsApp +507 6864-1929</a>.
    </div>

    <div style="margin-top:28px;padding-top:24px;border-top:1px solid #e5dfd0;">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#f5b80c;margin-bottom:8px;">
        🏆 Reto Nacional · 2026
      </div>
      <div style="font-size:18px;font-weight:600;color:#0b1a35;line-height:1.3;margin-bottom:6px;">
        ¿Ya dejaste tus datos para el Reto Nacional?
      </div>
      <p style="font-size:14px;line-height:1.6;color:#6b6657;margin:0 0 16px 0;">
        Estamos finalizando los detalles del Reto Nacional con MEDUCA.
        Pronto publicaremos las bases, fechas y el formulario de inscripción.
      </p>
      <a href="${SITE_URL}/reto-nacional" style="display:inline-block;background:#0b1a35;color:#ffffff;padding:10px 18px;text-decoration:none;font-weight:600;font-size:13px;">
        Quiero más información →
      </a>
    </div>
  `;

  const text = [
    `¡Hola ${p.studentName}!`,
    ``,
    `Recibimos tu quiz del Taller ${p.tallerN} · ${p.tallerTitle}.`,
    ``,
    `Daniel revisará tu quiz y te contactará si necesitas algo.`,
    `Si tienes dudas, escríbele por WhatsApp: +507 6864-1929`,
    `https://wa.me/50768641929`,
    ``,
    `🏆 Reto Nacional 2026`,
    `Estamos finalizando los detalles del Reto Nacional con MEDUCA. Pronto publicaremos las bases, fechas y el formulario de inscripción.`,
    `Más información: ${SITE_URL}/reto-nacional`,
    ``,
    `— Programa CSI · Principios de Arduino`,
  ].join("\n");

  await sendUser(
    p.to,
    `✓ Quiz Taller ${p.tallerN} recibido`,
    (unsubUrl) =>
      wrap(
        `Recibimos tu quiz del Taller ${p.tallerN}`,
        body,
        undefined,
        undefined,
        unsubUrl
      ),
    text
  );
}

export type InscripcionConfirmationPayload = {
  tos: string[];
  equipoNombre: string;
  escuela: string;
  integrantes: Array<{ nombre: string; apellido: string }>;
};

export async function sendInscripcionConfirmation(
  p: InscripcionConfirmationPayload
): Promise<void> {
  const integrantesList = p.integrantes
    .map(
      (m, i) =>
        `<li style="padding:4px 0;color:#0b1a35;">${i + 1}. ${escapeHtml(m.nombre)} ${escapeHtml(m.apellido)}</li>`
    )
    .join("");

  const body = `
    <div style="font-size:15px;line-height:1.6;color:#0b1a35;">
      ¡Inscripción recibida! El equipo <strong>${escapeHtml(p.equipoNombre)}</strong>
      quedó registrado en el Reto Nacional CSI.
    </div>
    <table cellpadding="0" cellspacing="0" style="margin-top:20px;width:100%;">
      ${row("Equipo", `<strong>${escapeHtml(p.equipoNombre)}</strong>`)}
      ${row("Escuela", escapeHtml(p.escuela))}
    </table>
    <div style="margin-top:18px;">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#6b6657;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">
        Integrantes
      </div>
      <ul style="list-style:none;padding:0;margin:0;font-size:14px;line-height:1.5;">
        ${integrantesList}
      </ul>
    </div>
    <div style="margin-top:24px;padding:14px;background:#f4f1ea;border-left:3px solid #f5b80c;font-size:14px;line-height:1.6;color:#0b1a35;">
      <strong>Próximos pasos:</strong> mantén un correo activo de cada integrante.
      Te contactaremos con los detalles de la entrega de proyectos y la final
      presencial.
    </div>
  `;

  const text = [
    `¡Inscripción recibida!`,
    ``,
    `El equipo "${p.equipoNombre}" quedó registrado en el Reto Nacional CSI.`,
    ``,
    `Escuela: ${p.escuela}`,
    ``,
    `Integrantes:`,
    ...p.integrantes.map((m, i) => `${i + 1}. ${m.nombre} ${m.apellido}`),
    ``,
    `Te contactaremos con los detalles de la entrega de proyectos.`,
    ``,
    `Ver Reto: ${SITE_URL}/reto-nacional`,
    ``,
    `— Programa CSI · Principios de Arduino`,
  ].join("\n");

  await sendUser(
    p.tos,
    `✓ Inscripción confirmada — ${p.equipoNombre}`,
    (unsubUrl) =>
      wrap(
        `Inscripción recibida: ${p.equipoNombre}`,
        body,
        "Ver Reto Nacional",
        `${SITE_URL}/reto-nacional`,
        unsubUrl
      ),
    text
  );
}

export type ProgressReminderPayload = {
  to: string;
  studentName: string;
  completed: number;
  total: number;
  // Optional overrides — if `template` is provided, it is rendered against the
  // recipient's vars. Otherwise the appropriate variant is pulled from DB.
  template?: EmailTemplate;
};

function firstName(full: string): string {
  return (full ?? "").trim().split(/\s+/)[0] || "estudiante";
}

export function buildProgressEmailHtml(
  rendered: {
    title: string;
    intro_html: string;
    body_html: string;
    signature_html: string;
    cta_label: string | null;
    cta_url: string | null;
  },
  completed: number,
  total: number,
  unsubUrl?: string
): string {
  const progressStrip = total > 0 ? buildProgressStrip(completed, total) : "";
  const body = `
    <div style="font-size:15px;line-height:1.6;color:#0b1a35;">
      ${rendered.intro_html}
    </div>
    <div style="font-size:15px;line-height:1.7;color:#0b1a35;margin-top:14px;">
      ${rendered.body_html}
    </div>
    ${progressStrip}
    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e5dfd0;font-size:14px;line-height:1.6;color:#0b1a35;">
      ${rendered.signature_html}
    </div>
  `;
  return wrap(
    rendered.title,
    body,
    rendered.cta_label ?? undefined,
    rendered.cta_url ?? undefined,
    unsubUrl
  );
}

function stripHtml(s: string): string {
  return s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<li>/gi, "- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function sendProgressReminder(
  p: ProgressReminderPayload
): Promise<void> {
  const name = firstName(p.studentName);
  const completed = Math.max(0, Math.min(p.completed, p.total));
  const variant = pickVariant(completed, p.total);
  const template = p.template ?? (await getTemplate(variant));
  const vars: TemplateVars = {
    nombre: name,
    completed,
    total: p.total,
    missing: Math.max(0, p.total - completed),
  };
  const rendered = renderTemplate(template, vars);

  const text = [
    stripHtml(rendered.intro_html),
    ``,
    stripHtml(rendered.body_html),
    ``,
    rendered.cta_label && rendered.cta_url
      ? `${rendered.cta_label}: ${rendered.cta_url}`
      : null,
    ``,
    stripHtml(rendered.signature_html),
  ]
    .filter((line) => line !== null)
    .join("\n");

  await sendUser(
    p.to,
    rendered.subject,
    (unsubUrl) =>
      buildProgressEmailHtml(rendered, completed, p.total, unsubUrl),
    text
  );
}

function buildProgressStrip(completed: number, total: number): string {
  const cells = Array.from({ length: total }, (_, i) => {
    const filled = i < completed;
    return `<td style="background:${filled ? "#0b1a35" : "#e5dfd0"};height:10px;border-right:2px solid #ffffff;"></td>`;
  }).join("");
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return `
    <div style="margin-top:24px;padding:14px;background:#f4f1ea;">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#6b6657;margin-bottom:8px;">
        Tu progreso · ${completed}/${total} (${pct}%)
      </div>
      <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
        <tr>${cells}</tr>
      </table>
    </div>
  `;
}

export type InteresConfirmationPayload = {
  to: string;
  nombre: string;
};

export async function sendInteresConfirmation(
  p: InteresConfirmationPayload
): Promise<void> {
  const body = `
    <div style="font-size:15px;line-height:1.6;color:#0b1a35;">
      ¡Hola <strong>${escapeHtml(p.nombre)}</strong>! Recibimos tu información.
      Gracias por tu interés en el Reto Nacional CSI.
    </div>
    <div style="margin-top:20px;padding:14px;background:#f4f1ea;border-left:3px solid #f5b80c;font-size:14px;line-height:1.6;color:#0b1a35;">
      Estamos finalizando los detalles del Reto Nacional con MEDUCA. Te
      avisaremos por correo apenas se publiquen las bases, fechas y el
      formulario oficial de inscripción.
    </div>
    <div style="margin-top:20px;font-size:14px;line-height:1.6;color:#0b1a35;">
      Mientras tanto, si tienes preguntas puedes escribirle a Daniel por
      <a href="https://wa.me/50768641929" style="color:#0b1a35;font-weight:600;text-decoration:underline;">WhatsApp +507 6864-1929</a>.
    </div>
  `;

  const text = [
    `¡Hola ${p.nombre}!`,
    ``,
    `Recibimos tu información. Gracias por tu interés en el Reto Nacional CSI.`,
    ``,
    `Estamos finalizando los detalles con MEDUCA. Te avisaremos por correo`,
    `apenas se publiquen las bases, fechas y el formulario de inscripción.`,
    ``,
    `Si tienes preguntas, escríbele a Daniel por WhatsApp: +507 6864-1929`,
    `https://wa.me/50768641929`,
    ``,
    `Más información: ${SITE_URL}/reto-nacional`,
    ``,
    `— Programa CSI · Principios de Arduino`,
  ].join("\n");

  await sendUser(
    p.to,
    `✓ Recibimos tu información — Reto Nacional CSI`,
    (unsubUrl) =>
      wrap(
        `Recibimos tu información — Reto Nacional`,
        body,
        undefined,
        undefined,
        unsubUrl
      ),
    text
  );
}

