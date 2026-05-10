import { WhatsAppIcon } from "./WhatsAppIcon";

type Variant = "light" | "dark";

type Props = {
  variant?: Variant;
  className?: string;
};

const EMAIL = "daniel10abadi@gmail.com";
const PHONE_DISPLAY = "+507 6864-1929";
const PHONE_HREF = "https://wa.me/50768641929";

/**
 * Botones de contacto unificados (email + WhatsApp).
 * Usado en todas las páginas públicas para mantener consistencia visual.
 *
 * variant="light" — para fondos claros (default)
 * variant="dark"  — para fondos oscuros (bg-ink)
 */
export default function ContactButtons({
  variant = "light",
  className = "",
}: Props) {
  const isDark = variant === "dark";

  const buttonCls = isDark
    ? "border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-surface"
    : "border border-border bg-surface hover:border-ink/40 hover:shadow-sm text-ink";

  const labelCls = isDark ? "text-muted-2" : "text-muted";

  return (
    <div
      className={`grid sm:grid-cols-2 gap-3 w-full max-w-2xl ${className}`}
    >
      <a
        href={`mailto:${EMAIL}`}
        className={`group flex items-center gap-4 px-5 py-4 transition ${buttonCls}`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center ${
            isDark ? "bg-white/10" : "bg-surface-2"
          }`}
        >
          <EmailIcon className="h-5 w-5" />
        </span>
        <div className="flex flex-col min-w-0 text-left">
          <span className={`text-[10px] font-mono uppercase tracking-[0.15em] ${labelCls}`}>
            Email
          </span>
          <span className="text-sm font-medium truncate">{EMAIL}</span>
        </div>
      </a>

      <a
        href={PHONE_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center gap-4 px-5 py-4 transition ${buttonCls}`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center ${
            isDark ? "bg-white/10" : "bg-surface-2"
          }`}
        >
          <WhatsAppIcon className="h-5 w-5 text-[#25D366] transition-transform group-hover:scale-110" />
        </span>
        <div className="flex flex-col min-w-0 text-left">
          <span className={`text-[10px] font-mono uppercase tracking-[0.15em] ${labelCls}`}>
            WhatsApp
          </span>
          <span className="text-sm font-medium">{PHONE_DISPLAY}</span>
        </div>
      </a>
    </div>
  );
}

function EmailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
