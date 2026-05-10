import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/PageHeader";
import EntregasTable, { type Row } from "./EntregasTable";

export const metadata = { title: "Entregas · Admin" };
export const dynamic = "force-dynamic";

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
      <PageHeader
        eyebrow="Reto Nacional · Proyectos"
        title="Entregas del Reto"
        description="Proyectos finales entregados por los equipos. Tinkercad, video y descripción."
        meta={
          <>
            <span>{rows.length} proyectos entregados</span>
          </>
        }
        actions={
          <a
            href="/api/admin/export/entregas"
            className="inline-flex items-center bg-accent text-ink px-4 py-2 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
          >
            ↓ Descargar CSV
          </a>
        }
      />

      <EntregasTable rows={rows} />
    </div>
  );
}
