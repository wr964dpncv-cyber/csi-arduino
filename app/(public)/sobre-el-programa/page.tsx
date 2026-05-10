import Link from "next/link";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const metadata = {
  title: "Sobre el Programa — Principios de Arduino",
  description:
    "Misión y estructura del programa Principios de Arduino del CSI/MEDUCA.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-traces opacity-100 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="text-xs font-mono text-muted-2 mb-4">
            Sobre el programa
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            Tecnología al alcance de cada estudiante.
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            Una iniciativa educativa de Daniel Abadi dentro del Cuerpo de
            Solidaridad Informática del Ministerio de Educación de Panamá.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4">
          {[
            ["12", "Talleres"],
            ["100%", "Gratuito"],
            ["A tu ritmo", "Modalidad"],
            ["Nacional", "Cobertura"],
          ].map(([n, l]) => (
            <div key={l} className="px-6 py-12">
              <div className="font-mono text-3xl tracking-tight">{n}</div>
              <div className="mt-2 text-sm text-muted">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Misión / Modalidad / Metodología */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                t: "Misión",
                d: "Democratizar el acceso a la tecnología y formar a la próxima generación de innovadores panameños desde la escuela pública.",
              },
              {
                t: "Modalidad",
                d: "12 talleres asincrónicos accesibles desde cualquier escuela del país, sin horarios fijos ni costos.",
              },
              {
                t: "Metodología",
                d: "Combina teoría con ejercicios prácticos y evaluaciones para asegurar dominio real del contenido.",
              },
            ].map((c) => (
              <div key={c.t}>
                <div className="font-mono text-sm text-accent-dark mb-3">→</div>
                <h2 className="font-display text-2xl tracking-tight">{c.t}</h2>
                <p className="mt-3 text-muted leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competencias */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl mb-12">
            <div className="text-sm text-muted mb-3">Competencias</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Lo que el estudiante domina al terminar.
            </h2>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {[
              {
                t: "Pensamiento lógico",
                d: "Análisis de problemas, identificación de patrones y diseño de soluciones estructuradas.",
              },
              {
                t: "Resolución de problemas",
                d: "Enfoque iterativo para enfrentar retos reales con creatividad y persistencia.",
              },
              {
                t: "Fundamentos de electrónica",
                d: "Circuitos, sensores, voltaje, corriente y componentes básicos.",
              },
              {
                t: "Programación",
                d: "Variables, control de flujo, funciones y sintaxis del lenguaje de Arduino (C/C++).",
              },
            ].map((c, i) => (
              <div
                key={c.t}
                className="grid md:grid-cols-12 gap-4 md:gap-8 py-6 items-baseline"
              >
                <div className="md:col-span-1 font-mono text-sm text-accent-dark">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="md:col-span-4 font-display text-lg">{c.t}</div>
                <div className="md:col-span-7 text-muted leading-relaxed">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              ¿Tienes preguntas sobre el programa?
            </h2>
            <p className="mt-3 text-muted">
              Escríbele a Daniel directamente. Sin formularios.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href="mailto:daniel10abadi@gmail.com"
              className="bg-ink text-surface px-6 py-4 text-sm hover:bg-accent hover:text-ink transition flex justify-between items-center"
            >
              <span>daniel10abadi@gmail.com</span>
              <span>→</span>
            </a>
            <a
              href="https://wa.me/50768641929"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-ink px-6 py-4 text-sm hover:bg-ink hover:text-surface transition flex items-center gap-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-transform group-hover:scale-110">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <span className="flex-1">WhatsApp +507 6864-1929</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <Link
              href="/talleres"
              className="text-muted hover:text-ink transition px-6 py-4 text-sm flex justify-between items-center"
            >
              <span>Ver talleres</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
