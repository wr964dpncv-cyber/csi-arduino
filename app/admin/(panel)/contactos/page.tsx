import { adminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { fetchAllPages } from "@/lib/supabase/fetchAll";
import { pickStudentDisplay } from "@/lib/studentDisplay";
import PageHeader from "@/components/admin/PageHeader";
import ContactosTable, { type ContactoRow } from "./ContactosTable";

export const metadata = { title: "Contactos · Admin" };
export const dynamic = "force-dynamic";

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

async function getContactos(): Promise<ContactoRow[]> {
  if (!isSupabaseConfigured()) return [];
  try {
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

    const quizRows = quizRes.data;
    const interesRows = interesRes.data;

    // Agrupa por email. Combina quiz_responses + reto_interes en candidatos
    // para que pickStudentDisplay elija el mejor valor por campo.
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

    for (const r of quizRows) {
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

    for (const i of interesRows) {
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

    const contactos: ContactoRow[] = Array.from(byEmail.values()).map((s) => {
      const display = pickStudentDisplay(s.rows);
      return {
        name: display.name,
        email: display.email,
        phone: display.phone,
        school: display.school,
        region: display.region,
        talleresCount: s.tallerNs.size,
        lastActivity: s.lastDate,
        retoInteresado: s.retoInteresado,
      };
    });

    return contactos;
  } catch {
    return [];
  }
}

export default async function ContactosPage() {
  const contactos = await getContactos();
  const withPhone = contactos.filter((c) => c.phone).length;
  const withRegion = contactos.filter((c) => c.region).length;
  const interesados = contactos.filter((c) => c.retoInteresado).length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Programa · Contactos"
        title="Contactos"
        description="Todos los estudiantes que han participado en algún quiz o se han registrado para el Reto Nacional, con toda su información."
        meta={
          <>
            <span>{contactos.length} contactos</span>
            <span>{withPhone} con teléfono</span>
            <span>{withRegion} con región</span>
            <span>{interesados} interesados en el Reto</span>
          </>
        }
        actions={
          <a
            href="/api/admin/export/contactos"
            className="inline-flex items-center bg-accent text-ink px-4 py-2 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
          >
            ↓ Descargar CSV
          </a>
        }
      />

      <ContactosTable contactos={contactos} />
    </div>
  );
}
