"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/sobre-el-programa", label: "Programa" },
  { href: "/calendario", label: "Calendario" },
  { href: "/talleres", label: "Talleres" },
  { href: "/reto-nacional", label: "Reto Nacional" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/csi-logo.png"
            alt="Logo CSI"
            width={470}
            height={531}
            priority
            className="h-9 w-auto"
          />
          <div className="text-[15px] font-medium tracking-tight">
            Principios de Arduino
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-ink/65 hover:text-ink transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        {!isHome ? (
          <Link
            href="/reto-nacional/inscripcion"
            className="hidden md:inline-flex items-center gap-1.5 bg-accent text-ink px-5 py-2.5 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
          >
            <span>Inscribirme</span>
            <span aria-hidden>→</span>
          </Link>
        ) : (
          <span className="hidden md:inline-block w-[140px]" aria-hidden />
        )}

        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex items-center justify-center h-10 w-10 -mr-2 text-ink hover:bg-surface-2 transition"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-surface transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="flex flex-col h-full overflow-y-auto px-6 py-8">
          <nav className="flex flex-col">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-4 border-b border-border text-2xl font-display tracking-tight transition ${
                    active
                      ? "text-accent-dark"
                      : "text-ink hover:text-accent-dark"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 space-y-3">
            <Link
              href="/reto-nacional/inscripcion"
              className="flex items-center justify-between gap-2 bg-accent text-ink px-6 py-4 text-base font-semibold hover:bg-accent-bright transition"
            >
              <span>Inscribirme al Reto</span>
              <span aria-hidden>→</span>
            </Link>
            <a
              href="https://wa.me/50768641929"
              className="flex items-center justify-between gap-2 border border-ink px-6 py-4 text-sm hover:bg-ink hover:text-surface transition"
            >
              <span>WhatsApp +507 6864-1929</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
