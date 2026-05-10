import Link from "next/link";

/**
 * Botón flotante de inscripción al Reto Nacional.
 * En móvil: fixed en bottom, full-width
 * En desktop: fixed en bottom-right, compacto
 */
export default function StickyInscriptionCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:bottom-6 md:left-auto md:right-6 md:max-w-sm pointer-events-none">
      <Link
        href="/reto-nacional/inscripcion"
        className="pointer-events-auto block bg-accent text-ink hover:bg-accent-bright transition shadow-lg shadow-accent/30 glow-gold md:rounded"
      >
        <div className="px-6 py-4 md:px-5 md:py-3.5 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.18em] opacity-80">
              Reto Nacional 2026
            </div>
            <div className="text-base font-semibold">
              Inscribir mi equipo →
            </div>
          </div>
          <span className="hidden md:inline-flex h-9 w-9 items-center justify-center bg-ink text-accent text-lg flex-shrink-0">
            🏆
          </span>
        </div>
      </Link>
    </div>
  );
}
