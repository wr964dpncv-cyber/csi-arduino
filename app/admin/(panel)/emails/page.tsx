import PageHeader from "@/components/admin/PageHeader";
import EmailTemplateEditor from "@/components/admin/EmailTemplateEditor";
import { adminClient } from "@/lib/supabase/admin";
import { fetchAllPages } from "@/lib/supabase/fetchAll";
import {
  getAllTemplates,
  VARIANT_LABEL,
  VARIANT_DESCRIPTION,
  type Variant,
} from "@/lib/emailTemplates";

export const dynamic = "force-dynamic";

type QuizRow = {
  student_email: string;
  student_name: string;
  taller_n: number;
};

type InteresRow = {
  email: string;
  nombre: string;
  escuela: string | null;
};

export type Recipient = {
  email: string;
  name: string;
  completed: number;
  school: string | null;
};

type Cohorts = {
  A: Recipient[]; // in progress — todavía les faltan talleres ABIERTOS
  B: Recipient[]; // not started
  C: Recipient[]; // completed — terminaron los 12 del programa
};

async function loadData() {
  const admin = adminClient();

  // Dos cuentas:
  //  - `total`     = todos los talleres del programa (12)
  //  - `published` = talleres actualmente abiertos a estudiantes
  // Total se usa para que los correos hablen del programa completo.
  // Published se usa para saber quién ya hizo todo lo disponible y por lo
  // tanto NO necesita un recordatorio "te faltan N talleres" — esa gente
  // está al día y queda fuera de la cohorte A.
  const [
    { count: talleresTotal },
    { count: talleresPublished },
    quizzes,
    interes,
  ] = await Promise.all([
    admin.from("talleres").select("id", { count: "exact", head: true }),
    admin
      .from("talleres")
      .select("id", { count: "exact", head: true })
      .eq("published", true),
    fetchAllPages<QuizRow>((from, to) =>
      admin
        .from("quiz_responses")
        .select("student_email, student_name, taller_n")
        .order("created_at", { ascending: false })
        .range(from, to)
    ),
    admin
      .from("reto_interes")
      .select("email, nombre, escuela")
      .order("created_at", { ascending: false }),
  ]);

  const total = talleresTotal ?? 0;
  const published = talleresPublished ?? 0;

  // Aggregate distinct talleres per email
  type Agg = {
    name: string;
    school: string | null;
    talleres: Set<number>;
  };
  const byEmail = new Map<string, Agg>();
  (quizzes.data ?? []).forEach((r) => {
    const email = (r.student_email ?? "").trim().toLowerCase();
    if (!email) return;
    const existing = byEmail.get(email);
    if (existing) {
      existing.talleres.add(r.taller_n);
      if (!existing.name && r.student_name) existing.name = r.student_name;
    } else {
      byEmail.set(email, {
        name: r.student_name ?? "",
        school: null,
        talleres: new Set([r.taller_n]),
      });
    }
  });

  const cohorts: Cohorts = { A: [], B: [], C: [] };
  let alDia = 0;

  for (const [email, agg] of byEmail.entries()) {
    const completed = agg.talleres.size;
    const recipient: Recipient = {
      email,
      name: agg.name || email,
      completed,
      school: agg.school,
    };
    // C — terminaron el programa completo (12/12)
    if (total > 0 && completed >= total) {
      cohorts.C.push(recipient);
      continue;
    }
    // Al día — completaron todo lo publicado pero el programa no terminó.
    // No están en ninguna cohorte de correo: nada que pedirles ahora.
    if (published > 0 && completed >= published) {
      alDia++;
      continue;
    }
    // A — en progreso, todavía pueden hacer más talleres abiertos
    if (completed > 0) cohorts.A.push(recipient);
  }

  // Cohort B = interes whose email is NOT in byEmail
  const interesRows = (interes.data ?? []) as InteresRow[];
  for (const r of interesRows) {
    const email = (r.email ?? "").trim().toLowerCase();
    if (!email) continue;
    if (byEmail.has(email)) continue;
    cohorts.B.push({
      email,
      name: r.nombre || email,
      completed: 0,
      school: r.escuela,
    });
  }

  // Sort each cohort by name
  for (const variant of ["A", "B", "C"] as const) {
    cohorts[variant].sort((a, b) => a.name.localeCompare(b.name, "es"));
  }

  return { total, published, cohorts, alDia };
}

export default async function EmailsPage() {
  const [{ total, published, cohorts, alDia }, templates] = await Promise.all([
    loadData(),
    getAllTemplates(),
  ]);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Comunicación"
        title="Emails a estudiantes"
        description="Edita el contenido de cada recordatorio, previsualízalo y envíalo a la cohorte correspondiente."
        meta={
          <>
            <span>
              {published}/{total} talleres abiertos
            </span>
            <span>{cohorts.A.length} en progreso</span>
            <span>{cohorts.B.length} sin empezar</span>
            <span>{cohorts.C.length} completaron</span>
            {alDia > 0 && (
              <span title="Completaron todos los talleres abiertos. No reciben recordatorio hasta que se publique el siguiente.">
                {alDia} al día (sin correo)
              </span>
            )}
          </>
        }
      />

      <div className="bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
        <strong>Recordatorio:</strong> los placeholders disponibles son{" "}
        <code className="bg-amber-100 px-1 text-xs">{"{nombre}"}</code>,{" "}
        <code className="bg-amber-100 px-1 text-xs">{"{completed}"}</code>,{" "}
        <code className="bg-amber-100 px-1 text-xs">{"{total}"}</code>,{" "}
        <code className="bg-amber-100 px-1 text-xs">{"{missing}"}</code> y{" "}
        <code className="bg-amber-100 px-1 text-xs">{"{sitio}"}</code>. Se sustituyen al enviar el correo.
      </div>

      {(["A", "B", "C"] as Variant[]).map((variant) => (
        <EmailTemplateEditor
          key={variant}
          variant={variant}
          variantLabel={VARIANT_LABEL[variant]}
          variantDescription={VARIANT_DESCRIPTION[variant]}
          template={templates[variant]}
          recipients={cohorts[variant]}
          total={total}
        />
      ))}
    </div>
  );
}
