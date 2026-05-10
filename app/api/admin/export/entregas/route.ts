import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { csvResponse, rowsToCSV } from "@/lib/csv";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return new Response("Supabase no configurado", { status: 503 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("No autorizado", { status: 401 });

  const { data, error } = await supabase
    .from("reto_entregas")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) return new Response("Error: " + error.message, { status: 500 });

  const flat = (data ?? []).map((r) => ({
    created_at: new Date(r.created_at).toLocaleString("es-PA"),
    equipo: r.equipo_nombre,
    proyecto: r.proyecto_nombre,
    tinkercad: r.tinkercad_url,
    video: r.video_url,
    descripcion: r.descripcion,
  }));

  const fields = [
    "created_at",
    "equipo",
    "proyecto",
    "tinkercad",
    "video",
    "descripcion",
  ];

  const csv = rowsToCSV(flat, fields);
  const stamp = new Date().toISOString().slice(0, 10);
  return csvResponse(csv, `reto-entregas-${stamp}.csv`);
}
