import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin · Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const { from, error } = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-ink text-surface flex items-center">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <div className="text-xs font-mono text-accent mb-4">
            Configuración pendiente
          </div>
          <h1 className="font-display text-4xl tracking-tight leading-tight">
            Supabase no está configurado.
          </h1>
          <p className="mt-6 text-muted-2 leading-relaxed">
            Para activar el panel de administración, configura las variables de
            entorno de Supabase en Vercel y ejecuta la migración SQL. Lee la
            guía en{" "}
            <code className="font-mono text-surface bg-white/5 px-2 py-0.5">
              docs/admin-setup.md
            </code>
            .
          </p>
        </div>
      </div>
    );
  }

  // If already authenticated, redirect to admin
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect(from || "/admin");
  } catch {}

  return (
    <div className="min-h-screen bg-ink text-surface flex items-center">
      <div className="mx-auto max-w-md w-full px-6 py-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-7 w-7 bg-accent text-ink flex items-center justify-center font-mono text-[10px] font-bold">
            csi
          </div>
          <span className="font-medium tracking-tight">
            Admin · Principios de Arduino
          </span>
        </div>

        <h1 className="font-display text-3xl tracking-tight">
          Iniciar sesión
        </h1>
        <p className="mt-3 text-muted-2 text-sm">
          Solo acceso autorizado. Para preguntas, contacta al equipo CSI.
        </p>

        <div className="mt-10">
          <LoginForm errorParam={error} from={from} />
        </div>
      </div>
    </div>
  );
}
