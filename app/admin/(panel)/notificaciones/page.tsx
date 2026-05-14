import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/PageHeader";
import NotificationsForm, { type Setting } from "./NotificationsForm";

export const metadata = { title: "Notificaciones · Admin" };
export const dynamic = "force-dynamic";

const KIND_META: Record<
  string,
  { label: string; description: string; emoji: string }
> = {
  interes: {
    emoji: "💡",
    label: "Interés en el Reto",
    description: "Alguien deja sus datos en el form de Próximamente.",
  },
  inscripcion: {
    emoji: "🏆",
    label: "Inscripción al Reto",
    description: "Un equipo se inscribe formalmente al Reto Nacional.",
  },
  quiz: {
    emoji: "📝",
    label: "Quiz completado",
    description: "Un estudiante envía un quiz de cualquier taller.",
  },
  entrega: {
    emoji: "🚀",
    label: "Entrega de proyecto",
    description: "Un equipo entrega el proyecto final del Reto.",
  },
};

async function getSettings(): Promise<Setting[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("notification_settings")
      .select("*");
    return (data as Setting[]) ?? [];
  } catch {
    return [];
  }
}

export default async function NotificationsPage() {
  const rows = await getSettings();
  const enriched = rows.map((r) => ({
    ...r,
    ...KIND_META[r.key],
  }));

  // Sort in the canonical order
  const order = ["interes", "inscripcion", "quiz", "entrega"];
  enriched.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Sistema"
        title="Notificaciones por correo"
        description="Apaga o prende cada tipo de notificación. Cuando está apagado, el correo no se envía pero el dato se sigue guardando en la base."
      />

      <NotificationsForm settings={enriched} />

      <div className="border border-border bg-surface-2 p-5 text-sm text-muted leading-relaxed">
        <strong className="text-ink">Recipiente actual:</strong>{" "}
        configurado en la variable de entorno{" "}
        <code className="bg-surface px-1.5 py-0.5 font-mono text-xs">
          DANIEL_EMAIL
        </code>{" "}
        en Vercel. Para cambiarlo o agregar más recipientes, edita la env var
        y haz un redeploy.
      </div>
    </div>
  );
}
