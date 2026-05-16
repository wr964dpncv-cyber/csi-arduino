import Link from "next/link";
import { notFound } from "next/navigation";
import { adminClient } from "@/lib/supabase/admin";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/PageHeader";

export const dynamic = "force-dynamic";

type Resp = {
  id: string;
  created_at: string;
  taller_n: number;
  taller_title: string;
  student_name: string;
  student_email: string;
  student_school: string | null;
  score: number;
  total: number;
  answers: Array<{
    question_id: string;
    selected_index: number;
    correct: boolean;
  }> | null;
  text_answers: Record<string, string> | null;
  file_uploads: Record<string, string> | null;
};

type Taller = {
  id: string;
  n: number;
  title: string;
  slug: string;
  published: boolean;
};

type QuestionInfo = {
  question: string;
  options: string[];
  correct_index: number;
  question_type: string | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const { email } = await params;
  return {
    title: `${decodeURIComponent(email)} · Estudiantes · Admin`,
  };
}

async function getData(emailRaw: string): Promise<{
  responses: Resp[];
  talleres: Taller[];
  questionsMap: Record<string, QuestionInfo>;
} | null> {
  if (!isSupabaseConfigured()) return null;
  const email = decodeURIComponent(emailRaw).toLowerCase();

  try {
    const admin = adminClient();
    const supabase = await createClient();

    const [respRes, talleresRes, questionsRes] = await Promise.all([
      admin
        .from("quiz_responses")
        .select(
          "id, created_at, taller_n, taller_title, student_name, student_email, student_school, score, total, answers, text_answers, file_uploads"
        )
        .eq("student_email", email)
        .order("taller_n", { ascending: true }),
      supabase
        .from("talleres")
        .select("id, n, title, slug, published")
        .order("n", { ascending: true }),
      admin
        .from("quiz_questions")
        .select("id, question, options, correct_index, question_type"),
    ]);

    const responses = (respRes.data ?? []) as Resp[];
    if (responses.length === 0) return null;

    const talleres = (talleresRes.data ?? []) as Taller[];

    const questionsMap: Record<string, QuestionInfo> = {};
    for (const q of (questionsRes.data ?? []) as Array<{
      id: string;
      question: string;
      options: string[] | null;
      correct_index: number;
      question_type: string | null;
    }>) {
      questionsMap[q.id] = {
        question: q.question,
        options: q.options ?? [],
        correct_index: q.correct_index,
        question_type: q.question_type,
      };
    }

    return { responses, talleres, questionsMap };
  } catch {
    return null;
  }
}

export default async function EstudianteDetailPage({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const { email } = await params;
  const data = await getData(email);
  if (!data) notFound();

  const { responses, talleres, questionsMap } = data;

  // Use most recent response for student info
  const latest = responses[responses.length - 1];
  const student = {
    name: latest.student_name,
    email: latest.student_email,
    school: latest.student_school,
  };

  // Map taller_n → response
  const responseByN = new Map<number, Resp>();
  responses.forEach((r) => responseByN.set(r.taller_n, r));

  // Build full taller list (combine talleres table + any taller_n in responses
  // that doesn't have a taller record)
  const tallerByN = new Map<number, Taller | { n: number; title: string }>();
  talleres.forEach((t) => tallerByN.set(t.n, t));
  responses.forEach((r) => {
    if (!tallerByN.has(r.taller_n)) {
      tallerByN.set(r.taller_n, { n: r.taller_n, title: r.taller_title });
    }
  });
  const allTallerNs = Array.from(tallerByN.keys()).sort((a, b) => a - b);

  // Aggregate stats
  const validResps = responses.filter((r) => r.total > 0);
  const avgPct =
    validResps.length > 0
      ? Math.round(
          (validResps.reduce((acc, r) => acc + r.score / r.total, 0) /
            validResps.length) *
            100
        )
      : 0;
  const passing = validResps.filter((r) => r.score / r.total >= 0.6).length;
  const passRate =
    validResps.length > 0 ? Math.round((passing / validResps.length) * 100) : 0;
  const completionPct =
    talleres.length > 0
      ? Math.round((responses.length / talleres.length) * 100)
      : 0;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/estudiantes"
          className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-ink transition mb-4"
        >
          ← Volver a estudiantes
        </Link>
        <PageHeader
          eyebrow="Estudiante"
          title={student.name}
          description={
            <span className="flex flex-wrap gap-x-3 gap-y-1 items-center">
              <a
                href={`mailto:${student.email}`}
                className="text-ink hover:text-accent-dark transition"
              >
                {student.email}
              </a>
              {student.school && (
                <>
                  <span className="text-muted-2">·</span>
                  <span>{student.school}</span>
                </>
              )}
            </span>
          }
        />
      </div>

      {/* Stats grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
        <Stat
          label="Talleres entregados"
          value={`${responses.length}${talleres.length > 0 ? ` / ${talleres.length}` : ""}`}
          hint={talleres.length > 0 ? `${completionPct}% completado` : undefined}
        />
        <Stat
          label="Promedio"
          value={`${avgPct}%`}
          tone={avgPct >= 60 ? "emerald" : "amber"}
        />
        <Stat
          label="Aprobados"
          value={`${passRate}%`}
          hint={`${passing} de ${validResps.length}`}
          tone={passRate >= 60 ? "emerald" : "rose"}
        />
        <Stat
          label="Última entrega"
          value={fmtShortDate(latest.created_at)}
        />
      </section>

      {/* Talleres list */}
      <section>
        <h2 className="font-display text-xl tracking-tight mb-3">
          Progreso por taller
        </h2>
        <div className="border border-border bg-surface-2 divide-y divide-border">
          {allTallerNs.map((n) => {
            const t = tallerByN.get(n)!;
            const r = responseByN.get(n);
            return <TallerRow key={n} taller={t} response={r} questionsMap={questionsMap} />;
          })}
        </div>
      </section>
    </div>
  );
}

// ============================================================
// Sub-components
// ============================================================

function TallerRow({
  taller,
  response,
  questionsMap,
}: {
  taller: Taller | { n: number; title: string };
  response: Resp | undefined;
  questionsMap: Record<string, QuestionInfo>;
}) {
  const pct =
    response && response.total > 0
      ? Math.round((response.score / response.total) * 100)
      : null;
  const passing = pct !== null && pct >= 60;

  if (!response) {
    return (
      <div className="px-4 py-4 flex items-center gap-3">
        <span className="font-mono text-xs text-muted-2 w-8 shrink-0">
          {String(taller.n).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-ink">{taller.title}</div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-muted-2 mt-1">
            No entregado
          </div>
        </div>
        <div className="text-xs text-muted-2 font-mono shrink-0">—</div>
      </div>
    );
  }

  return (
    <details className="group">
      <summary className="px-4 py-4 flex items-center gap-3 cursor-pointer hover:bg-surface transition list-none [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-xs text-accent-dark w-8 shrink-0">
          {String(taller.n).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-ink truncate">
            {taller.title}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] font-mono text-muted mt-1">
            <span>{fmtTime(response.created_at)}</span>
            <span
              className={
                passing ? "text-emerald-700" : "text-amber-700"
              }
            >
              {passing ? "Aprobado" : "No aprobó"}
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div
            className={`font-mono text-base ${
              passing ? "text-emerald-700" : "text-amber-700"
            }`}
          >
            {response.score}/{response.total}
          </div>
          <div className="text-[10px] text-muted font-mono">{pct}%</div>
        </div>
        <span className="ml-2 text-muted-2 group-open:rotate-180 transition shrink-0">
          ▼
        </span>
      </summary>

      <div className="px-4 pb-5 pl-12 space-y-3 bg-surface/40 border-t border-border">
        {/* Multiple choice answers */}
        {response.answers?.map((ans, idx) => {
          const q = questionsMap[ans.question_id];
          return (
            <div
              key={ans.question_id}
              className={`border-l-2 pl-4 py-2 mt-3 ${
                ans.correct ? "border-emerald-500" : "border-rose-500"
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`font-mono text-xs font-bold shrink-0 ${
                    ans.correct ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {ans.correct ? "✓" : "✗"} {idx + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-ink font-medium">
                    {q?.question ?? (
                      <span className="text-muted italic">
                        (pregunta eliminada)
                      </span>
                    )}
                  </div>
                  {q && (
                    <div className="mt-2 space-y-1 text-xs">
                      {q.options.map((opt, i) => {
                        const isSelected = i === ans.selected_index;
                        const isCorrect = i === q.correct_index;
                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-2 ${
                              isCorrect
                                ? "text-emerald-700 font-medium"
                                : isSelected
                                  ? "text-rose-700"
                                  : "text-muted"
                            }`}
                          >
                            <span className="font-mono w-4 shrink-0">
                              {isSelected ? "●" : "○"}
                            </span>
                            <span>{opt}</span>
                            {isCorrect && (
                              <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-700">
                                correcta
                              </span>
                            )}
                            {isSelected && !isCorrect && (
                              <span className="text-[9px] font-mono uppercase tracking-wider text-rose-700">
                                elegida
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Text answers */}
        {response.text_answers &&
          Object.entries(response.text_answers).map(([qid, txt]) => {
            const q = questionsMap[qid];
            return (
              <div
                key={qid}
                className="border-l-2 border-accent pl-4 py-2"
              >
                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs text-accent-dark shrink-0">
                    ✎
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ink font-medium">
                      {q?.question ?? (
                        <span className="text-muted italic">
                          (pregunta de texto)
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-ink whitespace-pre-wrap bg-surface p-2 border border-border">
                      {txt}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {/* File uploads */}
        {response.file_uploads &&
          Object.keys(response.file_uploads).length > 0 && (
            <div className="border-l-2 border-cyan-500 pl-4 py-2">
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs text-cyan-700 shrink-0">
                  📎
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-ink font-medium">
                    Archivos subidos
                  </div>
                  <div className="mt-2 flex flex-col gap-1">
                    {Object.entries(response.file_uploads).map(
                      ([qid, url]) => (
                        <a
                          key={qid}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent-dark hover:underline"
                        >
                          ↓ Ver archivo
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </details>
  );
}

function Stat({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "emerald" | "amber" | "rose";
}) {
  const toneColors: Record<string, string> = {
    default: "text-ink",
    emerald: "text-emerald-700",
    amber: "text-amber-700",
    rose: "text-rose-700",
  };
  return (
    <div className="bg-surface-2 p-5">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
      <div
        className={`mt-2 font-mono text-2xl md:text-3xl leading-none ${toneColors[tone]}`}
      >
        {value}
      </div>
      {hint && (
        <div className="mt-2 text-[11px] text-muted-2 font-mono">{hint}</div>
      )}
    </div>
  );
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleString("es-PA", {
    timeZone: "America/Panama",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmtShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-PA", {
    timeZone: "America/Panama",
    day: "2-digit",
    month: "short",
  });
}
