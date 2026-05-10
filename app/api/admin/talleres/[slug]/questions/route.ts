import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";

async function getTallerId(slug: string) {
  const supabase = adminClient();
  const { data } = await supabase
    .from("talleres")
    .select("id, n")
    .eq("slug", slug)
    .single();
  return data;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isSupabaseConfigured())
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 503 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slug } = await params;
  const taller = await getTallerId(slug);
  if (!taller) return NextResponse.json({ error: "Taller no encontrado" }, { status: 404 });

  const admin = adminClient();
  const { data, error } = await admin
    .from("quiz_questions")
    .select("*")
    .eq("taller_id", taller.id)
    .order("sort_order");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ questions: data ?? [] });
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isSupabaseConfigured())
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 503 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slug } = await params;
  const taller = await getTallerId(slug);
  if (!taller) return NextResponse.json({ error: "Taller no encontrado" }, { status: 404 });

  const admin = adminClient();

  // Find max sort_order
  const { data: maxRow } = await admin
    .from("quiz_questions")
    .select("sort_order")
    .eq("taller_id", taller.id)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const newSort = (maxRow?.sort_order ?? 0) + 1;

  const { data, error } = await admin
    .from("quiz_questions")
    .insert({
      taller_id: taller.id,
      sort_order: newSort,
      question: "Nueva pregunta",
      options: ["Opción A", "Opción B", "Opción C", "Opción D"],
      correct_index: 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath(`/admin/talleres/${slug}/quiz`);
  revalidatePath(`/talleres/${slug}/quiz`);
  return NextResponse.json({ ok: true, question: data });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Bulk update — replaces all questions for a taller
  if (!isSupabaseConfigured())
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 503 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slug } = await params;
  const taller = await getTallerId(slug);
  if (!taller) return NextResponse.json({ error: "Taller no encontrado" }, { status: 404 });

  let body: { questions?: Array<{ id?: string; question: string; options: string[]; correct_index: number }> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!Array.isArray(body.questions)) {
    return NextResponse.json({ error: "questions requerido" }, { status: 400 });
  }

  const admin = adminClient();

  // Update existing or insert new
  for (let i = 0; i < body.questions.length; i++) {
    const q = body.questions[i];
    if (!q.question || !Array.isArray(q.options) || q.options.length < 2) {
      return NextResponse.json(
        { error: `Pregunta ${i + 1}: debe tener texto y al menos 2 opciones` },
        { status: 400 }
      );
    }
    const payload = {
      taller_id: taller.id,
      sort_order: i + 1,
      question: q.question,
      options: q.options,
      correct_index: q.correct_index,
      updated_at: new Date().toISOString(),
    };
    if (q.id) {
      const { error } = await admin.from("quiz_questions").update(payload).eq("id", q.id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      const { error } = await admin.from("quiz_questions").insert(payload);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  revalidatePath(`/admin/talleres/${slug}/quiz`);
  revalidatePath(`/talleres/${slug}/quiz`);
  return NextResponse.json({ ok: true });
}
