import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { error } = await supabase
    .from("reto_entregas")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/admin/entregas");
  revalidatePath("/admin");
  return NextResponse.json({ ok: true });
}
