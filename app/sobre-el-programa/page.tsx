import Link from "next/link";

export const metadata = {
  title: "Programa — Principios de Arduino",
  description:
    "Misión, estructura y alcance del programa Principios de Arduino del CSI/MEDUCA.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-grid-dark opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="flex items-center gap-3 tech-label text-accent-bright">
            <span className="inline-block h-px w-8 bg-accent-bright" />
            §01 · Documentación del programa
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
            Sobre el<br />programa
          </h1>
          <p className="mt-8 text-muted-2 max-w-2xl leading-relaxed">
            Iniciativa educativa del Cuerpo de Solidaridad Informática del Ministerio
            de Educación de Panamá. Diseñada y dirigida por Daniel Abadi para llevar
            la formación técnica a estudiantes de escuelas públicas en todo el país.
          </p>
        </div>
      </section>

      {/* Specs grid */}
      <section className="border-b border-ink/10 bg-surface-2">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10">
          {[
            ["Módulos", "12"],
            ["Modalidad", "Asincrónica"],
            ["Costo", "Gratuito"],
            ["Cobertura", "Nacional"],
          ].map(([k, v]) => (
            <div key={k} className="px-6 py-8">
              <div className="tech-label text-muted">{k}</div>
              <div className="mt-2 font-display text-3xl md:text-4xl tracking-tight">
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Misión / Modalidad / Metodología */}
      <section className="relative">
        <div className="absolute inset-0 bp-grid opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="grid md:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {[
              {
                n: "01",
                t: "Misión",
                d: "Democratizar el acceso a la tecnología y formar la próxima generación de innovadores panameños desde la escuela pública.",
              },
              {
                n: "02",
                t: "Modalidad",
                d: "Curso asincrónico de 12 módulos, accesible desde cualquier escuela del país, sin horarios fijos.",
              },
              {
                n: "03",
                t: "Metodología",
                d: "Combina teoría, ejercicios prácticos guiados y evaluaciones para asegurar dominio real del contenido.",
              },
            ].map((c) => (
              <div key={c.n} className="bg-surface-2 p-8">
                <div className="font-mono text-[10px] tracking-[0.2em] text-accent-dark">
                  §01.{c.n}
                </div>
                <div className="mt-6 font-display text-2xl tracking-tight">{c.t}</div>
                <p className="mt-3 text-sm text-muted leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competencias detalladas */}
      <section className="bg-ink text-surface relative">
        <div className="absolute inset-0 bp-grid-dark opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <div className="tech-label text-accent-bright">§01.04 · Competencias</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Lo que el<br />estudiante domina.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 self-end">
              <p className="text-muted-2 leading-relaxed">
                Cada uno de los 12 módulos está diseñado para fortalecer competencias
                fundamentales para los estudiantes del siglo XXI. Al finalizar el
                programa, el estudiante puede diseñar, construir y depurar sus propios
                sistemas con Arduino.
              </p>
            </div>
          </div>

          <div className="space-y-px bg-white/10 border border-white/10">
            {[
              {
                n: "01",
                t: "Pensamiento lógico",
                d: "Capacidad de analizar problemas, identificar patrones y diseñar soluciones estructuradas.",
              },
              {
                n: "02",
                t: "Resolución de problemas",
                d: "Enfoque iterativo para enfrentar retos reales con creatividad y persistencia técnica.",
              },
              {
                n: "03",
                t: "Fundamentos de electrónica",
                d: "Comprensión de circuitos, sensores, actuadores, voltaje, corriente y componentes básicos.",
              },
              {
                n: "04",
                t: "Programación",
                d: "Dominio de variables, estructuras de control, funciones y la sintaxis del lenguaje de Arduino (C/C++).",
              },
            ].map((c) => (
              <div
                key={c.n}
                className="bg-ink p-6 md:p-8 grid md:grid-cols-12 gap-4 items-start hover:bg-ink-soft transition"
              >
                <div className="md:col-span-2 font-mono text-3xl md:text-4xl text-accent-bright leading-none">
                  {c.n}
                </div>
                <div className="md:col-span-3 font-display text-xl md:text-2xl tracking-tight">
                  {c.t}
                </div>
                <div className="md:col-span-7 text-sm text-muted-2 leading-relaxed">
                  {c.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-2 border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="tech-label text-accent-dark">§01.05 · Soporte</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tight leading-tight">
              ¿Tienes preguntas<br />sobre el programa?
            </h2>
            <p className="mt-4 text-muted max-w-md">
              Daniel Abadi está disponible para colegios, docentes y estudiantes que
              quieran sumarse al programa o resolver dudas técnicas.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href="mailto:daniel10abadi@gmail.com"
              className="border border-ink bg-ink text-surface px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] hover:bg-accent hover:border-accent transition flex justify-between items-center"
            >
              <span>Enviar email</span>
              <span>→</span>
            </a>
            <a
              href="https://wa.me/50768641929"
              className="border border-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] hover:bg-ink hover:text-surface transition flex justify-between items-center"
            >
              <span>Contactar por WhatsApp</span>
              <span>→</span>
            </a>
            <Link
              href="/talleres"
              className="border border-ink/20 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] hover:border-ink transition flex justify-between items-center"
            >
              <span>Ir a los módulos</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
