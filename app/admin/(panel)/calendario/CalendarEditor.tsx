"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CalendarEvent } from "@/lib/data";

type Row = CalendarEvent & { _dirty?: boolean; _new?: boolean };

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;

export default function CalendarEditor({
  initialEvents,
}: {
  initialEvents: CalendarEvent[];
}) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>(initialEvents);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ ok?: boolean; msg?: string } | null>(
    null
  );

  function update(i: number, patch: Partial<Row>) {
    setRows((r) =>
      r.map((row, idx) => (idx === i ? { ...row, ...patch, _dirty: true } : row))
    );
  }

  function addRow() {
    setRows((r) => [
      ...r,
      {
        taller_n: r.length + 4,
        day: "Lun",
        date_text: "",
        time: "18:00",
        sort_order: r.length + 1,
        _dirty: true,
        _new: true,
      },
    ]);
  }

  async function removeRow(i: number) {
    const row = rows[i];
    if (row._new || !row.id) {
      setRows((r) => r.filter((_, idx) => idx !== i));
      return;
    }
    if (!confirm(`¿Eliminar la fecha del Taller ${row.taller_n}?`)) return;

    const res = await fetch(`/api/admin/calendario/${row.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setRows((r) => r.filter((_, idx) => idx !== i));
      router.refresh();
    } else {
      setStatus({ ok: false, msg: "No se pudo eliminar." });
    }
  }

  async function saveAll() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/calendario", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          events: rows.map((r, i) => ({
            id: r._new ? undefined : r.id,
            taller_n: r.taller_n,
            day: r.day,
            date_text: r.date_text,
            time: r.time,
            sort_order: i + 1,
          })),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Error al guardar");
      }
      setStatus({ ok: true, msg: "✓ Calendario guardado." });
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
    "border border-border bg-surface-2 px-3 py-2 text-ink focus:border-ink focus:outline-none transition";
  const dirty = rows.some((r) => r._dirty);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Calendario</h1>
          <p className="mt-2 text-muted">
            Edita las fechas en las que se publica cada taller.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={addRow}
            className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-surface transition"
          >
            + Agregar fecha
          </button>
          <button
            type="button"
            onClick={saveAll}
            disabled={!dirty || saving}
            className="bg-accent text-ink px-5 py-2 text-sm font-semibold hover:bg-accent-bright glow-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
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

      <div className="border border-border bg-surface-2 divide-y divide-border">
        <div className="grid md:grid-cols-12 gap-3 p-4 bg-surface text-xs font-mono uppercase tracking-wider text-muted">
          <div className="md:col-span-2">Taller #</div>
          <div className="md:col-span-2">Día</div>
          <div className="md:col-span-5">Fecha</div>
          <div className="md:col-span-2">Hora</div>
          <div className="md:col-span-1"></div>
        </div>
        {rows.map((row, i) => (
          <div
            key={row.id ?? `new-${i}`}
            className="grid md:grid-cols-12 gap-3 p-4 items-center"
          >
            <div className="md:col-span-2">
              <input
                type="number"
                className={inputCls + " w-full font-mono"}
                value={row.taller_n}
                onChange={(e) =>
                  update(i, { taller_n: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div className="md:col-span-2">
              <select
                className={inputCls + " w-full"}
                value={row.day}
                onChange={(e) => update(i, { day: e.target.value })}
              >
                {DAYS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-5">
              <input
                type="text"
                className={inputCls + " w-full"}
                value={row.date_text}
                onChange={(e) => update(i, { date_text: e.target.value })}
                placeholder="6 de abril"
              />
            </div>
            <div className="md:col-span-2">
              <input
                type="text"
                className={inputCls + " w-full font-mono"}
                value={row.time}
                onChange={(e) => update(i, { time: e.target.value })}
                placeholder="18:00"
              />
            </div>
            <div className="md:col-span-1 text-right">
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="text-muted hover:text-rose-700 transition"
                aria-label="Eliminar"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted">
        Los cambios se guardan al hacer clic en{" "}
        <span className="font-medium text-ink">Guardar cambios</span>.
      </p>
    </div>
  );
}
