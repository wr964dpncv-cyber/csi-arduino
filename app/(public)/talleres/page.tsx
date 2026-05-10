import Link from "next/link";
import { getAllTalleres } from "@/lib/data";

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

export const revalidate = 60;

export default async function TalleresPage() {
  const talleres = await getAllTalleres();

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-traces opacity-100 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="text-xs font-mono text-muted-2 mb-4">
            10 módulos · de cero a ingeniero
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            Los talleres.
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            Sigue los talleres en orden — cada uno construye sobre el anterior.
            Empieza por el Taller 0 aunque tengas experiencia previa.
          </p>
        </div>
      </section>

      {/* Cómo funcionan */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-2xl mb-12">
            <div className="text-sm text-muted mb-3">Estructura</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              ¿Cómo funcionan los talleres?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="text-sm text-muted mb-4">En cada taller encontrarás</div>
              <ul className="space-y-3">
                {[
                  "Un video explicativo",
                  "Un quiz para evaluar lo aprendido",
                  "Material complementario",
                ].map((item, i) => (
                  <li key={item} className="flex gap-4 items-baseline">
                    <span className="font-mono text-sm text-accent-dark w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm text-muted mb-4">Para completar cada taller</div>
              <ul className="space-y-3">
                {[
                  "Ver el video completo",
                  "Revisar el material complementario",
                  "Completar el quiz correspondiente",
                ].map((item, i) => (
                  <li key={item} className="flex gap-4 items-baseline">
                    <span className="font-mono text-sm text-accent-dark w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 text-sm text-muted leading-relaxed max-w-2xl">
            <span className="text-ink font-medium">Nota:</span> si tienes
            dificultades para acceder al formulario con tu correo institucional,
            contacta a Daniel por WhatsApp o correo.
          </p>
        </div>
      </section>

      {/* Lista */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl mb-12">
            <div className="text-sm text-muted mb-3">Currículo</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              10 talleres.
            </h2>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {talleres.map((t) => (
              <Link
                key={t.n}
                href={`/talleres/${t.slug}`}
                className="block group hover:bg-surface-2 transition"
              >
                <div className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 items-baseline px-2 md:px-4 -mx-2 md:-mx-4">
                  <div className="md:col-span-1 font-mono text-2xl text-accent-dark">
                    {String(t.n).padStart(2, "0")}
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="font-display text-xl md:text-2xl tracking-tight">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-muted leading-relaxed">{t.tagline}</p>
                  </div>
                  <div className="md:col-span-2 text-sm text-muted">{t.topic}</div>
                  <div className="md:col-span-2 flex items-center justify-between">
                    <span className={`text-sm ${levelColor[t.level]}`}>
                      {t.level}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition text-accent-dark">
                      →
                    </span>
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
              Daniel responde directamente por correo o WhatsApp.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href="https://wa.me/50768641929"
              className="bg-accent text-ink px-6 py-4 text-sm font-semibold hover:bg-accent-bright glow-gold transition flex justify-between items-center"
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
