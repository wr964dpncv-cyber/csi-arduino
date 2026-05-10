import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-arduino/10 px-3 py-1 text-xs font-semibold text-arduino-dark">
              <span className="h-2 w-2 rounded-full bg-arduino animate-pulse" />
              Cuerpo de Solidaridad Informática · MEDUCA
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-ink">
              Principios de <span className="text-arduino">Arduino</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-slate-600 leading-relaxed">
              Un programa educativo gratuito que lleva la electrónica y la programación
              a los estudiantes de las escuelas públicas de Panamá. Doce talleres para
              despertar el pensamiento lógico, resolver problemas reales y construir el
              futuro con sus propias manos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/talleres"
                className="inline-flex items-center gap-2 rounded-md bg-arduino px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-arduino-dark"
              >
                Comenzar talleres
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/sobre-el-programa"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-ink transition hover:border-arduino hover:text-arduino-dark"
              >
                Sobre el programa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "12", l: "Talleres" },
            { n: "100%", l: "Gratuito" },
            { n: "🇵🇦", l: "Escuelas públicas" },
            { n: "∞", l: "A tu ritmo" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-arduino">{s.n}</div>
              <div className="mt-1 text-sm text-slate-600">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What you'll learn */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Lo que vas a aprender
          </h2>
          <p className="mt-4 text-slate-600">
            Cada taller fortalece una competencia clave del siglo XXI, combinando teoría
            con ejercicios prácticos y evaluaciones.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              t: "Pensamiento lógico",
              d: "Aprende a descomponer problemas y diseñar soluciones paso a paso.",
              i: "🧠",
            },
            {
              t: "Resolución de problemas",
              d: "Enfrenta retos reales con creatividad e iteración.",
              i: "🛠️",
            },
            {
              t: "Fundamentos de electrónica",
              d: "Circuitos, sensores, voltajes y componentes desde cero.",
              i: "⚡",
            },
            {
              t: "Programación básica",
              d: "Sintaxis, variables, funciones y estructuras de control en C/C++.",
              i: "💻",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-arduino hover:shadow-lg"
            >
              <div className="text-3xl">{c.i}</div>
              <div className="mt-4 font-semibold text-ink">{c.t}</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-circuit text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Cómo funciona
          </h2>
          <p className="mt-4 text-slate-300 max-w-2xl">
            El programa es asincrónico: avanzas a tu propio ritmo, desde cualquier
            escuela del país.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                t: "Accede a los talleres",
                d: "Entra a la sección de talleres y elige Taller 0 para empezar desde lo más básico.",
              },
              {
                n: "02",
                t: "Sigue el contenido en orden",
                d: "Cada taller construye sobre el anterior. Mira los videos y completa los ejercicios.",
              },
              {
                n: "03",
                t: "Completa los quizzes",
                d: "Al final de cada taller, valida lo aprendido con la evaluación correspondiente.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="text-arduino-light font-mono text-sm">{s.n}</div>
                <div className="mt-2 text-lg font-semibold">{s.t}</div>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/talleres"
              className="inline-flex items-center gap-2 rounded-md bg-arduino px-6 py-3 text-base font-semibold text-white transition hover:bg-arduino-light hover:text-ink"
            >
              Ver los 12 talleres →
            </Link>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-sm font-semibold text-arduino-dark uppercase tracking-wider">
              El instructor
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Daniel Abadi
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              Creador del programa Principios de Arduino y miembro del Cuerpo de
              Solidaridad Informática (CSI) del Ministerio de Educación de Panamá.
              Daniel diseñó este currículo para que cualquier estudiante, sin importar
              dónde estudie, pueda construir sus propios proyectos con Arduino.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <div>
                <span className="text-slate-500">Email:</span>{" "}
                <a
                  href="mailto:daniel10abadi@gmail.com"
                  className="font-medium text-arduino-dark hover:underline"
                >
                  daniel10abadi@gmail.com
                </a>
              </div>
              <div>
                <span className="text-slate-500">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/50768641929"
                  className="font-medium text-arduino-dark hover:underline"
                >
                  +507 6864-1929
                </a>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-arduino to-arduino-dark p-1 shadow-xl">
              <div className="h-full w-full rounded-3xl bg-white flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="text-7xl">👨‍🏫</div>
                  <div className="mt-4 font-bold text-ink">Daniel Abadi</div>
                  <div className="text-sm text-slate-500">Instructor CSI · MEDUCA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-arduino">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            ¿Listo para construir tu primer proyecto?
          </h2>
          <p className="mt-4 text-arduino-light max-w-xl mx-auto">
            Empieza con el Taller 0 — no necesitas experiencia previa, solo curiosidad.
          </p>
          <Link
            href="/talleres"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-8 py-3 text-base font-semibold text-arduino-dark shadow-sm transition hover:bg-arduino-light hover:text-ink"
          >
            Comenzar ahora →
          </Link>
        </div>
      </section>
    </>
  );
}
