import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-surface relative">
      <div className="absolute inset-0 bp-grid-dark opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="tech-label text-accent-bright">§ Programa</div>
            <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-tight">
              Principios de Arduino
            </h3>
            <p className="mt-4 text-sm text-muted-2 max-w-md leading-relaxed">
              Iniciativa del Cuerpo de Solidaridad Informática del Ministerio de
              Educación de Panamá para introducir a estudiantes de escuelas públicas
              en electrónica y programación.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 tech-label text-accent-bright">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-bright pulse-dot" />
                EN OPERACIÓN
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="tech-label text-muted-2">§ Navegación</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/", label: "Inicio", n: "00" },
                { href: "/sobre-el-programa", label: "Programa", n: "01" },
                { href: "/talleres", label: "Módulos", n: "02" },
                { href: "/calendario", label: "Calendario", n: "03" },
                { href: "/reto-nacional", label: "Reto Nacional", n: "04" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-baseline gap-2 text-surface/80 hover:text-accent-bright transition"
                  >
                    <span className="font-mono text-[10px] text-muted-2">{l.n}</span>
                    <span>{l.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition text-accent-bright">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="tech-label text-muted-2">§ Contacto · Instructor</div>
            <div className="mt-4 border border-white/10 p-5">
              <div className="font-display text-lg">Daniel Abadi</div>
              <div className="tech-label text-muted-2 mt-1">CSI · MEDUCA</div>
              <div className="mt-4 space-y-2 text-sm">
                <a
                  href="mailto:daniel10abadi@gmail.com"
                  className="flex items-center gap-2 text-surface/80 hover:text-accent-bright transition"
                >
                  <span className="font-mono text-[10px] text-muted-2 w-12">EMAIL</span>
                  <span>daniel10abadi@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/50768641929"
                  className="flex items-center gap-2 text-surface/80 hover:text-accent-bright transition"
                >
                  <span className="font-mono text-[10px] text-muted-2 w-12">TEL</span>
                  <span>+507 6864-1929</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2">
          <div>© {new Date().getFullYear()} · CSI · MEDUCA · República de Panamá</div>
          <div className="flex gap-4">
            <span>DOC-REV 1.0</span>
            <span>·</span>
            <span>BUILD {new Date().toISOString().slice(0, 10)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
