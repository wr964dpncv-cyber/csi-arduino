import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";
import { fetchAllPages } from "@/lib/supabase/fetchAll";
import { pickStudentDisplay } from "@/lib/studentDisplay";
import { csvResponse, rowsToCSV } from "@/lib/csv";

type QuizRow = {
  created_at: string;
  taller_n: number;
  student_name: string;
  student_email: string;
  student_school: string | null;
  student_phone: string | null;
  student_region: string | null;
};

type InteresRow = {
  email: string;
  nombre: string | null;
  telefono: string | null;
  escuela: string | null;
  region: string | null;
  created_at: string;
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
  const [quizRes, interesRes] = await Promise.all([
    fetchAllPages<QuizRow>((from, to) =>
      admin
        .from("quiz_responses")
        .select(
          "created_at, taller_n, student_name, student_email, student_school, student_phone, student_region"
        )
        .order("created_at", { ascending: false })
        .range(from, to)
    ),
    fetchAllPages<InteresRow>((from, to) =>
      admin
        .from("reto_interes")
        .select("email, nombre, telefono, escuela, region, created_at")
        .order("created_at", { ascending: false })
        .range(from, to)
    ),
  ]);

  const byEmail = new Map<
    string,
    {
      rows: Array<{
        student_name: string;
        student_email: string;
        student_school: string | null;
        student_phone: string | null;
        student_region: string | null;
        created_at: string;
      }>;
      tallerNs: Set<number>;
      lastDate: string;
      retoInteresado: boolean;
    }
  >();

  for (const r of quizRes.data) {
    const key = r.student_email.toLowerCase();
    let entry = byEmail.get(key);
    if (!entry) {
      entry = {
        rows: [],
        tallerNs: new Set(),
        lastDate: r.created_at,
        retoInteresado: false,
      };
      byEmail.set(key, entry);
    }
    entry.rows.push(r);
    entry.tallerNs.add(r.taller_n);
    if (+new Date(r.created_at) > +new Date(entry.lastDate)) {
      entry.lastDate = r.created_at;
    }
  }
  for (const i of interesRes.data) {
    const key = i.email.toLowerCase();
    let entry = byEmail.get(key);
    if (!entry) {
      entry = {
        rows: [],
        tallerNs: new Set(),
        lastDate: i.created_at,
        retoInteresado: true,
      };
      byEmail.set(key, entry);
    } else {
      entry.retoInteresado = true;
    }
    entry.rows.push({
      student_name: i.nombre ?? "",
      student_email: i.email,
      student_school: i.escuela,
      student_phone: i.telefono,
      student_region: i.region,
      created_at: i.created_at,
    });
  }

  const flat = Array.from(byEmail.values()).map((s) => {
    const d = pickStudentDisplay(s.rows);
    return {
      nombre: d.name,
      email: d.email,
      telefono: d.phone ?? "",
      escuela: d.school ?? "",
      region: d.region ?? "",
      talleres_completados: s.tallerNs.size,
      reto_interesado: s.retoInteresado ? "sí" : "",
      ultima_actividad: new Date(s.lastDate).toLocaleString("es-PA"),
    };
  });

  const fields = [
    "nombre",
    "email",
    "telefono",
    "escuela",
    "region",
    "talleres_completados",
    "reto_interesado",
    "ultima_actividad",
  ];
  const csv = rowsToCSV(flat, fields);
  const stamp = new Date().toISOString().slice(0, 10);
  return csvResponse(csv, `contactos-${stamp}.csv`);
}
