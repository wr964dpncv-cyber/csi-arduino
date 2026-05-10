"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Taller } from "@/lib/talleres";

export default function TalleresList({
  initialTalleres,
}: {
  initialTalleres: Taller[];
}) {
  const router = useRouter();
  const [talleres, setTalleres] = useState(initialTalleres);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [status, setStatus] = useState<{ ok?: boolean; msg?: string } | null>(
    null
  );

  function onDragStart(e: React.DragEvent, idx: number) {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(idx));
  }

  function onDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overIdx !== idx) setOverIdx(idx);
  }

  function onDrop(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) {
      setDraggedIdx(null);
      setOverIdx(null);
      return;
    }
    setTalleres((prev) => {
      const next = [...prev];
      const [moved] = next.splice(draggedIdx, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    setDirty(true);
    setDraggedIdx(null);
    setOverIdx(null);
  }

  function onDragEnd() {
    setDraggedIdx(null);
    setOverIdx(null);
  }

  // Detect if any taller's display position differs from its current n
  const positionMismatch = talleres.some((t, i) => t.n !== i + 1);
  const canSave = dirty || positionMismatch;

  async function saveOrder() {
    const ids = talleres.map((t) => t.id).filter(Boolean) as string[];
    if (ids.length !== talleres.length) {
      setStatus({
        ok: false,
        msg: "Algunos talleres no tienen ID — ¿corriste la migración SQL?",
      });
      return;
    }

    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/talleres/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "No se pudo guardar.");
      }
      setStatus({
        ok: true,
        msg: "✓ Talleres renumerados según el orden actual.",
      });
      setDirty(false);
      router.refresh();
    } catch (err) {
      setStatus({
        ok: false,
        msg: err instanceof Error ? err.message : "Error desconocido",
      });
    } finally {
      setSaving(false);
    }
  }

  async function createTaller() {
    setCreating(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/talleres", { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "No se pudo crear.");
      }
      const data = await res.json();
      router.push(`/admin/talleres/${data.slug}`);
    } catch (err) {
      setStatus({
        ok: false,
        msg: err instanceof Error ? err.message : "Error desconocido",
      });
      setCreating(false);
    }
  }

  async function deleteTaller(slug: string, title: string) {
    if (
      !confirm(
        `¿Eliminar el taller "${title}"? Esta acción no se puede deshacer.`
      )
    )
      return;
    try {
      const res = await fetch(`/api/admin/talleres/${slug}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "No se pudo eliminar.");
      }
      setTalleres((prev) => prev.filter((t) => t.slug !== slug));
      router.refresh();
      setStatus({ ok: true, msg: "✓ Taller eliminado." });
    } catch (err) {
      setStatus({
        ok: false,
        msg: err instanceof Error ? err.message : "Error",
      });
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Talleres</h1>
          <p className="mt-2 text-muted">
            Click en una fila para editar. Arrastra <span className="font-mono">⋮⋮</span>{" "}
            para reordenar.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={createTaller}
            disabled={creating}
            className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-surface transition disabled:opacity-50"
          >
            {creating ? "Creando..." : "+ Agregar taller"}
          </button>
          <button
            type="button"
            onClick={saveOrder}
            disabled={!canSave || saving}
            className="bg-accent text-ink px-5 py-2 text-sm font-semibold hover:bg-accent-bright glow-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Guardando..." : "Guardar orden"}
          </button>
        </div>
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

      <div className="border border-border divide-y divide-border bg-surface-2">
        {talleres.map((t, i) => {
          const isDragging = draggedIdx === i;
          const isOver = overIdx === i && draggedIdx !== null && draggedIdx !== i;
          const newN = i + 1;
          const numberChanged = t.n !== newN;
          const isUnpublished = t.published === false;

          return (
            <div
              key={t.id ?? t.slug}
              onDragOver={(e) => onDragOver(e, i)}
              onDrop={(e) => onDrop(e, i)}
              className={`grid md:grid-cols-12 gap-4 p-5 items-baseline transition ${
                isDragging ? "opacity-30" : ""
              } ${isOver ? "bg-accent-soft" : ""} ${
                isUnpublished ? "opacity-60 hover:opacity-100" : ""
              }`}
            >
              <div
                draggable
                onDragStart={(e) => onDragStart(e, i)}
                onDragEnd={onDragEnd}
                className="md:col-span-1 flex items-center text-muted hover:text-ink cursor-grab active:cursor-grabbing select-none"
                aria-label="Arrastra para reordenar"
                title="Arrastra para reordenar"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden
                >
                  <circle cx="5" cy="3" r="1.3" />
                  <circle cx="11" cy="3" r="1.3" />
                  <circle cx="5" cy="8" r="1.3" />
                  <circle cx="11" cy="8" r="1.3" />
                  <circle cx="5" cy="13" r="1.3" />
                  <circle cx="11" cy="13" r="1.3" />
                </svg>
              </div>
              <div className="md:col-span-1">
                <div className="font-mono text-2xl text-accent-dark leading-none">
                  {String(newN).padStart(2, "0")}
                </div>
                {numberChanged && (
                  <div className="mt-1 font-mono text-[10px] text-muted-2 line-through">
                    era {String(t.n).padStart(2, "0")}
                  </div>
                )}
              </div>
              <Link
                href={`/admin/talleres/${t.slug}`}
                className="md:col-span-6 group block"
              >
                <h3 className="font-display text-lg group-hover:text-accent-dark transition">
                  {t.title}
                </h3>
                <p className="mt-1 text-sm text-muted line-clamp-1">
                  {t.tagline || (
                    <span className="italic text-muted-2">Sin descripción</span>
                  )}
                </p>
              </Link>
              <div className="md:col-span-2">
                {isUnpublished ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-rose-700 border border-rose-200 bg-rose-50 px-2 py-1">
                    No disponible
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-700">
                    <span>✓</span>
                    <span>Disponible</span>
                  </span>
                )}
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-3 text-sm">
                <Link
                  href={`/admin/talleres/${t.slug}`}
                  className="text-accent-dark hover:text-ink transition"
                >
                  Editar →
                </Link>
                <button
                  type="button"
                  onClick={() => deleteTaller(t.slug, t.title)}
                  className="text-muted hover:text-rose-700 transition"
                  aria-label="Eliminar"
                  title="Eliminar"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted">
        Al guardar el orden, los números <span className="font-mono">n</span> y
        slugs (<span className="font-mono">/talleres/taller-X</span>) se
        reasignan según la posición visual.
      </p>
    </div>
  );
}
