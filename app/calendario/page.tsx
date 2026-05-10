import Link from "next/link";

export const metadata = {
  title: "Calendario — Principios de Arduino",
  description:
    "Fechas oficiales de publicación de cada taller del programa Principios de Arduino. Todos se habilitan a las 6:00 PM.",
};

const schedule = [
  { n: 4, day: "Lun", date: "6 de abril" },
  { n: 5, day: "Lun", date: "20 de abril" },
  { n: 6, day: "Jue", date: "23 de abril" },
  { n: 7, day: "Lun", date: "27 de abril" },
  { n: 8, day: "Jue", date: "30 de abril" },
  { n: 9, day: "Lun", date: "4 de mayo" },
  { n: 10, day: "Jue", date: "7 de mayo" },
  { n: 11, day: "Lun", date: "11 de mayo" },
  { n: 12, day: "Jue", date: "14 de mayo" },
];

export default function CalendarioPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
            Cohorte activa · Calendario oficial
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            Calendario<br />
            de talleres.
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            Fechas oficiales de publicación de cada taller del programa Principios
            de Arduino. Todos los talleres se habilitan a las{" "}
            <span className="font-mono text-surface">6:00 PM</span> en las fechas
            indicadas, disponibles en <strong className="text-surface">Teams</strong>{" "}
            y en el sitio web.
          </p>
        </div>

        {/* Spec strip */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:divide-x divide-white/10 text-center">
            {[
              ["12", "Talleres totales"],
              ["18:00", "Hora de publicación"],
              ["Lun · Jue", "Días de la semana"],
              ["Teams", "Plataforma"],
            ].map(([n, l]) => (
              <div key={l} className="md:px-4">
                <div className="font-mono text-base md:text-lg">{n}</div>
                <div className="mt-0.5 text-xs text-muted-2 uppercase tracking-[0.14em]">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-5">
              <div className="text-sm text-accent-dark mb-3 font-mono">01</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Próximas fechas de publicación.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 self-end">
              <p className="text-muted leading-relaxed">
                Talleres <span className="font-mono text-ink">0</span>–
                <span className="font-mono text-ink">3</span> ya están disponibles.
                Estas son las fechas para los talleres restantes de la cohorte
                activa.
              </p>
            </div>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {schedule.map((s) => (
              <div
                key={s.n}
                className="grid md:grid-cols-12 gap-4 md:gap-6 py-6 items-center"
              >
                <div className="md:col-span-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2 mb-1">
                    MOD-{String(s.n).padStart(2, "0")}
                  </div>
                  <div className="font-mono text-3xl md:text-4xl text-accent leading-none">
                    {String(s.n).padStart(2, "0")}
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="font-display text-xl">Taller {s.n}</div>
                </div>
                <div className="md:col-span-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2 mb-1">
                    Fecha
                  </div>
                  <div className="text-base">
                    <span className="font-mono text-accent-dark mr-2">
                      {s.day}
                    </span>
                    {s.date}
                  </div>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2 mb-1">
                    Hora
                  </div>
                  <div className="font-mono text-base text-ink">18:00</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recomendaciones */}
      <section className="bg-surface-2 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-2xl mb-16">
            <div className="text-sm text-accent-dark mb-3 font-mono">02</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Para sacarle el máximo provecho.
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Es importante mantenerse al día con cada taller. Tres recomendaciones
              para que aproveches la cohorte al máximo.
            </p>
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
                d: "El aprendizaje regular es la clave para dominar Arduino. Evita acumular pendientes.",
              },
            ].map((r) => (
              <div key={r.n}>
                <div className="font-mono text-3xl text-accent">{r.n}</div>
                <h3 className="mt-6 font-display text-xl">{r.t}</h3>
                <p className="mt-2 text-muted leading-relaxed">{r.d}</p>
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
              ¿Tienes dudas sobre las fechas?
            </h2>
            <p className="mt-4 text-muted-2 max-w-md">
              Daniel coordina con la cohorte directamente por WhatsApp.
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
