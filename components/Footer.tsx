import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 bg-surface text-ink flex items-center justify-center font-mono text-[10px] font-semibold">
                csi
              </div>
              <div className="text-[15px] font-medium tracking-tight">
                Principios de Arduino
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-2 max-w-xs leading-relaxed">
              Programa educativo gratuito del Cuerpo de Solidaridad Informática
              del MEDUCA, Panamá.
            </p>
          </div>

          <div>
            <div className="text-sm font-medium text-surface mb-4">Navegación</div>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Inicio" },
                { href: "/sobre-el-programa", label: "Programa" },
                { href: "/calendario", label: "Calendario" },
                { href: "/talleres", label: "Talleres" },
                { href: "/reto-nacional", label: "Reto Nacional" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted-2 hover:text-surface transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-medium text-surface mb-4">Contacto</div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-muted-2">Instructor</div>
                <div className="mt-0.5">Daniel Abadi</div>
              </div>
              <a
                href="mailto:daniel10abadi@gmail.com"
                className="block text-muted-2 hover:text-surface transition"
              >
                daniel10abadi@gmail.com
              </a>
              <a
                href="https://wa.me/50768641929"
                className="block text-muted-2 hover:text-surface transition"
              >
                +507 6864-1929
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-2 font-mono">
          <div>© {new Date().getFullYear()} · CSI · MEDUCA · Panamá</div>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-muted-2 hover:text-accent transition"
          >
            <span>Admin</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
