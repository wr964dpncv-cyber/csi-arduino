"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type QuestionType = "multiple_choice" | "file_upload" | "text_long";

type Question = {
  id?: string;
  sort_order: number;
  question: string;
  options: string[];
  correct_index: number;
  question_type: QuestionType;
  image_url?: string | null;
  _new?: boolean;
  _uploadingImage?: boolean;
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

  function addQuestion(type: QuestionType = "multiple_choice") {
    setQuestions((qs) => [
      ...qs,
      {
        sort_order: qs.length + 1,
        question:
          type === "file_upload"
            ? "Sube tu archivo (foto del circuito, código, etc)"
            : type === "text_long"
              ? "Describe tu respuesta"
              : "Nueva pregunta",
        options: type === "multiple_choice" ? ["Opción A", "Opción B", "Opción C", "Opción D"] : [],
        correct_index: 0,
        question_type: type,
        image_url: null,
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

  async function uploadImage(i: number, file: File) {
    update(i, { _uploadingImage: true });
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/quiz-images", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "No se pudo subir la imagen");
      }
      const data = await res.json();
      update(i, { image_url: data.url, _uploadingImage: false });
    } catch (err) {
      update(i, { _uploadingImage: false });
      setStatus({
        ok: false,
        msg: err instanceof Error ? err.message : "Error subiendo imagen",
      });
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
            question_type: q.question_type,
            image_url: q.image_url ?? null,
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

  const typeLabels: Record<QuestionType, string> = {
    multiple_choice: "Opción múltiple",
    file_upload: "Subir archivo",
    text_long: "Texto largo",
  };

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
          Tres tipos de preguntas: opción múltiple, subir archivo, texto largo.
          Opcionalmente puedes agregar una imagen de referencia a cualquier pregunta.
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
            Aún no hay preguntas. Usa los botones de abajo para agregar una.
          </div>
        )}
        {questions.map((q, i) => (
          <div
            key={q.id ?? `new-${i}`}
            className="border border-border bg-surface-2 p-6 space-y-4"
          >
            <div className="flex items-baseline justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="font-mono text-2xl text-accent-dark leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <select
                  value={q.question_type}
                  onChange={(e) =>
                    update(i, {
                      question_type: e.target.value as QuestionType,
                    })
                  }
                  className="border border-border bg-surface px-3 py-1.5 text-sm focus:border-ink focus:outline-none transition"
                >
                  <option value="multiple_choice">Opción múltiple</option>
                  <option value="file_upload">Subir archivo</option>
                  <option value="text_long">Texto largo</option>
                </select>
                <span className="text-xs text-muted font-mono">
                  · {typeLabels[q.question_type]}
                </span>
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
              <div className="text-sm text-muted mb-1.5">Enunciado</div>
              <textarea
                rows={2}
                className={inputCls + " resize-y"}
                value={q.question}
                onChange={(e) => update(i, { question: e.target.value })}
                placeholder="¿Cuál es la pregunta?"
              />
            </div>

            {/* Imagen opcional */}
            <div>
              <div className="text-sm text-muted mb-1.5">
                Imagen de referencia{" "}
                <span className="text-xs font-mono">(opcional)</span>
              </div>
              {q.image_url && (
                <div className="mb-3 border border-border bg-surface overflow-hidden inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={q.image_url}
                    alt="Referencia"
                    className="max-h-48 w-auto"
                  />
                </div>
              )}
              <div className="flex items-center gap-3 flex-wrap">
                <label className="inline-flex items-center gap-2 border border-ink bg-surface px-4 py-2 text-sm hover:bg-ink hover:text-surface transition cursor-pointer">
                  <span>
                    {q._uploadingImage
                      ? "Subiendo..."
                      : q.image_url
                        ? "Cambiar imagen"
                        : "Subir imagen"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={q._uploadingImage}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadImage(i, f);
                    }}
                    className="sr-only"
                  />
                </label>
                {q.image_url && (
                  <button
                    type="button"
                    onClick={() => update(i, { image_url: null })}
                    className="text-sm text-muted hover:text-rose-700 transition"
                  >
                    Quitar imagen
                  </button>
                )}
              </div>
              <input
                type="text"
                value={q.image_url ?? ""}
                onChange={(e) => update(i, { image_url: e.target.value || null })}
                placeholder="O pega una URL: https://..."
                className={inputCls + " mt-2 text-xs font-mono"}
              />
            </div>

            {/* UI específica del tipo */}
            {q.question_type === "multiple_choice" && (
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
            )}

            {q.question_type === "file_upload" && (
              <div className="border border-dashed border-border bg-surface p-4 text-sm text-muted">
                Los estudiantes verán un botón <strong>Add file</strong> y podrán
                subir imágenes (JPG/PNG) o PDF, máx 10 MB.
              </div>
            )}

            {q.question_type === "text_long" && (
              <div className="border border-dashed border-border bg-surface p-4 text-sm text-muted">
                Los estudiantes verán un <strong>textarea</strong> para escribir
                una respuesta abierta. No se califica automáticamente.
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => addQuestion("multiple_choice")}
          className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-surface transition"
        >
          + Opción múltiple
        </button>
        <button
          type="button"
          onClick={() => addQuestion("file_upload")}
          className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-surface transition"
        >
          + Subir archivo
        </button>
        <button
          type="button"
          onClick={() => addQuestion("text_long")}
          className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-surface transition"
        >
          + Texto largo
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="ml-auto bg-accent text-ink px-5 py-2 text-sm font-semibold hover:bg-accent-bright glow-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
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
