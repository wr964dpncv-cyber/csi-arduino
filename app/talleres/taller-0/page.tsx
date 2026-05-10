import Link from "next/link";

export const metadata = {
  title: "Taller 0 · Introducción a Arduino — Principios de Arduino",
  description:
    "Aquí conocerás de qué trata el programa y el concepto más importante de todo el curso: el microcontrolador.",
};

const VIDEO_ID = "EVlnXu1Qbqg";
const QUIZ_URL =
  "https://forms.office.com/Pages/ResponsePage.aspx?id=905Ba8IGHEa7c8GQDRIqIvhy58CPb9ZGtmWNmAz5u1BURU9CMloxSFVaSDhURktLQktQR0Y5WFpRSS4u";

export default function Taller0Page() {
  return (
    <>
      {/* Header */}
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 pt-12 pb-2">
          <Link
            href="/talleres"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-2 hover:text-surface transition"
          >
            <span>←</span>
            <span>Volver a talleres</span>
          </Link>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-2 mb-4">
                <span>MOD-00</span>
                <span className="opacity-50">·</span>
                <span>Inicio</span>
              </div>
              <div className="font-mono text-sm text-accent-bright text-accent mb-2">
                Taller 0
              </div>
              <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02]">
                Introducción a Arduino
              </h1>
              <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
                Aquí conocerás de qué trata el programa y el{" "}
                <strong className="text-surface">concepto más importante</strong>{" "}
                de todo el curso: el <strong className="text-surface">microcontrolador</strong>.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="border border-white/15 bg-ink-soft/50">
                <div className="border-b border-white/10 px-5 py-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    Datos del taller
                  </span>
                </div>
                <dl className="divide-y divide-white/10">
                  {[
                    ["Módulo", "00"],
                    ["Nivel", "Inicio"],
                    ["Tipo", "Setup"],
                    ["Duración", "Ver video"],
                  ].map(([k, v]) => (
                    <div
                      key={k as string}
                      className="px-5 py-3 flex items-center justify-between text-sm"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                        {k}
                      </dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-3xl mb-10">
            <div className="text-sm text-accent-dark mb-3 font-mono">
              01 · Video del taller
            </div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              Mira el video completo.
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              El video introduce los conceptos fundamentales del programa.
              Asegúrate de verlo completo antes de pasar al quiz.
            </p>
          </div>

          <div className="aspect-video w-full bg-ink border border-border">
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}`}
              title="Video del Taller 0 · Introducción a Arduino"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="bg-surface-2 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-3xl mb-12">
            <div className="text-sm text-accent-dark mb-3 font-mono">
              02 · Quiz · Evaluación
            </div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              Cuando termines, completa el quiz.
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Valida lo aprendido con el quiz. Usa tu{" "}
              <strong className="text-ink">correo institucional MEDUCA</strong>{" "}
              para enviar tus respuestas.
            </p>
          </div>

          <div className="border border-border bg-surface p-8 md:p-10">
            <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
              <div className="md:col-span-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-4">
                  ▸ Microsoft Forms · MEDUCA
                </div>
                <h3 className="font-display text-2xl tracking-tight">
                  Quiz del Taller 0
                </h3>
                <p className="mt-3 text-muted leading-relaxed">
                  Inicia sesión con tu correo institucional MEDUCA y completa
                  todas las preguntas del formulario.
                </p>
              </div>
              <div className="md:col-span-5">
                <a
                  href={QUIZ_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between bg-ink text-surface px-6 py-4 text-sm hover:bg-accent transition"
                >
                  <span>Abrir quiz</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-ink text-surface border-l-2 border-accent p-6 md:p-7">
            <div className="grid md:grid-cols-12 gap-4 md:gap-6 items-start">
              <div className="md:col-span-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                ! Nota importante
              </div>
              <p className="md:col-span-10 text-muted-2 leading-relaxed">
                Si tienes dificultades para acceder al formulario con tu correo
                institucional, contacta directamente a{" "}
                <strong className="text-surface">Daniel</strong> por WhatsApp o
                correo electrónico para coordinar tu envío.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-2 gap-px bg-border border border-border">
          <div className="bg-surface p-6 md:p-8 opacity-50">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
              ← Anterior
            </div>
            <div className="mt-2 font-display text-lg text-muted">—</div>
          </div>
          <Link
            href="/talleres"
            className="bg-surface p-6 md:p-8 md:text-right hover:bg-ink hover:text-surface transition group"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-dark group-hover:text-accent-bright">
              Siguiente →
            </div>
            <div className="mt-2 font-display text-lg">Ver todos los talleres</div>
          </Link>
        </div>
      </section>

      {/* Soporte */}
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-tight">
              ¿Tienes dudas con el taller?
            </h2>
            <p className="mt-4 text-muted-2 max-w-md">
              Daniel responde directamente. Sin formularios, sin filas.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href="https://wa.me/50768641929"
              className="bg-accent px-6 py-4 text-sm hover:bg-surface hover:text-ink transition flex justify-between items-center"
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
