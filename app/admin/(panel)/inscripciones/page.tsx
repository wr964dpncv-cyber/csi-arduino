import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Inscripciones · Admin" };
export const dynamic = "force-dynamic";

type Member = {
  nombre?: string;
  apellido?: string;
  emailInstitucional?: string;
  emailPersonal?: string;
  telefono?: string;
};

type Row = {
  id: string;
  created_at: string;
  equipo_nombre: string;
  escuela: string;
  region: string;
  integrantes: Member[];
};

async function getInscripciones(): Promise<Row[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reto_inscripciones")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Row[]) ?? [];
  } catch {
    return [];
  }
}

export default async function InscripcionesPage() {
  const rows = await getInscripciones();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">
            Inscripciones del Reto
          </h1>
          <p className="mt-2 text-muted">
            {rows.length} {rows.length === 1 ? "equipo inscrito" : "equipos inscritos"}.
          </p>
        </div>
        <a
          href="/api/admin/export/inscripciones"
          className="inline-flex items-center bg-accent text-ink px-5 py-3 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
        >
          ↓ Descargar CSV
        </a>
      </div>

      {rows.length === 0 ? (
        <div className="border border-dashed border-border bg-surface-2 p-12 text-center text-muted">
          Aún no hay inscripciones. Las nuevas inscripciones aparecerán aquí
          automáticamente.
        </div>
      ) : (
        <div className="border border-border overflow-x-auto bg-surface-2">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface">
              <tr className="text-left">
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Fecha
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Equipo
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Escuela
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Región
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Integrantes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-surface transition">
                  <td className="px-4 py-3 align-top font-mono text-xs text-muted whitespace-nowrap">
                    {new Date(r.created_at).toLocaleString("es-PA", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 align-top font-medium">
                    {r.equipo_nombre}
                  </td>
                  <td className="px-4 py-3 align-top text-muted">{r.escuela}</td>
                  <td className="px-4 py-3 align-top text-muted">{r.region}</td>
                  <td className="px-4 py-3 align-top">
                    <ul className="space-y-1">
                      {r.integrantes?.map((m, i) => (
                        <li key={i} className="text-xs">
                          <span className="font-medium">
                            {m.nombre} {m.apellido}
                          </span>
                          <span className="text-muted ml-2">
                            {m.emailInstitucional} · {m.telefono}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
