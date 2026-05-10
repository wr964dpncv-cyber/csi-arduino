import Link from "next/link";

export const metadata = {
  title: "Sobre el Programa — Principios de Arduino",
  description:
    "Conoce la misión, estructura y alcance del programa Principios de Arduino, parte del Cuerpo de Solidaridad Informática del MEDUCA.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <span className="text-sm font-semibold text-arduino-dark uppercase tracking-wider">
            Sobre el Programa
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
            Tecnología al alcance de cada estudiante
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            <strong>Principios de Arduino</strong> es una iniciativa educativa
            desarrollada por <strong>Daniel Abadi</strong> dentro del{" "}
            <strong>Cuerpo de Solidaridad Informática (CSI)</strong> del{" "}
            <strong>Ministerio de Educación de Panamá</strong>. Su objetivo es
            introducir a estudiantes de escuelas públicas en la electrónica, la
            programación y el pensamiento computacional usando Arduino como
            herramienta práctica.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Misión",
              d: "Democratizar el acceso a la tecnología y formar la próxima generación de innovadores panameños.",
            },
            {
              t: "Modalidad",
              d: "Curso asincrónico de 12 talleres, accesible desde cualquier escuela del país.",
            },
            {
              t: "Metodología",
              d: "Combina teoría, ejercicios prácticos y evaluaciones para asegurar dominio real del contenido.",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="font-semibold text-arduino-dark">{c.t}</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Competencias que desarrolla el programa
          </h2>
          <p className="mt-4 text-slate-600">
            Cada uno de los 12 talleres está diseñado para fortalecer competencias
            fundamentales para los estudiantes del siglo XXI:
          </p>
          <ul className="mt-8 space-y-4">
            {[
              {
                t: "Pensamiento lógico",
                d: "Capacidad de analizar problemas, identificar patrones y diseñar soluciones estructuradas.",
              },
              {
                t: "Resolución de problemas",
                d: "Enfoque iterativo para enfrentar retos reales con creatividad y persistencia.",
              },
              {
                t: "Fundamentos de electrónica",
                d: "Comprensión de circuitos, sensores, actuadores, voltaje, corriente y componentes básicos.",
              },
              {
                t: "Programación básica",
                d: "Dominio de variables, estructuras de control, funciones y la sintaxis del lenguaje de Arduino (C/C++).",
              },
            ].map((c) => (
              <li key={c.t} className="flex gap-4 items-start">
                <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-arduino/10 text-arduino-dark font-bold">
                  ✓
                </div>
                <div>
                  <div className="font-semibold text-ink">{c.t}</div>
                  <div className="text-sm text-slate-600 leading-relaxed">{c.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl bg-circuit text-white p-10 md:p-14">
          <h2 className="text-2xl md:text-3xl font-bold">¿Tienes preguntas?</h2>
          <p className="mt-3 text-slate-300">
            Daniel Abadi está disponible para colegios, docentes y estudiantes que
            quieran sumarse al programa o resolver dudas.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:daniel10abadi@gmail.com"
              className="rounded-md bg-arduino px-5 py-3 text-sm font-semibold transition hover:bg-arduino-light hover:text-ink"
            >
              Enviar email
            </a>
            <a
              href="https://wa.me/50768641929"
              className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              WhatsApp
            </a>
            <Link
              href="/talleres"
              className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Ver talleres →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
