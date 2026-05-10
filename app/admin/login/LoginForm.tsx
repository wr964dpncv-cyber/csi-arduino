"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm({
  errorParam,
  from,
}: {
  errorParam?: string;
  from?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(errorParam ?? null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Credenciales incorrectas.");
      setSubmitting(false);
      return;
    }

    router.refresh();
    router.push(from || "/admin");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <div className="text-sm text-muted-2 mb-1.5">Email</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full bg-ink-soft border border-white/15 px-4 py-3 text-surface focus:border-accent focus:outline-none transition"
        />
      </label>

      <label className="block">
        <div className="text-sm text-muted-2 mb-1.5">Contraseña</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full bg-ink-soft border border-white/15 px-4 py-3 text-surface focus:border-accent focus:outline-none transition"
        />
      </label>

      {error && (
        <div className="border-l-2 border-rose-500 bg-rose-500/10 p-3 text-sm text-rose-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-accent text-ink px-6 py-3 font-semibold hover:bg-accent-bright glow-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Entrando..." : "Iniciar sesión →"}
      </button>
    </form>
  );
}
