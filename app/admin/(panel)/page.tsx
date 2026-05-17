import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";
import { fetchAllPages } from "@/lib/supabase/fetchAll";
import PageHeader from "@/components/admin/PageHeader";

export const dynamic = "force-dynamic";

const PANAMA_TZ = "America/Panama";

// ============================================================
// Data fetching
// ============================================================

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
};
type Interes = {
  id: string;
  created_at: string;
  nombre: string;
  email: string;
  escuela: string | null;
  region: string | null;
};
type Inscripcion = {
  id: string;
  created_at: string;
  equipo_nombre: string;
  escuela: string;
  region: string;
  integrantes: Array<{ nombre?: string; apellido?: string }> | null;
};
type Entrega = {
  id: string;
  created_at: string;
  equipo_nombre: string;
  proyecto_nombre: string;
};
type Taller = {
  id: string;
  n: number;
  title: string;
  published: boolean;
};

async function getData() {
  try {
    const supabase = await createClient();
    const admin = adminClient();

    const [
      respuestasRes,
      interesRes,
      inscripcionesRes,
      entregasRes,
      talleresRes,
      eventosCount,
    ] = await Promise.all([
      fetchAllPages<Resp>((from, to) =>
        admin
          .from("quiz_responses")
          .select(
            "id, created_at, taller_n, taller_title, student_name, student_email, student_school, score, total"
          )
          .order("created_at", { ascending: false })
          .range(from, to)
      ),
      supabase
        .from("reto_interes")
        .select("id, created_at, nombre, email, escuela, region")
        .order("created_at", { ascending: false }),
      supabase
        .from("reto_inscripciones")
        .select("id, created_at, equipo_nombre, escuela, region, integrantes")
        .order("created_at", { ascending: false }),
      supabase
        .from("reto_entregas")
        .select("id, created_at, equipo_nombre, proyecto_nombre")
        .order("created_at", { ascending: false }),
      supabase.from("talleres").select("id, n, title, published"),
      supabase.from("calendar_events").select("id", { count: "exact", head: true }),
    ]);

    return {
      respuestas: respuestasRes.data,
      interes: (interesRes.data ?? []) as Interes[],
      inscripciones: (inscripcionesRes.data ?? []) as Inscripcion[],
      entregas: (entregasRes.data ?? []) as Entrega[],
      talleres: (talleresRes.data ?? []) as Taller[],
      eventos: eventosCount.count ?? 0,
    };
  } catch {
    return {
      respuestas: [] as Resp[],
      interes: [] as Interes[],
      inscripciones: [] as Inscripcion[],
      entregas: [] as Entrega[],
      talleres: [] as Taller[],
      eventos: 0,
    };
  }
}

// ============================================================
// Aggregations
// ============================================================

function countSince<T extends { created_at: string }>(
  arr: T[],
  daysAgo: number
): number {
  const cutoff = Date.now() - daysAgo * 24 * 60 * 60 * 1000;
  return arr.filter((x) => +new Date(x.created_at) >= cutoff).length;
}

function lastNDaysBuckets<T extends { created_at: string }>(
  arr: T[],
  days: number
): Array<{ date: string; label: string; count: number }> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const buckets: Array<{ date: string; label: string; count: number }> = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("es-PA", {
      timeZone: PANAMA_TZ,
      day: "2-digit",
      month: "short",
    });
    buckets.push({ date: key, label, count: 0 });
  }
  const byDate = new Map(buckets.map((b) => [b.date, b]));
  arr.forEach((x) => {
    const key = x.created_at.slice(0, 10);
    const b = byDate.get(key);
    if (b) b.count++;
  });
  return buckets;
}

function perTallerStats(
  respuestas: Resp[],
  talleres: Taller[]
): Array<{
  n: number;
  title: string;
  published: boolean;
  count: number;
  avgPct: number;
  passRate: number;
}> {
  const byN = new Map<number, { resps: Resp[]; title: string }>();
  talleres.forEach((t) => byN.set(t.n, { resps: [], title: t.title }));
  respuestas.forEach((r) => {
    const slot = byN.get(r.taller_n);
    if (slot) slot.resps.push(r);
    else
      byN.set(r.taller_n, {
        resps: [r],
        title: r.taller_title,
      });
  });
  const out: Array<{
    n: number;
    title: string;
    published: boolean;
    count: number;
    avgPct: number;
    passRate: number;
  }> = [];
  for (const [n, slot] of byN.entries()) {
    const valid = slot.resps.filter((r) => r.total > 0);
    const avgPct =
      valid.length === 0
        ? 0
        : Math.round(
            (valid.reduce((acc, r) => acc + r.score / r.total, 0) /
              valid.length) *
              100
          );
    const passing = valid.filter((r) => r.score / r.total >= 0.6).length;
    const passRate = valid.length === 0 ? 0 : Math.round((passing / valid.length) * 100);
    const taller = talleres.find((t) => t.n === n);
    out.push({
      n,
      title: slot.title,
      published: taller?.published ?? false,
      count: slot.resps.length,
      avgPct,
      passRate,
    });
  }
  return out.sort((a, b) => a.n - b.n);
}

function topBy<T>(
  items: T[],
  keyFn: (x: T) => string | null | undefined,
  limit = 8
): Array<{ key: string; count: number }> {
  const counts = new Map<string, number>();
  items.forEach((x) => {
    const k = keyFn(x);
    if (!k) return;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function scoreDistribution(
  respuestas: Resp[]
): Array<{ bucket: string; count: number }> {
  const buckets = [
    { range: [0, 0.2], label: "0–20%" },
    { range: [0.2, 0.4], label: "20–40%" },
    { range: [0.4, 0.6], label: "40–60%" },
    { range: [0.6, 0.8], label: "60–80%" },
    { range: [0.8, 1.01], label: "80–100%" },
  ];
  return buckets.map(({ range, label }) => {
    const count = respuestas.filter((r) => {
      if (r.total === 0) return false;
      const pct = r.score / r.total;
      return pct >= range[0] && pct < range[1];
    }).length;
    return { bucket: label, count };
  });
}

type TimelineEvent = {
  kind: "interes" | "inscripcion" | "entrega" | "quiz";
  date: string;
  title: string;
  subtitle: string;
  right?: string;
  rightTone?: "emerald" | "amber" | "rose" | "muted";
  href?: string;
};

function combinedTimeline(
  interes: Interes[],
  inscripciones: Inscripcion[],
  entregas: Entrega[],
  respuestas: Resp[],
  limit = 20
): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  interes.forEach((x) =>
    events.push({
      kind: "interes",
      date: x.created_at,
      title: x.nombre,
      subtitle: `${x.escuela ?? "—"}${x.region ? ` · ${x.region}` : ""}`,
      href: "/admin/interes",
    })
  );
  inscripciones.forEach((x) =>
    events.push({
      kind: "inscripcion",
      date: x.created_at,
      title: x.equipo_nombre,
      subtitle: `${x.escuela}${x.region ? ` · ${x.region}` : ""}`,
      right: `${x.integrantes?.length ?? 0} integrantes`,
      rightTone: "muted",
      href: "/admin/inscripciones",
    })
  );
  entregas.forEach((x) =>
    events.push({
      kind: "entrega",
      date: x.created_at,
      title: x.proyecto_nombre,
      subtitle: x.equipo_nombre,
      href: "/admin/entregas",
    })
  );
  respuestas.forEach((r) => {
    const pct = r.total > 0 ? Math.round((r.score / r.total) * 100) : 0;
    const passing = pct >= 60;
    events.push({
      kind: "quiz",
      date: r.created_at,
      title: r.student_name,
      subtitle: `T${String(r.taller_n).padStart(2, "0")} · ${r.student_school ?? "—"}`,
      right: `${r.score}/${r.total}`,
      rightTone: passing ? "emerald" : "amber",
      href: "/admin/respuestas",
    });
  });
  return events
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);
}

// ============================================================
// Helpers
// ============================================================

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleString("es-PA", {
    timeZone: PANAMA_TZ,
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function delta(curr: number, prev: number): { sign: string; value: string; tone: string } {
  if (prev === 0 && curr === 0) return { sign: "", value: "—", tone: "text-muted" };
  if (prev === 0) return { sign: "+", value: `${curr}`, tone: "text-emerald-700" };
  const change = curr - prev;
  if (change === 0) return { sign: "", value: "0", tone: "text-muted" };
  const sign = change > 0 ? "+" : "";
  const tone = change > 0 ? "text-emerald-700" : "text-rose-700";
  return { sign, value: `${sign}${change}`, tone };
}

// ============================================================
// Page
// ============================================================

export default async function DashboardPage() {
  const data = await getData();
  const {
    respuestas,
    interes,
    inscripciones,
    entregas,
    talleres,
    eventos,
  } = data;

  // KPIs with week-over-week deltas
  const respWeek = countSince(respuestas, 7);
  const respPrevWeek = countSince(respuestas, 14) - respWeek;
  const interesWeek = countSince(interes, 7);
  const interesPrevWeek = countSince(interes, 14) - interesWeek;
  const inscWeek = countSince(inscripciones, 7);
  const inscPrevWeek = countSince(inscripciones, 14) - inscWeek;
  const entrWeek = countSince(entregas, 7);
  const entrPrevWeek = countSince(entregas, 14) - entrWeek;

  // Overall stats
  const validResp = respuestas.filter((r) => r.total > 0);
  const passing = validResp.filter((r) => r.score / r.total >= 0.6).length;
  const passRate = validResp.length > 0 ? Math.round((passing / validResp.length) * 100) : null;
  const avgScore =
    validResp.length > 0
      ? Math.round(
          (validResp.reduce((a, r) => a + r.score / r.total, 0) /
            validResp.length) *
            100
        )
      : null;
  const uniqueStudents = new Set(respuestas.map((r) => r.student_email)).size;
  const uniqueSchools = new Set(
    [
      ...respuestas.map((r) => r.student_school),
      ...interes.map((r) => r.escuela),
      ...inscripciones.map((r) => r.escuela),
    ].filter(Boolean) as string[]
  ).size;

  // Funnel
  const funnel = [
    { label: "Interesados", count: interes.length, href: "/admin/interes" },
    {
      label: "Inscripciones",
      count: inscripciones.length,
      href: "/admin/inscripciones",
    },
    { label: "Entregas", count: entregas.length, href: "/admin/entregas" },
  ];

  // Quiz activity last 30 days
  const activity = lastNDaysBuckets(respuestas, 30);
  const maxActivity = Math.max(...activity.map((b) => b.count), 1);

  // Per-taller
  const tallerStats = perTallerStats(respuestas, talleres);
  const talleresPublished = talleres.filter((t) => t.published).length;

  // Top schools (across all touchpoints)
  const topSchools = topBy(
    [
      ...respuestas.map((r) => ({ school: r.student_school })),
      ...interes.map((r) => ({ school: r.escuela })),
      ...inscripciones.map((r) => ({ school: r.escuela })),
    ],
    (x) => x.school,
    8
  );

  // Regional (interes + inscripciones)
  const regional = topBy(
    [
      ...interes.map((r) => ({ region: r.region })),
      ...inscripciones.map((r) => ({ region: r.region })),
    ],
    (x) => x.region,
    10
  );

  // Score distribution
  const scoreDist = scoreDistribution(respuestas);
  const maxScoreBucket = Math.max(...scoreDist.map((s) => s.count), 1);

  // Combined timeline
  const timeline = combinedTimeline(
    interes,
    inscripciones,
    entregas,
    respuestas,
    20
  );

  const greeting = new Date().toLocaleString("es-PA", {
    timeZone: PANAMA_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow={greeting}
        title="Resumen general"
        description="Estado del programa y del Reto Nacional CSI."
        meta={
          <>
            <span>{uniqueStudents} estudiantes únicos</span>
            <span>{uniqueSchools} escuelas distintas</span>
            <span>{respuestas.length} quizzes en total</span>
          </>
        }
      />

      {/* KPI cards */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          <KpiCard
            label="Interesados"
            value={interes.length}
            week={interesWeek}
            delta={delta(interesWeek, interesPrevWeek)}
            href="/admin/interes"
          />
          <KpiCard
            label="Inscripciones"
            value={inscripciones.length}
            week={inscWeek}
            delta={delta(inscWeek, inscPrevWeek)}
            href="/admin/inscripciones"
          />
          <KpiCard
            label="Entregas Reto"
            value={entregas.length}
            week={entrWeek}
            delta={delta(entrWeek, entrPrevWeek)}
            href="/admin/entregas"
          />
          <KpiCard
            label="Quizzes"
            value={respuestas.length}
            week={respWeek}
            delta={delta(respWeek, respPrevWeek)}
            href="/admin/respuestas"
          />
        </div>
      </section>

      {/* Quiz performance summary */}
      <section className="grid md:grid-cols-3 gap-px bg-border border border-border">
        <SummaryCard
          label="Promedio quizzes"
          value={avgScore !== null ? `${avgScore}%` : "—"}
          tone={
            avgScore === null
              ? "muted"
              : avgScore >= 60
                ? "emerald"
                : "amber"
          }
        />
        <SummaryCard
          label="Tasa de aprobación"
          value={passRate !== null ? `${passRate}%` : "—"}
          hint={
            passRate !== null
              ? `${passing} de ${validResp.length} aprobaron`
              : undefined
          }
          tone={
            passRate === null
              ? "muted"
              : passRate >= 60
                ? "emerald"
                : "rose"
          }
        />
        <SummaryCard
          label="Talleres activos"
          value={`${talleresPublished}/${talleres.length}`}
          hint={`${eventos} eventos en calendario`}
          tone="default"
        />
      </section>

      {/* Funnel */}
      <section>
        <SectionTitle>Embudo Reto Nacional</SectionTitle>
        <div className="border border-border bg-surface-2 p-6 md:p-8">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-2">
            {funnel.map((step, i) => {
              const prev = i > 0 ? funnel[i - 1].count : null;
              const conversion =
                prev !== null && prev > 0
                  ? Math.round((step.count / prev) * 100)
                  : null;
              return (
                <div key={step.label} className="flex flex-col">
                  <Link
                    href={step.href}
                    className="block bg-surface border border-border p-5 hover:border-ink transition group"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted">
                      {String(i + 1).padStart(2, "0")} · {step.label}
                    </div>
                    <div className="mt-3 font-mono text-3xl md:text-4xl text-ink">
                      {step.count}
                    </div>
                    {conversion !== null && (
                      <div className="mt-2 text-xs text-muted-2 font-mono">
                        {conversion}% del paso anterior
                      </div>
                    )}
                    <div className="mt-3 text-xs text-muted group-hover:text-ink transition">
                      Ver →
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiz activity 30 days */}
      <section>
        <SectionTitle>
          Actividad de quizzes
          <span className="ml-2 text-xs font-mono text-muted-2 normal-case tracking-normal">
            últimos 30 días
          </span>
        </SectionTitle>
        <div className="border border-border bg-surface-2 p-5">
          {respuestas.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted">
              Aún no hay quizzes enviados.
            </div>
          ) : (
            <div>
              <div className="flex items-stretch gap-1 h-32">
                {activity.map((b) => {
                  const h = Math.round((b.count / maxActivity) * 100);
                  return (
                    <div
                      key={b.date}
                      className="flex-1 flex flex-col justify-end"
                      title={`${b.label}: ${b.count}`}
                    >
                      <div
                        className={`w-full ${b.count > 0 ? "bg-accent" : "bg-border/60"} transition`}
                        style={{
                          height: `${b.count > 0 ? Math.max(h, 4) : 2}%`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between text-[10px] font-mono text-muted-2">
                <span>{activity[0]?.label}</span>
                <span>{activity[Math.floor(activity.length / 2)]?.label}</span>
                <span>{activity[activity.length - 1]?.label}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted">
                <span>
                  <strong className="text-ink font-mono">{respWeek}</strong> en
                  últimos 7 días
                </span>
                <span>
                  <strong className="text-ink font-mono">
                    {countSince(respuestas, 30)}
                  </strong>{" "}
                  en últimos 30 días
                </span>
                <span>
                  Pico:{" "}
                  <strong className="text-ink font-mono">{maxActivity}</strong>{" "}
                  quizzes en un día
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Per-taller + Score distribution */}
      <section className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <SectionTitle>Por taller</SectionTitle>
          <div className="border border-border bg-surface-2 overflow-x-auto">
            {tallerStats.length === 0 ? (
              <div className="p-12 text-center text-sm text-muted">
                Sin datos por taller.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-surface">
                  <tr className="text-left">
                    <Th>N</Th>
                    <Th>Taller</Th>
                    <Th align="right">Quizzes</Th>
                    <Th align="right">Promedio</Th>
                    <Th align="right">Aprobados</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tallerStats.map((s) => (
                    <tr key={s.n} className="hover:bg-surface transition">
                      <td className="px-3 py-2.5 font-mono text-xs text-accent-dark">
                        {String(s.n).padStart(2, "0")}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="line-clamp-1">{s.title}</span>
                          {!s.published && (
                            <span className="text-[9px] font-mono uppercase tracking-wider bg-rose-100 text-rose-700 px-1 py-0.5">
                              oculto
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono">
                        {s.count}
                      </td>
                      <td
                        className={`px-3 py-2.5 text-right font-mono ${
                          s.count === 0
                            ? "text-muted-2"
                            : s.avgPct >= 60
                              ? "text-emerald-700"
                              : "text-amber-700"
                        }`}
                      >
                        {s.count === 0 ? "—" : `${s.avgPct}%`}
                      </td>
                      <td
                        className={`px-3 py-2.5 text-right font-mono ${
                          s.count === 0
                            ? "text-muted-2"
                            : s.passRate >= 60
                              ? "text-emerald-700"
                              : "text-rose-700"
                        }`}
                      >
                        {s.count === 0 ? "—" : `${s.passRate}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <SectionTitle>Distribución de puntajes</SectionTitle>
          <div className="border border-border bg-surface-2 p-5">
            {respuestas.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted">
                Sin datos.
              </div>
            ) : (
              <div className="space-y-3">
                {scoreDist.map((b) => {
                  const w = Math.round((b.count / maxScoreBucket) * 100);
                  const isPass = parseInt(b.bucket) >= 60;
                  return (
                    <div key={b.bucket}>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span
                          className={
                            isPass ? "text-emerald-700" : "text-amber-700"
                          }
                        >
                          {b.bucket}
                        </span>
                        <span className="text-muted">{b.count}</span>
                      </div>
                      <div className="h-2 bg-border">
                        <div
                          className={`h-full ${
                            isPass ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                          style={{
                            width: `${b.count === 0 ? 0 : Math.max(w, 4)}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Top schools + Regional */}
      <section className="grid lg:grid-cols-2 gap-6">
        <div>
          <SectionTitle>Top escuelas</SectionTitle>
          <div className="border border-border bg-surface-2">
            {topSchools.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted">
                Sin datos de escuelas.
              </div>
            ) : (
              <BarList items={topSchools} />
            )}
          </div>
        </div>
        <div>
          <SectionTitle>Por región educativa</SectionTitle>
          <div className="border border-border bg-surface-2">
            {regional.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted">
                Sin datos regionales.
              </div>
            ) : (
              <BarList items={regional} tone="accent" />
            )}
          </div>
        </div>
      </section>

      {/* Recent activity timeline */}
      <section>
        <div className="flex items-end justify-between mb-3">
          <SectionTitle noMargin>Actividad reciente</SectionTitle>
          <span className="text-xs font-mono text-muted-2">
            últimos {timeline.length} eventos
          </span>
        </div>
        <div className="border border-border bg-surface-2">
          {timeline.length === 0 ? (
            <div className="p-12 text-center text-sm text-muted">
              Sin actividad aún.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {timeline.map((ev, idx) => (
                <li key={idx}>
                  <Link
                    href={ev.href ?? "#"}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-surface transition"
                  >
                    <span className="shrink-0 mt-0.5">
                      <KindBadge kind={ev.kind} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-ink truncate">
                        {ev.title}
                      </div>
                      <div className="text-xs text-muted truncate">
                        {ev.subtitle}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {ev.right && (
                        <div
                          className={`text-xs font-mono ${
                            ev.rightTone === "emerald"
                              ? "text-emerald-700"
                              : ev.rightTone === "amber"
                                ? "text-amber-700"
                                : ev.rightTone === "rose"
                                  ? "text-rose-700"
                                  : "text-muted"
                          }`}
                        >
                          {ev.right}
                        </div>
                      )}
                      <div className="text-[10px] text-muted-2 font-mono">
                        {fmtTime(ev.date)}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <SectionTitle>Acciones rápidas</SectionTitle>
        <div className="flex flex-wrap gap-2">
          <QuickAction href="/admin/talleres" label="Editar talleres" />
          <QuickAction href="/admin/calendario" label="Ajustar calendario" />
          <QuickAction href="/admin/notificaciones" label="Notificaciones" />
          <QuickAction
            href="/api/admin/export/interes"
            label="↓ CSV interesados"
            external
          />
          <QuickAction
            href="/api/admin/export/inscripciones"
            label="↓ CSV inscripciones"
            external
          />
          <QuickAction
            href="/api/admin/export/entregas"
            label="↓ CSV entregas"
            external
          />
          <QuickAction
            href="/api/admin/export/respuestas"
            label="↓ CSV respuestas"
            external
          />
        </div>
      </section>
    </div>
  );
}

// ============================================================
// Sub-components
// ============================================================

function SectionTitle({
  children,
  noMargin = false,
}: {
  children: React.ReactNode;
  noMargin?: boolean;
}) {
  return (
    <h2
      className={`font-display text-xl tracking-tight ${
        noMargin ? "" : "mb-3"
      }`}
    >
      {children}
    </h2>
  );
}

function KpiCard({
  label,
  value,
  week,
  delta,
  href,
}: {
  label: string;
  value: number;
  week: number;
  delta: { sign: string; value: string; tone: string };
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-surface-2 p-5 md:p-6 hover:bg-surface transition group"
    >
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
      <div className="mt-3 font-mono text-3xl md:text-4xl text-ink leading-none">
        {value}
      </div>
      <div className="mt-3 flex items-baseline gap-2 text-xs">
        <span className={`font-mono ${delta.tone}`}>{delta.value}</span>
        <span className="text-muted-2">vs sem. anterior</span>
      </div>
      <div className="mt-1 text-[11px] text-muted font-mono">
        +{week} esta semana
      </div>
    </Link>
  );
}

function SummaryCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone: "default" | "emerald" | "amber" | "rose" | "muted";
}) {
  const toneColors: Record<string, string> = {
    default: "text-ink",
    emerald: "text-emerald-700",
    amber: "text-amber-700",
    rose: "text-rose-700",
    muted: "text-muted-2",
  };
  return (
    <div className="bg-surface-2 p-5 md:p-6">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
      <div
        className={`mt-3 font-mono text-3xl leading-none ${toneColors[tone]}`}
      >
        {value}
      </div>
      {hint && (
        <div className="mt-2 text-xs text-muted-2 font-mono">{hint}</div>
      )}
    </div>
  );
}

function BarList({
  items,
  tone = "default",
}: {
  items: Array<{ key: string; count: number }>;
  tone?: "default" | "accent";
}) {
  const max = Math.max(...items.map((i) => i.count), 1);
  const barColor = tone === "accent" ? "bg-accent" : "bg-ink/70";
  return (
    <ul className="divide-y divide-border">
      {items.map((item) => {
        const w = Math.round((item.count / max) * 100);
        return (
          <li key={item.key} className="px-4 py-3">
            <div className="flex items-baseline justify-between gap-3 mb-1.5">
              <span className="text-sm text-ink truncate">{item.key}</span>
              <span className="font-mono text-xs text-muted shrink-0">
                {item.count}
              </span>
            </div>
            <div className="h-1.5 bg-border">
              <div
                className={`h-full ${barColor}`}
                style={{ width: `${Math.max(w, 4)}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function KindBadge({ kind }: { kind: TimelineEvent["kind"] }) {
  const cfg: Record<
    string,
    { label: string; bg: string; fg: string; emoji: string }
  > = {
    interes: {
      label: "INT",
      bg: "bg-amber-100",
      fg: "text-amber-800",
      emoji: "💡",
    },
    inscripcion: {
      label: "INS",
      bg: "bg-violet-100",
      fg: "text-violet-800",
      emoji: "🏆",
    },
    entrega: {
      label: "ENT",
      bg: "bg-cyan-100",
      fg: "text-cyan-800",
      emoji: "🚀",
    },
    quiz: {
      label: "QZ",
      bg: "bg-emerald-100",
      fg: "text-emerald-800",
      emoji: "📝",
    },
  };
  const c = cfg[kind];
  return (
    <span
      className={`inline-flex items-center gap-1 ${c.bg} ${c.fg} px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider`}
    >
      <span aria-hidden>{c.emoji}</span>
      <span>{c.label}</span>
    </span>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider text-muted ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {children}
    </th>
  );
}

function QuickAction({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const cls =
    "inline-flex items-center border border-border bg-surface-2 px-3 py-2 text-xs font-medium hover:border-ink hover:bg-surface transition";
  if (external) {
    return (
      <a href={href} className={cls}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
