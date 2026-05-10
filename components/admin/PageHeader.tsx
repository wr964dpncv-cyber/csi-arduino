import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  description,
  meta,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="pb-6 border-b border-border">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          {eyebrow && (
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-2 mb-2">
              {eyebrow}
            </div>
          )}
          <h1 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-muted text-sm md:text-base max-w-2xl">
              {description}
            </p>
          )}
          {meta && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-muted">
              {meta}
            </div>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
