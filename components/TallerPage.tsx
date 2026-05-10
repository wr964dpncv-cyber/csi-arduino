import Link from "next/link";
import type { Taller } from "@/lib/talleres";
import { parseEventDate, getEventStatus } from "@/lib/dateHelpers";

type CalendarEventInfo = {
  day: string;
  dateText: string;
  time: string;
};

type Props = {
  taller: Taller;
  prev?: Taller;
  next?: Taller;
  calendarEvent?: CalendarEventInfo;
};

export default function TallerPage({
  taller,
  prev,
  next,
  calendarEvent,
}: Props) {
  const num = String(taller.n).padStart(2, "0");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = calendarEvent
    ? parseEventDate(calendarEvent.dateText)
    : null;
  const eventStatus = getEventStatus(eventDate, today);
  const isUnpublished = taller.published === false;
  const isUpcoming =
    isUnpublished ||
    (eventStatus === "future" && (!taller.videoId || !taller.quizUrl));
  const showVideo = !isUnpublished && Boolean(taller.videoId);
  const showQuiz = !isUnpublished && Boolean(taller.quizUrl);

  return (
    <>
      {/* Header */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <div className="absolute inset-0 bp-traces opacity-100 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12">
          <Link
            href="/talleres"
            className="inline-flex items-center gap-2 text-sm text-muted-2 hover:text-surface transition"
          >
            <span>←</span>
            <span>Talleres</span>
          </Link>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-20">
          <div className="text-xs font-mono text-muted-2 mb-4">
            mod-{num} · {taller.level.toLowerCase()} · {taller.topic.toLowerCase()}
          </div>
          <div className="font-mono text-sm text-accent mb-3">
            Taller {taller.n}
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            {taller.title}
          </h1>
          <p className="mt-8 text-lg text-muted-2 max-w-2xl leading-relaxed">
            {taller.description}
          </p>

          {isUnpublished && (
            <div className="mt-10 inline-flex flex-col gap-1.5 border border-rose-500/40 bg-rose-500/10 px-5 py-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-rose-300">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                No disponible
              </div>
              <div className="text-base text-surface">
                {calendarEvent ? (
                  <>
                    Este taller estará disponible el{" "}
                    <span className="font-medium text-rose-300">
                      {calendarEvent.day} {calendarEvent.dateText}
                    </span>
                    .
                  </>
                ) : (
                  <>Este taller aún no se ha publicado.</>
                )}
              </div>
            </div>
          )}
          {!isUnpublished && isUpcoming && calendarEvent && (
            <div className="mt-10 inline-flex flex-col gap-1.5 border border-accent/30 bg-accent/10 px-5 py-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
                Próximamente
              </div>
              <div className="text-base text-surface">
                Disponible el{" "}
                <span className="font-medium text-accent">
                  {calendarEvent.day} {calendarEvent.dateText}
                </span>{" "}
                a las{" "}
                <span className="font-mono text-surface">
                  {calendarEvent.time}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Objetivos */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="text-sm text-muted mb-3">Objetivos</div>
              <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
                Lo que aprenderás.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-4">
                {taller.objectives.map((obj, i) => (
                  <li key={i} className="flex gap-5 items-baseline">
                    <span className="font-mono text-sm text-accent-dark w-8 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-6 border-t border-border">
                <div className="text-sm text-muted mb-2">Al final del taller</div>
                <p className="text-ink leading-relaxed">{taller.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-3xl mb-10">
            <div className="text-sm text-muted mb-3">Video</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              {showVideo ? "Mira el video completo." : "Video por publicar."}
            </h2>
          </div>

          {showVideo ? (
            <div className="aspect-video w-full bg-ink">
              <iframe
                src={`https://www.youtube.com/embed/${taller.videoId}`}
                title={`Video del Taller ${taller.n} · ${taller.title}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video w-full bg-ink text-surface flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bp-traces opacity-100 pointer-events-none" />
              <div className="relative text-center px-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-accent mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
                  PRÓXIMAMENTE
                </div>
                {calendarEvent ? (
                  <>
                    <div className="font-display text-2xl md:text-3xl tracking-tight">
                      Disponible el{" "}
                      <span className="text-accent">
                        {calendarEvent.day} {calendarEvent.dateText}
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-muted-2 font-mono">
                      a las {calendarEvent.time}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-display text-2xl md:text-3xl tracking-tight">
                      Este video se publicará en su fecha.
                    </div>
                    <div className="mt-3 text-sm text-muted-2">
                      Revisa el calendario para saber cuándo estará disponible.
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quiz */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-3xl mb-10">
            <div className="text-sm text-muted mb-3">Quiz</div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              {showQuiz
                ? "Cuando termines, completa el quiz."
                : "Quiz por publicar."}
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              {showQuiz
                ? "Usa tu correo institucional MEDUCA para enviar tus respuestas."
                : "El quiz de este taller se habilitará junto con el video."}
            </p>
          </div>

          {showQuiz ? (
            <a
              href={taller.quizUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-12 bg-ink text-surface px-7 py-5 hover:bg-accent hover:text-ink glow-gold transition group"
            >
              <span className="text-base font-medium">
                Abrir quiz del Taller {taller.n}
              </span>
              <span className="font-mono text-sm text-muted-2 group-hover:text-ink">
                forms.office.com →
              </span>
            </a>
          ) : (
            <div className="inline-flex flex-col gap-1.5 border border-dashed border-border px-7 py-5">
              <div className="font-mono text-xs uppercase tracking-wider text-accent-dark">
                ▸ Próximamente
              </div>
              <div className="text-sm text-ink">
                {calendarEvent ? (
                  <>
                    Quiz disponible el{" "}
                    <span className="font-medium text-accent-dark">
                      {calendarEvent.day} {calendarEvent.dateText}
                    </span>{" "}
                    a las{" "}
                    <span className="font-mono">{calendarEvent.time}</span>
                  </>
                ) : (
                  <>Quiz disponible en la fecha del taller</>
                )}
              </div>
            </div>
          )}

          <p className="mt-8 text-sm text-muted leading-relaxed max-w-2xl">
            <span className="text-ink font-medium">Nota:</span> si tienes
            dificultades para acceder al formulario con tu correo institucional,
            contacta a Daniel directamente por WhatsApp o correo.
          </p>
        </div>
      </section>

      {/* Navegación */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-12 grid md:grid-cols-2 gap-10">
          {prev ? (
            <Link
              href={`/talleres/${prev.slug}`}
              className="group block"
            >
              <div className="text-xs font-mono text-muted mb-2">
                ← anterior · taller {prev.n}
              </div>
              <div className="font-display text-xl group-hover:text-accent-dark transition">
                {prev.title}
              </div>
            </Link>
          ) : (
            <div className="opacity-40">
              <div className="text-xs font-mono text-muted mb-2">← anterior</div>
              <div className="font-display text-xl text-muted">
                Inicio del programa
              </div>
            </div>
          )}
          {next ? (
            <Link
              href={`/talleres/${next.slug}`}
              className="group block md:text-right"
            >
              <div className="text-xs font-mono text-muted mb-2">
                siguiente · taller {next.n} →
              </div>
              <div className="font-display text-xl group-hover:text-accent-dark transition">
                {next.title}
              </div>
            </Link>
          ) : (
            <Link
              href="/talleres"
              className="group block md:text-right"
            >
              <div className="text-xs font-mono text-muted mb-2">siguiente →</div>
              <div className="font-display text-xl group-hover:text-accent-dark transition">
                Ver todos los talleres
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Soporte */}
      <section className="bg-ink text-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-tight">
              ¿Atascado en este taller?
            </h2>
            <p className="mt-4 text-muted-2 max-w-md">
              Daniel responde directamente. Sin formularios, sin filas.
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
