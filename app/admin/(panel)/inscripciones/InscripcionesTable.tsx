"use client";

import { useMemo, useState } from "react";
import DeleteButton from "@/components/DeleteButton";

export type Member = {
  nombre?: string;
  apellido?: string;
  emailInstitucional?: string;
  emailPersonal?: string;
  telefono?: string;
};

export type Row = {
  id: string;
  created_at: string;
  equipo_nombre: string;
  escuela: string;
  region: string;
  integrantes: Member[];
};

type SortKey =
  | "date_desc"
  | "date_asc"
  | "equipo_asc"
  | "escuela_asc"
  | "region_asc"
  | "size_desc";

const initialState = {
  search: "",
  regionFilter: "all",
  escuelaFilter: "all",
  sizeFilter: "all",
  dateFrom: "",
  dateTo: "",
  sortKey: "date_desc" as SortKey,
};

export default function InscripcionesTable({ rows }: { rows: Row[] }) {
  const [state, setState] = useState(initialState);
  const set = <K extends keyof typeof state>(k: K, v: (typeof state)[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const regions = useMemo(() => {
    const set = new Set(rows.map((r) => r.region).filter(Boolean));
    return Array.from(set).sort();
  }, [rows]);

  const escuelas = useMemo(() => {
    const set = new Set(rows.map((r) => r.escuela).filter(Boolean));
    return Array.from(set).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    const q = state.search.trim().toLowerCase();
    const from = state.dateFrom ? new Date(state.dateFrom) : null;
    const to = state.dateTo ? new Date(state.dateTo) : null;
    if (to) to.setHours(23, 59, 59, 999);

    const list = rows.filter((r) => {
      if (state.regionFilter !== "all" && r.region !== state.regionFilter)
        return false;
      if (state.escuelaFilter !== "all" && r.escuela !== state.escuelaFilter)
        return false;
      const size = r.integrantes?.length ?? 0;
      if (state.sizeFilter !== "all") {
        if (state.sizeFilter === "4+" && size < 4) return false;
        if (state.sizeFilter !== "4+" && size !== Number(state.sizeFilter))
          return false;
      }
      const date = new Date(r.created_at);
      if (from && date < from) return false;
      if (to && date > to) return false;
      if (!q) return true;
      const memberText = (r.integrantes ?? [])
        .map(
          (m) =>
            `${m.nombre ?? ""} ${m.apellido ?? ""} ${m.emailInstitucional ?? ""} ${m.emailPersonal ?? ""} ${m.telefono ?? ""}`
        )
        .join(" ");
      const haystack =
        `${r.equipo_nombre} ${r.escuela} ${r.region} ${memberText}`.toLowerCase();
      return haystack.includes(q);
    });

    list.sort((a, b) => {
      switch (state.sortKey) {
        case "date_asc":
          return +new Date(a.created_at) - +new Date(b.created_at);
        case "equipo_asc":
          return a.equipo_nombre.localeCompare(b.equipo_nombre, "es");
        case "escuela_asc":
          return a.escuela.localeCompare(b.escuela, "es");
        case "region_asc":
          return a.region.localeCompare(b.region, "es");
        case "size_desc":
          return (b.integrantes?.length ?? 0) - (a.integrantes?.length ?? 0);
        case "date_desc":
        default:
          return +new Date(b.created_at) - +new Date(a.created_at);
      }
    });
    return list;
  }, [rows, state]);

  const activeCount =
    Number(state.search.trim() !== "") +
    Number(state.regionFilter !== "all") +
    Number(state.escuelaFilter !== "all") +
    Number(state.sizeFilter !== "all") +
    Number(state.dateFrom !== "") +
    Number(state.dateTo !== "");

  return (
    <>
      <div className="border border-border bg-surface-2 p-4 space-y-3">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <FilterField label="Buscar">
            <input
              type="search"
              value={state.search}
              onChange={(e) => set("search", e.target.value)}
              placeholder="Equipo, escuela, integrante, email, teléfono…"
              className="w-full border border-border bg-surface px-3 py-2 text-sm"
            />
          </FilterField>
          <FilterField label="Región">
            <select
              value={state.regionFilter}
              onChange={(e) => set("regionFilter", e.target.value)}
              className="w-full border border-border bg-surface px-3 py-2 text-sm"
            >
              <option value="all">Todas</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Escuela">
            <select
              value={state.escuelaFilter}
              onChange={(e) => set("escuelaFilter", e.target.value)}
              className="w-full border border-border bg-surface px-3 py-2 text-sm"
            >
              <option value="all">Todas</option>
              {escuelas.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Tamaño del equipo">
            <select
              value={state.sizeFilter}
              onChange={(e) => set("sizeFilter", e.target.value)}
              className="w-full border border-border bg-surface px-3 py-2 text-sm"
            >
              <option value="all">Cualquiera</option>
              <option value="1">1 integrante</option>
              <option value="2">2 integrantes</option>
              <option value="3">3 integrantes</option>
              <option value="4+">4 o más</option>
            </select>
          </FilterField>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
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
              <option value="equipo_asc">Equipo A–Z</option>
              <option value="escuela_asc">Escuela A–Z</option>
              <option value="region_asc">Región A–Z</option>
              <option value="size_desc">Equipos más grandes</option>
            </select>
          </FilterField>
          <div className="flex items-center justify-between gap-3">
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
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-border bg-surface-2 p-12 text-center text-muted">
          {rows.length === 0
            ? "Aún no hay inscripciones. Las nuevas inscripciones aparecerán aquí automáticamente."
            : "Sin resultados para los filtros aplicados."}
        </div>
      ) : (
        <div className="border border-border overflow-x-auto bg-surface-2">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface">
              <tr className="text-left">
                <Th>Fecha</Th>
                <Th>Equipo</Th>
                <Th>Escuela</Th>
                <Th>Región</Th>
                <Th>Integrantes</Th>
                <Th align="right">Acciones</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-surface transition">
                  <td className="px-4 py-3 align-top font-mono text-xs text-muted whitespace-nowrap">
                    {new Date(r.created_at).toLocaleString("es-PA", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 align-top font-medium">
                    {r.equipo_nombre}
                  </td>
                  <td className="px-4 py-3 align-top text-muted">
                    {r.escuela}
                  </td>
                  <td className="px-4 py-3 align-top text-muted">{r.region}</td>
                  <td className="px-4 py-3 align-top">
                    <ul className="space-y-1">
                      {r.integrantes?.map((m, i) => (
                        <li key={i} className="text-xs">
                          <span className="font-medium">
                            {m.nombre} {m.apellido}
                          </span>
                          <span className="text-muted ml-2">
                            {m.emailInstitucional} · {m.telefono}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 align-top text-right whitespace-nowrap">
                    <DeleteButton
                      url={`/api/admin/inscripciones/${r.id}`}
                      confirmMessage={`¿Eliminar la inscripción del equipo "${r.equipo_nombre}"? Esta acción no se puede deshacer.`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-xs text-muted mb-1.5 font-mono uppercase tracking-wider">
        {label}
      </div>
      {children}
    </label>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {children}
    </th>
  );
}
