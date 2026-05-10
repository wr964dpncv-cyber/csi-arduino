import { adminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/PageHeader";
import ResponsesTable, { type Row } from "./ResponsesTable";

export const metadata = { title: "Respuestas Quiz · Admin" };
export const dynamic = "force-dynamic";

async function getResponses(): Promise<Row[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const admin = adminClient();
    const { data } = await admin
      .from("quiz_responses")
      .select(
        "id, created_at, taller_n, taller_title, student_name, student_email, student_school, score, total, file_uploads"
      )
      .order("created_at", { ascending: false });
    return (data as Row[]) ?? [];
  } catch {
    return [];
  }
}

export default async function RespuestasPage() {
  const rows = await getResponses();
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

      <ResponsesTable rows={rows} />
    </div>
  );
}
