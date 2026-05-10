"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/sobre-el-programa", label: "Programa" },
  { href: "/calendario", label: "Calendario" },
  { href: "/talleres", label: "Talleres" },
  { href: "/reto-nacional", label: "Reto Nacional" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
      </div>
    </header>
  );
}
