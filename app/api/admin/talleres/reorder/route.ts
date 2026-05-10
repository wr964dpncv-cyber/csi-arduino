import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

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
  if (!user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  let body: { ids?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!Array.isArray(body.ids) || body.ids.length === 0) {
    return NextResponse.json({ error: "ids requerido" }, { status: 400 });
  }

  const ids = body.ids;

  // Two-pass update to avoid unique constraint violations
  // Pass 1: set temp negative n + temp slug
  for (let i = 0; i < ids.length; i++) {
    const newN = i + 1;
    const { error } = await supabase
      .from("talleres")
      .update({
        n: -1000 - newN,
        slug: "tmp-reorder-" + newN,
        updated_at: new Date().toISOString(),
      })
      .eq("id", ids[i]);
    if (error) {
      return NextResponse.json(
        { error: "Pass 1: " + error.message },
        { status: 500 }
      );
    }
  }

  // Pass 2: set final n + slug
  for (let i = 0; i < ids.length; i++) {
    const newN = i + 1;
    const { error } = await supabase
      .from("talleres")
      .update({
        n: newN,
        slug: "taller-" + newN,
      })
      .eq("id", ids[i]);
    if (error) {
      return NextResponse.json(
        { error: "Pass 2: " + error.message },
        { status: 500 }
      );
    }
  }

  revalidatePath("/talleres");
  revalidatePath("/admin/talleres");
  revalidatePath("/calendario");
  for (let i = 0; i < ids.length; i++) {
    revalidatePath(`/talleres/taller-${i + 1}`);
  }

  return NextResponse.json({ ok: true });
}
