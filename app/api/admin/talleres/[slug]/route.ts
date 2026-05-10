import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type Body = {
  title?: string;
  tagline?: string;
  description?: string;
  objectives?: string[];
  outcome?: string;
  videoId?: string;
  quizUrl?: string;
  level?: string;
  topic?: string;
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

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.title !== undefined) update.title = body.title;
  if (body.tagline !== undefined) update.tagline = body.tagline;
  if (body.description !== undefined) update.description = body.description;
  if (body.objectives !== undefined) update.objectives = body.objectives;
  if (body.outcome !== undefined) update.outcome = body.outcome;
  if (body.videoId !== undefined) update.video_id = body.videoId;
  if (body.quizUrl !== undefined) update.quiz_url = body.quizUrl;
  if (body.level !== undefined) update.level = body.level;
  if (body.topic !== undefined) update.topic = body.topic;

  const { error } = await supabase
    .from("talleres")
    .update(update)
    .eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/talleres");
  revalidatePath(`/talleres/${slug}`);
  revalidatePath("/admin/talleres");

  return NextResponse.json({ ok: true });
}
