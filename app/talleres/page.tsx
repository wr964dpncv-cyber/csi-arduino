import Link from "next/link";
import { talleres } from "@/lib/talleres";

export const metadata = {
  title: "Talleres — Principios de Arduino",
  description: "Los 10 talleres del programa Principios de Arduino.",
};

const levelColor: Record<string, string> = {
  Inicio: "text-muted",
  Básico: "text-accent-dark",
  Intermedio: "text-amber-700",
  Avanzado: "text-rose-700",
};

const contenido = [
  "Un video explicativo",
  "Un quiz para evaluar lo aprendido",
  "Material complementario",
];

const completar = [
  "Ver el video completo",
  "Revisar el material complementario",
  "Completar el quiz correspondiente",
];

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
            Los talleres.<br />
            <span className="text-accent">Cero a ingeniero.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            Sigue los talleres en orden — cada uno construye sobre el anterior.
            Empieza por el Taller 0 aunque tengas experiencia previa.
          </p>

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

      {/* Cómo funcionan */}
      <section className="bg-surface-2 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="max-w-2xl mb-14">
            <div className="text-sm text-accent-dark mb-3 font-mono">
              01 · Estructura
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              ¿Cómo funcionan los talleres?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-surface p-8 md:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2 mb-6">
                Contenido del taller
              </div>
              <h3 className="font-display text-xl mb-6">
                En cada taller encontrarás:
              </h3>
              <ul className="space-y-4">
                {contenido.map((item, i) => (
                  <li key={item} className="flex gap-5 items-baseline">
                    <span className="font-mono text-sm text-accent w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface p-8 md:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2 mb-6">
                Cómo completarlo
              </div>
              <h3 className="font-display text-xl mb-6">
                Para completar cada taller, debes:
              </h3>
              <ul className="space-y-4">
                {completar.map((item, i) => (
                  <li key={item} className="flex gap-5 items-baseline">
                    <span className="font-mono text-sm text-accent w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-ink text-surface border-l-2 border-accent p-6 md:p-7">
            <div className="grid md:grid-cols-12 gap-4 md:gap-6 items-start">
              <div className="md:col-span-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                ! Nota importante
              </div>
              <p className="md:col-span-10 text-muted-2 leading-relaxed">
                Si tienes dificultades para acceder al formulario con tu correo
                institucional, contacta directamente a{" "}
                <strong className="text-surface">Daniel</strong> por WhatsApp o
                correo electrónico para coordinar tu envío.
              </p>
            </div>
          </div>

          <p className="mt-12 text-center font-display text-xl text-ink">
            Selecciona un taller para comenzar ↓
          </p>
        </div>
      </section>

      {/* Lista */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl mb-12">
            <div className="text-sm text-accent-dark mb-3 font-mono">
              02 · Módulos
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Currículo completo.
            </h2>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {talleres.map((t) => (
              <Link
                key={t.n}
                href={`/talleres/${t.slug}`}
                className="block group hover:bg-surface-2 transition"
              >
                <div className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 items-start px-2 md:px-4 -mx-2 md:-mx-4">
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
                    <p className="mt-2 text-muted leading-relaxed">{t.tagline}</p>
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
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${levelColor[t.level]}`}>
                        {t.level}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-accent-dark">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
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
