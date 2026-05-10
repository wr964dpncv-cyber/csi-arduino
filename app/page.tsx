import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-surface overflow-hidden">
        <div className="absolute inset-0 bp-grid-dark opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bp-grid-dark-fine opacity-100 pointer-events-none" />

        {/* corner crosshairs */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-accent-bright/70 tracking-[0.18em] hidden md:block">
          + 00.00
        </div>
        <div className="absolute top-6 right-6 font-mono text-[10px] text-accent-bright/70 tracking-[0.18em] hidden md:block">
          PRG-2026/001 +
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[10px] text-accent-bright/70 tracking-[0.18em] hidden md:block">
          + REV 1.0
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-accent-bright/70 tracking-[0.18em] hidden md:block">
          PANAMÁ +
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 tech-label text-accent-bright">
                <span className="inline-block h-px w-8 bg-accent-bright" />
                §00 · INTRODUCCIÓN AL PROGRAMA
              </div>
              <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
                Formando la próxima
                <br />
                generación de
                <br />
                <span className="text-accent-bright">ingenieros</span>{" "}
                <span className="font-mono text-3xl md:text-5xl lg:text-6xl text-muted-2">
                  ━━━
                </span>
              </h1>
              <p className="mt-8 text-base md:text-lg text-muted-2 max-w-2xl leading-relaxed">
                Programa educativo del Cuerpo de Solidaridad Informática del MEDUCA.
                Doce módulos diseñados para que estudiantes de escuelas públicas de
                Panamá dominen los fundamentos de la electrónica, la programación
                y el pensamiento computacional con Arduino.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/talleres"
                  className="group inline-flex items-center gap-3 bg-accent-bright text-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] font-semibold transition hover:bg-surface"
                >
                  Iniciar programa
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href="/sobre-el-programa"
                  className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-surface transition hover:border-accent-bright hover:text-accent-bright"
                >
                  Documentación
                </Link>
              </div>
            </div>

            {/* spec panel */}
            <div className="lg:col-span-4">
              <div className="border border-white/15 bg-ink-soft/50 backdrop-blur-sm">
                <div className="border-b border-white/10 px-5 py-3 flex items-center justify-between">
                  <span className="tech-label text-accent-bright">Especificaciones</span>
                  <span className="font-mono text-[10px] text-muted-2">PRG/001</span>
                </div>
                <dl className="divide-y divide-white/10">
                  {[
                    ["Módulos", "12"],
                    ["Modalidad", "Asincrónica"],
                    ["Duración", "Auto-ritmo"],
                    ["Costo", "Gratuito"],
                    ["Cobertura", "Nacional"],
                    ["Nivel", "Inicial → Avanzado"],
                  ].map(([k, v]) => (
                    <div
                      key={k as string}
                      className="px-5 py-3 flex items-center justify-between text-sm"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">
                        {k}
                      </dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* bottom tape */}
        <div className="border-t border-white/10 bg-ink">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-6 overflow-x-auto font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2 whitespace-nowrap">
            <span className="text-accent-bright">▸ ARDUINO</span>
            <span>·</span>
            <span>ELECTRÓNICA</span>
            <span>·</span>
            <span>PROGRAMACIÓN C/C++</span>
            <span>·</span>
            <span>SENSORES</span>
            <span>·</span>
            <span>CIRCUITOS</span>
            <span>·</span>
            <span>PWM</span>
            <span>·</span>
            <span>COMUNICACIÓN SERIAL</span>
            <span>·</span>
            <span className="text-accent-bright">▸ PANAMÁ 🇵🇦</span>
          </div>
        </div>
      </section>

      {/* COMPETENCIAS */}
      <section className="relative">
        <div className="absolute inset-0 bp-grid opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <div className="tech-label text-accent-dark">§01 · Competencias clave</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Cuatro disciplinas,<br />una mente de ingeniero.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 self-end">
              <p className="text-muted leading-relaxed">
                Cada módulo está calibrado para fortalecer competencias fundamentales del
                siglo XXI. No es un curso de tecnología — es un programa de formación
                técnica completa.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-ink/15 bg-surface-2">
            {[
              {
                n: "01",
                t: "Pensamiento lógico",
                d: "Descomposición de problemas, diseño algorítmico, identificación de patrones.",
              },
              {
                n: "02",
                t: "Resolución de problemas",
                d: "Iteración, debugging y enfoque sistemático ante fallas reales.",
              },
              {
                n: "03",
                t: "Electrónica fundamental",
                d: "Voltaje, corriente, resistencia, circuitos digitales y analógicos.",
              },
              {
                n: "04",
                t: "Programación",
                d: "Variables, control de flujo, funciones y sintaxis de Arduino (C/C++).",
              },
            ].map((c, i) => (
              <div
                key={c.n}
                className={`p-7 ${i < 3 ? "md:border-r border-ink/15" : ""} ${i < 2 ? "md:border-b lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""} ${i === 2 ? "lg:border-r" : ""}`}
              >
                <div className="font-mono text-[10px] tracking-[0.2em] text-accent-dark">
                  C·{c.n}
                </div>
                <div className="mt-6 font-display text-xl tracking-tight">{c.t}</div>
                <p className="mt-3 text-sm text-muted leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-grid-dark opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="tech-label text-accent-bright">§02 · Operación</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight leading-tight max-w-3xl">
            Un proceso de tres fases.<br />
            <span className="text-muted-2">Diseñado para auto-aprendizaje.</span>
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-px bg-white/10">
            {[
              {
                n: "01",
                t: "Acceso",
                d: "Ingresa al sistema de módulos y comienza con el Taller 0. No requiere experiencia previa ni materiales especiales para iniciar.",
                k: "INPUT",
              },
              {
                n: "02",
                t: "Progresión",
                d: "Avanza secuencialmente. Cada módulo construye sobre el anterior con teoría, ejercicios prácticos y ejemplos guiados.",
                k: "PROCESS",
              },
              {
                n: "03",
                t: "Validación",
                d: "Completa la evaluación de cada módulo para verificar dominio antes de avanzar al siguiente.",
                k: "OUTPUT",
              },
            ].map((s) => (
              <div key={s.n} className="bg-ink p-8 md:p-10">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-5xl md:text-6xl text-accent-bright leading-none">
                    {s.n}
                  </span>
                  <span className="tech-label text-muted-2">{s.k}</span>
                </div>
                <div className="mt-8 font-display text-2xl tracking-tight">{s.t}</div>
                <p className="mt-3 text-sm text-muted-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="relative">
        <div className="absolute inset-0 bp-grid opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="tech-label text-accent-dark">§03 · Director del programa</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Daniel Abadi
              </h2>
              <p className="mt-6 text-muted leading-relaxed max-w-xl">
                Creador y director técnico del programa Principios de Arduino. Miembro
                del Cuerpo de Solidaridad Informática (CSI) del Ministerio de Educación
                de Panamá. Diseñó este currículo para que cualquier estudiante panameño,
                sin importar dónde estudie, pueda construir sus propios proyectos
                con Arduino desde cero.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-px bg-ink/15 border border-ink/15">
                <a
                  href="mailto:daniel10abadi@gmail.com"
                  className="bg-surface-2 p-5 hover:bg-ink hover:text-surface transition group"
                >
                  <div className="tech-label text-accent-dark group-hover:text-accent-bright">
                    Email
                  </div>
                  <div className="mt-2 font-mono text-sm">daniel10abadi@gmail.com</div>
                </a>
                <a
                  href="https://wa.me/50768641929"
                  className="bg-surface-2 p-5 hover:bg-ink hover:text-surface transition group"
                >
                  <div className="tech-label text-accent-dark group-hover:text-accent-bright">
                    Teléfono · WhatsApp
                  </div>
                  <div className="mt-2 font-mono text-sm">+507 6864-1929</div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative aspect-[4/5] border border-ink bg-surface-2 corner-marks text-ink">
                <div className="absolute inset-0 bp-grid-fine opacity-60" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-muted-2">
                  <span>+ ID-001</span>
                  <span>CSI/INSTRUCTOR +</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl">⚙</div>
                    <div className="mt-6 font-display text-2xl tracking-tight">
                      Daniel Abadi
                    </div>
                    <div className="mt-2 tech-label text-muted">Director · CSI</div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-muted-2">
                  <span>+ MEDUCA</span>
                  <span>PANAMÁ +</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-accent text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-grid-dark opacity-25 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <div className="tech-label text-surface/70">§ Inicio del programa</div>
              <h2 className="mt-3 font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
                Construye tu primer<br />proyecto. Empieza hoy.
              </h2>
            </div>
            <div className="md:col-span-5 md:text-right">
              <p className="text-surface/85 text-sm leading-relaxed mb-6 max-w-sm md:ml-auto">
                Sin requisitos previos. Sin costos. Solo curiosidad y ganas de
                construir cosas que funcionen.
              </p>
              <Link
                href="/talleres"
                className="inline-flex items-center gap-3 bg-ink text-surface px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-surface hover:text-ink transition"
              >
                Iniciar Taller 00 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
