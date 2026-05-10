import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/DeleteButton";

export const metadata = { title: "Entregas · Admin" };
export const dynamic = "force-dynamic";

type Row = {
  id: string;
  created_at: string;
  equipo_nombre: string;
  proyecto_nombre: string;
  tinkercad_url: string;
  video_url: string;
  descripcion: string;
};

async function getEntregas(): Promise<Row[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reto_entregas")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Row[]) ?? [];
  } catch {
    return [];
  }
}

export default async function EntregasPage() {
  const rows = await getEntregas();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">
            Entregas del Reto
          </h1>
          <p className="mt-2 text-muted">
            {rows.length} {rows.length === 1 ? "proyecto entregado" : "proyectos entregados"}.
          </p>
        </div>
        <a
          href="/api/admin/export/entregas"
          className="inline-flex items-center bg-accent text-ink px-5 py-3 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
        >
          ↓ Descargar CSV
        </a>
      </div>

      {rows.length === 0 ? (
        <div className="border border-dashed border-border bg-surface-2 p-12 text-center text-muted">
          Aún no hay entregas. Los proyectos entregados aparecerán aquí.
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => (
            <article
              key={r.id}
              className="border border-border bg-surface-2 p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-xl">{r.proyecto_nombre}</h3>
                <div className="flex items-center gap-4">
                  <div className="font-mono text-xs text-muted">
                    {new Date(r.created_at).toLocaleString("es-PA")}
                  </div>
                  <DeleteButton
                    url={`/api/admin/entregas/${r.id}`}
                    confirmMessage={`¿Eliminar la entrega "${r.proyecto_nombre}"? Esta acción no se puede deshacer.`}
                  />
                </div>
              </div>
              <div className="mt-1 text-sm text-muted">
                Equipo: <span className="text-ink font-medium">{r.equipo_nombre}</span>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                <a
                  href={r.tinkercad_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-border bg-surface px-4 py-3 hover:border-ink transition"
                >
                  <div className="text-xs font-mono text-accent-dark mb-1">
                    Tinkercad
                  </div>
                  <div className="truncate text-ink">{r.tinkercad_url}</div>
                </a>
                <a
                  href={r.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-border bg-surface px-4 py-3 hover:border-ink transition"
                >
                  <div className="text-xs font-mono text-accent-dark mb-1">
                    Video
                  </div>
                  <div className="truncate text-ink">{r.video_url}</div>
                </a>
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-accent-dark hover:text-ink transition">
                  Ver descripción ({r.descripcion.split(/\s+/).length} palabras)
                </summary>
                <p className="mt-3 text-muted leading-relaxed whitespace-pre-wrap">
                  {r.descripcion}
                </p>
              </details>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
