"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };
type NavGroup = { label: string; items: NavItem[] };

type Props = {
  children: React.ReactNode;
  groups: NavGroup[];
  userEmail: string | null;
  isOwnerUser: boolean;
};

export default function AdminShell({
  children,
  groups,
  userEmail,
  isOwnerUser,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  }

  const navContent = (
    <ul className="space-y-6">
      {groups.map((group) => (
        <li key={group.label}>
          <div className="px-3 mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-2">
            {group.label}
          </div>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm transition border-l-2 ${
                      active
                        ? "border-accent bg-accent-soft text-ink font-medium"
                        : "border-transparent text-ink/65 hover:text-ink hover:bg-surface-2"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="sticky top-0 z-30 border-b border-border bg-ink text-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden flex items-center justify-center h-9 w-9 -ml-2 text-surface hover:bg-white/10 transition"
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
            <Link
              href="/admin"
              className="flex items-center gap-3 min-w-0"
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
              <span className="font-medium tracking-tight sm:hidden">
                Admin
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-sm">
            {userEmail && (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-muted-2 font-mono text-xs">
                  {userEmail}
                </span>
                {isOwnerUser && (
                  <span className="inline-block text-[10px] font-mono uppercase tracking-wider bg-accent text-ink px-1.5 py-0.5">
                    super admin
                  </span>
                )}
              </div>
            )}
            <Link
              href="/"
              className="hidden sm:inline text-muted-2 hover:text-surface transition whitespace-nowrap"
            >
              Ver sitio →
            </Link>
            {userEmail && (
              <form action="/api/admin/logout" method="post">
                <button
                  type="submit"
                  className="text-muted-2 hover:text-surface transition whitespace-nowrap text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Cerrar sesión</span>
                  <span className="sm:hidden">Salir</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 py-6 lg:py-10 grid lg:grid-cols-12 gap-8 w-full">
        <aside className="hidden lg:block lg:col-span-3">
          <nav>
            <div className="sticky top-20">{navContent}</div>
          </nav>
        </aside>
        <main className="lg:col-span-9 min-w-0">{children}</main>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-surface shadow-xl transform transition-transform duration-200 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-14 px-4 border-b border-border bg-ink text-surface">
            <div className="flex items-center gap-3 min-w-0">
              <Image
                src="/csi-logo.png"
                alt="Logo CSI"
                width={470}
                height={531}
                className="h-7 w-auto shrink-0"
              />
              <span className="font-medium tracking-tight text-sm">
                Admin
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center h-9 w-9 -mr-1.5 text-surface hover:bg-white/10 transition"
              aria-label="Cerrar menú"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-3.5rem)] py-6">
            {navContent}
            {userEmail && (
              <div className="mt-8 px-3 pt-6 border-t border-border space-y-2 text-xs">
                <div className="text-muted-2 font-mono break-all">
                  {userEmail}
                </div>
                {isOwnerUser && (
                  <span className="inline-block text-[10px] font-mono uppercase tracking-wider bg-accent text-ink px-1.5 py-0.5">
                    super admin
                  </span>
                )}
                <div className="pt-2">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="block text-muted hover:text-ink transition"
                  >
                    Ver sitio →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
