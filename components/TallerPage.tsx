import Link from "next/link";
import type { Taller } from "@/lib/talleres";

type Props = {
  taller: Taller;
  prev?: Taller;
  next?: Taller;
};

export default function TallerPage({ taller, prev, next }: Props) {
  const num = String(taller.n).padStart(2, "0");

  return (
    <>
      {/* Header */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-traces opacity-100 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12">
          <Link
            href="/talleres"
            className="inline-flex items-center gap-2 text-sm text-muted-2 hover:text-surface transition"
          >
            <span>←</span>
            <span>Talleres</span>
          </Link>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-20">
          <div className="text-xs font-mono text-muted-2 mb-4">
            mod-{num} · {taller.level.toLowerCase()} · {taller.topic.toLowerCase()}
          </div>
          <div className="font-mono text-sm text-accent mb-3">
            Taller {taller.n}
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            {taller.title}
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            {taller.description}
          </p>
        </div>
      </section>

      {/* Objetivos */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="text-sm text-muted mb-3">Objetivos</div>
              <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
                Lo que aprenderás.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-4">
                {taller.objectives.map((obj, i) => (
                  <li key={i} className="flex gap-5 items-baseline">
                    <span className="font-mono text-sm text-accent-dark w-8 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-6 border-t border-border">
                <div className="text-sm text-muted mb-2">Al final del taller</div>
                <p className="text-ink leading-relaxed">{taller.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-3xl mb-10">
            <div className="text-sm text-muted mb-3">Video</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              Mira el video completo.
            </h2>
          </div>

          <div className="aspect-video w-full bg-ink">
            <iframe
              src={`https://www.youtube.com/embed/${taller.videoId}`}
              title={`Video del Taller ${taller.n} · ${taller.title}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-3xl mb-10">
            <div className="text-sm text-muted mb-3">Quiz</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              Cuando termines, completa el quiz.
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Usa tu correo institucional MEDUCA para enviar tus respuestas.
            </p>
          </div>

          <a
            href={taller.quizUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between gap-12 bg-ink text-surface px-7 py-5 hover:bg-accent hover:text-ink glow-gold transition group"
          >
            <span className="text-base font-medium">
              Abrir quiz del Taller {taller.n}
            </span>
            <span className="font-mono text-sm text-muted-2 group-hover:text-ink">
              forms.office.com →
            </span>
          </a>

          <p className="mt-8 text-sm text-muted leading-relaxed max-w-2xl">
            <span className="text-ink font-medium">Nota:</span> si tienes
            dificultades para acceder al formulario con tu correo institucional,
            contacta a Daniel directamente por WhatsApp o correo.
          </p>
        </div>
      </section>

      {/* Navegación */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-12 grid md:grid-cols-2 gap-10">
          {prev ? (
            <Link
              href={`/talleres/${prev.slug}`}
              className="group block"
            >
              <div className="text-xs font-mono text-muted mb-2">
                ← anterior · taller {prev.n}
              </div>
              <div className="font-display text-xl group-hover:text-accent-dark transition">
                {prev.title}
              </div>
            </Link>
          ) : (
            <div className="opacity-40">
              <div className="text-xs font-mono text-muted mb-2">← anterior</div>
              <div className="font-display text-xl text-muted">
                Inicio del programa
              </div>
            </div>
          )}
          {next ? (
            <Link
              href={`/talleres/${next.slug}`}
              className="group block md:text-right"
            >
              <div className="text-xs font-mono text-muted mb-2">
                siguiente · taller {next.n} →
              </div>
              <div className="font-display text-xl group-hover:text-accent-dark transition">
                {next.title}
              </div>
            </Link>
          ) : (
            <Link
              href="/talleres"
              className="group block md:text-right"
            >
              <div className="text-xs font-mono text-muted mb-2">siguiente →</div>
              <div className="font-display text-xl group-hover:text-accent-dark transition">
                Ver todos los talleres
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Soporte */}
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-tight">
              ¿Atascado en este taller?
            </h2>
            <p className="mt-4 text-muted-2 max-w-md">
              Daniel responde directamente. Sin formularios, sin filas.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href="https://wa.me/50768641929"
              className="bg-accent text-ink px-6 py-4 text-sm font-semibold hover:bg-accent-bright glow-gold transition flex justify-between items-center"
            >
              <span>WhatsApp +507 6864-1929</span>
              <span>→</span>
            </a>
            <a
              href="mailto:daniel10abadi@gmail.com"
              className="border border-white/20 px-6 py-4 text-sm hover:border-surface transition flex justify-between items-center"
            >
              <span>daniel10abadi@gmail.com</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
