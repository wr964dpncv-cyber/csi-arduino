export const metadata = {
  title: "Reto Nacional — Principios de Arduino",
  description:
    "El Reto Nacional invita a estudiantes panameños a aplicar lo aprendido en un proyecto con impacto real.",
};

export default function RetoNacionalPage() {
  return (
    <>
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <span className="text-sm font-semibold text-arduino-dark uppercase tracking-wider">
            Reto Nacional
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
            Construye una solución para Panamá
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Después de completar los 12 talleres, los estudiantes podrán participar en
            el <strong>Reto Nacional</strong>: un concurso donde aplican lo aprendido
            para resolver un problema real de su comunidad usando Arduino.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              t: "Identifica un problema",
              d: "Mira a tu alrededor: tu escuela, tu comunidad. ¿Qué se puede mejorar con tecnología?",
              i: "🔍",
            },
            {
              t: "Diseña con Arduino",
              d: "Aplica los conceptos de los talleres para construir un prototipo funcional.",
              i: "🔧",
            },
            {
              t: "Presenta tu proyecto",
              d: "Comparte tu solución con el país y compite con escuelas de toda la república.",
              i: "🏆",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="text-3xl">{c.i}</div>
              <div className="mt-4 font-semibold text-ink">{c.t}</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <div className="text-4xl">🚧</div>
          <h2 className="mt-4 text-xl font-bold">Más detalles próximamente</h2>
          <p className="mt-3 text-slate-600 max-w-md mx-auto">
            Las bases, fechas y premios del Reto Nacional se publicarán pronto. Para
            estar al tanto, contacta directamente a Daniel.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:daniel10abadi@gmail.com"
              className="rounded-md bg-arduino px-5 py-3 text-sm font-semibold text-white transition hover:bg-arduino-dark"
            >
              daniel10abadi@gmail.com
            </a>
            <a
              href="https://wa.me/50768641929"
              className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-arduino"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
