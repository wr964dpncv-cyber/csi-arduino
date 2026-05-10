import Link from "next/link";
import type { ReactNode } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin · Principios de Arduino",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inscripciones", label: "Inscripciones Reto" },
  { href: "/admin/entregas", label: "Entregas Reto" },
  { href: "/admin/talleres", label: "Talleres" },
  { href: "/admin/calendario", label: "Calendario" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
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

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="border-b border-border bg-ink text-surface">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="h-7 w-7 bg-accent text-ink flex items-center justify-center font-mono text-[10px] font-bold">
              csi
            </div>
            <span className="font-medium tracking-tight">
              Admin · Principios de Arduino
            </span>
          </Link>
          <div className="flex items-center gap-5 text-sm">
            {userEmail && (
              <span className="hidden md:inline text-muted-2 font-mono text-xs">
                {userEmail}
              </span>
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
        <nav className="lg:col-span-3">
          <ul className="space-y-1 sticky top-20">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-sm text-ink/70 hover:bg-surface-2 hover:text-ink transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}
