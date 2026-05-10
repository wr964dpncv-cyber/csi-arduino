import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getStats() {
  try {
    const supabase = await createClient();
    const [insc, entr, talleres, cal] = await Promise.all([
      supabase
        .from("reto_inscripciones")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("reto_entregas")
        .select("id", { count: "exact", head: true }),
      supabase.from("talleres").select("id", { count: "exact", head: true }),
      supabase
        .from("calendar_events")
        .select("id", { count: "exact", head: true }),
    ]);

    return {
      inscripciones: insc.count ?? 0,
      entregas: entr.count ?? 0,
      talleres: talleres.count ?? 0,
      eventos: cal.count ?? 0,
    };
  } catch {
    return { inscripciones: 0, entregas: 0, talleres: 0, eventos: 0 };
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

export default async function DashboardPage() {
  const stats = await getStats();
  const recent = await getRecentInscripciones();

  const cards = [
    {
      n: stats.inscripciones,
      label: "Inscripciones Reto",
      href: "/admin/inscripciones",
    },
    { n: stats.entregas, label: "Entregas Reto", href: "/admin/entregas" },
    { n: stats.talleres, label: "Talleres", href: "/admin/talleres" },
    { n: stats.eventos, label: "Eventos calendario", href: "/admin/calendario" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted">Resumen del Reto Nacional CSI 2026.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="bg-surface-2 p-6 hover:bg-surface transition group"
          >
            <div className="font-mono text-3xl text-accent-dark">{c.n}</div>
            <div className="mt-2 text-sm text-muted group-hover:text-ink transition">
              {c.label} →
            </div>
          </Link>
        ))}
      </div>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-xl tracking-tight">
            Inscripciones recientes
          </h2>
          <Link
            href="/admin/inscripciones"
            className="text-sm text-accent-dark hover:text-ink transition"
          >
            Ver todas →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="border border-dashed border-border bg-surface-2 p-8 text-center text-muted">
            Aún no hay inscripciones.
          </div>
        ) : (
          <div className="border border-border divide-y divide-border bg-surface-2">
            {recent.map((r) => (
              <div key={r.id} className="grid md:grid-cols-12 gap-4 p-4 text-sm">
                <div className="md:col-span-3 font-mono text-xs text-muted">
                  {new Date(r.created_at).toLocaleString("es-PA", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="md:col-span-4 font-medium">{r.equipo_nombre}</div>
                <div className="md:col-span-3 text-muted">{r.escuela}</div>
                <div className="md:col-span-2 text-muted">{r.region}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
