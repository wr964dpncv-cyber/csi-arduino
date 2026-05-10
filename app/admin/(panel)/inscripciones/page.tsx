import { createClient } from "@/lib/supabase/server";
import InscripcionesTable, { type Row } from "./InscripcionesTable";

export const metadata = { title: "Inscripciones · Admin" };
export const dynamic = "force-dynamic";

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
            {rows.length}{" "}
            {rows.length === 1 ? "equipo inscrito" : "equipos inscritos"}.
          </p>
        </div>
        <a
          href="/api/admin/export/inscripciones"
          className="inline-flex items-center bg-accent text-ink px-5 py-3 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
        >
          ↓ Descargar CSV
        </a>
      </div>

      <InscripcionesTable rows={rows} />
    </div>
  );
}
