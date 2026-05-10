"use client";

import { useMemo, useState } from "react";
import DeleteButton from "@/components/DeleteButton";

export type Row = {
  id: string;
  created_at: string;
  equipo_nombre: string;
  proyecto_nombre: string;
  tinkercad_url: string;
  video_url: string;
  descripcion: string;
};

type SortKey =
  | "date_desc"
  | "date_asc"
  | "proyecto_asc"
  | "equipo_asc"
  | "words_desc"
  | "words_asc";

const initialState = {
  search: "",
  dateFrom: "",
  dateTo: "",
  sortKey: "date_desc" as SortKey,
};

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

export default function EntregasTable({ rows }: { rows: Row[] }) {
  const [state, setState] = useState(initialState);
  const set = <K extends keyof typeof state>(k: K, v: (typeof state)[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const filtered = useMemo(() => {
    const q = state.search.trim().toLowerCase();
    const from = state.dateFrom ? new Date(state.dateFrom) : null;
    const to = state.dateTo ? new Date(state.dateTo) : null;
    if (to) to.setHours(23, 59, 59, 999);

    const list = rows.filter((r) => {
      const date = new Date(r.created_at);
      if (from && date < from) return false;
      if (to && date > to) return false;
      if (!q) return true;
      const haystack =
        `${r.equipo_nombre} ${r.proyecto_nombre} ${r.tinkercad_url} ${r.video_url} ${r.descripcion}`.toLowerCase();
      return haystack.includes(q);
    });

    list.sort((a, b) => {
      switch (state.sortKey) {
        case "date_asc":
          return +new Date(a.created_at) - +new Date(b.created_at);
        case "proyecto_asc":
          return a.proyecto_nombre.localeCompare(b.proyecto_nombre, "es");
        case "equipo_asc":
          return a.equipo_nombre.localeCompare(b.equipo_nombre, "es");
        case "words_desc":
          return wordCount(b.descripcion) - wordCount(a.descripcion);
        case "words_asc":
          return wordCount(a.descripcion) - wordCount(b.descripcion);
        case "date_desc":
        default:
          return +new Date(b.created_at) - +new Date(a.created_at);
      }
    });
    return list;
  }, [rows, state]);

  const activeCount =
    Number(state.search.trim() !== "") +
    Number(state.dateFrom !== "") +
    Number(state.dateTo !== "");

  return (
    <>
      <div className="border border-border bg-surface-2 p-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        <FilterField label="Buscar" className="lg:col-span-2">
          <input
            type="search"
            value={state.search}
            onChange={(e) => set("search", e.target.value)}
            placeholder="Proyecto, equipo, descripción, URL…"
            className="w-full border border-border bg-surface px-3 py-2 text-sm"
          />
        </FilterField>
        <FilterField label="Desde">
          <input
            type="date"
            value={state.dateFrom}
            onChange={(e) => set("dateFrom", e.target.value)}
            className="w-full border border-border bg-surface px-3 py-2 text-sm"
          />
        </FilterField>
        <FilterField label="Hasta">
          <input
            type="date"
            value={state.dateTo}
            onChange={(e) => set("dateTo", e.target.value)}
            className="w-full border border-border bg-surface px-3 py-2 text-sm"
          />
        </FilterField>
        <FilterField label="Ordenar">
          <select
            value={state.sortKey}
            onChange={(e) => set("sortKey", e.target.value as SortKey)}
            className="w-full border border-border bg-surface px-3 py-2 text-sm"
          >
            <option value="date_desc">Más reciente primero</option>
            <option value="date_asc">Más antiguo primero</option>
            <option value="proyecto_asc">Proyecto A–Z</option>
            <option value="equipo_asc">Equipo A–Z</option>
            <option value="words_desc">Descripción más larga</option>
            <option value="words_asc">Descripción más corta</option>
          </select>
        </FilterField>
        <div className="lg:col-span-5 flex items-center justify-between gap-3 pt-1">
          <div className="text-xs text-muted font-mono whitespace-nowrap">
            {filtered.length} / {rows.length}
            {activeCount > 0 && (
              <span className="ml-2 text-accent-dark">
                · {activeCount} filtro{activeCount === 1 ? "" : "s"}
              </span>
            )}
          </div>
          {activeCount > 0 && (
            <button
              onClick={() => setState(initialState)}
              className="text-xs text-rose-700 hover:underline whitespace-nowrap"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-border bg-surface-2 p-12 text-center text-muted">
          {rows.length === 0
            ? "Aún no hay entregas. Los proyectos entregados aparecerán aquí."
            : "Sin resultados para los filtros aplicados."}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <article
              key={r.id}
              className="border border-border bg-surface-2 p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-xl">{r.proyecto_nombre}</h3>
                <div className="flex items-center gap-4">
                  <div className="font-mono text-xs text-muted">
                    {new Date(r.created_at).toLocaleString("es-PA")}
                  </div>
                  <DeleteButton
                    url={`/api/admin/entregas/${r.id}`}
                    confirmMessage={`¿Eliminar la entrega "${r.proyecto_nombre}"? Esta acción no se puede deshacer.`}
                  />
                </div>
              </div>
              <div className="mt-1 text-sm text-muted">
                Equipo:{" "}
                <span className="text-ink font-medium">{r.equipo_nombre}</span>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                <a
                  href={r.tinkercad_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-border bg-surface px-4 py-3 hover:border-ink transition"
                >
                  <div className="text-xs font-mono text-accent-dark mb-1">
                    Tinkercad
                  </div>
                  <div className="truncate text-ink">{r.tinkercad_url}</div>
                </a>
                <a
                  href={r.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-border bg-surface px-4 py-3 hover:border-ink transition"
                >
                  <div className="text-xs font-mono text-accent-dark mb-1">
                    Video
                  </div>
                  <div className="truncate text-ink">{r.video_url}</div>
                </a>
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-accent-dark hover:text-ink transition">
                  Ver descripción ({wordCount(r.descripcion)} palabras)
                </summary>
                <p className="mt-3 text-muted leading-relaxed whitespace-pre-wrap">
                  {r.descripcion}
                </p>
              </details>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

function FilterField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <div className="text-xs text-muted mb-1.5 font-mono uppercase tracking-wider">
        {label}
      </div>
      {children}
    </label>
  );
}
