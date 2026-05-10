import Link from "next/link";

export const metadata = {
  title: "Reto Nacional — Principios de Arduino",
  description:
    "Concurso nacional donde estudiantes panameños aplican Arduino para resolver problemas reales.",
};

export default function RetoNacionalPage() {
  return (
    <>
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-grid-dark opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="flex items-center gap-3 tech-label text-accent-bright">
            <span className="inline-block h-px w-8 bg-accent-bright" />
            §04 · Misión final del programa
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl tracking-tight leading-[0.95]">
            Reto Nacional<br />
            <span className="text-accent-bright">de Arduino</span>
          </h1>
          <p className="mt-8 text-muted-2 max-w-2xl leading-relaxed">
            Después de completar los 12 módulos, los estudiantes participan en el
            Reto Nacional: un concurso donde aplican lo aprendido para resolver un
            problema real de su comunidad usando Arduino.
          </p>
        </div>
      </section>

      <section className="relative">
        <div className="absolute inset-0 bp-grid opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="grid lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-5">
              <div className="tech-label text-accent-dark">§04.01 · Mecánica</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Tres fases.<br />Una solución.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 self-end">
              <p className="text-muted leading-relaxed">
                El Reto Nacional convierte el conocimiento técnico en impacto real.
                Los estudiantes identifican un problema, diseñan una solución con
                Arduino y la presentan ante un panel.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {[
              {
                n: "01",
                k: "INPUT",
                t: "Identifica",
                d: "Mira a tu alrededor. Tu escuela, tu comunidad, tu hogar. ¿Qué problema cotidiano puede resolverse con tecnología accesible?",
              },
              {
                n: "02",
                k: "DESIGN",
                t: "Diseña con Arduino",
                d: "Aplica los conceptos de los 12 módulos para construir un prototipo funcional que aborde el problema identificado.",
              },
              {
                n: "03",
                k: "OUTPUT",
                t: "Presenta",
                d: "Comparte tu solución con el país. Compite con escuelas de toda la república y demuestra el impacto de tu proyecto.",
              },
            ].map((s) => (
              <div key={s.n} className="bg-surface-2 p-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-5xl text-accent-dark leading-none">
                    {s.n}
                  </span>
                  <span className="tech-label text-muted">{s.k}</span>
                </div>
                <div className="mt-8 font-display text-2xl tracking-tight">{s.t}</div>
                <p className="mt-3 text-sm text-muted leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-surface relative">
        <div className="absolute inset-0 bp-grid-dark opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 tech-label text-accent-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-bright pulse-dot" />
              EN PLANIFICACIÓN
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-tight leading-tight">
              Bases y fechas<br />próximamente.
            </h2>
            <p className="mt-4 text-muted-2 max-w-md leading-relaxed">
              Las bases oficiales, fechas, criterios de evaluación y premios del
              Reto Nacional se publicarán pronto. Para estar al tanto, contacta
              directamente a Daniel.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href="mailto:daniel10abadi@gmail.com"
              className="border border-white/15 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] hover:bg-accent-bright hover:text-ink hover:border-accent-bright transition flex justify-between items-center"
            >
              <span>daniel10abadi@gmail.com</span>
              <span>→</span>
            </a>
            <a
              href="https://wa.me/50768641929"
              className="border border-white/15 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] hover:bg-accent-bright hover:text-ink hover:border-accent-bright transition flex justify-between items-center"
            >
              <span>+507 6864-1929</span>
              <span>→</span>
            </a>
            <Link
              href="/talleres"
              className="px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-2 hover:text-surface transition flex justify-between items-center"
            >
              <span>Comenzar los módulos</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
