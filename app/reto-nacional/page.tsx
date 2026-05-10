import Link from "next/link";

export const metadata = {
  title: "Reto Nacional — Principios de Arduino",
  description:
    "Al finalizar el programa, los estudiantes destacados son seleccionados para participar en el Reto Nacional CSI.",
};

export default function RetoNacionalPage() {
  return (
    <>
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="text-xs font-mono text-muted-2 mb-4">
            Reto Nacional CSI
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            El proyecto final del programa.
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            Al finalizar el programa, se seleccionará a los estudiantes que
            hayan demostrado un desempeño sobresaliente durante los talleres
            para participar en el{" "}
            <span className="text-surface font-medium">Reto Nacional CSI</span>.
          </p>
        </div>
      </section>

      {/* En qué consiste */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="text-sm text-muted mb-3">En qué consiste</div>
              <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
                Aplica todo lo aprendido en un proyecto real.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-lg text-muted leading-relaxed">
              <p>
                El reto consistirá en el desarrollo de un proyecto utilizando
                los conocimientos adquiridos a lo largo del curso, permitiendo
                a los participantes aplicar de forma práctica lo aprendido.
              </p>
              <p>
                Los proyectos serán evaluados para determinar los ganadores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oportunidades */}
      <section className="bg-surface-2 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-2xl mb-12">
            <div className="text-sm text-muted mb-3">Oportunidades</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              Lo que los seleccionados podrán hacer.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                n: "01",
                t: "Aplicar conocimientos",
                d: "Llevar todo lo aprendido en los talleres a un proyecto real con impacto.",
              },
              {
                n: "02",
                t: "Demostrar creatividad",
                d: "Diseñar soluciones originales que resuelvan problemas concretos.",
              },
              {
                n: "03",
                t: "Experiencia nacional",
                d: "Participar junto a estudiantes de toda la república en una competencia única.",
              },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-mono text-2xl text-accent">{s.n}</div>
                <h3 className="mt-5 text-lg font-medium">{s.t}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Próximos detalles */}
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
              por anunciar
            </div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-tight">
              Detalles próximos.
            </h2>
            <p className="mt-4 text-muted-2 leading-relaxed max-w-md">
              Las fechas, criterios de selección y requisitos serán comunicados
              próximamente. Para estar al tanto, contacta directamente a
              Daniel.
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
            <a
              href="mailto:daniel10abadi@gmail.com"
              className="border border-white/20 px-6 py-4 text-sm hover:border-surface transition flex justify-between items-center"
            >
              <span>daniel10abadi@gmail.com</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
