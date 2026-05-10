import Link from "next/link";
import ArduinoSchematic from "@/components/ArduinoSchematic";
import CodeBlock from "@/components/CodeBlock";
import {
  LogicIcon,
  ResistorIcon,
  CodeIcon,
  GearIcon,
} from "@/components/SkillIcons";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-grid opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
                Programa CSI · MEDUCA Panamá
              </div>
              <h1 className="mt-6 font-display text-5xl md:text-7xl tracking-tight leading-[1.02]">
                Aprende ingeniería con{" "}
                <span className="text-accent">Arduino</span>.
              </h1>
              <p className="mt-8 text-lg text-muted-2 max-w-xl leading-relaxed">
                Un programa gratuito de 12 talleres para estudiantes de escuelas
                públicas de Panamá. Aprende electrónica, programación y a construir
                tus propios circuitos desde cero.
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

            <div className="lg:col-span-5">
              <ArduinoSchematic className="w-full text-surface/85" />
            </div>
          </div>
        </div>

        {/* spec strip */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:divide-x divide-white/10 text-center">
            {[
              ["12", "Talleres"],
              ["100%", "Gratuito"],
              ["A tu ritmo", "Modalidad"],
              ["Nacional", "Cobertura"],
            ].map(([n, l]) => (
              <div key={l} className="md:px-4">
                <div className="font-mono text-base md:text-lg">{n}</div>
                <div className="mt-0.5 text-xs text-muted-2 uppercase tracking-[0.14em]">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE EL PROGRAMA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="text-sm text-accent-dark mb-3 font-mono">
                01 · Sobre el programa
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Tecnología en cada escuela de Panamá.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-lg text-muted leading-relaxed">
              <p>
                Bienvenidos al programa{" "}
                <strong className="text-ink">Principios de Arduino</strong>, una
                iniciativa de <strong className="text-ink">Daniel Abadi</strong>{" "}
                creada en el marco del{" "}
                <strong className="text-ink">
                  Cuerpo de Solidaridad Informática (CSI)
                </strong>{" "}
                de MEDUCA.
              </p>
              <p>
                Este programa ha sido diseñado e impartido para introducir a
                estudiantes de todo el país en el mundo de la tecnología, la
                electrónica y la programación.
              </p>
              <p>
                A lo largo de <strong className="text-ink">12 talleres</strong>,
                aprenderás desde los conceptos más básicos hasta la creación de
                tus propios proyectos con Arduino, desarrollando habilidades que
                podrás aplicar en el mundo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TU PRIMER PROGRAMA */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="text-sm text-accent-dark mb-3 font-mono">
                02 · Tu primer programa
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Esto vas a escribir.
              </h2>
              <p className="mt-6 text-muted leading-relaxed">
                Esto es <span className="font-mono text-ink">Blink</span>: el
                programa que hace parpadear un LED cada segundo. Es lo primero que
                vas a escribir en el Taller 1 — y lo entenderás línea por línea.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  {
                    k: "setup()",
                    v: "Se ejecuta una sola vez al encender el Arduino.",
                  },
                  {
                    k: "loop()",
                    v: "Se repite indefinidamente — el corazón de tu programa.",
                  },
                  {
                    k: "digitalWrite()",
                    v: "Enciende o apaga un pin (HIGH = 5V, LOW = 0V).",
                  },
                ].map((it) => (
                  <div key={it.k} className="flex gap-4 text-sm">
                    <span className="font-mono text-accent-dark w-32 flex-shrink-0">
                      {it.k}
                    </span>
                    <span className="text-muted">{it.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <CodeBlock />
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ APRENDERÁS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-2xl mb-16">
            <div className="text-sm text-accent-dark mb-3 font-mono">
              03 · Competencias
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Cuatro habilidades de un ingeniero.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border border-y border-border">
            {[
              {
                Icon: LogicIcon,
                t: "Pensamiento lógico",
                d: "Descompón problemas y diseña soluciones paso a paso.",
              },
              {
                Icon: ResistorIcon,
                t: "Electrónica",
                d: "Voltaje, corriente, sensores y circuitos básicos.",
              },
              {
                Icon: CodeIcon,
                t: "Programación",
                d: "Escribe código en C/C++ usando el lenguaje de Arduino.",
              },
              {
                Icon: GearIcon,
                t: "Resolución de problemas",
                d: "Enfrenta retos reales con creatividad y método.",
              },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="p-8">
                <Icon className="h-10 w-10 text-accent" />
                <h3 className="mt-6 font-display text-lg">{t}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-surface-2 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-2xl mb-16">
            <div className="text-sm text-accent-dark mb-3 font-mono">
              04 · Para comenzar
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Tres pasos para empezar.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                n: "01",
                t: "Accede a la sección de talleres",
                d: "Entra a la sección de talleres y comienza con el Taller 0. No necesitas experiencia previa.",
              },
              {
                n: "02",
                t: "Sigue el orden de los contenidos",
                d: "Cada taller construye sobre el anterior con teoría y ejercicios prácticos.",
              },
              {
                n: "03",
                t: "Completa cada quiz",
                d: "Al final de cada taller, valida lo aprendido con la evaluación correspondiente.",
              },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-mono text-3xl text-accent">{s.n}</div>
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
              <div className="text-sm text-accent-dark mb-3 font-mono">
                05 · Instructor
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Daniel Abadi
              </h2>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
                Creador del programa Principios de Arduino y miembro del Cuerpo
                de Solidaridad Informática del MEDUCA. Diseñó este currículo para
                que cualquier estudiante panameño pueda construir sus propios
                proyectos con Arduino.
              </p>
              <p className="mt-4 text-muted leading-relaxed max-w-xl">
                Para consultas sobre el programa, talleres o quizzes, puedes
                contactar al instructor directamente.
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
              <div className="aspect-square bg-surface-2 border border-border flex items-center justify-center relative">
                <div className="absolute inset-0 bp-grid opacity-30" />
                <div className="relative text-center">
                  <div className="text-7xl">⚙</div>
                  <div className="mt-6 font-display text-xl">Daniel Abadi</div>
                  <div className="text-sm text-muted mt-1 font-mono">
                    Instructor · CSI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
