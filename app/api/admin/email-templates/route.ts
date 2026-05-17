import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  isValidVariant,
  saveTemplate,
  type EmailTemplate,
  type Variant,
} from "@/lib/emailTemplates";

type Body = Partial<Omit<EmailTemplate, "variant" | "updated_at" | "updated_by">> & {
  variant?: string;
};

export async function PATCH(req: Request) {
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

  const requiredString = [
    "subject",
    "title",
    "intro_html",
    "body_html",
    "signature_html",
  ] as const;
  for (const field of requiredString) {
    if (typeof body[field] !== "string" || body[field]!.trim() === "") {
      return NextResponse.json(
        { error: `Campo requerido: ${field}` },
        { status: 400 }
      );
    }
  }

  const variant = body.variant as Variant;
  const result = await saveTemplate(
    variant,
    {
      enabled: typeof body.enabled === "boolean" ? body.enabled : true,
      subject: body.subject!,
      title: body.title!,
      intro_html: body.intro_html!,
      body_html: body.body_html!,
      cta_label:
        typeof body.cta_label === "string"
          ? body.cta_label
          : body.cta_label === null
            ? null
            : null,
      cta_url:
        typeof body.cta_url === "string"
          ? body.cta_url
          : body.cta_url === null
            ? null
            : null,
      signature_html: body.signature_html!,
    },
    user.email ?? null
  );

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "Error al guardar" },
      { status: 500 }
    );
  }

  revalidatePath("/admin/emails");
  return NextResponse.json({ ok: true, variant });
}
