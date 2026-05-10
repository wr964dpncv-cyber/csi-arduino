import Link from "next/link";
import CircuitBackdrop from "@/components/CircuitBackdrop";
import {
  RETO_DATES,
  RETO_INSCRIPCION_OPEN_AT,
  isInscripcionOpen,
} from "@/lib/reto";
import InscripcionForm from "./InscripcionForm";

export const dynamic = "force-dynamic";

const PANAMA_TZ = "America/Panama";

function formatPanamaDateTime(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("es-PA", {
    timeZone: PANAMA_TZ,
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

function ClosedState() {
  const openAt = formatPanamaDateTime(RETO_INSCRIPCION_OPEN_AT);

  return (
    <section className="bg-ink text-surface relative overflow-hidden min-h-[80vh] flex items-center">
      <CircuitBackdrop variant="flow-left" />
      <div className="relative mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center border border-accent text-accent font-mono text-2xl mb-8">
          🔒
        </div>
        <div className="text-xs font-mono text-muted-2 mb-4">
          Inscripciones · {RETO_DATES.inscripcionFrom} – {RETO_DATES.inscripcionTo}
        </div>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
          Las inscripciones aún no están abiertas.
        </h1>
        <p className="mt-8 text-lg text-muted-2 leading-relaxed">
          El formulario se abrirá automáticamente el{" "}
          <span className="text-accent">{openAt}</span> (hora de Panamá).
        </p>
        <p className="mt-4 text-muted-2 leading-relaxed">
          Vuelve a este enlace cuando llegue la fecha para inscribir a tu
          equipo.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/reto-nacional"
            className="border border-white/20 px-6 py-3 text-sm hover:border-surface transition"
          >
            ← Volver al Reto
          </Link>
          <Link
            href="/calendario"
            className="bg-accent text-ink px-6 py-3 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
          >
            Ver calendario
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function InscripcionPage() {
  if (!isInscripcionOpen()) {
    return <ClosedState />;
  }
  return <InscripcionForm />;
}
