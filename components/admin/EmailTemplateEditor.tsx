"use client";

import { useMemo, useState } from "react";
import type { EmailTemplate, Variant } from "@/lib/emailTemplates";
import type { Recipient } from "@/app/admin/(panel)/emails/page";

type Props = {
  variant: Variant;
  variantLabel: string;
  variantDescription: string;
  template: EmailTemplate;
  recipients: Recipient[];
  total: number;
};

type SaveState = { kind: "idle" } | { kind: "saving" } | { kind: "ok" } | { kind: "error"; msg: string };
type TestState = SaveState;
type BulkState =
  | { kind: "idle" }
  | {
      kind: "sending";
      batch: number;
      totalBatches: number;
      sent: number;
      failed: number;
      total: number;
    }
  | { kind: "ok"; sent: number; failed: number; total: number }
  | { kind: "error"; msg: string; sent: number; failed: number };

// El servidor tiene tope de 500 por request, pero además los serverless
// de Vercel cortan a 60s — con la tarifa free de Resend (10 emails/s)
// eso son ~600 emails como mucho. Quedarnos en 100 por lote da margen
// holgado y permite mostrar progreso al usuario.
const BATCH_SIZE = 100;
type SingleState =
  | { kind: "idle" }
  | { kind: "sending"; email: string }
  | { kind: "ok"; name: string; email: string }
  | { kind: "error"; email: string; msg: string };

const VARIANT_ACCENT: Record<Variant, string> = {
  A: "bg-amber-100 text-amber-800 border-amber-200",
  B: "bg-violet-100 text-violet-800 border-violet-200",
  C: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export default function EmailTemplateEditor({
  variant,
  variantLabel,
  variantDescription,
  template,
  recipients,
  total,
}: Props) {
  const [form, setForm] = useState({
    enabled: template.enabled,
    subject: template.subject,
    title: template.title,
    intro_html: template.intro_html,
    body_html: template.body_html,
    cta_label: template.cta_label ?? "",
    cta_url: template.cta_url ?? "",
    signature_html: template.signature_html,
  });
  const [showPreview, setShowPreview] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(
    new Set(recipients.map((r) => r.email))
  );
  const [showRecipients, setShowRecipients] = useState(false);
  const [filter, setFilter] = useState("");
  const [save, setSave] = useState<SaveState>({ kind: "idle" });
  const [test, setTest] = useState<TestState>({ kind: "idle" });
  const [bulk, setBulk] = useState<BulkState>({ kind: "idle" });
  const [single, setSingle] = useState<SingleState>({ kind: "idle" });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (save.kind === "ok") setSave({ kind: "idle" });
  }

  function buildOverride() {
    return {
      enabled: form.enabled,
      subject: form.subject,
      title: form.title,
      intro_html: form.intro_html,
      body_html: form.body_html,
      cta_label: form.cta_label.trim() || null,
      cta_url: form.cta_url.trim() || null,
      signature_html: form.signature_html,
    };
  }

  async function handleSave() {
    setSave({ kind: "saving" });
    try {
      const res = await fetch("/api/admin/email-templates", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant, ...buildOverride() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setSave({ kind: "ok" });
    } catch (err) {
      setSave({
        kind: "error",
        msg: err instanceof Error ? err.message : String(err),
      });
    }
  }

  async function handleSendTest() {
    setTest({ kind: "saving" });
    try {
      const mock = mockForVariant(variant, total);
      const res = await fetch("/api/admin/campaign/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant,
          template: buildOverride(),
          mockVars: {
            nombre: mock.nombre,
            completed: mock.completed,
            total,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setTest({ kind: "ok" });
    } catch (err) {
      setTest({
        kind: "error",
        msg: err instanceof Error ? err.message : String(err),
      });
    }
  }

  async function handleSendOne(r: Recipient) {
    const ok = window.confirm(
      `¿Enviar el correo a ${r.name} (${r.email})?\n\nEsto va al inbox real del estudiante.`
    );
    if (!ok) return;
    setSingle({ kind: "sending", email: r.email });
    try {
      const res = await fetch("/api/admin/campaign/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant,
          total,
          recipients: [{ email: r.email, name: r.name, completed: r.completed }],
          template: buildOverride(),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      if (json.failed && json.failed > 0) {
        const detail =
          json.failures?.[0]?.error ?? "Falló sin detalle del servidor";
        setSingle({ kind: "error", email: r.email, msg: detail });
      } else {
        setSingle({ kind: "ok", name: r.name, email: r.email });
      }
    } catch (err) {
      setSingle({
        kind: "error",
        email: r.email,
        msg: err instanceof Error ? err.message : String(err),
      });
    }
  }

  async function handleSendBulk() {
    if (selected.size === 0) return;
    const allPayload = recipients
      .filter((r) => selected.has(r.email))
      .map((r) => ({
        email: r.email,
        name: r.name,
        completed: r.completed,
      }));

    const totalRecipients = allPayload.length;
    const totalBatches = Math.ceil(totalRecipients / BATCH_SIZE);
    const lots =
      totalBatches > 1
        ? ` en ${totalBatches} tandas de hasta ${BATCH_SIZE}`
        : "";
    const ok = window.confirm(
      `¿Enviar el correo a ${totalRecipients} estudiante${totalRecipients === 1 ? "" : "s"} de la cohorte "${variantLabel}"${lots}?\n\nLos correos saldrán a sus inboxes reales. Esto no se puede deshacer.`
    );
    if (!ok) return;

    let sent = 0;
    let failed = 0;
    setBulk({
      kind: "sending",
      batch: 0,
      totalBatches,
      sent: 0,
      failed: 0,
      total: totalRecipients,
    });

    for (let i = 0; i < totalBatches; i++) {
      const chunk = allPayload.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
      setBulk({
        kind: "sending",
        batch: i + 1,
        totalBatches,
        sent,
        failed,
        total: totalRecipients,
      });
      try {
        const res = await fetch("/api/admin/campaign/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            variant,
            total,
            recipients: chunk,
            template: buildOverride(),
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
        sent += json.sent ?? 0;
        failed += json.failed ?? 0;
      } catch (err) {
        // If a whole batch fails, count its recipients as failed but keep
        // going with the next batches so a transient blip doesn't kill the
        // whole send.
        failed += chunk.length;
        console.error(
          `[bulk send] lote ${i + 1}/${totalBatches} falló:`,
          err
        );
      }
    }

    setBulk({ kind: "ok", sent, failed, total: totalRecipients });
  }

  const previewHtml = useMemo(() => {
    return buildPreview(form, total, mockForVariant(variant, total));
  }, [form, total, variant]);

  const previewSubject = useMemo(() => {
    const mock = mockForVariant(variant, total);
    return substituteVars(form.subject, {
      nombre: mock.nombre,
      completed: mock.completed,
      total,
      missing: Math.max(0, total - mock.completed),
    });
  }, [form.subject, variant, total]);

  const filteredRecipients = useMemo(() => {
    if (!filter.trim()) return recipients;
    const f = filter.toLowerCase();
    return recipients.filter(
      (r) =>
        r.email.toLowerCase().includes(f) ||
        r.name.toLowerCase().includes(f) ||
        (r.school ?? "").toLowerCase().includes(f)
    );
  }, [recipients, filter]);

  function toggleOne(email: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email);
      else next.add(email);
      return next;
    });
  }
  function selectAll() {
    setSelected(new Set(recipients.map((r) => r.email)));
  }
  function selectNone() {
    setSelected(new Set());
  }

  return (
    <section className="border border-border bg-surface-2">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-3 px-5 py-4 border-b border-border bg-surface">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-block text-[10px] font-mono uppercase tracking-wider border px-1.5 py-0.5 ${VARIANT_ACCENT[variant]}`}
            >
              {variant} · {variantLabel}
            </span>
            <span className="text-xs font-mono text-muted">
              {recipients.length} destinatario{recipients.length === 1 ? "" : "s"}
            </span>
          </div>
          <p className="text-sm text-muted max-w-2xl">{variantDescription}</p>
        </div>
      </header>

      {/* Form */}
      <div className="grid lg:grid-cols-2">
        <div className="p-5 space-y-4 border-b lg:border-b-0 lg:border-r border-border">
          <Field label="Asunto">
            <input
              type="text"
              value={form.subject}
              onChange={(e) => update("subject", e.target.value)}
              className="w-full px-3 py-2 border border-border bg-surface text-sm font-mono"
            />
          </Field>

          <Field label="Título del header (interno del email)">
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full px-3 py-2 border border-border bg-surface text-sm"
            />
          </Field>

          <Field label="Saludo (HTML)">
            <input
              type="text"
              value={form.intro_html}
              onChange={(e) => update("intro_html", e.target.value)}
              className="w-full px-3 py-2 border border-border bg-surface text-sm font-mono"
            />
          </Field>

          <Field label="Cuerpo (HTML)">
            <textarea
              value={form.body_html}
              onChange={(e) => update("body_html", e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-border bg-surface text-sm font-mono"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Texto del botón (CTA)">
              <input
                type="text"
                value={form.cta_label}
                onChange={(e) => update("cta_label", e.target.value)}
                className="w-full px-3 py-2 border border-border bg-surface text-sm"
                placeholder="(vacío = sin botón)"
              />
            </Field>
            <Field label="URL del botón">
              <input
                type="text"
                value={form.cta_url}
                onChange={(e) => update("cta_url", e.target.value)}
                className="w-full px-3 py-2 border border-border bg-surface text-sm font-mono"
                placeholder="{sitio}/talleres"
              />
            </Field>
          </div>

          <Field label="Firma (HTML)">
            <textarea
              value={form.signature_html}
              onChange={(e) => update("signature_html", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border bg-surface text-sm font-mono"
            />
          </Field>

          <label className="flex items-center gap-2 pt-2 text-sm">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) => update("enabled", e.target.checked)}
            />
            <span>Plantilla activa</span>
          </label>

          {/* Actions */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={save.kind === "saving"}
                className="inline-flex items-center border border-ink bg-ink text-surface px-4 py-2 text-xs font-medium uppercase tracking-wide hover:bg-accent-dark hover:border-accent-dark transition disabled:opacity-60"
              >
                {save.kind === "saving" ? "Guardando…" : "Guardar cambios"}
              </button>
              <button
                type="button"
                onClick={handleSendTest}
                disabled={test.kind === "saving"}
                className="inline-flex items-center border border-border bg-surface px-4 py-2 text-xs font-medium hover:border-ink transition disabled:opacity-60"
              >
                {test.kind === "saving"
                  ? "Enviando…"
                  : "✉ Enviar prueba a johnny018@live.com"}
              </button>
              <button
                type="button"
                onClick={() => setShowPreview((s) => !s)}
                className="inline-flex items-center border border-border bg-surface px-4 py-2 text-xs font-medium hover:border-ink transition"
              >
                {showPreview ? "Ocultar preview" : "Mostrar preview"}
              </button>
            </div>
            <Feedback save={save} test={test} bulk={bulk} single={single} />
          </div>

          {/* Recipients */}
          <div className="pt-5 border-t border-border space-y-2">
            <button
              type="button"
              onClick={() => setShowRecipients((s) => !s)}
              className="text-sm font-medium text-ink hover:underline"
            >
              {showRecipients ? "▾" : "▸"} Destinatarios ({selected.size} de{" "}
              {recipients.length})
            </button>
            {showRecipients && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filtrar por nombre, email o escuela"
                    className="flex-1 min-w-[200px] px-3 py-1.5 border border-border bg-surface text-xs"
                  />
                  <button
                    type="button"
                    onClick={selectAll}
                    className="text-xs font-mono text-muted hover:text-ink underline"
                  >
                    todos
                  </button>
                  <button
                    type="button"
                    onClick={selectNone}
                    className="text-xs font-mono text-muted hover:text-ink underline"
                  >
                    ninguno
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto border border-border bg-surface">
                  {filteredRecipients.length === 0 ? (
                    <div className="p-3 text-xs text-muted text-center">
                      Sin destinatarios para mostrar.
                    </div>
                  ) : (
                    <ul className="divide-y divide-border">
                      {filteredRecipients.map((r) => {
                        const sending =
                          single.kind === "sending" && single.email === r.email;
                        return (
                          <li
                            key={r.email}
                            className="flex items-center gap-3 px-3 py-1.5 hover:bg-surface-2"
                          >
                            <label className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selected.has(r.email)}
                                onChange={() => toggleOne(r.email)}
                              />
                              <span className="flex-1 min-w-0 text-sm truncate">
                                {r.name}
                              </span>
                              <span className="text-xs font-mono text-muted truncate hidden sm:inline">
                                {r.email}
                              </span>
                              {variant === "A" && (
                                <span className="text-[10px] font-mono text-muted-2 w-12 text-right shrink-0">
                                  {r.completed}/{total}
                                </span>
                              )}
                            </label>
                            <button
                              type="button"
                              onClick={() => handleSendOne(r)}
                              disabled={sending || single.kind === "sending"}
                              title={`Enviar solo a ${r.name}`}
                              className="shrink-0 text-[10px] font-mono uppercase tracking-wider border border-border bg-surface px-2 py-1 text-ink hover:border-ink hover:bg-surface-2 transition disabled:opacity-50 disabled:cursor-wait"
                            >
                              {sending ? "…" : "→ enviar"}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSendBulk}
                  disabled={selected.size === 0 || bulk.kind === "sending"}
                  className="w-full inline-flex items-center justify-center border border-accent bg-accent text-ink px-4 py-2.5 text-sm font-medium uppercase tracking-wide hover:bg-accent-dark hover:border-accent-dark hover:text-surface transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bulk.kind === "sending"
                    ? `Enviando lote ${bulk.batch}/${bulk.totalBatches} · ${bulk.sent}/${bulk.total}…`
                    : `↑ Enviar a ${selected.size} estudiante${selected.size === 1 ? "" : "s"}${selected.size > BATCH_SIZE ? ` (${Math.ceil(selected.size / BATCH_SIZE)} tandas)` : ""}`}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-[#f4f1ea] min-h-[400px]">
          {showPreview ? (
            <div className="p-5">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted mb-2">
                Vista previa · datos de ejemplo
              </div>
              <div className="text-xs font-mono text-muted mb-3 truncate">
                Asunto: <span className="text-ink">{previewSubject}</span>
              </div>
              <iframe
                title={`Preview ${variant}`}
                srcDoc={previewHtml}
                sandbox=""
                className="w-full min-h-[600px] border border-border bg-white"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-muted p-5">
              Preview oculto.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function Feedback({
  save,
  test,
  bulk,
  single,
}: {
  save: SaveState;
  test: TestState;
  bulk: BulkState;
  single: SingleState;
}) {
  return (
    <div className="space-y-1.5 text-xs font-mono">
      {save.kind === "ok" && (
        <div className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1">
          Guardado.
        </div>
      )}
      {save.kind === "error" && (
        <div className="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1">
          Error al guardar: {save.msg}
        </div>
      )}
      {test.kind === "ok" && (
        <div className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1">
          Prueba enviada a johnny018@live.com.
        </div>
      )}
      {test.kind === "error" && (
        <div className="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1">
          Error en prueba: {test.msg}
        </div>
      )}
      {single.kind === "ok" && (
        <div className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1">
          Enviado a {single.name} ({single.email}).
        </div>
      )}
      {single.kind === "error" && (
        <div className="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1">
          Error al enviar a {single.email}: {single.msg}
        </div>
      )}
      {bulk.kind === "sending" && (
        <div className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1">
          Enviando lote {bulk.batch} de {bulk.totalBatches} · {bulk.sent}/
          {bulk.total} enviados…
        </div>
      )}
      {bulk.kind === "ok" && (
        <div
          className={
            bulk.failed > 0
              ? "text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1"
              : "text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1"
          }
        >
          Envío masivo terminado: {bulk.sent} de {bulk.total} enviados
          {bulk.failed > 0 ? ` · ${bulk.failed} fallidos` : ""}.
        </div>
      )}
      {bulk.kind === "error" && (
        <div className="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1">
          Error en envío masivo: {bulk.msg}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Client-side rendering helpers — mirror lib/emailTemplates +
// lib/notify so the preview matches what's actually sent.
// ============================================================

function substituteVars(
  s: string,
  v: { nombre: string; completed: number; total: number; missing: number }
): string {
  const lookup: Record<string, string> = {
    nombre: v.nombre,
    completed: String(v.completed),
    total: String(v.total),
    missing: String(v.missing),
    sitio: "https://csi-arduino.vercel.app",
  };
  return s.replace(/{(\w+)}/g, (m, key: string) =>
    Object.prototype.hasOwnProperty.call(lookup, key) ? lookup[key] : m
  );
}

function buildProgressStrip(completed: number, total: number): string {
  if (total <= 0) return "";
  const cells = Array.from({ length: total }, (_, i) => {
    const filled = i < completed;
    return `<td style="background:${filled ? "#0b1a35" : "#e5dfd0"};height:10px;border-right:2px solid #ffffff;"></td>`;
  }).join("");
  const pct = Math.round((completed / total) * 100);
  return `
    <div style="margin-top:24px;padding:14px;background:#f4f1ea;">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#6b6657;margin-bottom:8px;">
        Tu progreso · ${completed}/${total} (${pct}%)
      </div>
      <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
        <tr>${cells}</tr>
      </table>
    </div>
  `;
}

type FormValues = {
  enabled: boolean;
  subject: string;
  title: string;
  intro_html: string;
  body_html: string;
  cta_label: string;
  cta_url: string;
  signature_html: string;
};

type MockVars = {
  nombre: string;
  completed: number;
};

function mockForVariant(variant: Variant, total: number): MockVars {
  const defaults: Record<Variant, MockVars> = {
    A: { nombre: "Carlos", completed: Math.max(1, Math.min(3, total - 1)) },
    B: { nombre: "Andrés", completed: 0 },
    C: { nombre: "María", completed: total },
  };
  return defaults[variant];
}

function buildPreview(
  form: FormValues,
  total: number,
  mock: MockVars
): string {
  const vars = {
    nombre: mock.nombre,
    completed: mock.completed,
    total,
    missing: Math.max(0, total - mock.completed),
  };
  const subst = (s: string) => substituteVars(s, vars);

  const title = subst(form.title);
  const intro = subst(form.intro_html);
  const body = subst(form.body_html);
  const sig = subst(form.signature_html);
  const ctaLabel = form.cta_label ? subst(form.cta_label) : null;
  const ctaUrl = form.cta_url ? subst(form.cta_url) : null;

  const ctaBlock =
    ctaLabel && ctaUrl
      ? `<div style="margin-top:32px;">
          <a href="${ctaUrl}" style="display:inline-block;background:#f5b80c;color:#0b1a35;padding:12px 22px;text-decoration:none;font-weight:600;font-size:14px;">${ctaLabel} →</a>
        </div>`
      : "";
  const progressStrip = buildProgressStrip(mock.completed, total);

  const body_full = `
    <div style="font-size:15px;line-height:1.6;color:#0b1a35;">${intro}</div>
    <div style="font-size:15px;line-height:1.7;color:#0b1a35;margin-top:14px;">${body}</div>
    ${progressStrip}
    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e5dfd0;font-size:14px;line-height:1.6;color:#0b1a35;">${sig}</div>
  `;

  return `<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#f4f1ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0b1a35;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e5dfd0;">
        <tr><td style="background:#0b1a35;color:#ffffff;padding:24px 28px;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#f5b80c;">CSI · Principios de Arduino</div>
          <div style="font-size:22px;font-weight:600;margin-top:6px;letter-spacing:-0.01em;">${title}</div>
        </td></tr>
        <tr><td style="padding:28px;">
          ${body_full}
          ${ctaBlock}
        </td></tr>
        <tr><td style="padding:18px 28px;background:#f4f1ea;color:#6b6657;font-size:12px;border-top:1px solid #e5dfd0;">
          Notificación automática · csi-arduino.com
          <div style="margin-top:10px;font-size:11px;color:#9d978a;">
            ¿No quieres recibir más correos del programa?
            <a href="#" style="color:#6b6657;text-decoration:underline;">Darte de baja con un click</a>.
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
