import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { csvResponse, rowsToCSV } from "@/lib/csv";

type Row = {
  id: string;
  created_at: string;
  nombre: string;
  email: string;
  escuela: string | null;
  region: string | null;
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

  const { data, error } = await supabase
    .from("reto_interes")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) return new Response("Error: " + error.message, { status: 500 });

  const flat = (data as Row[]).map((r) => ({
    created_at: new Date(r.created_at).toLocaleString("es-PA"),
    nombre: r.nombre,
    email: r.email,
    escuela: r.escuela ?? "",
    region: r.region ?? "",
  }));

  const fields = ["created_at", "nombre", "email", "escuela", "region"];
  const csv = rowsToCSV(flat, fields);
  const stamp = new Date().toISOString().slice(0, 10);
  return csvResponse(csv, `reto-interes-${stamp}.csv`);
}
