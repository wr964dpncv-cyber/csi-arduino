import { adminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";

const SITE_URL = process.env.SITE_URL ?? "https://csi-arduino.vercel.app";

// Variantes:
//   A → estudiantes en progreso (1 .. total-1 quizzes completados)
//   B → estudiantes sin empezar (0 quizzes completados)
//   C → estudiantes que completaron todo el programa
export type Variant = "A" | "B" | "C";

export type EmailTemplate = {
  variant: Variant;
  enabled: boolean;
  subject: string;
  title: string;
  intro_html: string;
  body_html: string;
  cta_label: string | null;
  cta_url: string | null;
  signature_html: string;
  updated_at?: string;
  updated_by?: string | null;
};

// Variables disponibles dentro de los strings (subject, title, intro_html, body_html, etc.):
//   {nombre}    → primer nombre del estudiante
//   {completed} → cantidad de talleres completados
//   {total}     → total de talleres del programa
//   {missing}   → talleres faltantes
//   {sitio}     → URL pública del sitio
export const TEMPLATE_VARIABLES = [
  "nombre",
  "completed",
  "total",
  "missing",
  "sitio",
] as const;

export type TemplateVars = {
  nombre: string;
  completed: number;
  total: number;
  missing: number;
  sitio?: string;
};

const DEFAULT_SIGNATURE = `Cualquier duda, escríbeme directo por <a href="https://wa.me/50768641929" style="color:#0b1a35;font-weight:600;text-decoration:underline;">WhatsApp +507 6864-1929</a> o al correo <a href="mailto:daniel10abadi@gmail.com" style="color:#0b1a35;font-weight:600;text-decoration:underline;">daniel10abadi@gmail.com</a>.<br/><br/>— <strong>Daniel Abadi</strong> · Programa CSI`;

// ============================================================
// Defaults — español panameño (tuteo)
// ============================================================
// Estos defaults se usan si la tabla email_templates no está
// disponible (Supabase no configurado o fila ausente). La fuente
// canónica es la migración 0036, que los siembra en la tabla.

export const DEFAULT_TEMPLATES: Record<Variant, EmailTemplate> = {
  A: {
    variant: "A",
    enabled: true,
    subject: "{nombre}, te faltan {missing} talleres para tu Certificado",
    title: "Vas {completed}/{total} en tus quizzes",
    intro_html: "Hola <strong>{nombre}</strong>,",
    body_html: `Vemos que ya completaste <strong>{completed} de {total} quizzes</strong> del programa CSI Arduino. ¡Buen ritmo!<br/><br/>Todavía tienes oportunidad de terminar los <strong>{missing} talleres restantes</strong>. Al completarlos todos:<ul style="padding-left:18px;margin:14px 0;line-height:1.7;"><li>🎓 Recibes tu <strong>Certificado oficial</strong> del programa</li><li>🏆 Puedes aplicar al <strong>Reto Nacional de Arduino</strong> con MEDUCA</li></ul>`,
    cta_label: "Continuar con los talleres",
    cta_url: "{sitio}/talleres",
    signature_html: DEFAULT_SIGNATURE,
  },
  B: {
    variant: "B",
    enabled: true,
    subject: "{nombre}, te esperamos en CSI Arduino",
    title: "Empecemos los talleres",
    intro_html: "Hola <strong>{nombre}</strong>,",
    body_html: `Te inscribiste en CSI Arduino pero aún no has enviado ningún quiz. ¡Empecemos!<br/><br/>Son <strong>{total} talleres cortos</strong>. Al terminarlos:<ul style="padding-left:18px;margin:14px 0;line-height:1.7;"><li>🎓 Recibes tu <strong>Certificado oficial</strong> del programa</li><li>🏆 Puedes aplicar al <strong>Reto Nacional de Arduino</strong> con MEDUCA</li></ul>`,
    cta_label: "Empezar con el Taller 1",
    cta_url: "{sitio}/talleres",
    signature_html: DEFAULT_SIGNATURE,
  },
  C: {
    variant: "C",
    enabled: true,
    subject: "🎓 ¡{nombre}, completaste todos los talleres!",
    title: "¡Completaste el programa!",
    intro_html: "¡Hola <strong>{nombre}</strong>!",
    body_html: `Completaste los <strong>{total} talleres</strong> del programa CSI Arduino. Estamos preparando tu <strong>Certificado oficial</strong>.<br/><br/>El <strong>Reto Nacional de Arduino</strong> está a un paso — inscríbete con tu equipo y pon en práctica todo lo aprendido.`,
    cta_label: "Inscribirme al Reto Nacional",
    cta_url: "{sitio}/reto-nacional",
    signature_html: DEFAULT_SIGNATURE,
  },
};

export const VARIANT_LABEL: Record<Variant, string> = {
  A: "En progreso",
  B: "Sin empezar",
  C: "Completaron",
};

export const VARIANT_DESCRIPTION: Record<Variant, string> = {
  A: "Estudiantes con al menos un quiz pero que no han completado todos los talleres.",
  B: "Estudiantes inscritos al Reto pero que aún no han enviado ningún quiz.",
  C: "Estudiantes que completaron los quizzes de todos los talleres.",
};

// ============================================================
// Renderer
// ============================================================

function renderString(str: string, vars: TemplateVars): string {
  const lookup: Record<string, string> = {
    nombre: vars.nombre,
    completed: String(vars.completed),
    total: String(vars.total),
    missing: String(vars.missing),
    sitio: vars.sitio ?? SITE_URL,
  };
  return str.replace(/{(\w+)}/g, (m, key: string) =>
    Object.prototype.hasOwnProperty.call(lookup, key) ? lookup[key] : m
  );
}

export type RenderedTemplate = {
  subject: string;
  title: string;
  intro_html: string;
  body_html: string;
  cta_label: string | null;
  cta_url: string | null;
  signature_html: string;
};

export function renderTemplate(
  tpl: EmailTemplate,
  vars: TemplateVars
): RenderedTemplate {
  return {
    subject: renderString(tpl.subject, vars),
    title: renderString(tpl.title, vars),
    intro_html: renderString(tpl.intro_html, vars),
    body_html: renderString(tpl.body_html, vars),
    cta_label: tpl.cta_label ? renderString(tpl.cta_label, vars) : null,
    cta_url: tpl.cta_url ? renderString(tpl.cta_url, vars) : null,
    signature_html: renderString(tpl.signature_html, vars),
  };
}

// ============================================================
// Persistence
// ============================================================

const VALID_VARIANTS = new Set<Variant>(["A", "B", "C"]);

export function isValidVariant(v: string): v is Variant {
  return VALID_VARIANTS.has(v as Variant);
}

export function pickVariant(completed: number, total: number): Variant {
  if (total > 0 && completed >= total) return "C";
  if (completed <= 0) return "B";
  return "A";
}

function rowToTemplate(row: Record<string, unknown>, variant: Variant): EmailTemplate {
  const fb = DEFAULT_TEMPLATES[variant];
  return {
    variant,
    enabled: typeof row.enabled === "boolean" ? row.enabled : fb.enabled,
    subject: typeof row.subject === "string" ? row.subject : fb.subject,
    title: typeof row.title === "string" ? row.title : fb.title,
    intro_html: typeof row.intro_html === "string" ? row.intro_html : fb.intro_html,
    body_html: typeof row.body_html === "string" ? row.body_html : fb.body_html,
    cta_label:
      typeof row.cta_label === "string" || row.cta_label === null
        ? (row.cta_label as string | null)
        : fb.cta_label,
    cta_url:
      typeof row.cta_url === "string" || row.cta_url === null
        ? (row.cta_url as string | null)
        : fb.cta_url,
    signature_html:
      typeof row.signature_html === "string"
        ? row.signature_html
        : fb.signature_html,
    updated_at:
      typeof row.updated_at === "string" ? row.updated_at : undefined,
    updated_by:
      typeof row.updated_by === "string" ? row.updated_by : null,
  };
}

export async function getTemplate(variant: Variant): Promise<EmailTemplate> {
  const fallback = DEFAULT_TEMPLATES[variant];
  if (!isSupabaseConfigured()) return fallback;
  try {
    const admin = adminClient();
    const { data } = await admin
      .from("email_templates")
      .select("*")
      .eq("variant", variant)
      .maybeSingle();
    if (!data) return fallback;
    return rowToTemplate(data, variant);
  } catch (err) {
    console.error("[emailTemplates] getTemplate failed:", err);
    return fallback;
  }
}

export async function getAllTemplates(): Promise<Record<Variant, EmailTemplate>> {
  const [a, b, c] = await Promise.all([
    getTemplate("A"),
    getTemplate("B"),
    getTemplate("C"),
  ]);
  return { A: a, B: b, C: c };
}

export async function saveTemplate(
  variant: Variant,
  fields: Omit<EmailTemplate, "variant" | "updated_at" | "updated_by">,
  updatedBy: string | null
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase no configurado" };
  }
  try {
    const admin = adminClient();
    const { error } = await admin.from("email_templates").upsert(
      {
        variant,
        enabled: fields.enabled,
        subject: fields.subject,
        title: fields.title,
        intro_html: fields.intro_html,
        body_html: fields.body_html,
        cta_label: fields.cta_label,
        cta_url: fields.cta_url,
        signature_html: fields.signature_html,
        updated_at: new Date().toISOString(),
        updated_by: updatedBy,
      },
      { onConflict: "variant" }
    );
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
