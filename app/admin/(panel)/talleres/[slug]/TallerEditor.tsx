"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Taller } from "@/lib/talleres";

const LEVELS = ["Inicio", "Básico", "Intermedio", "Avanzado"] as const;

type Props = { taller: Taller };

export default function TallerEditor({ taller }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Taller>({
    ...taller,
    published: taller.published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setError(null);
    setStatus("idle");

    try {
      const res = await fetch(`/api/admin/talleres/${taller.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "No se pudo guardar.");
      }
      const result = await res.json();
      setStatus("success");
      // If slug changed (because n changed), navigate to new slug
      if (result.slug && result.slug !== taller.slug) {
        router.push(`/admin/talleres/${result.slug}`);
        return;
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setStatus("error");
    } finally {
      setSaving(false);
    }
  }

  function updateObjective(i: number, value: string) {
    setData((d) => ({
      ...d,
      objectives: d.objectives.map((o, idx) => (idx === i ? value : o)),
    }));
  }

  function addObjective() {
    setData((d) => ({ ...d, objectives: [...d.objectives, ""] }));
  }

  function removeObjective(i: number) {
    setData((d) => ({
      ...d,
      objectives: d.objectives.filter((_, idx) => idx !== i),
    }));
  }

  const inputCls =
    "w-full border border-border bg-surface-2 px-4 py-2.5 text-ink focus:border-ink focus:outline-none transition";

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/talleres"
          className="text-sm text-muted hover:text-ink transition"
        >
          ← Talleres
        </Link>
        <h1 className="mt-3 font-display text-3xl tracking-tight">
          Editar Taller {taller.n}
        </h1>
      </div>

      <div className="space-y-6 bg-surface-2 border border-border p-6 md:p-8">
        {/* Estado y número */}
        <div className="grid md:grid-cols-12 gap-4 items-start">
          <label className="block md:col-span-2">
            <div className="text-sm text-muted mb-1.5">Número (n)</div>
            <input
              type="number"
              min="0"
              className={inputCls + " font-mono"}
              value={data.n}
              onChange={(e) =>
                setData({ ...data, n: parseInt(e.target.value) || 0 })
              }
            />
            <div className="mt-1 text-[10px] font-mono text-muted-2">
              URL: /talleres/taller-{data.n}
            </div>
          </label>

          <div className="block md:col-span-4">
            <div className="text-sm text-muted mb-1.5">Disponibilidad</div>
            <button
              type="button"
              onClick={() =>
                setData({ ...data, published: !data.published })
              }
              className={`w-full px-4 py-2.5 text-sm font-medium border transition flex items-center justify-between ${
                data.published
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  : "border-rose-500 bg-rose-50 text-rose-700 hover:bg-rose-100"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    data.published ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                />
                {data.published ? "Disponible" : "No disponible"}
              </span>
              <span className="text-xs text-muted-2">
                Click para cambiar
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-4">
          <label className="block md:col-span-8">
            <div className="text-sm text-muted mb-1.5">Título</div>
            <input
              className={inputCls}
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </label>
          <label className="block md:col-span-2">
            <div className="text-sm text-muted mb-1.5">Nivel</div>
            <select
              className={inputCls}
              value={data.level}
              onChange={(e) =>
                setData({ ...data, level: e.target.value as Taller["level"] })
              }
            >
              {LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label className="block md:col-span-2">
            <div className="text-sm text-muted mb-1.5">Tema</div>
            <input
              className={inputCls}
              value={data.topic}
              onChange={(e) => setData({ ...data, topic: e.target.value })}
              placeholder="Setup, Hardware, Software..."
            />
          </label>
        </div>

        <label className="block">
          <div className="text-sm text-muted mb-1.5">
            Tagline (frase corta del taller)
          </div>
          <input
            className={inputCls}
            value={data.tagline}
            onChange={(e) => setData({ ...data, tagline: e.target.value })}
          />
        </label>

        <label className="block">
          <div className="text-sm text-muted mb-1.5">Descripción</div>
          <textarea
            className={inputCls + " resize-y"}
            rows={4}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </label>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <div className="text-sm text-muted mb-1.5">
              Video YouTube ID
              <span className="ml-2 text-xs font-mono text-muted-2">
                (parte después de v=)
              </span>
            </div>
            <input
              className={inputCls + " font-mono text-sm"}
              value={data.videoId}
              onChange={(e) => setData({ ...data, videoId: e.target.value })}
              placeholder="EVlnXu1Qbqg"
            />
          </label>
          <label className="block">
            <div className="text-sm text-muted mb-1.5">URL del Quiz</div>
            <input
              className={inputCls + " font-mono text-sm"}
              value={data.quizUrl ?? ""}
              onChange={(e) => setData({ ...data, quizUrl: e.target.value })}
              placeholder="https://forms.office.com/..."
            />
          </label>
        </div>

        {/* Objetivos */}
        <div>
          <div className="text-sm text-muted mb-3">Objetivos del taller</div>
          <div className="space-y-2">
            {data.objectives.map((obj, i) => (
              <div key={i} className="flex gap-2">
                <span className="font-mono text-sm text-accent-dark w-8 pt-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <input
                  className={inputCls}
                  value={obj}
                  onChange={(e) => updateObjective(i, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeObjective(i)}
                  className="px-3 text-muted hover:text-rose-700 transition"
                  aria-label="Eliminar"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addObjective}
              className="mt-2 text-sm text-accent-dark hover:text-ink transition"
            >
              + Agregar objetivo
            </button>
          </div>
        </div>

        <label className="block">
          <div className="text-sm text-muted mb-1.5">
            Outcome (al final del taller podrás...)
          </div>
          <textarea
            className={inputCls + " resize-y"}
            rows={2}
            value={data.outcome}
            onChange={(e) => setData({ ...data, outcome: e.target.value })}
          />
        </label>

        {error && (
          <div className="border-l-2 border-rose-500 bg-rose-500/5 p-3 text-sm text-rose-700">
            {error}
          </div>
        )}
        {status === "success" && (
          <div className="border-l-2 border-emerald-500 bg-emerald-500/5 p-3 text-sm text-emerald-700">
            ✓ Guardado correctamente.
          </div>
        )}

        <div className="flex items-center gap-3 border-t border-border pt-6">
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="bg-ink text-surface px-6 py-3 text-sm font-medium hover:bg-accent hover:text-ink transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
          <Link
            href={`/talleres/${taller.slug}`}
            target="_blank"
            className="text-sm text-muted hover:text-ink transition"
          >
            Ver página pública →
          </Link>
        </div>
      </div>
    </div>
  );
}
