import { notFound } from "next/navigation";
import { adminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import QuestionsEditor from "./QuestionsEditor";

export const metadata = { title: "Quiz · Admin" };
export const dynamic = "force-dynamic";

export default async function QuizEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isSupabaseConfigured()) {
    return (
      <div>
        <h1 className="font-display text-3xl tracking-tight">Quiz</h1>
        <p className="mt-3 text-muted">Supabase no está configurado.</p>
      </div>
    );
  }

  const admin = adminClient();
  const { data: taller } = await admin
    .from("talleres")
    .select("id, n, slug, title")
    .eq("slug", slug)
    .single();

  if (!taller) notFound();

  const { data: questions } = await admin
    .from("quiz_questions")
    .select("id, sort_order, question, options, correct_index")
    .eq("taller_id", taller.id)
    .order("sort_order");

  return (
    <QuestionsEditor
      taller={taller}
      initialQuestions={(questions ?? []).map((q) => ({
        id: q.id,
        sort_order: q.sort_order,
        question: q.question,
        options: q.options,
        correct_index: q.correct_index,
      }))}
    />
  );
}
