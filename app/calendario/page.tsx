import Link from "next/link";

export const metadata = {
  title: "Calendario — Principios de Arduino",
  description: "Calendario y fechas del programa Principios de Arduino.",
};

export default function CalendarioPage() {
  return (
    <>
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="text-sm text-muted-2 mb-4">Calendario</div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            Calendario de talleres.
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            El programa es asincrónico: avanzas a tu propio ritmo. Aquí publicamos las
            fechas de los encuentros sincrónicos y entregas del Reto Nacional.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-accent-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
            En preparación
          </div>
          <h2 className="mt-6 font-display text-3xl md:text-4xl tracking-tight">
            Próxima cohorte en planificación
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Estamos preparando el calendario actualizado. Mientras tanto, puedes
            empezar el programa por tu cuenta desde el Taller 0.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/talleres"
              className="bg-ink text-surface px-7 py-3.5 text-sm hover:bg-accent transition"
            >
              Ir a los talleres
            </Link>
            <a
              href="https://wa.me/50768641929"
              className="border border-ink px-7 py-3.5 text-sm hover:bg-ink hover:text-surface transition"
            >
              Notifícame por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
