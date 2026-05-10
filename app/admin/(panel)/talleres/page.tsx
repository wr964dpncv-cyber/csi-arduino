import Link from "next/link";
import { getAllTalleres } from "@/lib/data";

export const metadata = { title: "Talleres · Admin" };
export const dynamic = "force-dynamic";

export default async function TalleresAdminPage() {
  const talleres = await getAllTalleres();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Talleres</h1>
        <p className="mt-2 text-muted">
          Edita el título, descripción, video y quiz de cada taller.
        </p>
      </div>

      <div className="border border-border divide-y divide-border bg-surface-2">
        {talleres.map((t) => (
          <Link
            key={t.n}
            href={`/admin/talleres/${t.slug}`}
            className="grid md:grid-cols-12 gap-4 p-5 items-baseline hover:bg-surface transition group"
          >
            <div className="md:col-span-1 font-mono text-2xl text-accent-dark">
              {String(t.n).padStart(2, "0")}
            </div>
            <div className="md:col-span-7">
              <h3 className="font-display text-lg">{t.title}</h3>
              <p className="mt-1 text-sm text-muted line-clamp-1">{t.tagline}</p>
            </div>
            <div className="md:col-span-2 text-sm text-muted">{t.topic}</div>
            <div className="md:col-span-2 flex items-center justify-between text-sm">
              <span className="text-muted">{t.level}</span>
              <span className="opacity-0 group-hover:opacity-100 transition text-accent-dark">
                Editar →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
