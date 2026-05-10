"use client";

import { useState } from "react";
import Link from "next/link";

type Question = {
  id: string;
  sort_order: number;
  question: string;
  options: string[];
};

type Props = {
  tallerSlug: string;
  tallerNumber: number;
  tallerTitle: string;
  questions: Question[];
};

type Result = {
  score: number;
  total: number;
  answers: Array<{
    question_id: string;
    selected_index: number;
    correct: boolean;
  }>;
};

export default function QuizForm({
  tallerSlug,
  tallerNumber,
  tallerTitle,
  questions,
}: Props) {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState<{
    score?: number;
    total?: number;
    created_at?: string;
  } | null>(null);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allAnswered) {
      setError("Responde todas las preguntas antes de enviar.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/quiz/${tallerSlug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          studentEmail,
          studentSchool,
          answers: Object.entries(answers).map(([question_id, selected_index]) => ({
            question_id,
            selected_index,
          })),
        }),
      });

      if (res.status === 409) {
        const err = await res.json().catch(() => ({}));
        setAlreadySubmitted(err.previous ?? {});
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "No se pudo enviar el quiz.");
      }

      const data = await res.json();
      setResult({
        score: data.score,
        total: data.total,
        answers: data.answers,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setSubmitting(false);
    }
  }

  if (alreadySubmitted) {
    const hasPrev =
      typeof alreadySubmitted.score === "number" &&
      typeof alreadySubmitted.total === "number" &&
      alreadySubmitted.total > 0;
    const pct = hasPrev
      ? Math.round(
          (alreadySubmitted.score! / alreadySubmitted.total!) * 100
        )
      : null;
    return (
      <div className="space-y-6">
        <div className="border-l-4 border-amber-500 bg-amber-50 p-8">
          <div className="font-mono text-xs uppercase tracking-wider text-amber-700 mb-3">
            Quiz ya enviado · Taller {tallerNumber}
          </div>
          <h2 className="font-display text-2xl text-ink">
            Solo puedes enviar este quiz una vez.
          </h2>
          <p className="mt-3 text-muted leading-relaxed">
            Ya recibimos una respuesta tuya para{" "}
            <span className="text-ink font-medium">{tallerTitle}</span> con el
            correo <span className="font-mono">{studentEmail.toLowerCase()}</span>
            .
          </p>
          {hasPrev && (
            <div className="mt-5 inline-flex items-baseline gap-3 border border-amber-200 bg-amber-100/60 px-4 py-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-700">
                Tu resultado:
              </span>
              <span className="font-mono text-2xl text-ink">
                {alreadySubmitted.score}/{alreadySubmitted.total}
              </span>
              {pct !== null && (
                <span className="text-sm text-muted">· {pct}%</span>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/talleres/${tallerSlug}`}
            className="inline-flex items-center border border-ink px-5 py-3 text-sm hover:bg-ink hover:text-surface transition"
          >
            ← Volver al taller
          </Link>
          <Link
            href="/talleres"
            className="inline-flex items-center text-sm text-muted hover:text-ink transition px-5 py-3"
          >
            Ver todos los talleres
          </Link>
        </div>
      </div>
    );
  }

  if (result) {
    const correctMap = new Map(
      result.answers.map((a) => [a.question_id, a])
    );
    const percentage = Math.round((result.score / result.total) * 100);
    const passing = percentage >= 60;

    return (
      <div className="space-y-8">
        <div
          className={`border-l-4 p-8 text-center ${
            passing
              ? "border-emerald-500 bg-emerald-50"
              : "border-amber-500 bg-amber-50"
          }`}
        >
          <div className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
            Resultado · Taller {tallerNumber}
          </div>
          <div className="font-display text-6xl md:text-7xl text-ink">
            {result.score}
            <span className="text-muted-2">/{result.total}</span>
          </div>
          <div className="mt-3 text-lg text-muted">
            {percentage}% · {passing ? "¡Aprobado!" : "Revisa el material y vuelve a intentarlo."}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl mb-6">Revisión</h2>
          <div className="space-y-4">
            {questions.map((q, i) => {
              const answer = correctMap.get(q.id);
              const selectedIdx = answer?.selected_index ?? -1;
              const correct = answer?.correct ?? false;
              return (
                <div
                  key={q.id}
                  className={`border p-5 ${
                    correct ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-accent-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-ink">{q.question}</div>
                      <div className="mt-3 space-y-1.5">
                        {q.options.map((opt, oi) => (
                          <div
                            key={oi}
                            className={`text-sm flex items-center gap-2 ${
                              oi === selectedIdx
                                ? correct
                                  ? "text-emerald-700 font-medium"
                                  : "text-rose-700 font-medium"
                                : "text-muted"
                            }`}
                          >
                            <span>{oi === selectedIdx ? (correct ? "✓" : "✕") : "·"}</span>
                            <span>{opt}</span>
                            {oi === selectedIdx && (
                              <span className="text-xs uppercase tracking-wider ml-2">
                                {correct ? "Tu respuesta · correcta" : "Tu respuesta"}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <Link
            href={`/talleres/${tallerSlug}`}
            className="bg-accent text-ink px-6 py-3 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
          >
            ← Volver al taller
          </Link>
          <Link
            href="/talleres"
            className="border border-ink px-6 py-3 text-sm hover:bg-ink hover:text-surface transition"
          >
            Ver todos los talleres
          </Link>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full border border-border bg-surface-2 px-4 py-3 text-ink placeholder:text-muted-2/70 focus:border-ink focus:outline-none transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Datos del estudiante */}
      <div className="border border-border bg-surface-2 p-6 space-y-4">
        <div className="font-display text-lg">Tus datos</div>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <div className="text-sm text-muted mb-1.5">
              Nombre completo <span className="text-accent-dark">*</span>
            </div>
            <input
              className={inputCls}
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Tu nombre y apellido"
            />
          </label>
          <label className="block">
            <div className="text-sm text-muted mb-1.5">
              Email <span className="text-accent-dark">*</span>
            </div>
            <input
              type="email"
              className={inputCls}
              required
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              placeholder="tucorreo@gmail.com"
            />
          </label>
        </div>
        <label className="block">
          <div className="text-sm text-muted mb-1.5">
            Escuela{" "}
            <span className="text-xs text-muted-2 font-mono">(opcional)</span>
          </div>
          <input
            className={inputCls}
            value={studentSchool}
            onChange={(e) => setStudentSchool(e.target.value)}
            placeholder="Nombre de tu colegio"
          />
        </label>
      </div>

      {/* Preguntas */}
      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={q.id} className="border border-border bg-surface-2 p-6">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-sm text-accent-dark">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="font-display text-lg flex-1">{q.question}</div>
            </div>
            <div className="space-y-2 ml-9">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                return (
                  <label
                    key={oi}
                    className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition ${
                      selected
                        ? "border-accent-dark bg-accent-soft"
                        : "border-border bg-surface hover:border-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={selected}
                      onChange={() =>
                        setAnswers((a) => ({ ...a, [q.id]: oi }))
                      }
                      className="sr-only"
                    />
                    <span
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selected
                          ? "border-accent-dark bg-accent-dark"
                          : "border-border"
                      }`}
                    >
                      {selected && (
                        <span className="h-2 w-2 rounded-full bg-surface" />
                      )}
                    </span>
                    <span className="text-ink">{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="border-l-2 border-rose-500 bg-rose-500/5 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted">
          {Object.keys(answers).length} / {questions.length} respondidas
        </div>
        <button
          type="submit"
          disabled={submitting || !allAnswered}
          className="bg-accent text-ink px-7 py-3.5 text-base font-semibold hover:bg-accent-bright glow-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Enviando..." : "Enviar quiz"}
        </button>
      </div>
    </form>
  );
}
