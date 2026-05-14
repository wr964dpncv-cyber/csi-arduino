import Link from "next/link";
import CircuitBackdrop from "@/components/CircuitBackdrop";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function Proximamente({ eyebrow, title, description }: Props) {
  return (
    <section className="bg-ink text-surface relative overflow-hidden min-h-[80vh] flex items-center">
      <CircuitBackdrop variant="flow-left" />
      <div className="relative mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-2 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
          {eyebrow}
        </div>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
          {title}
        </h1>
        <p className="mt-8 text-lg text-muted-2 leading-relaxed">
          {description ??
            "Próximamente estaremos publicando los detalles del proyecto. Vuelve pronto para más información."}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="border border-white/20 px-6 py-3 text-sm hover:border-surface transition"
          >
            ← Volver al inicio
          </Link>
          <Link
            href="/talleres"
            className="bg-accent text-ink px-6 py-3 text-sm font-semibold hover:bg-accent-bright glow-gold transition"
          >
            Ver talleres
          </Link>
        </div>
      </div>
    </section>
  );
}
