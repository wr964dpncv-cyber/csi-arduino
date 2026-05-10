import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DANIEL_EMAIL = process.env.DANIEL_EMAIL ?? "";
const FROM_EMAIL = process.env.NOTIFY_FROM_EMAIL ?? "onboarding@resend.dev";
const SITE_URL = process.env.SITE_URL ?? "https://csi-arduino.vercel.app";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wrap(title: string, bodyHtml: string, ctaLabel: string, ctaUrl: string): string {
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
          <div style="margin-top:32px;">
            <a href="${ctaUrl}" style="display:inline-block;background:#f5b80c;color:#0b1a35;padding:12px 22px;text-decoration:none;font-weight:600;font-size:14px;">${ctaLabel} →</a>
          </div>
        </td></tr>
        <tr><td style="padding:18px 28px;background:#f4f1ea;color:#6b6657;font-size:12px;border-top:1px solid #e5dfd0;">
          Notificación automática · csi-arduino.com
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

async function send(subject: string, html: string, text: string): Promise<void> {
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

  await send(`🏆 Nueva inscripción Reto: ${p.equipoNombre}`, html, text);
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
    `🚀 Nueva entrega Reto · ${p.equipoNombre} · ${p.proyectoNombre}`,
    html,
    text
  );
}
