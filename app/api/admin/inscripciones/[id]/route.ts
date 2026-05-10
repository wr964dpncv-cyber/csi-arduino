import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase no configurado" },
      { status: 503 }
    );
  }

  const { id } = await params;

  // Verify auth with regular client
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  // Use admin client (service role) to bypass RLS for the actual delete
  const admin = adminClient();
  const { data, error } = await admin
    .from("reto_inscripciones")
    .delete()
    .eq("id", id)
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: "No se encontró la inscripción a eliminar." },
      { status: 404 }
    );
  }

  revalidatePath("/admin/inscripciones");
  revalidatePath("/admin");
  return NextResponse.json({ ok: true });
}
