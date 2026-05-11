"use client";

import { useState } from "react";
import Link from "next/link";
import FormField from "@/components/FormField";
import { RETO_DATES } from "@/lib/reto";
import CircuitBackdrop from "@/components/CircuitBackdrop";

const MAX_WORDS = 200;

function countWords(s: string) {
  return s.trim() ? s.trim().split(/\s+/).length : 0;
}

export default function EntregaForm() {
  const [equipoNombre, setEquipoNombre] = useState("");
  const [proyectoNombre, setProyectoNombre] = useState("");
  const [tinkercadUrl, setTinkercadUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const wordCount = countWords(descripcion);
  const wordLimitExceeded = wordCount > MAX_WORDS;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (wordLimitExceeded) {
      setErrorMsg(`La descripción supera el límite de ${MAX_WORDS} palabras.`);
      setStatus("error");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    setStatus("idle");

    try {
      const res = await fetch("/api/reto/entrega", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipoNombre,
          proyectoNombre,
          tinkercadUrl,
          videoUrl,
          descripcion,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "No se pudo enviar el proyecto.");
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "success") {
    return (
      <section className="bg-ink text-surface min-h-screen flex items-center">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center bg-accent text-ink font-mono text-2xl mb-8">
            ✓
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
            ¡Proyecto entregado!
          </h1>
          <p className="mt-6 text-muted-2 leading-relaxed">
            El proyecto{" "}
            <span className="text-surface font-medium">{proyectoNombre}</span> del
            equipo{" "}
            <span className="text-surface font-medium">{equipoNombre}</span> ha
            sido recibido. El jurado evaluará todas las entregas y los 10
            finalistas se anunciarán el{" "}
            <span className="text-surface">{RETO_DATES.finalistas}</span>.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/reto-nacional"
              className="bg-accent text-ink px-6 py-3 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
            >
              Volver al Reto →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-ink text-surface relative overflow-hidden">
        <CircuitBackdrop variant="sparse" />
        <div className="relative mx-auto max-w-4xl px-6 pt-12">
          <Link
            href="/reto-nacional"
            className="inline-flex items-center gap-2 text-sm text-muted-2 hover:text-surface transition"
          >
            <span>←</span>
            <span>Reto Nacional</span>
          </Link>
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-12 md:py-16">
          <div className="text-xs font-mono text-muted-2 mb-3">
            Formulario 2 · Antes del {RETO_DATES.entregaProyecto}
          </div>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
            Entrega del proyecto.
          </h1>
          <p className="mt-6 text-muted-2 max-w-2xl leading-relaxed">
            El equipo sube los 3 elementos: link de Tinkercad, video de 2
            minutos y descripción escrita.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField
                label="Nombre del equipo"
                name="equipoNombre"
                value={equipoNombre}
                onChange={setEquipoNombre}
                required
                placeholder="Ej: Los Circuitos"
              />
              <FormField
                label="Nombre del proyecto"
                name="proyectoNombre"
                value={proyectoNombre}
                onChange={setProyectoNombre}
                required
                placeholder="Ej: Sistema de riego inteligente"
              />
            </div>

            <FormField
              label="Link de Tinkercad"
              name="tinkercadUrl"
              type="url"
              value={tinkercadUrl}
              onChange={setTinkercadUrl}
              required
              placeholder="https://www.tinkercad.com/things/..."
              hint="simulación funcional"
            />

            <FormField
              label="Link del video"
              name="videoUrl"
              type="url"
              value={videoUrl}
              onChange={setVideoUrl}
              required
              placeholder="YouTube, Google Drive o enlace directo"
              hint="máx. 2 min"
            />

            <div>
              <FormField
                label="Descripción del proyecto"
                name="descripcion"
                value={descripcion}
                onChange={setDescripcion}
                required
                rows={6}
                placeholder="¿Qué problema resuelve? ¿Qué componentes usa? ¿Cómo funciona?"
                hint={`máx. ${MAX_WORDS} palabras`}
              />
              <div
                className={`mt-2 text-xs font-mono ${wordLimitExceeded ? "text-rose-700" : "text-muted-2"}`}
              >
                {wordCount} / {MAX_WORDS} palabras
              </div>
            </div>

            {errorMsg && (
              <div className="border-l-2 border-rose-500 bg-rose-500/5 p-4 text-sm text-rose-700">
                {errorMsg}
              </div>
            )}

            <div className="border-t border-border pt-8">
              <p className="text-xs text-muted mb-6">
                Al entregar el proyecto confirmas que es original y creado por
                los integrantes del equipo.
              </p>
              <button
                type="submit"
                disabled={submitting || wordLimitExceeded}
                className="inline-flex items-center bg-accent text-ink px-8 py-4 text-base font-semibold hover:bg-accent-bright glow-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Enviando..." : "Entregar proyecto →"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
