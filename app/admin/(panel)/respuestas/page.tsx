import { adminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
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

      <ResponsesTable rows={rows} />
    </div>
  );
}
