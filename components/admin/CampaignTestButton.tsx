"use client";

import { useState } from "react";

type Result = {
  ok: boolean;
  recipient?: string;
  results?: Array<{ variant: string; ok: boolean; error?: string }>;
  error?: string;
};

export default function CampaignTestButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function send() {
    if (loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/campaign/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const json = (await res.json()) as Result;
      if (!res.ok) {
        setResult({ ok: false, error: json.error ?? `HTTP ${res.status}` });
      } else {
        setResult(json);
      }
    } catch (err) {
      setResult({
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setLoading(false);
    }
  }

  const sentOk =
    result?.ok && (result.results?.every((r) => r.ok) ?? false);
  const sentPartial =
    result?.ok && (result.results?.some((r) => r.ok) ?? false);

  return (
    <div className="inline-flex flex-col gap-2 items-start">
      <button
        type="button"
        onClick={send}
        disabled={loading}
        className="inline-flex items-center border border-border bg-surface-2 px-3 py-2 text-xs font-medium hover:border-ink hover:bg-surface transition disabled:opacity-60 disabled:cursor-wait"
      >
        {loading ? "Enviando…" : "✉ Enviar email de prueba a Daniel"}
      </button>
      {result && (
        <div
          className={`text-[11px] font-mono px-2 py-1 ${
            sentOk
              ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
              : sentPartial
                ? "text-amber-700 bg-amber-50 border border-amber-200"
                : "text-rose-700 bg-rose-50 border border-rose-200"
          }`}
        >
          {sentOk
            ? `Enviado a ${result.recipient} · 3 variantes (A, B, C)`
            : result.error
              ? `Error: ${result.error}`
              : `Parcial — revisar consola`}
        </div>
      )}
    </div>
  );
}
