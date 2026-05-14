"use client";

import { useState, useTransition } from "react";

export type Setting = {
  key: string;
  enabled: boolean;
  updated_at?: string;
  label?: string;
  description?: string;
  emoji?: string;
};

export default function NotificationsForm({
  settings,
}: {
  settings: Setting[];
}) {
  const [items, setItems] = useState(settings);
  const [pending, startTransition] = useTransition();
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function toggle(key: string, next: boolean) {
    const prev = items.find((i) => i.key === key)?.enabled ?? true;
    setItems((s) =>
      s.map((i) => (i.key === key ? { ...i, enabled: next } : i))
    );
    setErrorKey(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/notificaciones", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, enabled: next }),
        });
        if (!res.ok) throw new Error("Falló el guardado");
        setSavedKey(key);
        setTimeout(() => setSavedKey(null), 1800);
      } catch {
        setItems((s) =>
          s.map((i) => (i.key === key ? { ...i, enabled: prev } : i))
        );
        setErrorKey(key);
      }
    });
  }

  return (
    <div className="border border-border bg-surface-2 divide-y divide-border">
      {items.map((it) => (
        <div
          key={it.key}
          className="px-5 py-5 flex items-start gap-4 justify-between"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden>
                {it.emoji ?? "📩"}
              </span>
              <div className="font-display text-base tracking-tight">
                {it.label ?? it.key}
              </div>
              {savedKey === it.key && (
                <span className="text-xs font-mono text-emerald-700">
                  Guardado ✓
                </span>
              )}
              {errorKey === it.key && (
                <span className="text-xs font-mono text-rose-700">
                  Error · reintenta
                </span>
              )}
            </div>
            {it.description && (
              <p className="mt-1 text-sm text-muted leading-relaxed">
                {it.description}
              </p>
            )}
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={it.enabled}
            aria-label={`${it.enabled ? "Desactivar" : "Activar"} ${it.label ?? it.key}`}
            onClick={() => toggle(it.key, !it.enabled)}
            disabled={pending}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center transition disabled:opacity-50 ${
              it.enabled ? "bg-accent" : "bg-border"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 bg-surface transition-transform ${
                it.enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
