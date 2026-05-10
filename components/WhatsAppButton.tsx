import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/50768641929"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden bg-gradient-to-br from-[#25D366] via-[#1ebe5d] to-[#128C7E] text-white px-6 py-5 transition-all duration-300 hover:shadow-[0_10px_40px_-6px_rgba(37,211,102,0.7)] hover:-translate-y-0.5 flex items-center gap-4"
    >
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#25D366] shadow-md">
        <WhatsAppIcon className="h-6 w-6" />
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75 animate-ping" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
        </span>
      </span>

      <div className="flex-1 flex flex-col gap-0.5 min-w-0 text-left">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/80">
          Chatea con Daniel · en línea
        </span>
        <span className="text-base font-semibold tracking-tight">
          +507 6864-1929
        </span>
      </div>

      <span className="relative shrink-0 text-lg transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
