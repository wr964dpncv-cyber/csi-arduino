"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PanamaFlag from "@/components/PanamaFlag";

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
    <>
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
            <div className="leading-tight">
              <div className="text-[15px] font-medium tracking-tight">
                Principios de Arduino
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-muted tracking-widest uppercase mt-0.5">
                <PanamaFlag className="h-2.5 w-2.5" />
                <span>Programa Nacional · MEDUCA Panamá</span>
              </div>
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

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden flex items-center justify-center h-10 w-10 -mr-2 text-ink hover:bg-surface-2 transition"
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
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
        </div>
      </header>

      {/* Mobile fullscreen drawer */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-surface flex flex-col transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >
        {/* Top bar of drawer */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border flex-shrink-0 bg-surface">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <Image
              src="/csi-logo.png"
              alt="Logo CSI"
              width={470}
              height={531}
              className="h-9 w-auto"
            />
            <div className="leading-tight">
              <div className="text-[15px] font-medium tracking-tight">
                Principios de Arduino
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted tracking-widest uppercase mt-0.5">
                <PanamaFlag className="h-2.5 w-2.5" />
                <span>MEDUCA Panamá</span>
              </div>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center h-10 w-10 -mr-2 text-ink hover:bg-surface-2 transition"
            aria-label="Cerrar menú"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
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

        {/* Drawer content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
          <nav className="flex flex-col">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-2 bg-accent text-ink px-6 py-4 text-base font-semibold hover:bg-accent-bright transition"
            >
              <span>Inscribirme al Reto</span>
              <span aria-hidden>→</span>
            </Link>
            <a
              href="https://wa.me/50768641929"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 border border-ink px-6 py-4 text-sm hover:bg-ink hover:text-surface transition"
            >
              <span>WhatsApp +507 6864-1929</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
