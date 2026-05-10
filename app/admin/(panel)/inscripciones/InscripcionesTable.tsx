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

export default function InscripcionesTable({ rows }: { rows: Row[] }) {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  const regions = useMemo(() => {
    const set = new Set(rows.map((r) => r.region).filter(Boolean));
    return Array.from(set).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (regionFilter !== "all" && r.region !== regionFilter) return false;
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
  }, [rows, search, regionFilter]);

  return (
    <>
      {/* Filters */}
      <div className="border border-border bg-surface-2 p-4 grid sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
        <label className="block">
          <div className="text-xs text-muted mb-1.5 font-mono uppercase tracking-wider">
            Buscar
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Equipo, escuela, integrante, email, teléfono…"
            className="w-full border border-border bg-surface px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <div className="text-xs text-muted mb-1.5 font-mono uppercase tracking-wider">
            Región
          </div>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="border border-border bg-surface px-3 py-2 text-sm"
          >
            <option value="all">Todas</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <div className="text-xs text-muted font-mono whitespace-nowrap">
          {filtered.length} / {rows.length}
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
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Fecha
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Equipo
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Escuela
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Región
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Integrantes
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted text-right">
                  Acciones
                </th>
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
