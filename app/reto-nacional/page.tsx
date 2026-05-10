import Link from "next/link";

export const metadata = {
  title: "Reto Nacional — Principios de Arduino",
  description:
    "Concurso nacional donde estudiantes panameños aplican Arduino para resolver problemas reales.",
};

export default function RetoNacionalPage() {
  return (
    <>
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="text-sm text-muted-2 mb-4">Reto Nacional</div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            Construye una solución para Panamá.
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            Después de completar los talleres, los estudiantes participan en el Reto
            Nacional: un concurso donde aplican lo aprendido para resolver un problema
            real de su comunidad usando Arduino.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl mb-16">
            <div className="text-sm text-accent-dark mb-3">Cómo participar</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Tres pasos.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                n: "1",
                t: "Identifica un problema",
                d: "Mira a tu alrededor: tu escuela, tu comunidad. ¿Qué se puede mejorar con tecnología?",
              },
              {
                n: "2",
                t: "Diseña con Arduino",
                d: "Aplica los conceptos de los talleres para construir un prototipo que funcione.",
              },
              {
                n: "3",
                t: "Presenta tu proyecto",
                d: "Comparte tu solución con el país y compite con escuelas de toda la república.",
              },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-display text-5xl text-accent">{s.n}</div>
                <h3 className="mt-6 font-display text-xl">{s.t}</h3>
                <p className="mt-2 text-muted leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 text-sm text-accent-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
              En planificación
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-tight leading-tight">
              Bases y fechas próximamente.
            </h2>
            <p className="mt-4 text-muted max-w-md">
              Para estar al tanto, contacta directamente a Daniel.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href="mailto:daniel10abadi@gmail.com"
              className="bg-ink text-surface px-6 py-4 text-sm hover:bg-accent transition flex justify-between items-center"
            >
              <span>daniel10abadi@gmail.com</span>
              <span>→</span>
            </a>
            <a
              href="https://wa.me/50768641929"
              className="border border-ink px-6 py-4 text-sm hover:bg-ink hover:text-surface transition flex justify-between items-center"
            >
              <span>WhatsApp +507 6864-1929</span>
              <span>→</span>
            </a>
            <Link
              href="/talleres"
              className="text-muted hover:text-ink transition px-6 py-4 text-sm flex justify-between items-center"
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
