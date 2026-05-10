import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/sobre-el-programa", label: "Programa" },
  { href: "/calendario", label: "Calendario" },
  { href: "/talleres", label: "Talleres" },
  { href: "/reto-nacional", label: "Reto Nacional" },
];

export default function Header() {
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

        <Link
          href="/reto-nacional/inscripcion"
          className="hidden md:inline-flex items-center bg-ink text-surface px-4 py-2 text-sm font-medium hover:bg-accent hover:text-ink transition"
        >
          Inscribirme →
        </Link>
      </div>
    </header>
  );
}
