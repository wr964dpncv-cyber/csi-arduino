import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { csvResponse, rowsToCSV } from "@/lib/csv";

type Member = {
  nombre?: string;
  apellido?: string;
  emailInstitucional?: string;
  emailPersonal?: string;
  telefono?: string;
};

type Row = {
  id: string;
  created_at: string;
  equipo_nombre: string;
  escuela: string;
  region: string;
  integrantes: Member[];
};

export async function GET() {
  if (!isSupabaseConfigured()) {
    return new Response("Supabase no configurado", { status: 503 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("No autorizado", { status: 401 });

  const { data, error } = await supabase
    .from("reto_inscripciones")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) return new Response("Error: " + error.message, { status: 500 });

  const flat = (data as Row[]).map((r) => {
    const m = r.integrantes ?? [];
    return {
      created_at: new Date(r.created_at).toLocaleString("es-PA"),
      equipo: r.equipo_nombre,
      escuela: r.escuela,
      region: r.region,
      m1_nombre: m[0]?.nombre ?? "",
      m1_apellido: m[0]?.apellido ?? "",
      m1_email_inst: m[0]?.emailInstitucional ?? "",
      m1_email_personal: m[0]?.emailPersonal ?? "",
      m1_telefono: m[0]?.telefono ?? "",
      m2_nombre: m[1]?.nombre ?? "",
      m2_apellido: m[1]?.apellido ?? "",
      m2_email_inst: m[1]?.emailInstitucional ?? "",
      m2_email_personal: m[1]?.emailPersonal ?? "",
      m2_telefono: m[1]?.telefono ?? "",
      m3_nombre: m[2]?.nombre ?? "",
      m3_apellido: m[2]?.apellido ?? "",
      m3_email_inst: m[2]?.emailInstitucional ?? "",
      m3_email_personal: m[2]?.emailPersonal ?? "",
      m3_telefono: m[2]?.telefono ?? "",
    };
  });

  const fields = [
    "created_at", "equipo", "escuela", "region",
    "m1_nombre", "m1_apellido", "m1_email_inst", "m1_email_personal", "m1_telefono",
    "m2_nombre", "m2_apellido", "m2_email_inst", "m2_email_personal", "m2_telefono",
    "m3_nombre", "m3_apellido", "m3_email_inst", "m3_email_personal", "m3_telefono",
  ];

  const csv = rowsToCSV(flat, fields);
  const stamp = new Date().toISOString().slice(0, 10);
  return csvResponse(csv, `reto-inscripciones-${stamp}.csv`);
}
