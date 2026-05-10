import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/PageHeader";
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
  const totalIntegrantes = rows.reduce(
    (acc, r) => acc + (r.integrantes?.length ?? 0),
    0
  );

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Reto Nacional · Datos"
        title="Inscripciones del Reto"
        description="Equipos inscritos para la competencia. Filtra, busca y exporta."
        meta={
          <>
            <span>{rows.length} equipos</span>
            <span>{totalIntegrantes} integrantes</span>
          </>
        }
        actions={
          <a
            href="/api/admin/export/inscripciones"
            className="inline-flex items-center bg-accent text-ink px-4 py-2 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
          >
            ↓ Descargar CSV
          </a>
        }
      />

      <InscripcionesTable rows={rows} />
    </div>
  );
}
