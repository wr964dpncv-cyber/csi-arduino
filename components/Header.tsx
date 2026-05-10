import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio", num: "00" },
  { href: "/sobre-el-programa", label: "Programa", num: "01" },
  { href: "/talleres", label: "Módulos", num: "02" },
  { href: "/calendario", label: "Calendario", num: "03" },
  { href: "/reto-nacional", label: "Reto Nacional", num: "04" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-surface/85 backdrop-blur-md">
      {/* Top status strip */}
      <div className="border-b border-ink/10 bg-ink text-surface">
        <div className="mx-auto max-w-7xl px-6 py-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-bright pulse-dot" />
              SISTEMA · ACTIVO
            </span>
            <span className="hidden sm:inline opacity-50">·</span>
            <span className="hidden sm:inline opacity-70">CSI · MEDUCA · PANAMÁ</span>
          </div>
          <div className="opacity-70 hidden md:block">
            REV 1.0 · {new Date().getFullYear()}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 border border-ink flex items-center justify-center">
            <span className="font-mono text-[11px] font-bold tracking-tighter">CSI</span>
            <span className="absolute -top-0.5 -left-0.5 h-1.5 w-1.5 border-l border-t border-ink" />
            <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 border-r border-t border-ink" />
            <span className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 border-l border-b border-ink" />
            <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 border-r border-b border-ink" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[15px] font-semibold tracking-tight">
              Principios de Arduino
            </div>
            <div className="tech-label text-muted">Cuerpo de Solidaridad Informática</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-4 py-2 text-sm text-ink/70 transition hover:text-ink"
            >
              <span className="font-mono text-[10px] text-muted-2 mr-1.5 align-top">
                §{item.num}
              </span>
              <span className="font-medium">{item.label}</span>
              <span className="absolute bottom-0 left-4 right-4 h-px bg-ink scale-x-0 origin-left transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <Link
          href="/talleres"
          className="hidden md:inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 text-xs font-mono uppercase tracking-[0.18em] text-surface transition hover:bg-accent hover:border-accent"
        >
          Iniciar
          <span aria-hidden className="text-accent-bright group-hover:text-surface">
            →
          </span>
        </Link>
      </div>
    </header>
  );
}
