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
        </div>
      </section>

      {/* Schedule */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl mb-10">
            <div className="text-sm text-muted mb-3">Próximas fechas</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              Talleres 4–12.
            </h2>
            <p className="mt-3 text-sm text-muted">
              Talleres 0–3 ya están disponibles.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {schedule.map((s) => (
              <div
                key={s.n}
                className="grid md:grid-cols-12 gap-4 py-5 items-baseline"
              >
                <div className="md:col-span-1 font-mono text-2xl text-accent-dark">
                  {String(s.n).padStart(2, "0")}
                </div>
                <div className="md:col-span-5 font-display text-lg">
                  Taller {s.n}
                </div>
                <div className="md:col-span-4 text-muted">
                  <span className="font-mono text-accent-dark mr-3">{s.day}</span>
                  {s.date}
                </div>
                <div className="md:col-span-2 md:text-right font-mono text-sm">
                  18:00
                </div>
              </div>
            ))}
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
