"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type ContactoRow = {
  name: string;
  email: string;
  phone: string | null;
  school: string | null;
  region: string | null;
  talleresCount: number;
  lastActivity: string;
  retoInteresado: boolean;
};

type SortKey =
  | "recent"
  | "name_asc"
  | "talleres_desc"
  | "region_asc"
  | "school_asc";

const initialState = {
  search: "",
  regionFilter: "all",
  schoolFilter: "all",
  interesOnly: false,
  sortKey: "recent" as SortKey,
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("es-PA", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ContactosTable({
  contactos,
}: {
  contactos: ContactoRow[];
}) {
  const [state, setState] = useState(initialState);
  const set = <K extends keyof typeof state>(k: K, v: (typeof state)[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const regions = useMemo(() => {
    const set = new Set<string>();
    contactos.forEach((c) => {
      if (c.region) set.add(c.region);
    });
    return Array.from(set).sort();
  }, [contactos]);

  const schools = useMemo(() => {
    const set = new Set<string>();
    contactos.forEach((c) => {
      if (c.school) set.add(c.school);
    });
    return Array.from(set).sort();
  }, [contactos]);

  const filtered = useMemo(() => {
    const q = state.search.trim().toLowerCase();
    let list = contactos.filter((c) => {
      if (state.interesOnly && !c.retoInteresado) return false;
      if (
        state.regionFilter !== "all" &&
        (c.region ?? "") !== state.regionFilter
      )
        return false;
      if (
        state.schoolFilter !== "all" &&
        (c.school ?? "") !== state.schoolFilter
      )
        return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone ?? "").toLowerCase().includes(q) ||
        (c.school ?? "").toLowerCase().includes(q) ||
        (c.region ?? "").toLowerCase().includes(q)
      );
    });
    list = [...list].sort((a, b) => {
      switch (state.sortKey) {
        case "name_asc":
          return a.name.localeCompare(b.name, "es");
        case "talleres_desc":
          return b.talleresCount - a.talleresCount;
        case "region_asc":
          return (a.region ?? "").localeCompare(b.region ?? "", "es");
        case "school_asc":
          return (a.school ?? "").localeCompare(b.school ?? "", "es");
        case "recent":
        default:
          return +new Date(b.lastActivity) - +new Date(a.lastActivity);
      }
    });
    return list;
  }, [contactos, state]);

  const inputCls =
    "w-full border border-border bg-surface-2 px-3 py-2 text-sm text-ink placeholder:text-muted-2/70 focus:border-ink focus:outline-none transition";

  return (
    <>
      <div className="border border-border bg-surface p-4 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_0.8fr_1fr_auto] items-end">
        <label className="block">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-2 mb-1.5">
            Buscar
          </div>
          <input
            className={inputCls}
            value={state.search}
            onChange={(e) => set("search", e.target.value)}
            placeholder="Nombre, email, teléfono, escuela…"
          />
        </label>
        <label className="block">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-2 mb-1.5">
            Región
          </div>
          <select
            className={inputCls}
            value={state.regionFilter}
            onChange={(e) => set("regionFilter", e.target.value)}
          >
            <option value="all">Todas</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-2 mb-1.5">
            Escuela
          </div>
          <select
            className={inputCls}
            value={state.schoolFilter}
            onChange={(e) => set("schoolFilter", e.target.value)}
          >
            <option value="all">Todas</option>
            {schools.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-2 mb-1.5">
            Reto
          </div>
          <label className="flex items-center gap-2 px-3 py-2 border border-border bg-surface-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 accent-accent cursor-pointer"
              checked={state.interesOnly}
              onChange={(e) => set("interesOnly", e.target.checked)}
            />
            <span className="text-sm">Solo interesados</span>
          </label>
        </label>
        <label className="block">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-2 mb-1.5">
            Ordenar
          </div>
          <select
            className={inputCls}
            value={state.sortKey}
            onChange={(e) => set("sortKey", e.target.value as SortKey)}
          >
            <option value="recent">Actividad reciente</option>
            <option value="name_asc">Nombre A → Z</option>
            <option value="talleres_desc">Más talleres</option>
            <option value="region_asc">Región A → Z</option>
            <option value="school_asc">Escuela A → Z</option>
          </select>
        </label>
        <div className="text-xs font-mono text-muted whitespace-nowrap pb-2">
          {filtered.length} / {contactos.length}
        </div>
      </div>

      <div className="border border-border bg-surface-2 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[10px] font-mono uppercase tracking-[0.18em] text-muted-2">
              <th className="px-4 py-3">Estudiante</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Escuela</th>
              <th className="px-4 py-3">Región</th>
              <th className="px-4 py-3 text-right">Talleres</th>
              <th className="px-4 py-3">Reto</th>
              <th className="px-4 py-3">Última actividad</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-muted"
                >
                  No hay contactos que coincidan con el filtro.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr
                  key={c.email}
                  className="border-b border-border/70 last:border-b-0 hover:bg-surface transition"
                >
                  <td className="px-4 py-3 align-top">
                    <Link
                      href={`/admin/estudiantes/${encodeURIComponent(c.email)}`}
                      className="font-semibold text-ink hover:text-accent-dark transition"
                    >
                      {c.name || c.email}
                    </Link>
                    <div className="text-xs text-muted font-mono">{c.email}</div>
                  </td>
                  <td className="px-4 py-3 align-top font-mono text-xs">
                    {c.phone ? (
                      <a
                        href={`https://wa.me/${c.phone.replace(/[^\d]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ink hover:text-accent-dark transition"
                      >
                        {c.phone}
                      </a>
                    ) : (
                      <span className="text-muted-2">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {c.school || <span className="text-muted-2">—</span>}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {c.region || <span className="text-muted-2">—</span>}
                  </td>
                  <td className="px-4 py-3 align-top text-right font-mono">
                    {c.talleresCount}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {c.retoInteresado ? (
                      <span className="text-xs font-mono text-emerald-700">
                        Sí
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-muted-2">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top font-mono text-xs text-muted">
                    {fmtDate(c.lastActivity)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
