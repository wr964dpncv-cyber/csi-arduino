import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/PageHeader";
import InteresTable, { type Row } from "./InteresTable";

export const metadata = { title: "Interesados · Admin" };
export const dynamic = "force-dynamic";

async function getInteresados(): Promise<Row[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reto_interes")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Row[]) ?? [];
  } catch {
    return [];
  }
}

export default async function InteresPage() {
  const rows = await getInteresados();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Reto Nacional · Pre-inscripción"
        title="Interesados"
        description="Personas que dejaron sus datos esperando que se abra el Reto Nacional."
        meta={<span>{rows.length} interesados</span>}
        actions={
          <a
            href="/api/admin/export/interes"
            className="inline-flex items-center bg-accent text-ink px-4 py-2 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
          >
            ↓ Descargar CSV
          </a>
        }
      />

      <InteresTable rows={rows} />
    </div>
  );
}
