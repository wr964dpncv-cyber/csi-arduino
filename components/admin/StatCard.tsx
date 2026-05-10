import Link from "next/link";

export default function StatCard({
  label,
  value,
  hint,
  href,
  tone = "default",
}: {
  label: string;
  value: number | string;
  hint?: string;
  href?: string;
  tone?: "default" | "accent" | "emerald" | "rose";
}) {
  const toneClasses: Record<string, string> = {
    default: "text-accent-dark",
    accent: "text-accent-dark",
    emerald: "text-emerald-700",
    rose: "text-rose-700",
  };

  const inner = (
    <div className="bg-surface-2 p-5 md:p-6 h-full hover:bg-surface transition relative group">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
      <div
        className={`mt-3 font-mono text-3xl md:text-4xl leading-none ${toneClasses[tone]}`}
      >
        {value}
      </div>
      {hint && (
        <div className="mt-2 text-xs text-muted-2 font-mono">{hint}</div>
      )}
      {href && (
        <div className="mt-4 text-xs text-muted group-hover:text-ink transition flex items-center gap-1">
          <span>Ver</span>
          <span aria-hidden>→</span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus:outline-none focus:ring-2 focus:ring-accent">
        {inner}
      </Link>
    );
  }
  return inner;
}
