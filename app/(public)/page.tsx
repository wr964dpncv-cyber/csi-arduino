import Image from "next/image";
import Link from "next/link";
import ArduinoSchematic from "@/components/ArduinoSchematic";
import CodeBlock from "@/components/CodeBlock";
import PanamaCircuit from "@/components/PanamaCircuit";
import {
  LogicIcon,
  ResistorIcon,
  CodeIcon,
  GearIcon,
} from "@/components/SkillIcons";
import ContactButtons from "@/components/ContactButtons";

export default function HomePage() {
  return (
    <>
      {/* RETO BANNER */}
      <Link
        href="/reto-nacional/inscripcion"
        className="block bg-accent text-ink hover:bg-accent-bright transition relative overflow-hidden group"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <span className="text-lg sm:text-xl shrink-0" aria-hidden>🏆</span>
            <span className="text-[13px] sm:text-base font-semibold truncate">
              Reto Nacional CSI 2026
            </span>
            <span className="hidden md:inline text-xs font-mono opacity-80">
              Próximamente
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[12px] sm:text-sm font-semibold bg-ink text-accent px-3 sm:px-4 py-1 sm:py-1.5 group-hover:bg-ink/80 transition whitespace-nowrap shrink-0">
            <span className="hidden sm:inline">Inscribir mi equipo</span>
            <span className="sm:hidden">Inscribirme</span>
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>

      {/* HERO */}
      <section className="bg-ink text-surface relative overflow-hidden">
        {/* Mapa de Panamá al fondo (watermark) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.09]">
          <PanamaCircuit className="w-[120%] max-w-none -translate-y-2" />
        </div>
        {/* PCB traces overlay */}
        <div className="absolute inset-0 bp-traces opacity-100 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-12 md:pt-28 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="text-[11px] sm:text-xs font-mono text-muted-2">
                v1.0 · Programa CSI · MEDUCA Panamá
              </div>
              <h1 className="mt-5 sm:mt-6 font-display text-[40px] sm:text-5xl md:text-7xl tracking-tight leading-[1.05] md:leading-[1.02]">
                Aprende ingeniería con{" "}
                <span className="text-accent">Arduino</span>.
              </h1>
              <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-2 max-w-xl leading-relaxed">
                Un programa gratuito de 12 talleres para estudiantes de escuelas
                públicas de Panamá. Aprende electrónica, programación y a
                construir tus propios circuitos desde cero.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-wrap gap-3">
                <Link
                  href="/talleres"
                  className="inline-flex items-center bg-accent text-ink px-6 sm:px-7 py-3.5 text-base font-semibold hover:bg-accent-bright glow-gold transition"
                >
                  Comenzar talleres →
                </Link>
                <Link
                  href="/sobre-el-programa"
                  className="inline-flex items-center border border-white/15 px-5 sm:px-7 py-3.5 text-base text-muted-2 hover:border-surface hover:text-surface transition"
                >
                  Conocer el programa
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 max-w-[280px] sm:max-w-sm mx-auto lg:max-w-none w-full -mt-2 lg:mt-0">
              <ArduinoSchematic className="w-full text-surface/85" />
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
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
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
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
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-32">
          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
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
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-32">
          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
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
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2">
                <Image
                  src="/daniel-abadi.jpg"
                  alt="Daniel Abadi · Instructor del programa Principios de Arduino"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="text-sm text-muted mb-3">El instructor</div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                Daniel Abadi
              </h2>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Creador del programa Principios de Arduino. Diseñó este
                currículo para que cualquier estudiante panameño pueda construir
                sus propios proyectos con Arduino.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Para consultas sobre el programa, talleres o quizzes,
                contáctalo directamente.
              </p>

              <div className="mt-8">
                <ContactButtons />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-24 text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight max-w-2xl mx-auto">
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
