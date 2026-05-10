import Link from "next/link";
import ArduinoSchematic from "@/components/ArduinoSchematic";
import CodeBlock from "@/components/CodeBlock";
import {
  LogicIcon,
  ResistorIcon,
  CodeIcon,
  GearIcon,
} from "@/components/SkillIcons";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-traces opacity-100 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="text-xs font-mono text-muted-2">
                v1.0 · Programa CSI · MEDUCA Panamá
              </div>
              <h1 className="mt-6 font-display text-5xl md:text-7xl tracking-tight leading-[1.02]">
                Aprende ingeniería con{" "}
                <span className="text-accent">Arduino</span>.
              </h1>
              <p className="mt-8 text-lg text-muted-2 max-w-xl leading-relaxed">
                Un programa gratuito de 12 talleres para estudiantes de escuelas
                públicas de Panamá. Aprende electrónica, programación y a
                construir tus propios circuitos desde cero.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/talleres"
                  className="inline-flex items-center bg-accent text-ink px-7 py-3.5 text-base font-semibold hover:bg-accent-bright glow-gold transition"
                >
                  Comenzar talleres →
                </Link>
                <Link
                  href="/sobre-el-programa"
                  className="inline-flex items-center px-7 py-3.5 text-base text-muted-2 hover:text-surface transition"
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
      </section>

      {/* SOBRE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Tecnología en cada escuela de Panamá.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-lg text-muted leading-relaxed">
              <p>
                Bienvenidos al programa{" "}
                <span className="text-ink font-medium">Principios de Arduino</span>,
                una iniciativa de{" "}
                <span className="text-ink font-medium">Daniel Abadi</span> creada
                en el marco del Cuerpo de Solidaridad Informática (CSI) de
                MEDUCA.
              </p>
              <p>
                Diseñado e impartido para introducir a estudiantes de todo el
                país en el mundo de la tecnología, la electrónica y la
                programación.
              </p>
              <p>
                A lo largo de{" "}
                <span className="text-ink font-medium">12 talleres</span>{" "}
                aprenderás desde los conceptos más básicos hasta la creación de
                tus propios proyectos con Arduino.
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
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Esto vas a escribir.
              </h2>
              <p className="mt-6 text-muted leading-relaxed">
                <span className="font-mono text-ink">Blink</span> es el programa
                que hace parpadear un LED cada segundo. Es lo primero que vas
                a escribir — y lo entenderás línea por línea.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                {[
                  ["setup()", "Se ejecuta una sola vez al encender."],
                  ["loop()", "Se repite indefinidamente."],
                  ["digitalWrite()", "Enciende o apaga un pin."],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-4">
                    <span className="font-mono text-accent-dark w-32 flex-shrink-0">
                      {k}
                    </span>
                    <span className="text-muted">{v}</span>
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
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Cuatro habilidades de un ingeniero.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
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
              <div key={t}>
                <Icon className="h-8 w-8 text-accent-dark" />
                <h3 className="mt-6 text-lg font-medium">{t}</h3>
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
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Tres pasos para empezar.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                n: "01",
                t: "Accede a la sección de talleres",
                d: "Entra a la sección de talleres y comienza con el Taller 1. No necesitas experiencia previa.",
              },
              {
                n: "02",
                t: "Sigue el orden de los contenidos",
                d: "Cada taller construye sobre el anterior con teoría y ejercicios prácticos.",
              },
              {
                n: "03",
                t: "Completa cada quiz",
                d: "Al final de cada taller, valida lo aprendido con la evaluación.",
              },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-mono text-2xl text-accent-dark">{s.n}</div>
                <h3 className="mt-5 text-lg font-medium">{s.t}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="text-sm text-muted mb-3">El instructor</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Daniel Abadi
            </h2>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Creador del programa Principios de Arduino y miembro del Cuerpo
              de Solidaridad Informática del MEDUCA. Diseñó este currículo para
              que cualquier estudiante panameño pueda construir sus propios
              proyectos con Arduino.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Para consultas sobre el programa, talleres o quizzes, contáctalo
              directamente.
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
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-ink px-5 py-3 text-sm hover:bg-ink hover:text-surface transition"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366] transition-transform group-hover:scale-110" />
                <span>+507 6864-1929</span>
              </a>
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
            className="mt-10 inline-flex items-center bg-accent text-ink px-8 py-4 text-base font-semibold hover:bg-accent-bright glow-gold transition"
          >
            Comenzar Taller 1 →
          </Link>
        </div>
      </section>
    </>
  );
}
