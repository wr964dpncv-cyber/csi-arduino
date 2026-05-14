import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { isOwner } from "@/lib/adminAuth";
import AdminNav from "./AdminNav";

export const metadata = {
  title: "Admin · Principios de Arduino",
  robots: { index: false, follow: false },
};

const baseGroups = [
  {
    label: "Resumen",
    items: [{ href: "/admin", label: "Dashboard" }],
  },
  {
    label: "Reto Nacional",
    items: [
      { href: "/admin/interes", label: "Interesados" },
      { href: "/admin/inscripciones", label: "Inscripciones" },
      { href: "/admin/entregas", label: "Entregas" },
    ],
  },
  {
    label: "Programa",
    items: [
      { href: "/admin/talleres", label: "Talleres" },
      { href: "/admin/calendario", label: "Calendario" },
      { href: "/admin/respuestas", label: "Respuestas Quiz" },
    ],
  },
];

const ownerGroup = {
  label: "Sistema",
  items: [{ href: "/admin/usuarios", label: "Usuarios" }],
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  let userEmail: string | null = null;
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userEmail = user?.email ?? null;
    } catch {}
  }

  const groups = isOwner(userEmail) ? [...baseGroups, ownerGroup] : baseGroups;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="sticky top-0 z-30 border-b border-border bg-ink text-surface">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-center gap-3 group min-w-0"
          >
            <Image
              src="/csi-logo.png"
              alt="Logo CSI"
              width={470}
              height={531}
              priority
              className="h-8 w-auto shrink-0"
            />
            <span className="font-medium tracking-tight truncate hidden sm:inline">
              Admin · Principios de Arduino
            </span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            {userEmail && (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-muted-2 font-mono text-xs">
                  {userEmail}
                </span>
                {isOwner(userEmail) && (
                  <span className="inline-block text-[10px] font-mono uppercase tracking-wider bg-accent text-ink px-1.5 py-0.5">
                    super admin
                  </span>
                )}
              </div>
            )}
            <Link
              href="/"
              className="text-muted-2 hover:text-surface transition"
            >
              Ver sitio →
            </Link>
            {userEmail && (
              <form action="/api/admin/logout" method="post">
                <button
                  type="submit"
                  className="text-muted-2 hover:text-surface transition"
                >
                  Cerrar sesión
                </button>
              </form>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-12 gap-8 w-full">
        <aside className="lg:col-span-3">
          <AdminNav groups={groups} />
        </aside>

        <main className="lg:col-span-9 min-w-0">{children}</main>
      </div>
    </div>
  );
}
