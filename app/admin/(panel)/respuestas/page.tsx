import { adminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { fetchAllPages } from "@/lib/supabase/fetchAll";
import PageHeader from "@/components/admin/PageHeader";
import ResponsesTable, {
  type Row,
  type QuestionInfo,
} from "./ResponsesTable";

export const metadata = { title: "Respuestas Quiz · Admin" };
export const dynamic = "force-dynamic";

async function getResponses(): Promise<Row[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const admin = adminClient();
    const { data } = await fetchAllPages<Row>((from, to) =>
      admin
        .from("quiz_responses")
        .select(
          "id, created_at, taller_n, taller_title, student_name, student_email, student_school, score, total, answers, file_uploads, text_answers"
        )
        .order("created_at", { ascending: false })
        .range(from, to)
    );
    return data;
  } catch {
    return [];
  }
}

async function getQuestionsMap(): Promise<Record<string, QuestionInfo>> {
  if (!isSupabaseConfigured()) return {};
  try {
    const admin = adminClient();
    const { data } = await admin
      .from("quiz_questions")
      .select("id, question, options, correct_index, question_type");
    const map: Record<string, QuestionInfo> = {};
    for (const q of (data ?? []) as Array<{
      id: string;
      question: string;
      options: string[] | null;
      correct_index: number;
      question_type: string | null;
    }>) {
      map[q.id] = {
        question: q.question,
        options: q.options ?? [],
        correct_index: q.correct_index,
        question_type: q.question_type,
      };
    }
    return map;
  } catch {
    return {};
  }
}

export default async function RespuestasPage() {
  const [rows, questionsMap] = await Promise.all([
    getResponses(),
    getQuestionsMap(),
  ]);
  const totals = rows.reduce(
    (acc, r) => {
      acc.score += r.score;
      acc.total += r.total;
      if (r.total > 0 && r.score / r.total >= 0.6) acc.passing++;
      return acc;
    },
    { score: 0, total: 0, passing: 0 }
  );
  const avg = totals.total > 0 ? Math.round((totals.score / totals.total) * 100) : null;
  const passRate =
    rows.length > 0 ? Math.round((totals.passing / rows.length) * 100) : null;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Programa · Evaluación"
        title="Respuestas de Quiz"
        description="Cada respuesta de quiz de los estudiantes con su puntaje."
        meta={
          <>
            <span>{rows.length} respuestas</span>
            {avg !== null && <span>Promedio: {avg}%</span>}
            {passRate !== null && <span>Aprobados: {passRate}%</span>}
          </>
        }
        actions={
          <a
            href="/api/admin/export/respuestas"
            className="inline-flex items-center bg-accent text-ink px-4 py-2 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
          >
            ↓ Descargar CSV
          </a>
        }
      />

      <ResponsesTable rows={rows} questionsMap={questionsMap} />
    </div>
  );
}
