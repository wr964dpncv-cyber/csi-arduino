import Image from "next/image";
import Link from "next/link";
import {
  RETO_YEAR,
  RETO_DATES,
  fases,
  requisitos,
  cronograma,
  entregables,
  criterios,
  finalSegments,
  premios,
} from "@/lib/reto";
import {
  TinkercadIcon,
  ChipIcon,
  CheckIcon,
  TeamIcon,
  SchoolIcon,
  VideoIcon,
  DocIcon,
  LinkIcon,
  MedalIcon,
} from "@/components/RetoIcons";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import CircuitBackdrop from "@/components/CircuitBackdrop";
import StickyInscriptionCTA from "@/components/StickyInscriptionCTA";

export const metadata = {
  title: `Reto Nacional CSI ${RETO_YEAR} — Competencia Nacional de Arduino`,
  description: `Competencia Nacional de Arduino organizada por Daniel Abadi para el Programa CSI de MEDUCA. Inscripciones del ${RETO_DATES.inscripcionFrom} al ${RETO_DATES.inscripcionTo}.`,
};

const requisitoIcons = [CheckIcon, TeamIcon, SchoolIcon];
const entregableIcons = [LinkIcon, VideoIcon, DocIcon];
const faseIcons = [TinkercadIcon, ChipIcon];
const cronogramaTone: Record<string, string> = {
  open: "bg-accent",
  critical: "bg-rose-500",
  highlight: "bg-emerald-500",
  build: "bg-emerald-500",
  final: "bg-cyan-400",
};

export default function RetoNacionalPage() {
  return (
    <>
      <StickyInscriptionCTA />
      {/* HERO */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <CircuitBackdrop variant="stack" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Image
            src="/csi-logo.png"
            alt="Logo CSI · Cuerpo de Solidaridad Informática"
            width={470}
            height={531}
            priority
            className="h-32 w-auto mb-8"
          />
          <div className="text-xs font-mono text-muted-2 mb-4">
            Reto Nacional CSI · {RETO_YEAR}
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-4xl">
            Competencia Nacional<br />de Arduino.
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            Organizada por <span className="text-surface">Daniel Abadi</span> para
            el Programa CSI de MEDUCA. Los equipos diseñan un proyecto en
            Tinkercad y los <span className="text-surface">10 mejores</span>{" "}
            reciben un kit Arduino real para competir en una final presencial en
            Panamá.
          </p>

          {/* Key dates */}
          <div className="mt-12 grid sm:grid-cols-3 gap-8 max-w-3xl pt-8 border-t border-white/10">
            <div>
              <div className="text-xs font-mono text-muted-2 mb-1.5">
                Inscripciones
              </div>
              <div className="font-medium">
                {RETO_DATES.inscripcionFrom} – {RETO_DATES.inscripcionTo}
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-muted-2 mb-1.5">
                Entrega de proyectos
              </div>
              <div className="font-medium">{RETO_DATES.entregaProyecto}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-accent mb-1.5">
                Final presencial
              </div>
              <div className="font-medium text-surface">
                {RETO_DATES.finalDate} · Panamá
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link
              href="/reto-nacional/inscripcion"
              className="inline-flex items-center gap-2 bg-accent text-ink px-9 py-5 text-lg font-semibold hover:bg-accent-bright glow-gold transition shadow-lg shadow-accent/20"
            >
              <span>Inscribir mi equipo</span>
              <span aria-hidden>→</span>
            </Link>
            <a
              href="#reglas"
              className="inline-flex items-center border border-white/20 px-6 py-3 text-sm text-muted-2 hover:border-surface hover:text-surface transition"
            >
              Ver reglas
            </a>
          </div>
        </div>
      </section>

      {/* QUÉ ES */}
      <section id="reglas" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="max-w-3xl mb-16">
            <div className="text-sm text-muted mb-3">¿Qué es el Reto?</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Dos fases, una competencia nacional.
            </h2>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Los equipos diseñan un proyecto en Tinkercad y los 10 mejores
              reciben un kit Arduino real para competir en una final presencial
              en Panamá.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {fases.map((f, i) => {
              const Icon = faseIcons[i];
              return (
                <div key={f.n} className="bg-surface p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <Icon className="h-9 w-9 text-accent-dark" />
                    <div className="font-mono text-sm text-accent-dark">
                      Fase {f.n}
                    </div>
                  </div>
                  <h3 className="font-display text-2xl tracking-tight">
                    {f.name}
                  </h3>
                  <div className="mt-1 text-sm text-muted font-mono">
                    {f.venue}
                  </div>
                  <p className="mt-5 text-muted leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUIÉN PUEDE PARTICIPAR */}
      <section className="bg-surface-2 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl mb-14">
            <div className="text-sm text-muted mb-3">Requisitos</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              ¿Quién puede participar?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {requisitos.map((r, i) => {
              const Icon = requisitoIcons[i];
              return (
                <div key={r.t} className="border border-border bg-surface p-7">
                  <Icon className="h-8 w-8 text-accent-dark" />
                  <h3 className="mt-6 font-display text-xl tracking-tight">
                    {r.t}
                  </h3>
                  <p className="mt-2 text-muted leading-relaxed">{r.d}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-sm text-muted italic max-w-2xl">
            Cada estudiante solo puede pertenecer a un equipo. El proyecto debe
            ser original y creado por los integrantes.
          </p>
        </div>
      </section>

      {/* CRONOGRAMA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl mb-14">
            <div className="text-sm text-muted mb-3">Cronograma</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Las fechas clave.
            </h2>
          </div>

          <ol className="relative max-w-3xl">
            <span
              aria-hidden
              className="absolute left-[7px] top-3 bottom-3 w-px bg-border"
            />
            {cronograma.map((item) => (
              <li
                key={item.date}
                className="relative grid grid-cols-12 gap-4 md:gap-8 py-5"
              >
                <span
                  className={`absolute left-0 top-7 h-3.5 w-3.5 rounded-full ring-4 ring-surface ${cronogramaTone[item.tone] ?? "bg-ink"}`}
                />
                <div className="col-span-4 md:col-span-3 pl-8 font-mono text-sm text-ink">
                  {item.date}
                </div>
                <div className="col-span-8 md:col-span-9 text-muted leading-relaxed">
                  {item.event}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* QUÉ DEBEN ENTREGAR */}
      <section className="bg-surface-2 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl mb-14">
            <div className="text-sm text-muted mb-3">Entregables</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              ¿Qué deben entregar?
            </h2>
            <p className="mt-4 text-muted">
              Antes del{" "}
              <span className="text-ink font-medium">
                {RETO_DATES.entregaProyecto}
              </span>
              , cada equipo entrega 3 elementos:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {entregables.map((e, i) => {
              const Icon = entregableIcons[i];
              return (
                <div key={e.n} className="bg-surface p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 bg-ink text-surface flex items-center justify-center font-mono text-sm">
                      {e.n}
                    </div>
                    <Icon className="h-7 w-7 text-accent-dark" />
                  </div>
                  <h3 className="font-display text-xl tracking-tight">{e.t}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {e.d}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CRITERIOS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl mb-14">
            <div className="text-sm text-muted mb-3">Evaluación</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Criterios de evaluación.
            </h2>
            <p className="mt-4 text-muted">
              El jurado seleccionado por Daniel Abadi y MEDUCA evaluará cada
              proyecto según:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border border border-border max-w-3xl">
            {criterios.map((c, i) => (
              <div key={c.t} className="bg-surface p-6 md:p-7">
                <div className="font-mono text-sm text-accent-dark mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-xl tracking-tight">
                  {c.t}
                </div>
                <div className="mt-2 text-sm text-muted leading-relaxed">
                  {c.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL PRESENCIAL */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <CircuitBackdrop variant="angles" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-mono text-accent mb-3">
              {RETO_DATES.finalDate} · Panamá
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Final presencial.
            </h2>
            <p className="mt-4 text-muted-2">
              Cada equipo dispone de{" "}
              <span className="text-surface font-medium">8 minutos</span> ante
              el jurado.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-px bg-white/10">
            {finalSegments.map((s) => (
              <div key={s.t} className="bg-ink p-7">
                <div className="font-mono text-3xl text-accent leading-none">
                  {s.mins}
                  <span className="text-base ml-1">min</span>
                </div>
                <div className="mt-6 font-display text-lg">{s.t}</div>
                <p className="mt-2 text-sm text-muted-2 leading-relaxed">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIOS */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl mb-14">
            <div className="text-sm text-muted mb-3">Premios</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              Lo que está en juego.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {premios.map((p) => (
              <div
                key={p.lugar}
                className={`p-8 ${p.featured ? "bg-accent-soft border-2 border-accent" : "bg-surface border border-border"}`}
              >
                <MedalIcon
                  className={`h-9 w-9 ${p.featured ? "text-accent-dark" : "text-muted"}`}
                />
                <div className="mt-6 font-display text-2xl tracking-tight">
                  {p.lugar}
                </div>
                <div
                  className={`mt-3 ${p.featured ? "text-ink font-medium" : "text-muted italic"}`}
                >
                  {p.premio}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-surface border border-border p-6 md:p-7 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="font-display text-lg flex-shrink-0">
              Todos los participantes
            </div>
            <div className="text-muted">
              Certificado Digital CSI · Carta de reconocimiento MEDUCA para
              finalistas
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO INSCRIBIRSE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl mb-14">
            <div className="text-sm text-muted mb-3">Inscripción</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
              ¿Cómo inscribirse?
            </h2>
            <p className="mt-4 text-muted">Dos pasos en csi-arduino.com.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/reto-nacional/inscripcion"
              className="group block border border-border bg-surface p-8 md:p-10 hover:border-ink transition"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 bg-ink text-surface flex items-center justify-center font-mono text-sm">
                  1
                </div>
                <div className="text-sm text-muted font-mono">
                  {RETO_DATES.inscripcionFrom} – {RETO_DATES.inscripcionTo}
                </div>
              </div>
              <h3 className="font-display text-2xl tracking-tight">
                Inscripción del equipo
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                Un integrante registra al equipo completo con los datos de los
                3 miembros: nombre, apellido, email institucional, email
                personal, teléfono, escuela y región educativa.
              </p>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-accent-dark group-hover:text-ink transition">
                Inscribir equipo →
              </div>
            </Link>

            <Link
              href="/reto-nacional/entrega"
              className="group block border border-border bg-surface p-8 md:p-10 hover:border-ink transition"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 bg-ink text-surface flex items-center justify-center font-mono text-sm">
                  2
                </div>
                <div className="text-sm text-muted font-mono">
                  Antes del {RETO_DATES.entregaProyecto}
                </div>
              </div>
              <h3 className="font-display text-2xl tracking-tight">
                Entrega del proyecto
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                El equipo sube su proyecto: link de Tinkercad, video de 2
                minutos y descripción escrita de máximo 200 palabras.
              </p>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-accent-dark group-hover:text-ink transition">
                Entregar proyecto →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <CircuitBackdrop variant="sparse" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-tight">
              Inscribe a tu equipo.
            </h2>
            <p className="mt-4 text-muted-2 leading-relaxed max-w-md">
              Las inscripciones cierran el{" "}
              <span className="text-surface font-medium">
                {RETO_DATES.inscripcionTo}
              </span>
              . Para preguntas, contacta directamente a Daniel.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <Link
              href="/reto-nacional/inscripcion"
              className="bg-accent text-ink px-7 py-4 text-base font-semibold hover:bg-accent-bright glow-gold transition flex justify-between items-center"
            >
              <span>Inscribir mi equipo</span>
              <span>→</span>
            </Link>
            <a
              href="https://wa.me/50768641929"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-white/20 px-6 py-4 text-sm hover:border-surface transition flex items-center gap-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-transform group-hover:scale-110">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <span className="flex-1">WhatsApp +507 6864-1929</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
