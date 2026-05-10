import Link from "next/link";

export const metadata = {
  title: "Talleres — Principios de Arduino",
  description: "Los 10 talleres del programa Principios de Arduino.",
};

const talleres = [
  {
    n: 0,
    title: "Introducción a Arduino",
    desc: "Qué es Arduino, la placa y el entorno de desarrollo. Tu primer programa.",
    level: "Inicio",
    topic: "Setup",
  },
  {
    n: 1,
    title: "Tu primer circuito",
    desc: "LEDs, voltaje, corriente y resistencias. El primer paso de todo arduinero.",
    level: "Básico",
    topic: "Hardware",
  },
  {
    n: 2,
    title: "Variables y datos",
    desc: "Tipos de datos, variables y operadores. La lógica que da vida a tu programa.",
    level: "Básico",
    topic: "Software",
  },
  {
    n: 3,
    title: "Estructuras de control",
    desc: "If, else, while y for. Cómo tomar decisiones y repetir acciones.",
    level: "Básico",
    topic: "Software",
  },
  {
    n: 4,
    title: "Entradas digitales",
    desc: "Botones e interruptores. Cómo leer el mundo exterior con tu Arduino.",
    level: "Intermedio",
    topic: "I/O",
  },
  {
    n: 5,
    title: "Salidas analógicas (PWM)",
    desc: "Controla brillo, velocidad y tono con modulación por ancho de pulso.",
    level: "Intermedio",
    topic: "I/O",
  },
  {
    n: 6,
    title: "Sensores",
    desc: "Mide luz, temperatura, distancia y movimiento del entorno.",
    level: "Intermedio",
    topic: "Hardware",
  },
  {
    n: 7,
    title: "Funciones",
    desc: "Organiza tu código en funciones reutilizables y modulares.",
    level: "Intermedio",
    topic: "Software",
  },
  {
    n: 8,
    title: "Comunicación serial",
    desc: "Habla con tu Arduino desde la computadora y depura tus proyectos.",
    level: "Avanzado",
    topic: "Comms",
  },
  {
    n: 9,
    title: "Proyecto final",
    desc: "Integra todo lo aprendido en un proyecto propio con aplicación real.",
    level: "Avanzado",
    topic: "Proyecto",
  },
];

const levelColor: Record<string, string> = {
  Inicio: "text-muted",
  Básico: "text-accent-dark",
  Intermedio: "text-amber-700",
  Avanzado: "text-rose-700",
};

export default function TalleresPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-muted-2 mb-4">
            Currículo · 10 Módulos
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            10 talleres. Cero a ingeniero.
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            Sigue los talleres en orden — cada uno construye sobre el anterior.
            Empieza por el Taller 0 aunque tengas experiencia previa.
          </p>

          {/* Legend */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono">
            {[
              ["bg-muted/70", "Inicio"],
              ["bg-accent", "Básico"],
              ["bg-amber-500", "Intermedio"],
              ["bg-rose-500", "Avanzado"],
            ].map(([c, l]) => (
              <div key={l} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 ${c}`} />
                <span className="uppercase tracking-[0.16em] text-muted-2">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lista */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="divide-y divide-border border-y border-border">
            {talleres.map((t) => (
              <article
                key={t.n}
                className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 items-start hover:bg-surface-2 transition px-2 md:px-4 -mx-2 md:-mx-4 cursor-pointer"
              >
                <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-3">
                  <div className="font-mono text-4xl text-accent leading-none">
                    {String(t.n).padStart(2, "0")}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                    MOD-{String(t.n).padStart(2, "0")}
                  </div>
                </div>
                <div className="md:col-span-6">
                  <h3 className="font-display text-xl md:text-2xl tracking-tight">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-muted leading-relaxed">{t.desc}</p>
                </div>
                <div className="md:col-span-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2 mb-1">
                    Tipo
                  </div>
                  <span className="text-sm">{t.topic}</span>
                </div>
                <div className="md:col-span-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2 mb-1">
                    Nivel
                  </div>
                  <span className={`text-sm ${levelColor[t.level]}`}>{t.level}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Soporte */}
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-tight">
              ¿Atascado en un taller?
            </h2>
            <p className="mt-4 text-muted-2 max-w-md">
              Daniel te responde directamente por correo o WhatsApp.
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
