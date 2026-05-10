export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-arduino text-white font-bold text-sm">
              CSI
            </div>
            <div className="font-bold">Principios de Arduino</div>
          </div>
          <p className="mt-3 text-sm text-slate-600 max-w-xs">
            Iniciativa educativa del Cuerpo de Solidaridad Informática del Ministerio de
            Educación de Panamá.
          </p>
        </div>
        <div>
          <div className="font-semibold text-ink mb-3">Contacto</div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <span className="font-medium text-ink">Instructor:</span> Daniel Abadi
            </li>
            <li>
              <a
                href="mailto:daniel10abadi@gmail.com"
                className="hover:text-arduino-dark transition"
              >
                daniel10abadi@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/50768641929"
                className="hover:text-arduino-dark transition"
              >
                WhatsApp: +507 6864-1929
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-ink mb-3">Programa</div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>12 talleres gratuitos</li>
            <li>Modalidad asincrónica</li>
            <li>Para escuelas públicas de Panamá</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Principios de Arduino — Cuerpo de Solidaridad Informática · MEDUCA
      </div>
    </footer>
  );
}
