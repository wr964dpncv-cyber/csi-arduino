import Link from "next/link";
import { getAllTalleres, getCalendarEvents } from "@/lib/data";
import { parseEventDate, getEventStatus } from "@/lib/dateHelpers";
import CircuitBackdrop from "@/components/CircuitBackdrop";
import ContactButtons from "@/components/ContactButtons";

export const metadata = {
  title: "Talleres — Principios de Arduino",
  description: "Los 12 talleres del programa Principios de Arduino.",
};

const levelColor: Record<string, string> = {
  Inicio: "text-muted",
  Básico: "text-accent-dark",
  Intermedio: "text-amber-700",
  Avanzado: "text-rose-700",
};

export const revalidate = 60;

export default async function TalleresPage() {
  const [talleres, calendar] = await Promise.all([
    getAllTalleres(),
    getCalendarEvents(),
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarByN = new Map(
    calendar.map((e) => [
      e.taller_n,
      {
        ...e,
        date: parseEventDate(e.date_text),
      },
    ])
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <CircuitBackdrop variant="flow-left" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="text-xs font-mono text-muted-2 mb-4">
            12 módulos · de cero a ingeniero
          </div>
          <h1 className="font-display text-[40px] sm:text-5xl md:text-7xl tracking-tight leading-[1.05] md:leading-[1.02] max-w-3xl">
            Los talleres.
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            Sigue los talleres en orden — cada uno construye sobre el anterior.
            Empieza por el Taller 1 aunque tengas experiencia previa.
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
              12 talleres.
            </h2>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {talleres.map((t) => {
              const cal = calendarByN.get(t.n);
              const status = getEventStatus(cal?.date ?? null, today);
              const isUnpublished = t.published === false;
              return (
                <Link
                  key={t.n}
                  href={`/talleres/${t.slug}`}
                  className={`block group hover:bg-surface-2 transition ${
                    isUnpublished ? "opacity-60 hover:opacity-100" : ""
                  }`}
                >
                  <div className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 items-baseline px-2 md:px-4 -mx-2 md:-mx-4">
                    <div className="md:col-span-1 font-mono text-2xl text-accent-dark">
                      {String(t.n).padStart(2, "0")}
                    </div>
                    <div className="md:col-span-6">
                      <h3 className="font-display text-xl md:text-2xl tracking-tight">
                        {t.title}
                      </h3>
                      <p className="mt-2 text-muted leading-relaxed">
                        {t.tagline}
                      </p>
                    </div>
                    <div className="md:col-span-2 text-sm text-muted">
                      {t.topic}
                    </div>
                    <div className="md:col-span-2">
                      {isUnpublished ? (
                        <div className="text-xs">
                          <div className="font-mono uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                            <span>○</span>
                            <span>No disponible</span>
                          </div>
                          {cal && (
                            <div className="text-muted-2 mt-0.5 font-mono">
                              {cal.day} {cal.date_text}
                            </div>
                          )}
                        </div>
                      ) : cal ? (
                        status === "past" || status === "today" ? (
                          <div className="text-xs">
                            <div className="font-mono uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                              <span>✓</span>
                              <span>Disponible</span>
                            </div>
                            <div className="text-muted-2 mt-0.5 font-mono">
                              {cal.day} {cal.date_text}
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs">
                            <div className="font-mono uppercase tracking-wider text-accent-dark flex items-center gap-1.5">
                              <span>▸</span>
                              <span>Próximo</span>
                            </div>
                            <div className="text-muted-2 mt-0.5 font-mono">
                              {cal.day} {cal.date_text}
                            </div>
                          </div>
                        )
                      ) : null}
                    </div>
                    <div className="md:col-span-1 flex items-center justify-end">
                      <span
                        className={`text-sm ${levelColor[t.level]} hidden lg:inline`}
                      >
                        {t.level}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition text-accent-dark ml-3">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
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
          <div className="md:col-span-5">
            <ContactButtons variant="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
