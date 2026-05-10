import Link from "next/link";

export const metadata = {
  title: "Talleres — Principios de Arduino",
  description:
    "Los 12 talleres del programa Principios de Arduino. Empieza desde cero y aprende a tu propio ritmo.",
};

const talleres = [
  {
    n: 0,
    title: "Introducción a Arduino",
    desc: "¿Qué es Arduino? Familiarízate con la plataforma, la placa y el entorno de desarrollo.",
    level: "Inicio",
  },
  {
    n: 1,
    title: "Tu primer circuito",
    desc: "Enciende un LED, entiende voltaje, corriente y resistencias. El primer paso de todo arduinero.",
    level: "Básico",
  },
  {
    n: 2,
    title: "Variables y estructuras",
    desc: "Tipos de datos, variables, operadores y la lógica que da vida a tu programa.",
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
    desc: "Botones, switches y cómo leer el mundo exterior con tu Arduino.",
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
    desc: "Mide luz, temperatura, distancia y más con sensores comunes.",
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

const levelStyles: Record<string, string> = {
  Inicio: "bg-slate-100 text-slate-700",
  Básico: "bg-arduino/10 text-arduino-dark",
  Intermedio: "bg-amber-100 text-amber-800",
  Avanzado: "bg-rose-100 text-rose-800",
};

export default function TalleresPage() {
  return (
    <>
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <span className="text-sm font-semibold text-arduino-dark uppercase tracking-wider">
            Currículo
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
            Los 12 Talleres
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
            Sigue los talleres en orden — cada uno construye sobre el anterior. Empieza
            con el <strong>Taller 0</strong> y avanza a tu propio ritmo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {talleres.map((t) => (
            <div
              key={t.n}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-arduino hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-arduino/10 text-arduino-dark font-bold text-lg">
                  {String(t.n).padStart(2, "0")}
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${levelStyles[t.level]}`}
                >
                  {t.level}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                Taller {t.n}: {t.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t.desc}</p>
              <div className="mt-5 inline-flex items-center text-sm font-semibold text-arduino-dark group-hover:gap-2 transition-all">
                Próximamente
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-circuit text-white p-10 text-center">
          <h2 className="text-2xl font-bold">¿Necesitas ayuda con un taller?</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            Daniel está disponible por correo o WhatsApp para resolver dudas y guiarte
            en cualquier punto del programa.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/50768641929"
              className="rounded-md bg-arduino px-5 py-3 text-sm font-semibold transition hover:bg-arduino-light hover:text-ink"
            >
              Contactar a Daniel
            </a>
            <Link
              href="/sobre-el-programa"
              className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Sobre el programa
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
