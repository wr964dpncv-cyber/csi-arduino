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
  A: Recipient[]; // in progress
  B: Recipient[]; // not started
  C: Recipient[]; // completed
};

async function loadData() {
  const admin = adminClient();

  // Total = todos los talleres registrados (incluyendo no publicados).
  // El programa son 12 talleres aunque algunos todavía no estén abiertos a
  // los estudiantes; los correos hablan del programa completo.
  const [{ count: talleresTotal }, quizzes, interes] = await Promise.all([
    admin
      .from("talleres")
      .select("id", { count: "exact", head: true }),
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

  for (const [email, agg] of byEmail.entries()) {
    const completed = agg.talleres.size;
    const recipient: Recipient = {
      email,
      name: agg.name || email,
      completed,
      school: agg.school,
    };
    if (total > 0 && completed >= total) cohorts.C.push(recipient);
    else if (completed > 0) cohorts.A.push(recipient);
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

  return { total, cohorts };
}

export default async function EmailsPage() {
  const [{ total, cohorts }, templates] = await Promise.all([
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
            <span>{total} talleres publicados</span>
            <span>{cohorts.A.length} en progreso</span>
            <span>{cohorts.B.length} sin empezar</span>
            <span>{cohorts.C.length} completaron</span>
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
