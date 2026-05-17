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

type UnsubRow = {
  email: string;
  unsubscribed_at: string;
  source: string | null;
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
    unsubsRes,
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
    admin
      .from("email_unsubscribes")
      .select("email, unsubscribed_at, source")
      .order("unsubscribed_at", { ascending: false }),
  ]);

  const total = talleresTotal ?? 0;
  const published = talleresPublished ?? 0;
  const unsubs: UnsubRow[] = (unsubsRes.data ?? []).map((r) => ({
    email: ((r as { email: string }).email ?? "").trim().toLowerCase(),
    unsubscribed_at: (r as { unsubscribed_at: string }).unsubscribed_at,
    source: (r as { source: string | null }).source,
  }));
  const unsubSet = new Set(unsubs.map((u) => u.email));

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
  let unsubExcluded = 0;

  for (const [email, agg] of byEmail.entries()) {
    // Excluimos a desuscritos de las cohortes — no van a recibir nada
    // igual (sendUser filtra) pero los sacamos para no inflar contadores
    // ni confundir al admin al elegir destinatarios.
    if (unsubSet.has(email)) {
      unsubExcluded++;
      continue;
    }
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
    if (unsubSet.has(email)) {
      unsubExcluded++;
      continue;
    }
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

  return { total, published, cohorts, alDia, unsubs, unsubExcluded };
}

export default async function EmailsPage() {
  const [{ total, published, cohorts, alDia, unsubs, unsubExcluded }, templates] =
    await Promise.all([loadData(), getAllTemplates()]);

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
            {unsubs.length > 0 && (
              <span title="Pidieron darse de baja del programa. Quedan fuera de todos los envíos.">
                {unsubs.length} desuscritos
              </span>
            )}
          </>
        }
      />

      {unsubs.length > 0 && (
        <details className="border border-border bg-surface-2 group">
          <summary className="cursor-pointer px-5 py-4 flex items-center gap-3 hover:bg-surface select-none">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted">
              Desuscritos
            </span>
            <span className="text-sm text-ink">
              {unsubs.length} estudiante{unsubs.length === 1 ? "" : "s"} pidió
              darse de baja
            </span>
            {unsubExcluded > 0 && (
              <span className="text-xs font-mono text-muted">
                · {unsubExcluded} excluidos de las cohortes
              </span>
            )}
            <span className="ml-auto text-xs font-mono text-muted-2 group-open:hidden">
              ver lista ▾
            </span>
            <span className="ml-auto text-xs font-mono text-muted-2 hidden group-open:inline">
              ocultar ▴
            </span>
          </summary>
          <div className="border-t border-border max-h-72 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface border-b border-border">
                <tr className="text-left">
                  <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                    Correo
                  </th>
                  <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                    Fecha
                  </th>
                  <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                    Origen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {unsubs.map((u) => (
                  <tr key={u.email} className="hover:bg-surface">
                    <td className="px-4 py-1.5 font-mono text-xs text-ink truncate">
                      {u.email}
                    </td>
                    <td className="px-4 py-1.5 font-mono text-xs text-muted">
                      {new Date(u.unsubscribed_at).toLocaleString("es-PA", {
                        timeZone: "America/Panama",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-1.5 font-mono text-[10px] text-muted-2">
                      {u.source ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-border text-[11px] text-muted-2 font-mono leading-relaxed">
            Para reactivar a alguien, borra su fila desde Supabase → Table
            Editor → <code>email_unsubscribes</code>.
          </div>
        </details>
      )}

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
