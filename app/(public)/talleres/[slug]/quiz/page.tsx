import Link from "next/link";
import { notFound } from "next/navigation";
import { getTallerBySlug } from "@/lib/data";
import { adminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import QuizForm from "./QuizForm";
import CircuitBackdrop from "@/components/CircuitBackdrop";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTallerBySlug(slug);
  if (!t) return {};
  return {
    title: `Quiz · Taller ${t.n} · ${t.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const taller = await getTallerBySlug(slug);
  if (!taller) notFound();

  let questions: Array<{
    id: string;
    sort_order: number;
    question: string;
    options: string[];
  }> = [];

  if (isSupabaseConfigured() && taller.id) {
    const admin = adminClient();
    const { data } = await admin
      .from("quiz_questions")
      .select("id, sort_order, question, options")
      .eq("taller_id", taller.id)
      .order("sort_order");
    questions = data ?? [];
  }

  return (
    <>
      <section className="bg-ink text-surface relative overflow-hidden">
        <CircuitBackdrop variant="angles" />
        <div className="relative mx-auto max-w-3xl px-6 pt-12">
          <Link
            href={`/talleres/${taller.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-2 hover:text-surface transition"
          >
            <span>←</span>
            <span>Taller {taller.n}</span>
          </Link>
        </div>
        <div className="relative mx-auto max-w-3xl px-6 py-12 md:py-16">
          <div className="text-xs font-mono text-muted-2 mb-3">
            Quiz · {questions.length} {questions.length === 1 ? "pregunta" : "preguntas"}
          </div>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
            {taller.title}
          </h1>
          <p className="mt-5 text-muted-2 leading-relaxed">
            Completa este quiz para validar lo aprendido. Puedes usar tu correo
            personal — no necesitas correo institucional.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          {questions.length === 0 ? (
            <div className="border border-dashed border-border bg-surface-2 p-10 text-center">
              <div className="text-sm text-muted">
                El quiz de este taller aún no está disponible.
              </div>
              <Link
                href={`/talleres/${taller.slug}`}
                className="mt-6 inline-flex items-center text-accent-dark hover:text-ink transition"
              >
                ← Volver al taller
              </Link>
            </div>
          ) : (
            <QuizForm
              tallerSlug={taller.slug}
              tallerNumber={taller.n}
              tallerTitle={taller.title}
              questions={questions}
            />
          )}
        </div>
      </section>
    </>
  );
}
