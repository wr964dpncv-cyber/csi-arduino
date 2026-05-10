import Link from "next/link";

export const metadata = {
  title: "Módulos — Principios de Arduino",
  description:
    "Los 12 módulos del programa Principios de Arduino. Currículo completo de electrónica y programación.",
};

const talleres = [
  {
    n: 0,
    title: "Introducción a Arduino",
    desc: "Plataforma, placa y entorno de desarrollo. Configuración del IDE y primer hola-mundo.",
    level: "Inicio",
    tags: ["IDE", "Setup"],
  },
  {
    n: 1,
    title: "Tu primer circuito",
    desc: "LEDs, voltaje, corriente y resistencias. Conceptos básicos de electrónica aplicada.",
    level: "Básico",
    tags: ["LED", "Resistencias"],
  },
  {
    n: 2,
    title: "Variables y estructuras",
    desc: "Tipos de datos, variables, operadores y la lógica que da vida a tu programa.",
    level: "Básico",
    tags: ["Datos", "Operadores"],
  },
  {
    n: 3,
    title: "Estructuras de control",
    desc: "If, else, while y for. Toma de decisiones y ciclos en Arduino.",
    level: "Básico",
    tags: ["if/else", "Loops"],
  },
  {
    n: 4,
    title: "Entradas digitales",
    desc: "Botones, switches y pull-ups. Lectura del mundo exterior con tu Arduino.",
    level: "Intermedio",
    tags: ["Digital I/O", "Pull-up"],
  },
  {
    n: 5,
    title: "Salidas analógicas (PWM)",
    desc: "Brillo, velocidad y tono mediante modulación por ancho de pulso.",
    level: "Intermedio",
    tags: ["PWM", "Analog"],
  },
  {
    n: 6,
    title: "Sensores",
    desc: "Luz, temperatura, distancia y movimiento. Adquisición de datos del entorno.",
    level: "Intermedio",
    tags: ["Sensores", "ADC"],
  },
  {
    n: 7,
    title: "Funciones",
    desc: "Modularidad, abstracción y código reutilizable. Buenas prácticas de organización.",
    level: "Intermedio",
    tags: ["Funciones", "Modularidad"],
  },
  {
    n: 8,
    title: "Comunicación serial",
    desc: "Conversación entre Arduino y computadora. Debugging y monitoreo en tiempo real.",
    level: "Avanzado",
    tags: ["Serial", "Debug"],
  },
  {
    n: 9,
    title: "Proyecto final",
    desc: "Integración de todos los conceptos en un proyecto propio con aplicación real.",
    level: "Avanzado",
    tags: ["Proyecto", "Aplicación"],
  },
];

const levelTone: Record<string, string> = {
  Inicio: "text-muted",
  Básico: "text-accent-dark",
  Intermedio: "text-warn",
  Avanzado: "text-danger",
};

export default function TalleresPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-grid-dark opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 tech-label text-accent-bright">
                <span className="inline-block h-px w-8 bg-accent-bright" />
                §02 · Currículo del programa
              </div>
              <h1 className="mt-6 font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
                12 módulos.<br />
                <span className="text-accent-bright">Cero a ingeniero.</span>
              </h1>
              <p className="mt-6 text-muted-2 max-w-xl leading-relaxed">
                Los módulos están diseñados para completarse en orden — cada uno
                construye sobre los conceptos del anterior. Comienza con el Módulo 00
                aunque tengas experiencia previa.
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="border border-white/15 bg-ink-soft/50">
                <div className="border-b border-white/10 px-5 py-3">
                  <span className="tech-label text-accent-bright">Leyenda · Niveles</span>
                </div>
                <div className="p-5 space-y-2.5 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-muted" />
                    <span className="uppercase tracking-[0.16em]">Inicio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-accent-bright" />
                    <span className="uppercase tracking-[0.16em]">Básico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-warn" />
                    <span className="uppercase tracking-[0.16em]">Intermedio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-danger" />
                    <span className="uppercase tracking-[0.16em]">Avanzado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module list */}
      <section className="relative">
        <div className="absolute inset-0 bp-grid opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="border border-ink/15 bg-surface-2 divide-y divide-ink/10">
            {talleres.map((t) => (
              <article
                key={t.n}
                className="grid md:grid-cols-12 gap-4 md:gap-6 items-start p-6 md:p-8 hover:bg-ink hover:text-surface transition group"
              >
                <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-3">
                  <div className="font-mono text-4xl md:text-5xl tracking-tight text-ink group-hover:text-accent-bright leading-none">
                    {String(t.n).padStart(2, "0")}
                  </div>
                  <div
                    className={`tech-label ${levelTone[t.level]} group-hover:opacity-80`}
                  >
                    [ {t.level} ]
                  </div>
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-muted group-hover:text-muted-2 leading-relaxed">
                    {t.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-ink/20 group-hover:border-white/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-3 md:text-right flex md:justify-end items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                    Próximamente
                  </span>
                  <span className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA contact */}
      <section className="bg-ink text-surface relative">
        <div className="absolute inset-0 bp-grid-dark opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="tech-label text-accent-bright">§ Soporte técnico</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tight leading-tight">
              ¿Atascado en un<br />módulo?
            </h2>
            <p className="mt-4 text-muted-2 max-w-md">
              Daniel responde directamente por correo o WhatsApp. Sin formularios,
              sin filas — escríbele cuando lo necesites.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href="https://wa.me/50768641929"
              className="border border-white/15 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] hover:bg-accent-bright hover:text-ink hover:border-accent-bright transition flex justify-between items-center"
            >
              <span>Contactar por WhatsApp</span>
              <span>→</span>
            </a>
            <a
              href="mailto:daniel10abadi@gmail.com"
              className="border border-white/15 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] hover:bg-accent-bright hover:text-ink hover:border-accent-bright transition flex justify-between items-center"
            >
              <span>Enviar email</span>
              <span>→</span>
            </a>
            <Link
              href="/sobre-el-programa"
              className="px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-2 hover:text-surface transition flex justify-between items-center"
            >
              <span>Ver documentación del programa</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
