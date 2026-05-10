import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const supabase = await createClient();
    const admin = adminClient();
    const sinceDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [
      inscTotal,
      inscWeek,
      entrTotal,
      entrWeek,
      talleresTotal,
      talleresPublished,
      eventos,
      respuestasTotal,
      respuestasWeek,
      respuestasAll,
    ] = await Promise.all([
      supabase
        .from("reto_inscripciones")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("reto_inscripciones")
        .select("id", { count: "exact", head: true })
        .gte("created_at", sinceDate),
      supabase
        .from("reto_entregas")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("reto_entregas")
        .select("id", { count: "exact", head: true })
        .gte("created_at", sinceDate),
      supabase.from("talleres").select("id", { count: "exact", head: true }),
      supabase
        .from("talleres")
        .select("id", { count: "exact", head: true })
        .eq("published", true),
      supabase
        .from("calendar_events")
        .select("id", { count: "exact", head: true }),
      admin.from("quiz_responses").select("id", { count: "exact", head: true }),
      admin
        .from("quiz_responses")
        .select("id", { count: "exact", head: true })
        .gte("created_at", sinceDate),
      admin.from("quiz_responses").select("score, total"),
    ]);

    let passing = 0;
    let totalResponses = 0;
    const respData = (respuestasAll.data ?? []) as { score: number; total: number }[];
    respData.forEach((r) => {
      if (r.total > 0) {
        totalResponses++;
        if (r.score / r.total >= 0.6) passing++;
      }
    });
    const passRate = totalResponses > 0 ? Math.round((passing / totalResponses) * 100) : null;

    return {
      inscripciones: inscTotal.count ?? 0,
      inscripcionesWeek: inscWeek.count ?? 0,
      entregas: entrTotal.count ?? 0,
      entregasWeek: entrWeek.count ?? 0,
      talleres: talleresTotal.count ?? 0,
      talleresPublished: talleresPublished.count ?? 0,
      eventos: eventos.count ?? 0,
      respuestas: respuestasTotal.count ?? 0,
      respuestasWeek: respuestasWeek.count ?? 0,
      passRate,
    };
  } catch {
    return {
      inscripciones: 0,
      inscripcionesWeek: 0,
      entregas: 0,
      entregasWeek: 0,
      talleres: 0,
      talleresPublished: 0,
      eventos: 0,
      respuestas: 0,
      respuestasWeek: 0,
      passRate: null as number | null,
    };
  }
}

async function getRecentInscripciones() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reto_inscripciones")
      .select("id, created_at, equipo_nombre, escuela, region")
      .order("created_at", { ascending: false })
      .limit(5);
    return data ?? [];
  } catch {
    return [];
  }
}

async function getRecentEntregas() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reto_entregas")
      .select("id, created_at, equipo_nombre, proyecto_nombre")
      .order("created_at", { ascending: false })
      .limit(5);
    return data ?? [];
  } catch {
    return [];
  }
}

async function getRecentRespuestas() {
  try {
    const admin = adminClient();
    const { data } = await admin
      .from("quiz_responses")
      .select(
        "id, created_at, taller_n, student_name, student_school, score, total"
      )
      .order("created_at", { ascending: false })
      .limit(5);
    return data as
      | {
          id: string;
          created_at: string;
          taller_n: number;
          student_name: string;
          student_school: string | null;
          score: number;
          total: number;
        }[]
      | null;
  } catch {
    return [];
  }
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("es-PA", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DashboardPage() {
  const [stats, recentInsc, recentEntr, recentResp] = await Promise.all([
    getStats(),
    getRecentInscripciones(),
    getRecentEntregas(),
    getRecentRespuestas(),
  ]);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Resumen general"
        title="Dashboard"
        description="Estado del programa y del Reto Nacional CSI 2026."
      />

      {/* Stats grid */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          <StatCard
            label="Inscripciones"
            value={stats.inscripciones}
            hint={stats.inscripcionesWeek > 0 ? `+${stats.inscripcionesWeek} esta semana` : undefined}
            href="/admin/inscripciones"
          />
          <StatCard
            label="Entregas"
            value={stats.entregas}
            hint={stats.entregasWeek > 0 ? `+${stats.entregasWeek} esta semana` : undefined}
            href="/admin/entregas"
          />
          <StatCard
            label="Respuestas Quiz"
            value={stats.respuestas}
            hint={stats.respuestasWeek > 0 ? `+${stats.respuestasWeek} esta semana` : undefined}
            href="/admin/respuestas"
          />
          <StatCard
            label="% Aprobados"
            value={stats.passRate !== null ? `${stats.passRate}%` : "—"}
            hint={stats.passRate !== null ? `de ${stats.respuestas} respuestas` : undefined}
            tone={
              stats.passRate === null
                ? "default"
                : stats.passRate >= 60
                  ? "emerald"
                  : "rose"
            }
          />
          <StatCard
            label="Talleres publicados"
            value={`${stats.talleresPublished}/${stats.talleres}`}
            href="/admin/talleres"
          />
          <StatCard
            label="Eventos en calendario"
            value={stats.eventos}
            href="/admin/calendario"
          />
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-2 mb-3">
          Acciones rápidas
        </div>
        <div className="flex flex-wrap gap-2">
          <QuickAction href="/admin/talleres" label="+ Editar talleres" />
          <QuickAction href="/admin/calendario" label="Ajustar calendario" />
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

      {/* Activity columns */}
      <section className="grid lg:grid-cols-3 gap-6">
        <ActivityColumn
          title="Inscripciones recientes"
          href="/admin/inscripciones"
          empty="Aún no hay inscripciones."
        >
          {recentInsc.map((r) => (
            <ActivityRow
              key={r.id}
              time={fmtTime(r.created_at)}
              title={r.equipo_nombre}
              subtitle={`${r.escuela} · ${r.region}`}
            />
          ))}
        </ActivityColumn>

        <ActivityColumn
          title="Entregas recientes"
          href="/admin/entregas"
          empty="Aún no hay entregas."
        >
          {recentEntr.map((r) => (
            <ActivityRow
              key={r.id}
              time={fmtTime(r.created_at)}
              title={r.proyecto_nombre}
              subtitle={r.equipo_nombre}
            />
          ))}
        </ActivityColumn>

        <ActivityColumn
          title="Quizzes recientes"
          href="/admin/respuestas"
          empty="Aún no hay respuestas."
        >
          {(recentResp ?? []).map((r) => {
            const pct = r.total > 0 ? Math.round((r.score / r.total) * 100) : 0;
            const passing = pct >= 60;
            return (
              <ActivityRow
                key={r.id}
                time={fmtTime(r.created_at)}
                title={r.student_name}
                subtitle={`T${String(r.taller_n).padStart(2, "0")} · ${r.student_school ?? "—"}`}
                right={
                  <span
                    className={`font-mono text-xs ${
                      passing ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {r.score}/{r.total}
                  </span>
                }
              />
            );
          })}
        </ActivityColumn>
      </section>
    </div>
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
  if (external) {
    return (
      <a
        href={href}
        className="inline-flex items-center border border-border bg-surface-2 px-3 py-2 text-xs font-medium hover:border-ink hover:bg-surface transition"
      >
        {label}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="inline-flex items-center border border-border bg-surface-2 px-3 py-2 text-xs font-medium hover:border-ink hover:bg-surface transition"
    >
      {label}
    </Link>
  );
}

function ActivityColumn({
  title,
  href,
  empty,
  children,
}: {
  title: string;
  href: string;
  empty: string;
  children: React.ReactNode;
}) {
  const hasContent = Array.isArray(children) && children.length > 0;
  return (
    <div className="border border-border bg-surface-2">
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h2 className="font-display text-sm tracking-tight">{title}</h2>
        <Link
          href={href}
          className="text-xs text-muted hover:text-ink transition"
        >
          Ver todo →
        </Link>
      </div>
      {hasContent ? (
        <ul className="divide-y divide-border">{children}</ul>
      ) : (
        <div className="p-8 text-center text-xs text-muted">{empty}</div>
      )}
    </div>
  );
}

function ActivityRow({
  time,
  title,
  subtitle,
  right,
}: {
  time: string;
  title: string;
  subtitle: string;
  right?: React.ReactNode;
}) {
  return (
    <li className="px-4 py-3 flex items-start justify-between gap-3 hover:bg-surface transition">
      <div className="min-w-0 flex-1">
        <div className="font-medium text-sm truncate">{title}</div>
        <div className="text-xs text-muted truncate">{subtitle}</div>
      </div>
      <div className="text-right shrink-0 flex flex-col items-end gap-0.5">
        {right}
        <div className="font-mono text-[10px] text-muted-2">{time}</div>
      </div>
    </li>
  );
}
