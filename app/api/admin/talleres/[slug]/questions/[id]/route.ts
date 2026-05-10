import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  if (!isSupabaseConfigured())
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 503 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slug, id } = await params;

  const admin = adminClient();
  const { data, error } = await admin
    .from("quiz_questions")
    .delete()
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0)
    return NextResponse.json({ error: "Pregunta no encontrada" }, { status: 404 });

  revalidatePath(`/admin/talleres/${slug}/quiz`);
  revalidatePath(`/talleres/${slug}/quiz`);
  return NextResponse.json({ ok: true });
}
