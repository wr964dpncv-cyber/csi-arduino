import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-grid opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-28 md:pt-32 md:pb-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs text-muted-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
              Programa CSI · MEDUCA Panamá
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-7xl tracking-tight leading-[1.02]">
              Aprende ingeniería con <span className="text-accent">Arduino</span>.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-2 max-w-2xl leading-relaxed">
              Un programa gratuito de 12 talleres para estudiantes de escuelas
              públicas de Panamá. Aprende electrónica, programación y a construir
              tus propios proyectos desde cero.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/talleres"
                className="inline-flex items-center bg-surface text-ink px-7 py-3.5 text-base font-medium hover:bg-accent hover:text-surface transition"
              >
                Comenzar talleres
              </Link>
              <Link
                href="/sobre-el-programa"
                className="inline-flex items-center border border-white/20 px-7 py-3.5 text-base text-surface hover:border-surface transition"
              >
                Conocer el programa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ APRENDES */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-2xl mb-16">
            <div className="text-sm text-accent-dark mb-3">Qué aprenderás</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Cuatro habilidades fundamentales.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              {
                t: "Pensamiento lógico",
                d: "Aprende a descomponer problemas complejos y diseñar soluciones paso a paso.",
              },
              {
                t: "Electrónica",
                d: "Domina los fundamentos: voltaje, corriente, sensores y circuitos.",
              },
              {
                t: "Programación",
                d: "Escribe tu propio código en C/C++ usando el lenguaje de Arduino.",
              },
              {
                t: "Resolución de problemas",
                d: "Enfrenta retos reales con creatividad, iteración y método.",
              },
            ].map((c, i) => (
              <div key={c.t} className="flex gap-6">
                <div className="font-display text-3xl text-accent w-12 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-display text-xl">{c.t}</h3>
                  <p className="mt-2 text-muted leading-relaxed">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-surface-2 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-2xl mb-16">
            <div className="text-sm text-accent-dark mb-3">Cómo funciona</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Aprende a tu propio ritmo, desde cualquier escuela.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: "1",
                t: "Empieza por el Taller 0",
                d: "No necesitas experiencia previa. Solo curiosidad y ganas de aprender.",
              },
              {
                n: "2",
                t: "Sigue los talleres en orden",
                d: "Cada taller construye sobre el anterior con teoría y ejercicios prácticos.",
              },
              {
                n: "3",
                t: "Completa los ejercicios",
                d: "Al final de cada taller, valida lo aprendido con la evaluación.",
              },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-display text-5xl text-accent">{s.n}</div>
                <h3 className="mt-6 font-display text-xl">{s.t}</h3>
                <p className="mt-2 text-muted leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <div className="text-sm text-accent-dark mb-3">El instructor</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Daniel Abadi
              </h2>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
                Creador del programa Principios de Arduino y miembro del Cuerpo
                de Solidaridad Informática del MEDUCA. Diseñó este currículo para
                que cualquier estudiante panameño pueda construir sus propios
                proyectos con Arduino.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:daniel10abadi@gmail.com"
                  className="inline-flex items-center border border-ink px-5 py-3 text-sm hover:bg-ink hover:text-surface transition"
                >
                  daniel10abadi@gmail.com
                </a>
                <a
                  href="https://wa.me/50768641929"
                  className="inline-flex items-center border border-ink px-5 py-3 text-sm hover:bg-ink hover:text-surface transition"
                >
                  +507 6864-1929
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="aspect-square bg-surface-2 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl">⚙</div>
                  <div className="mt-6 font-display text-xl">Daniel Abadi</div>
                  <div className="text-sm text-muted mt-1">Instructor · CSI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24 text-center">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight max-w-2xl mx-auto">
            Empieza a construir tu primer proyecto.
          </h2>
          <p className="mt-5 text-muted-2 max-w-md mx-auto">
            Gratis, sin requisitos previos, a tu ritmo.
          </p>
          <Link
            href="/talleres"
            className="mt-10 inline-flex items-center bg-accent text-surface px-8 py-4 text-base font-medium hover:bg-surface hover:text-ink transition"
          >
            Comenzar Taller 0 →
          </Link>
        </div>
      </section>
    </>
  );
}
