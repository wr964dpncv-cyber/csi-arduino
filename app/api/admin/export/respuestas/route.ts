import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";
import { fetchAllPages } from "@/lib/supabase/fetchAll";
import { csvResponse, rowsToCSV } from "@/lib/csv";

type ExportRow = {
  created_at: string;
  taller_n: number;
  taller_title: string;
  student_name: string;
  student_email: string;
  student_school: string | null;
  score: number;
  total: number;
};

export async function GET() {
  if (!isSupabaseConfigured()) {
    return new Response("Supabase no configurado", { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("No autorizado", { status: 401 });

  const admin = adminClient();
  const { data, error } = await fetchAllPages<ExportRow>((from, to) =>
    admin
      .from("quiz_responses")
      .select(
        "created_at, taller_n, taller_title, student_name, student_email, student_school, score, total"
      )
      .order("created_at", { ascending: true })
      .range(from, to)
  );

  if (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return new Response("Error: " + msg, { status: 500 });
  }

  const flat = data.map((r) => ({
    fecha: new Date(r.created_at).toLocaleString("es-PA"),
    taller_n: r.taller_n,
    taller: r.taller_title,
    estudiante: r.student_name,
    email: r.student_email,
    escuela: r.student_school ?? "",
    score: r.score,
    total: r.total,
    porcentaje: Math.round((r.score / r.total) * 100) + "%",
  }));

  const fields = [
    "fecha",
    "taller_n",
    "taller",
    "estudiante",
    "email",
    "escuela",
    "score",
    "total",
    "porcentaje",
  ];

  const csv = rowsToCSV(flat, fields);
  const stamp = new Date().toISOString().slice(0, 10);
  return csvResponse(csv, `quiz-respuestas-${stamp}.csv`);
}
