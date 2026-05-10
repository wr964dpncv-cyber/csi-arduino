export const metadata = {
  title: "Calendario de Talleres — Principios de Arduino",
  description:
    "Calendario de los 12 talleres del programa Principios de Arduino.",
};

export default function CalendarioPage() {
  return (
    <>
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <span className="text-sm font-semibold text-arduino-dark uppercase tracking-wider">
            Calendario
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
            Calendario de Talleres
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            El programa es <strong>asincrónico</strong>: avanzas a tu propio ritmo.
            Aquí publicaremos las fechas de los encuentros sincrónicos, sesiones de
            preguntas y entregas del Reto Nacional.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="text-5xl">📅</div>
          <h2 className="mt-4 text-2xl font-bold">Próximamente</h2>
          <p className="mt-3 text-slate-600 max-w-md mx-auto">
            Estamos preparando el calendario actualizado de la próxima cohorte. Mientras
            tanto, puedes empezar a tu ritmo desde el Taller 0.
          </p>
          <a
            href="/talleres"
            className="mt-6 inline-flex items-center rounded-md bg-arduino px-5 py-3 text-sm font-semibold text-white transition hover:bg-arduino-dark"
          >
            Ver talleres →
          </a>
        </div>
      </section>
    </>
  );
}
