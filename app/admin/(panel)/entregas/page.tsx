import { createClient } from "@/lib/supabase/server";
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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">
            Entregas del Reto
          </h1>
          <p className="mt-2 text-muted">
            {rows.length}{" "}
            {rows.length === 1
              ? "proyecto entregado"
              : "proyectos entregados"}
            .
          </p>
        </div>
        <a
          href="/api/admin/export/entregas"
          className="inline-flex items-center bg-accent text-ink px-5 py-3 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
        >
          ↓ Descargar CSV
        </a>
      </div>

      <EntregasTable rows={rows} />
    </div>
  );
}
