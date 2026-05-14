"use client";

import { useState } from "react";
import { REGIONES_EDUCATIVAS } from "@/lib/reto";

export default function InteresForm() {
  const [data, setData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    escuela: "",
    region: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update = (key: keyof typeof data, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setStatus("idle");
    try {
      const res = await fetch("/api/reto/interes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "No se pudo enviar.");
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full bg-white/[0.04] border border-white/15 px-4 py-3 text-sm text-surface placeholder:text-muted-2/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40 transition";

  if (status === "success") {
    return (
      <div className="border border-accent/40 bg-accent/10 px-6 py-8 text-center">
        <div className="inline-flex h-10 w-10 items-center justify-center bg-accent text-ink font-mono mb-3">
          ✓
        </div>
        <div className="font-display text-2xl text-surface tracking-tight">
          ¡Gracias!
        </div>
        <p className="mt-3 text-sm text-muted-2 leading-relaxed">
          Te avisaremos por correo apenas se publiquen las bases del Reto.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-left bg-white/[0.03] border border-white/15 backdrop-blur-sm p-6 md:p-8"
    >
      <div className="text-center mb-5">
        <div className="font-mono text-[11px] text-accent uppercase tracking-[0.2em] mb-2">
          ¿Te interesa?
        </div>
        <div className="font-display text-xl md:text-2xl text-surface tracking-tight">
          Déjanos tu información.
        </div>
        <p className="mt-2 text-sm text-muted-2">
          Te avisamos por correo cuando se abra la inscripción.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <input
          required
          name="nombre"
          value={data.nombre}
          onChange={(e) => update("nombre", e.target.value)}
          placeholder="Nombre completo *"
          className={inputCls}
        />
        <input
          required
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="Correo electrónico *"
          className={inputCls}
        />
        <input
          required
          type="tel"
          name="telefono"
          value={data.telefono}
          onChange={(e) => update("telefono", e.target.value)}
          placeholder="Teléfono / WhatsApp *"
          className={inputCls}
        />
        <input
          name="escuela"
          value={data.escuela}
          onChange={(e) => update("escuela", e.target.value)}
          placeholder="Escuela"
          className={inputCls}
        />
        <select
          name="region"
          value={data.region}
          onChange={(e) => update("region", e.target.value)}
          className={inputCls}
        >
          <option value="">Región educativa</option>
          {REGIONES_EDUCATIVAS.map((r) => (
            <option key={r} value={r} className="text-ink">
              {r}
            </option>
          ))}
        </select>
      </div>

      {errorMsg && (
        <div className="mt-4 border border-rose-400/40 bg-rose-500/10 text-rose-200 px-3 py-2 text-xs">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full bg-accent text-ink px-6 py-3.5 text-sm font-semibold hover:bg-accent-bright glow-gold transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {submitting ? (
          "Enviando…"
        ) : (
          <>
            <span>Quiero más información</span>
            <span aria-hidden>→</span>
          </>
        )}
      </button>
    </form>
  );
}
