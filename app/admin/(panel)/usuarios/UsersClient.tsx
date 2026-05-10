"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isOwner } from "@/lib/adminAuth";
import PageHeader from "@/components/admin/PageHeader";

type User = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
};

export default function UsersClient({
  initialUsers,
  currentUserId,
}: {
  initialUsers: User[];
  currentUserId: string | null;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      const r = await fetch("/api/admin/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || "Error al crear el usuario");
      setSuccess(`Usuario ${email} creado.`);
      setEmail("");
      setPassword("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string, userEmail: string) {
    if (
      !confirm(
        `¿Eliminar al usuario ${userEmail}? Perderá acceso al admin de inmediato.`
      )
    )
      return;
    const r = await fetch(`/api/admin/usuarios/${id}`, { method: "DELETE" });
    if (r.ok) {
      router.refresh();
    } else {
      const data = await r.json().catch(() => ({}));
      alert(data.error || "Error al eliminar");
    }
  }

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Sistema · Accesos"
        title="Usuarios"
        description="Administra quiénes tienen acceso al panel admin."
        meta={
          <span>
            {initialUsers.length}{" "}
            {initialUsers.length === 1 ? "usuario" : "usuarios"}
          </span>
        }
      />

      {/* Form */}
      <section className="border border-border bg-surface-2 p-6">
        <h2 className="font-display text-xl tracking-tight mb-4">
          Crear usuario
        </h2>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-3">
          <label className="block">
            <div className="text-xs text-muted mb-1.5 font-mono uppercase tracking-wider">
              Email
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              className="w-full border border-border bg-surface px-3 py-2 text-sm"
              placeholder="correo@ejemplo.com"
            />
          </label>
          <label className="block">
            <div className="text-xs text-muted mb-1.5 font-mono uppercase tracking-wider">
              Contraseña
            </div>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full border border-border bg-surface px-3 py-2 text-sm font-mono"
              placeholder="mínimo 6 caracteres"
            />
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-ink text-surface px-4 py-2 text-sm font-medium hover:bg-accent hover:text-ink transition disabled:opacity-50"
            >
              {submitting ? "Creando…" : "Crear usuario"}
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2">
            {success}
          </div>
        )}
      </section>

      {/* List */}
      <section>
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-2 mb-3">
          Usuarios con acceso
        </div>
        <div className="border border-border overflow-x-auto bg-surface-2">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface">
              <tr className="text-left">
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Email
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Creado
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Último ingreso
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {initialUsers.map((u) => {
                const isMe = u.id === currentUserId;
                const isSuper = isOwner(u.email);
                return (
                  <tr key={u.id} className="hover:bg-surface transition">
                    <td className="px-4 py-3 align-top font-medium">
                      {u.email}
                      {isSuper && (
                        <span className="ml-2 inline-block text-[10px] font-mono uppercase tracking-wider bg-ink text-surface px-1.5 py-0.5">
                          super admin
                        </span>
                      )}
                      {isMe && !isSuper && (
                        <span className="ml-2 inline-block text-[10px] font-mono uppercase tracking-wider bg-accent text-ink px-1.5 py-0.5">
                          tú
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top text-muted font-mono text-xs whitespace-nowrap">
                      {new Date(u.created_at).toLocaleDateString("es-PA", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 align-top text-muted font-mono text-xs whitespace-nowrap">
                      {u.last_sign_in_at
                        ? new Date(u.last_sign_in_at).toLocaleDateString(
                            "es-PA",
                            {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "—"}
                    </td>
                    <td className="px-4 py-3 align-top text-right whitespace-nowrap">
                      {!isMe && !isSuper && (
                        <button
                          onClick={() => handleDelete(u.id, u.email)}
                          className="text-rose-700 hover:underline text-sm"
                        >
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
