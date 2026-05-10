import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-el-programa", label: "Sobre el Programa" },
  { href: "/talleres", label: "Talleres" },
  { href: "/calendario", label: "Calendario" },
  { href: "/reto-nacional", label: "Reto Nacional" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-arduino text-white font-bold text-sm shadow-sm transition group-hover:scale-105">
            CSI
          </div>
          <div className="leading-tight">
            <div className="font-bold text-ink">Principios de Arduino</div>
            <div className="text-xs text-slate-500">Programa CSI · MEDUCA</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-arduino/10 hover:text-arduino-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/talleres"
          className="hidden md:inline-flex items-center rounded-md bg-arduino px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-arduino-dark"
        >
          Comenzar
        </Link>
      </div>
    </header>
  );
}
