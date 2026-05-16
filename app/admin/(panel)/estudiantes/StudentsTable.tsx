"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type StudentRow = {
  name: string;
  email: string;
  school: string | null;
  talleresCount: number;
  avgPct: number;
  passRate: number;
  lastActivity: string;
};

type SortKey =
  | "recent"
  | "name_asc"
  | "talleres_desc"
  | "avg_desc"
  | "avg_asc"
  | "school_asc";

const initialState = {
  search: "",
  schoolFilter: "all",
  sortKey: "recent" as SortKey,
};

export default function StudentsTable({
  students,
  totalTalleres,
}: {
  students: StudentRow[];
  totalTalleres: number;
}) {
  const [state, setState] = useState(initialState);
  const set = <K extends keyof typeof state>(k: K, v: (typeof state)[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const schools = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.school) set.add(s.school);
    });
    return Array.from(set).sort();
  }, [students]);

  const filtered = useMemo(() => {
    const q = state.search.trim().toLowerCase();
    let list = students.filter((s) => {
      if (state.schoolFilter !== "all" && (s.school ?? "") !== state.schoolFilter)
        return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.school ?? "").toLowerCase().includes(q)
      );
    });

    list = [...list].sort((a, b) => {
      switch (state.sortKey) {
        case "name_asc":
          return a.name.localeCompare(b.name, "es");
        case "talleres_desc":
          return b.talleresCount - a.talleresCount;
        case "avg_desc":
          return b.avgPct - a.avgPct;
        case "avg_asc":
          return a.avgPct - b.avgPct;
        case "school_asc":
          return (a.school ?? "").localeCompare(b.school ?? "", "es");
        case "recent":
        default:
          return +new Date(b.lastActivity) - +new Date(a.lastActivity);
      }
    });
    return list;
  }, [students, state]);

  const activeCount =
    Number(state.search.trim() !== "") +
    Number(state.schoolFilter !== "all");

  return (
    <>
      <div className="border border-border bg-surface-2 p-4 space-y-3">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <FilterField label="Buscar">
            <input
              type="search"
              value={state.search}
              onChange={(e) => set("search", e.target.value)}
              placeholder="Nombre, email, escuela…"
              className="w-full border border-border bg-surface px-3 py-2 text-sm"
            />
          </FilterField>
          <FilterField label="Escuela">
            <select
              value={state.schoolFilter}
              onChange={(e) => set("schoolFilter", e.target.value)}
              className="w-full border border-border bg-surface px-3 py-2 text-sm"
            >
              <option value="all">Todas</option>
              {schools.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Ordenar">
            <select
              value={state.sortKey}
              onChange={(e) => set("sortKey", e.target.value as SortKey)}
              className="w-full border border-border bg-surface px-3 py-2 text-sm"
            >
              <option value="recent">Actividad reciente</option>
              <option value="talleres_desc">Más talleres completados</option>
              <option value="avg_desc">Promedio más alto</option>
              <option value="avg_asc">Promedio más bajo</option>
              <option value="name_asc">Nombre A–Z</option>
              <option value="school_asc">Escuela A–Z</option>
            </select>
          </FilterField>
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-muted font-mono whitespace-nowrap">
              {filtered.length} / {students.length}
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
          {students.length === 0
            ? "Aún no hay estudiantes. Aparecerán cuando entreguen su primer quiz."
            : "Sin resultados para los filtros aplicados."}
        </div>
      ) : (
        <div className="border border-border overflow-x-auto bg-surface-2">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface">
              <tr className="text-left">
                <Th>Estudiante</Th>
                <Th>Escuela</Th>
                <Th align="right">Talleres</Th>
                <Th align="right">Promedio</Th>
                <Th align="right">Aprobados</Th>
                <Th>Última actividad</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((s) => {
                const completionPct =
                  totalTalleres > 0
                    ? Math.round((s.talleresCount / totalTalleres) * 100)
                    : 0;
                return (
                  <tr
                    key={s.email}
                    className="hover:bg-surface transition cursor-pointer"
                  >
                    <td className="px-4 py-3 align-top">
                      <Link
                        href={`/admin/estudiantes/${encodeURIComponent(s.email)}`}
                        className="block"
                      >
                        <div className="font-medium text-ink">{s.name}</div>
                        <div className="text-xs text-muted">{s.email}</div>
                      </Link>
                    </td>
                    <td className="px-4 py-3 align-top text-muted text-xs">
                      <Link
                        href={`/admin/estudiantes/${encodeURIComponent(s.email)}`}
                        className="block"
                      >
                        {s.school ?? "—"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <Link
                        href={`/admin/estudiantes/${encodeURIComponent(s.email)}`}
                        className="block"
                      >
                        <div className="font-mono text-base text-ink">
                          {s.talleresCount}
                          {totalTalleres > 0 && (
                            <span className="text-muted-2">
                              /{totalTalleres}
                            </span>
                          )}
                        </div>
                        {totalTalleres > 0 && (
                          <div className="text-[10px] text-muted font-mono">
                            {completionPct}%
                          </div>
                        )}
                      </Link>
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <Link
                        href={`/admin/estudiantes/${encodeURIComponent(s.email)}`}
                        className="block"
                      >
                        <span
                          className={`font-mono ${
                            s.avgPct >= 60
                              ? "text-emerald-700"
                              : "text-amber-700"
                          }`}
                        >
                          {s.avgPct}%
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <Link
                        href={`/admin/estudiantes/${encodeURIComponent(s.email)}`}
                        className="block"
                      >
                        <span
                          className={`font-mono text-xs ${
                            s.passRate >= 60
                              ? "text-emerald-700"
                              : "text-rose-700"
                          }`}
                        >
                          {s.passRate}%
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Link
                        href={`/admin/estudiantes/${encodeURIComponent(s.email)}`}
                        className="block font-mono text-xs text-muted whitespace-nowrap"
                      >
                        {new Date(s.lastActivity).toLocaleString("es-PA", {
                          timeZone: "America/Panama",
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Link>
                    </td>
                  </tr>
                );
              })}
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
