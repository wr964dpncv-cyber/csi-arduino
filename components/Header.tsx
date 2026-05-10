import Link from "next/link";

const navItems = [
  { href: "/sobre-el-programa", label: "Programa" },
  { href: "/talleres", label: "Talleres" },
  { href: "/calendario", label: "Calendario" },
  { href: "/reto-nacional", label: "Reto Nacional" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 bg-ink text-surface flex items-center justify-center font-semibold text-xs">
            CSI
          </div>
          <div className="font-display text-[15px]">Principios de Arduino</div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm text-ink/70 hover:text-ink transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/talleres"
          className="hidden md:inline-flex items-center bg-ink text-surface px-5 py-2 text-sm font-medium hover:bg-accent transition"
        >
          Comenzar
        </Link>
      </div>
    </header>
  );
}
