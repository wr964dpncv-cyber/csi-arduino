import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-surface text-ink flex items-center justify-center font-semibold text-xs">
                CSI
              </div>
              <div className="font-display">Principios de Arduino</div>
            </div>
            <p className="mt-5 text-sm text-muted-2 max-w-xs leading-relaxed">
              Programa educativo gratuito del Cuerpo de Solidaridad Informática del
              MEDUCA, Panamá.
            </p>
          </div>

          <div>
            <div className="text-sm font-medium text-surface mb-4">Navegación</div>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Inicio" },
                { href: "/sobre-el-programa", label: "Programa" },
                { href: "/talleres", label: "Talleres" },
                { href: "/calendario", label: "Calendario" },
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

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-muted-2">
          © {new Date().getFullYear()} CSI · MEDUCA · Panamá
        </div>
      </div>
    </footer>
  );
}
