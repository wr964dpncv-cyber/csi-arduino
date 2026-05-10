import Link from "next/link";

export const metadata = {
  title: "Talleres — Principios de Arduino",
  description: "Los 12 talleres del programa Principios de Arduino.",
};

const talleres = [
  {
    n: 0,
    title: "Introducción a Arduino",
    desc: "Qué es Arduino, la placa y el entorno de desarrollo. Tu primer programa.",
    level: "Inicio",
  },
  {
    n: 1,
    title: "Tu primer circuito",
    desc: "LEDs, voltaje, corriente y resistencias. El primer paso de todo arduinero.",
    level: "Básico",
  },
  {
    n: 2,
    title: "Variables y datos",
    desc: "Tipos de datos, variables y operadores. La lógica que da vida a tu programa.",
    level: "Básico",
  },
  {
    n: 3,
    title: "Estructuras de control",
    desc: "If, else, while y for. Cómo tomar decisiones y repetir acciones.",
    level: "Básico",
  },
  {
    n: 4,
    title: "Entradas digitales",
    desc: "Botones e interruptores. Cómo leer el mundo exterior con tu Arduino.",
    level: "Intermedio",
  },
  {
    n: 5,
    title: "Salidas analógicas (PWM)",
    desc: "Controla brillo, velocidad y tono con modulación por ancho de pulso.",
    level: "Intermedio",
  },
  {
    n: 6,
    title: "Sensores",
    desc: "Mide luz, temperatura, distancia y movimiento del entorno.",
    level: "Intermedio",
  },
  {
    n: 7,
    title: "Funciones",
    desc: "Organiza tu código en funciones reutilizables y modulares.",
    level: "Intermedio",
  },
  {
    n: 8,
    title: "Comunicación serial",
    desc: "Habla con tu Arduino desde la computadora y depura tus proyectos.",
    level: "Avanzado",
  },
  {
    n: 9,
    title: "Proyecto final",
    desc: "Integra todo lo aprendido en un proyecto propio con aplicación real.",
    level: "Avanzado",
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
          <div className="text-sm text-muted-2 mb-4">Currículo</div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            10 talleres. Cero a ingeniero.
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            Sigue los talleres en orden — cada uno construye sobre el anterior.
            Empieza por el Taller 0 aunque tengas experiencia previa.
          </p>
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
                <div className="md:col-span-1 font-display text-3xl text-accent">
                  {String(t.n).padStart(2, "0")}
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-display text-xl md:text-2xl tracking-tight">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-muted leading-relaxed">{t.desc}</p>
                </div>
                <div className="md:col-span-2">
                  <span className={`text-sm ${levelColor[t.level]}`}>{t.level}</span>
                </div>
                <div className="md:col-span-2 md:text-right text-sm text-muted-2">
                  Próximamente →
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
