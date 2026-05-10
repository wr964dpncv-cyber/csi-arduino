import { adminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import DeleteButton from "@/components/DeleteButton";

export const metadata = { title: "Respuestas Quiz · Admin" };
export const dynamic = "force-dynamic";

type Row = {
  id: string;
  created_at: string;
  taller_n: number;
  taller_title: string;
  student_name: string;
  student_email: string;
  student_school: string | null;
  score: number;
  total: number;
};

async function getResponses(): Promise<Row[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const admin = adminClient();
    const { data } = await admin
      .from("quiz_responses")
      .select(
        "id, created_at, taller_n, taller_title, student_name, student_email, student_school, score, total"
      )
      .order("created_at", { ascending: false });
    return (data as Row[]) ?? [];
  } catch {
    return [];
  }
}

export default async function RespuestasPage() {
  const rows = await getResponses();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">
            Respuestas de Quiz
          </h1>
          <p className="mt-2 text-muted">
            {rows.length}{" "}
            {rows.length === 1 ? "respuesta enviada" : "respuestas enviadas"}.
          </p>
        </div>
        <a
          href="/api/admin/export/respuestas"
          className="inline-flex items-center bg-accent text-ink px-5 py-3 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
        >
          ↓ Descargar CSV
        </a>
      </div>

      {rows.length === 0 ? (
        <div className="border border-dashed border-border bg-surface-2 p-12 text-center text-muted">
          Aún no hay respuestas. Aparecerán aquí cuando los estudiantes
          completen quizzes.
        </div>
      ) : (
        <div className="border border-border overflow-x-auto bg-surface-2">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface">
              <tr className="text-left">
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Fecha
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Taller
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Estudiante
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Email
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Escuela
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted text-right">
                  Score
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => {
                const pct = Math.round((r.score / r.total) * 100);
                const passing = pct >= 60;
                return (
                  <tr key={r.id} className="hover:bg-surface transition">
                    <td className="px-4 py-3 align-top font-mono text-xs text-muted whitespace-nowrap">
                      {new Date(r.created_at).toLocaleString("es-PA", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="font-mono text-xs text-accent-dark">
                        T{String(r.taller_n).padStart(2, "0")}
                      </div>
                      <div className="text-xs text-muted line-clamp-1">
                        {r.taller_title}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top font-medium">
                      {r.student_name}
                    </td>
                    <td className="px-4 py-3 align-top text-muted text-xs">
                      {r.student_email}
                    </td>
                    <td className="px-4 py-3 align-top text-muted text-xs">
                      {r.student_school ?? "—"}
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <div
                        className={`font-mono text-base ${
                          passing ? "text-emerald-700" : "text-amber-700"
                        }`}
                      >
                        {r.score}/{r.total}
                      </div>
                      <div className="text-xs text-muted">{pct}%</div>
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <DeleteButton
                        url={`/api/admin/respuestas/${r.id}`}
                        confirmMessage={`¿Eliminar la respuesta de ${r.student_name}?`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
