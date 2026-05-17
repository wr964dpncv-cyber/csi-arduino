import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { sendProgressReminder } from "@/lib/notify";
import {
  getTemplate,
  isValidVariant,
  type EmailTemplate,
  type Variant,
} from "@/lib/emailTemplates";

type Recipient = {
  email: string;
  name: string;
  completed: number;
};

type Body = {
  variant?: string;
  total?: number;
  recipients?: Recipient[];
  // Optional template override (lets admin send WITHOUT saving first if they
  // pass the in-form values). If absent, the saved template is used.
  template?: Partial<EmailTemplate>;
};

function mergeTemplate(
  variant: Variant,
  override: Partial<EmailTemplate> | undefined,
  base: EmailTemplate
): EmailTemplate {
  if (!override) return base;
  return {
    variant,
    enabled: override.enabled ?? base.enabled,
    subject: override.subject ?? base.subject,
    title: override.title ?? base.title,
    intro_html: override.intro_html ?? base.intro_html,
    body_html: override.body_html ?? base.body_html,
    cta_label:
      override.cta_label !== undefined ? override.cta_label : base.cta_label,
    cta_url:
      override.cta_url !== undefined ? override.cta_url : base.cta_url,
    signature_html: override.signature_html ?? base.signature_html,
  };
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase no configurado" },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY no configurado en el servidor" },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!body.variant || !isValidVariant(body.variant)) {
    return NextResponse.json(
      { error: "Variante inválida (esperado A/B/C)" },
      { status: 400 }
    );
  }
  if (typeof body.total !== "number" || body.total < 0) {
    return NextResponse.json(
      { error: "Campo total inválido" },
      { status: 400 }
    );
  }
  if (!Array.isArray(body.recipients) || body.recipients.length === 0) {
    return NextResponse.json(
      { error: "Lista de destinatarios vacía" },
      { status: 400 }
    );
  }
  if (body.recipients.length > 500) {
    return NextResponse.json(
      { error: "Demasiados destinatarios en un solo envío (máximo 500)" },
      { status: 400 }
    );
  }

  const variant = body.variant as Variant;
  const base = await getTemplate(variant);
  const template = mergeTemplate(variant, body.template, base);

  const sent: string[] = [];
  const failed: Array<{ email: string; error: string }> = [];

  for (const r of body.recipients) {
    if (
      typeof r.email !== "string" ||
      typeof r.name !== "string" ||
      typeof r.completed !== "number"
    ) {
      failed.push({
        email: String(r.email ?? ""),
        error: "Datos de destinatario inválidos",
      });
      continue;
    }
    try {
      await sendProgressReminder({
        to: r.email,
        studentName: r.name,
        completed: r.completed,
        total: body.total,
        template,
      });
      sent.push(r.email);
    } catch (err) {
      failed.push({
        email: r.email,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return NextResponse.json({
    ok: true,
    variant,
    sent: sent.length,
    failed: failed.length,
    failures: failed,
  });
}
