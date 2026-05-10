import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type Body = {
  n?: number;
  title?: string;
  tagline?: string;
  description?: string;
  objectives?: string[];
  outcome?: string;
  videoId?: string;
  quizUrl?: string;
  level?: string;
  topic?: string;
  published?: boolean;
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase no configurado" },
      { status: 503 }
    );
  }

  const { slug } = await params;
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

  // Get current taller
  const { data: current, error: getErr } = await supabase
    .from("talleres")
    .select("id, n")
    .eq("slug", slug)
    .single();

  if (getErr || !current) {
    return NextResponse.json(
      { error: "Taller no encontrado" },
      { status: 404 }
    );
  }

  const update: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (body.title !== undefined) update.title = body.title;
  if (body.tagline !== undefined) update.tagline = body.tagline;
  if (body.description !== undefined) update.description = body.description;
  if (body.objectives !== undefined) update.objectives = body.objectives;
  if (body.outcome !== undefined) update.outcome = body.outcome;
  if (body.videoId !== undefined) update.video_id = body.videoId;
  if (body.quizUrl !== undefined) update.quiz_url = body.quizUrl;
  if (body.level !== undefined) update.level = body.level;
  if (body.topic !== undefined) update.topic = body.topic;
  if (body.published !== undefined) update.published = body.published;

  // Handle n change with possible swap
  let newSlug: string | null = null;
  if (body.n !== undefined && body.n !== current.n) {
    const newN = body.n;
    if (newN < 0) {
      return NextResponse.json({ error: "n debe ser ≥ 0" }, { status: 400 });
    }

    // Check if newN is taken
    const { data: conflicting } = await supabase
      .from("talleres")
      .select("id, n")
      .eq("n", newN)
      .maybeSingle();

    if (conflicting && conflicting.id !== current.id) {
      // SWAP: two-pass to avoid unique violation
      // Step 1: park current at -1 * (newN + 1000)
      const tempCurrent = -1000 - newN;
      const tempConflicting = -1000 - current.n;

      const e1 = await supabase
        .from("talleres")
        .update({
          n: tempCurrent,
          slug: "tmp-swap-" + tempCurrent,
        })
        .eq("id", current.id);
      if (e1.error)
        return NextResponse.json(
          { error: "Swap step 1: " + e1.error.message },
          { status: 500 }
        );

      const e2 = await supabase
        .from("talleres")
        .update({
          n: tempConflicting,
          slug: "tmp-swap-" + tempConflicting,
        })
        .eq("id", conflicting.id);
      if (e2.error)
        return NextResponse.json(
          { error: "Swap step 2: " + e2.error.message },
          { status: 500 }
        );

      // Step 2: set conflicting → current.n (the now-vacant slot)
      const e3 = await supabase
        .from("talleres")
        .update({ n: current.n, slug: "taller-" + current.n })
        .eq("id", conflicting.id);
      if (e3.error)
        return NextResponse.json(
          { error: "Swap step 3: " + e3.error.message },
          { status: 500 }
        );

      // Step 3: set current → newN (now part of update payload)
      update.n = newN;
      update.slug = "taller-" + newN;
      newSlug = "taller-" + newN;
    } else {
      // No conflict — direct update
      update.n = newN;
      update.slug = "taller-" + newN;
      newSlug = "taller-" + newN;
    }
  }

  const { error } = await supabase
    .from("talleres")
    .update(update)
    .eq("id", current.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/talleres");
  revalidatePath(`/talleres/${slug}`);
  if (newSlug) revalidatePath(`/talleres/${newSlug}`);
  revalidatePath("/admin/talleres");

  return NextResponse.json({ ok: true, slug: newSlug ?? slug });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase no configurado" },
      { status: 503 }
    );
  }

  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { error } = await supabase.from("talleres").delete().eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/talleres");
  revalidatePath("/admin/talleres");
  return NextResponse.json({ ok: true });
}
