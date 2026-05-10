import Link from "next/link";

export const metadata = {
  title: "Calendario — Principios de Arduino",
  description: "Calendario y fechas del programa Principios de Arduino.",
};

export default function CalendarioPage() {
  return (
    <>
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-grid-dark opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="flex items-center gap-3 tech-label text-accent-bright">
            <span className="inline-block h-px w-8 bg-accent-bright" />
            §03 · Cronograma operativo
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
            Calendario<br />
            <span className="text-accent-bright">de talleres</span>
          </h1>
          <p className="mt-8 text-muted-2 max-w-2xl leading-relaxed">
            El programa es <strong className="text-surface">asincrónico</strong>:
            los estudiantes avanzan a su propio ritmo. En esta sección publicamos
            las fechas de los encuentros sincrónicos, sesiones de preguntas y
            entregas del Reto Nacional.
          </p>
        </div>
      </section>

      <section className="relative">
        <div className="absolute inset-0 bp-grid opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="border border-ink/15 bg-surface-2 p-12 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 tech-label text-accent-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
              EN PREPARACIÓN
            </div>
            <h2 className="mt-6 font-display text-4xl md:text-5xl tracking-tight">
              Próxima cohorte<br />en planificación
            </h2>
            <p className="mt-6 text-muted max-w-lg mx-auto leading-relaxed">
              Estamos calibrando el cronograma de la próxima cohorte. Mientras tanto,
              puedes empezar el programa por tu cuenta desde el Módulo 00.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/talleres"
                className="bg-ink text-surface px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-surface transition"
              >
                Ir a los módulos →
              </Link>
              <a
                href="https://wa.me/50768641929"
                className="border border-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-surface transition"
              >
                Notifícame
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
