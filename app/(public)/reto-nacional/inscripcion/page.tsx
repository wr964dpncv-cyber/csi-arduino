"use client";

import { useState } from "react";
import Link from "next/link";
import FormField from "@/components/FormField";
import { REGIONES_EDUCATIVAS, RETO_DATES } from "@/lib/reto";
import CircuitBackdrop from "@/components/CircuitBackdrop";

type Member = {
  nombre: string;
  apellido: string;
  emailInstitucional: string;
  emailPersonal: string;
  telefono: string;
};

const emptyMember = (): Member => ({
  nombre: "",
  apellido: "",
  emailInstitucional: "",
  emailPersonal: "",
  telefono: "",
});

const memberLabels = ["Integrante 1 · Líder", "Integrante 2", "Integrante 3"];

export default function InscripcionPage() {
  const [equipo, setEquipo] = useState({ nombre: "", escuela: "", region: "" });
  const [members, setMembers] = useState<Member[]>([
    emptyMember(),
    emptyMember(),
    emptyMember(),
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const updateMember = (i: number, key: keyof Member, value: string) => {
    setMembers((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [key]: value } : m))
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setStatus("idle");

    try {
      const res = await fetch("/api/reto/inscripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equipo, integrantes: members }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "No se pudo enviar la inscripción.");
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
            ¡Inscripción enviada!
          </h1>
          <p className="mt-6 text-muted-2 leading-relaxed">
            El equipo{" "}
            <span className="text-surface font-medium">{equipo.nombre}</span> ha
            sido inscrito al Reto Nacional CSI. Recibirás confirmación por
            correo y podrás continuar con la entrega del proyecto antes del{" "}
            <span className="text-surface">{RETO_DATES.entregaProyecto}</span>.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/reto-nacional"
              className="border border-white/20 px-6 py-3 text-sm hover:border-surface transition"
            >
              ← Volver al Reto
            </Link>
            <Link
              href="/reto-nacional/entrega"
              className="bg-accent text-ink px-6 py-3 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
            >
              Entregar proyecto →
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
        <CircuitBackdrop variant="flow-left" />
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
            Formulario 1 · {RETO_DATES.inscripcionFrom} – {RETO_DATES.inscripcionTo}
          </div>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
            Inscripción del equipo.
          </h1>
          <p className="mt-6 text-muted-2 max-w-2xl leading-relaxed">
            Un integrante registra al equipo completo. Necesitas los datos de
            los 3 miembros antes de enviar.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Datos del equipo */}
            <fieldset>
              <legend className="font-display text-2xl tracking-tight mb-6">
                Datos del equipo
              </legend>
              <div className="grid md:grid-cols-12 gap-5">
                <div className="md:col-span-5">
                  <FormField
                    label="Nombre del equipo"
                    name="equipoNombre"
                    value={equipo.nombre}
                    onChange={(v) => setEquipo({ ...equipo, nombre: v })}
                    required
                    placeholder="Ej: Los Circuitos"
                  />
                </div>
                <div className="md:col-span-4">
                  <FormField
                    label="Nombre de la escuela"
                    name="escuela"
                    value={equipo.escuela}
                    onChange={(v) => setEquipo({ ...equipo, escuela: v })}
                    required
                    placeholder="Ej: Instituto Nacional"
                  />
                </div>
                <div className="md:col-span-3">
                  <FormField
                    label="Región educativa"
                    name="region"
                    value={equipo.region}
                    onChange={(v) => setEquipo({ ...equipo, region: v })}
                    required
                    options={REGIONES_EDUCATIVAS}
                    placeholder="Seleccionar"
                  />
                </div>
              </div>
            </fieldset>

            {/* Integrantes */}
            {members.map((m, i) => (
              <fieldset key={i} className="border-t border-border pt-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 bg-ink text-surface flex items-center justify-center font-mono text-sm">
                    {i + 1}
                  </div>
                  <legend className="font-display text-2xl tracking-tight">
                    {memberLabels[i]}
                  </legend>
                </div>
                <div className="grid md:grid-cols-12 gap-5">
                  <div className="md:col-span-3">
                    <FormField
                      label="Nombre"
                      name={`m${i}_nombre`}
                      value={m.nombre}
                      onChange={(v) => updateMember(i, "nombre", v)}
                      required
                      placeholder="Juan"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <FormField
                      label="Apellido"
                      name={`m${i}_apellido`}
                      value={m.apellido}
                      onChange={(v) => updateMember(i, "apellido", v)}
                      required
                      placeholder="Pérez"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <FormField
                      label="Email institucional"
                      name={`m${i}_email_inst`}
                      type="email"
                      value={m.emailInstitucional}
                      onChange={(v) => updateMember(i, "emailInstitucional", v)}
                      required
                      placeholder="juan@colegio.edu.pa"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <FormField
                      label="Email personal"
                      name={`m${i}_email_personal`}
                      type="email"
                      value={m.emailPersonal}
                      onChange={(v) => updateMember(i, "emailPersonal", v)}
                      placeholder="juan@gmail.com"
                      hint="opcional"
                    />
                  </div>
                  <div className="md:col-span-12 md:max-w-xs">
                    <FormField
                      label="Teléfono"
                      name={`m${i}_telefono`}
                      type="tel"
                      value={m.telefono}
                      onChange={(v) => updateMember(i, "telefono", v)}
                      required
                      placeholder="+507 6xxx xxxx"
                    />
                  </div>
                </div>
              </fieldset>
            ))}

            {/* Submit */}
            <div className="border-t border-border pt-8">
              {errorMsg && (
                <div className="mb-6 border-l-2 border-rose-500 bg-rose-500/5 p-4 text-sm text-rose-700">
                  {errorMsg}
                </div>
              )}
              <p className="text-xs text-muted mb-6">
                Al inscribir el equipo confirmas que los 3 integrantes son del
                mismo colegio público y que el proyecto será original.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center bg-accent text-ink px-8 py-4 text-base font-semibold hover:bg-accent-bright glow-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Enviando..." : "Inscribir equipo →"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
