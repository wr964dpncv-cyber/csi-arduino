import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { sendProgressReminder } from "@/lib/notify";
import {
  getTemplate,
  isValidVariant,
  type EmailTemplate,
  type Variant,
} from "@/lib/emailTemplates";

const TEST_RECIPIENT = "johnny018@live.com";

type Body = {
  variant?: string;
  // If provided, used in place of the saved template (lets admin preview
  // unsaved edits). Must include all the EmailTemplate fields.
  template?: Partial<EmailTemplate>;
  mockVars?: {
    nombre?: string;
    completed?: number;
    total?: number;
  };
  to?: string;
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

  const body: Body = await req.json().catch(() => ({}));
  const recipient = body.to ?? TEST_RECIPIENT;

  // Single-variant mode — used by the admin emails page when previewing a
  // specific (possibly unsaved) template.
  if (body.variant) {
    if (!isValidVariant(body.variant)) {
      return NextResponse.json(
        { error: "Variante inválida (esperado A/B/C)" },
        { status: 400 }
      );
    }
    const variant = body.variant as Variant;
    const base = await getTemplate(variant);
    const template = mergeTemplate(variant, body.template, base);
    const mock = mockForVariant(variant, body.mockVars);
    try {
      await sendProgressReminder({
        to: recipient,
        studentName: mock.nombre,
        completed: mock.completed,
        total: mock.total,
        template,
      });
      return NextResponse.json({
        ok: true,
        recipient,
        variant,
      });
    } catch (err) {
      return NextResponse.json(
        {
          ok: false,
          error: err instanceof Error ? err.message : String(err),
        },
        { status: 500 }
      );
    }
  }

  // Default mode — sends all 3 variants with mock data (dashboard button).
  const samples: Array<{
    variant: Variant;
    studentName: string;
    completed: number;
    total: number;
  }> = [
    { variant: "B", studentName: "Andrés Vargas", completed: 0, total: 10 },
    { variant: "A", studentName: "Carlos Mendoza", completed: 3, total: 10 },
    { variant: "C", studentName: "María Sánchez", completed: 10, total: 10 },
  ];

  const results: Array<{ variant: string; ok: boolean; error?: string }> = [];
  for (const s of samples) {
    try {
      await sendProgressReminder({
        to: recipient,
        studentName: s.studentName,
        completed: s.completed,
        total: s.total,
      });
      results.push({ variant: s.variant, ok: true });
    } catch (err) {
      results.push({
        variant: s.variant,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return NextResponse.json({
    ok: true,
    recipient,
    results,
  });
}

function mockForVariant(
  variant: Variant,
  overrides?: { nombre?: string; completed?: number; total?: number }
): { nombre: string; completed: number; total: number } {
  const total = overrides?.total ?? 10;
  const defaults: Record<Variant, { nombre: string; completed: number }> = {
    A: { nombre: "Carlos Mendoza", completed: 3 },
    B: { nombre: "Andrés Vargas", completed: 0 },
    C: { nombre: "María Sánchez", completed: total },
  };
  const d = defaults[variant];
  return {
    nombre: overrides?.nombre ?? d.nombre,
    completed: overrides?.completed ?? d.completed,
    total,
  };
}

