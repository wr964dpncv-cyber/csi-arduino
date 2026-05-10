import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST() {
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

  // Find max n and create new taller after it
  const { data: maxRow } = await supabase
    .from("talleres")
    .select("n")
    .order("n", { ascending: false })
    .limit(1)
    .maybeSingle();

  const newN = (maxRow?.n ?? 0) + 1;
  const slug = "taller-" + newN;

  const { data, error } = await supabase
    .from("talleres")
    .insert({
      n: newN,
      slug,
      title: "Nuevo taller",
      tagline: "",
      description: "",
      objectives: [],
      outcome: "",
      video_id: "",
      quiz_url: "",
      level: "Inicio",
      topic: "",
      published: false,
    })
    .select("slug")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/talleres");
  revalidatePath("/admin/talleres");

  return NextResponse.json({ ok: true, slug: data.slug, n: newN });
}
