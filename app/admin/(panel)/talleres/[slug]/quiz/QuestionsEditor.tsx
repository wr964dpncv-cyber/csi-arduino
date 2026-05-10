"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Question = {
  id?: string;
  sort_order: number;
  question: string;
  options: string[];
  correct_index: number;
  _new?: boolean;
};

type Props = {
  taller: { id: string; n: number; slug: string; title: string };
  initialQuestions: Question[];
};

export default function QuestionsEditor({
  taller,
  initialQuestions,
}: Props) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ ok?: boolean; msg?: string } | null>(
    null
  );

  function update(i: number, patch: Partial<Question>) {
    setQuestions((qs) => qs.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));
  }

  function updateOption(i: number, optIdx: number, value: string) {
    setQuestions((qs) =>
      qs.map((q, idx) =>
        idx === i
          ? {
              ...q,
              options: q.options.map((o, oi) => (oi === optIdx ? value : o)),
            }
          : q
      )
    );
  }

  function addOption(i: number) {
    setQuestions((qs) =>
      qs.map((q, idx) =>
        idx === i ? { ...q, options: [...q.options, "Nueva opción"] } : q
      )
    );
  }

  function removeOption(i: number, optIdx: number) {
    setQuestions((qs) =>
      qs.map((q, idx) => {
        if (idx !== i) return q;
        const newOpts = q.options.filter((_, oi) => oi !== optIdx);
        let newCorrect = q.correct_index;
        if (optIdx === q.correct_index) newCorrect = 0;
        else if (optIdx < q.correct_index) newCorrect = q.correct_index - 1;
        return { ...q, options: newOpts, correct_index: newCorrect };
      })
    );
  }

  function addQuestion() {
    setQuestions((qs) => [
      ...qs,
      {
        sort_order: qs.length + 1,
        question: "Nueva pregunta",
        options: ["Opción A", "Opción B", "Opción C", "Opción D"],
        correct_index: 0,
        _new: true,
      },
    ]);
  }

  async function removeQuestion(i: number) {
    const q = questions[i];
    if (q._new || !q.id) {
      setQuestions((qs) => qs.filter((_, idx) => idx !== i));
      return;
    }
    if (!confirm(`¿Eliminar la pregunta ${i + 1}?`)) return;

    const res = await fetch(
      `/api/admin/talleres/${taller.slug}/questions/${q.id}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setQuestions((qs) => qs.filter((_, idx) => idx !== i));
      router.refresh();
    } else {
      const err = await res.json().catch(() => ({}));
      setStatus({ ok: false, msg: err.error ?? "No se pudo eliminar" });
    }
  }

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/talleres/${taller.slug}/questions`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions: questions.map((q, i) => ({
            id: q._new ? undefined : q.id,
            sort_order: i + 1,
            question: q.question,
            options: q.options,
            correct_index: q.correct_index,
          })),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "No se pudo guardar.");
      }
      setStatus({ ok: true, msg: "✓ Preguntas guardadas." });
      router.refresh();
    } catch (err) {
      setStatus({
        ok: false,
        msg: err instanceof Error ? err.message : "Error",
      });
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full border border-border bg-surface-2 px-3 py-2 text-ink focus:border-ink focus:outline-none transition";

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/admin/talleres/${taller.slug}`}
          className="text-sm text-muted hover:text-ink transition"
        >
          ← Editar Taller {taller.n}
        </Link>
        <h1 className="mt-3 font-display text-3xl tracking-tight">
          Quiz · Taller {taller.n}: {taller.title}
        </h1>
        <p className="mt-2 text-muted">
          Preguntas de selección múltiple. Marca la opción correcta haciendo
          click en el círculo de la izquierda.
        </p>
      </div>

      {status && (
        <div
          className={`border-l-2 p-3 text-sm ${
            status.ok
              ? "border-emerald-500 bg-emerald-500/5 text-emerald-700"
              : "border-rose-500 bg-rose-500/5 text-rose-700"
          }`}
        >
          {status.msg}
        </div>
      )}

      <div className="space-y-6">
        {questions.length === 0 && (
          <div className="border border-dashed border-border bg-surface-2 p-8 text-center text-muted">
            Aún no hay preguntas. Click <strong>+ Agregar pregunta</strong> para
            empezar.
          </div>
        )}
        {questions.map((q, i) => (
          <div
            key={q.id ?? `new-${i}`}
            className="border border-border bg-surface-2 p-6 space-y-4"
          >
            <div className="flex items-baseline justify-between gap-3">
              <div className="font-mono text-2xl text-accent-dark leading-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <button
                type="button"
                onClick={() => removeQuestion(i)}
                className="text-sm text-muted hover:text-rose-700 transition"
              >
                Eliminar pregunta
              </button>
            </div>

            <div>
              <div className="text-sm text-muted mb-1.5">Pregunta</div>
              <textarea
                rows={2}
                className={inputCls + " resize-y"}
                value={q.question}
                onChange={(e) => update(i, { question: e.target.value })}
                placeholder="¿Cuál es la pregunta?"
              />
            </div>

            <div>
              <div className="text-sm text-muted mb-2">
                Opciones · click el círculo para marcar la correcta
              </div>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => update(i, { correct_index: oi })}
                      className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                        q.correct_index === oi
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-border bg-surface hover:border-ink"
                      }`}
                      aria-label={
                        q.correct_index === oi
                          ? "Respuesta correcta"
                          : "Marcar como correcta"
                      }
                    >
                      {q.correct_index === oi && (
                        <svg
                          className="h-3.5 w-3.5 text-white"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M3 8 L7 12 L13 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <input
                      type="text"
                      className={inputCls + " flex-1"}
                      value={opt}
                      onChange={(e) => updateOption(i, oi, e.target.value)}
                    />
                    {q.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(i, oi)}
                        className="text-muted hover:text-rose-700 transition px-2"
                        aria-label="Eliminar opción"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(i)}
                  className="text-sm text-accent-dark hover:text-ink transition"
                >
                  + Agregar opción
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={addQuestion}
          className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-surface transition"
        >
          + Agregar pregunta
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="bg-accent text-ink px-5 py-2 text-sm font-semibold hover:bg-accent-bright glow-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Guardando..." : "Guardar quiz"}
        </button>
        <Link
          href={`/talleres/${taller.slug}/quiz`}
          target="_blank"
          className="text-sm text-muted hover:text-ink transition py-2"
        >
          Ver quiz público →
        </Link>
      </div>
    </div>
  );
}
