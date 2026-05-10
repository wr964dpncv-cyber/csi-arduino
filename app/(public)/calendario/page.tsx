import Link from "next/link";
import { getCalendarEvents } from "@/lib/data";

export const metadata = {
  title: "Calendario — Principios de Arduino",
  description:
    "Fechas oficiales de publicación de cada taller del programa Principios de Arduino. Todos se habilitan a las 6:00 PM.",
};

export const revalidate = 60;

const SPANISH_MONTHS: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

function parseEventDate(text: string): Date | null {
  const m = text.toLowerCase().match(/(\d+)\s*de\s*([a-záéíóúñ]+)/);
  if (!m) return null;
  const day = parseInt(m[1]);
  const month = SPANISH_MONTHS[m[2]];
  if (month === undefined) return null;
  const now = new Date();
  let year = now.getFullYear();
  let date = new Date(year, month, day);
  // If the date is more than 6 months in the past, assume next year
  const monthsAgo = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (monthsAgo > 6) {
    year += 1;
    date = new Date(year, month, day);
  }
  return date;
}

type Status = "past" | "today" | "next" | "future";

export default async function CalendarioPage() {
  const events = await getCalendarEvents();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  type Enriched = {
    n: number;
    day: string;
    date: string;
    time: string;
    dateObj: Date | null;
    status: Status;
  };

  const enriched: Enriched[] = events.map((e) => {
    const dateObj = parseEventDate(e.date_text);
    let status: Status = "future";
    if (dateObj) {
      const eventDay = new Date(dateObj);
      eventDay.setHours(0, 0, 0, 0);
      if (eventDay < today) status = "past";
      else if (eventDay.getTime() === today.getTime()) status = "today";
    }
    return {
      n: e.taller_n,
      day: e.day,
      date: e.date_text,
      time: e.time,
      dateObj,
      status,
    };
  });

  // Mark the next future as "next" (the soonest upcoming after today)
  const nextIdx = enriched.findIndex((e) => e.status === "future");
  if (nextIdx !== -1) enriched[nextIdx].status = "next";

  const disponibles = enriched.filter(
    (e) => e.status === "past" || e.status === "today"
  ).length;
  const total = enriched.length;
  const next = enriched.find((e) => e.status === "next");

  return (
    <>
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-traces opacity-100 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
            cohorte activa
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            Calendario de talleres.
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            Fechas oficiales de publicación de cada taller. Todos los talleres
            se habilitan a las{" "}
            <span className="font-mono text-surface">6:00 PM</span> en las
            fechas indicadas, en{" "}
            <span className="text-surface">Teams</span> y en el sitio web.
          </p>

          {/* Status summary */}
          <div className="mt-10 grid sm:grid-cols-2 gap-8 max-w-2xl pt-8 border-t border-white/10">
            <div>
              <div className="text-xs font-mono text-muted-2 mb-1.5">
                Disponibles
              </div>
              <div className="font-display text-2xl">
                <span className="text-accent">{disponibles}</span>
                <span className="text-muted-2"> / {total}</span>
                <span className="ml-2 text-sm text-muted-2 font-sans">
                  talleres publicados
                </span>
              </div>
            </div>
            {next && (
              <div>
                <div className="text-xs font-mono text-accent mb-1.5">
                  Próximo
                </div>
                <div className="font-display text-2xl">
                  Taller {next.n}
                  <span className="ml-2 text-sm text-muted-2 font-sans">
                    {next.day} {next.date}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl mb-10">
            <div className="text-sm text-muted mb-3">Cronograma completo</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              Talleres 4–{enriched[enriched.length - 1]?.n ?? 12}.
            </h2>
            <p className="mt-3 text-sm text-muted">
              Talleres 0–3 ya están disponibles desde antes.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {enriched.map((s) => {
              const isPast = s.status === "past";
              const isNext = s.status === "next";
              const isToday = s.status === "today";

              return (
                <div
                  key={s.n}
                  className={`grid md:grid-cols-12 gap-4 py-5 items-baseline transition ${
                    isPast ? "opacity-50 hover:opacity-100" : ""
                  } ${isNext ? "bg-accent-soft -mx-6 px-6" : ""}`}
                >
                  <div className="md:col-span-1">
                    <div
                      className={`font-mono text-2xl ${
                        isPast ? "text-muted" : "text-accent-dark"
                      }`}
                    >
                      {String(s.n).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="md:col-span-4 font-display text-lg">
                    Taller {s.n}
                  </div>
                  <div className="md:col-span-3 text-muted">
                    <span className="font-mono text-accent-dark mr-3">{s.day}</span>
                    {s.date}
                  </div>
                  <div className="md:col-span-2">
                    {isPast && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-700">
                        <span>✓</span>
                        <span>Disponible</span>
                      </span>
                    )}
                    {isToday && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent-dark">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
                        <span>Hoy · En vivo</span>
                      </span>
                    )}
                    {isNext && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent-dark">
                        <span>▸</span>
                        <span>Próximo</span>
                      </span>
                    )}
                  </div>
                  <div className="md:col-span-2 md:text-right font-mono text-sm">
                    {s.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recomendaciones */}
      <section className="bg-surface-2 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-2xl mb-12">
            <div className="text-sm text-muted mb-3">Recomendaciones</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              Para sacarle el máximo provecho.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                n: "01",
                t: "Sigue las fechas",
                d: "Revisa cada taller en la fecha correspondiente para no quedar atrás del grupo.",
              },
              {
                n: "02",
                t: "Completa antes del siguiente",
                d: "Termina el material y el quiz de cada taller antes de pasar al siguiente.",
              },
              {
                n: "03",
                t: "Mantén un ritmo constante",
                d: "El aprendizaje regular es la clave para dominar Arduino.",
              },
            ].map((r) => (
              <div key={r.n}>
                <div className="font-mono text-2xl text-accent-dark">{r.n}</div>
                <h3 className="mt-5 text-lg font-medium">{r.t}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-tight">
              ¿Dudas sobre las fechas?
            </h2>
            <p className="mt-4 text-muted-2 max-w-md">
              Daniel coordina con la cohorte por WhatsApp.
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
            <Link
              href="/talleres"
              className="border border-white/20 px-6 py-4 text-sm hover:border-surface transition flex justify-between items-center"
            >
              <span>Ver talleres</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
