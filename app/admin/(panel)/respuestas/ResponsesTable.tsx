"use client";

import { useMemo, useState } from "react";
import DeleteButton from "@/components/DeleteButton";

export type Row = {
  id: string;
  created_at: string;
  taller_n: number;
  taller_title: string;
  student_name: string;
  student_email: string;
  student_school: string | null;
  score: number;
  total: number;
};

export default function ResponsesTable({ rows }: { rows: Row[] }) {
  const [search, setSearch] = useState("");
  const [tallerFilter, setTallerFilter] = useState<string>("all");
  const [scoreFilter, setScoreFilter] = useState<"all" | "pass" | "fail">(
    "all"
  );

  const talleres = useMemo(() => {
    const map = new Map<number, string>();
    rows.forEach((r) => map.set(r.taller_n, r.taller_title));
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (tallerFilter !== "all" && String(r.taller_n) !== tallerFilter)
        return false;
      const pct = (r.score / r.total) * 100;
      if (scoreFilter === "pass" && pct < 60) return false;
      if (scoreFilter === "fail" && pct >= 60) return false;
      if (!q) return true;
      const haystack =
        `${r.student_name} ${r.student_email} ${r.student_school ?? ""} ${r.taller_title}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [rows, search, tallerFilter, scoreFilter]);

  return (
    <>
      {/* Filters */}
      <div className="border border-border bg-surface-2 p-4 grid sm:grid-cols-[1fr_auto_auto_auto] gap-3 items-end">
        <label className="block">
          <div className="text-xs text-muted mb-1.5 font-mono uppercase tracking-wider">
            Buscar
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nombre, email, escuela…"
            className="w-full border border-border bg-surface px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <div className="text-xs text-muted mb-1.5 font-mono uppercase tracking-wider">
            Taller
          </div>
          <select
            value={tallerFilter}
            onChange={(e) => setTallerFilter(e.target.value)}
            className="border border-border bg-surface px-3 py-2 text-sm"
          >
            <option value="all">Todos</option>
            {talleres.map(([n, title]) => (
              <option key={n} value={String(n)}>
                T{String(n).padStart(2, "0")} · {title}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <div className="text-xs text-muted mb-1.5 font-mono uppercase tracking-wider">
            Score
          </div>
          <select
            value={scoreFilter}
            onChange={(e) =>
              setScoreFilter(e.target.value as "all" | "pass" | "fail")
            }
            className="border border-border bg-surface px-3 py-2 text-sm"
          >
            <option value="all">Todos</option>
            <option value="pass">Aprobado (≥60%)</option>
            <option value="fail">Reprobado (&lt;60%)</option>
          </select>
        </label>
        <div className="text-xs text-muted font-mono whitespace-nowrap">
          {filtered.length} / {rows.length}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-border bg-surface-2 p-12 text-center text-muted">
          {rows.length === 0
            ? "Aún no hay respuestas. Aparecerán aquí cuando los estudiantes completen quizzes."
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
                  Taller
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Estudiante
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Email
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                  Escuela
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted text-right">
                  Score
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => {
                const pct = Math.round((r.score / r.total) * 100);
                const passing = pct >= 60;
                return (
                  <tr key={r.id} className="hover:bg-surface transition">
                    <td className="px-4 py-3 align-top font-mono text-xs text-muted whitespace-nowrap">
                      {new Date(r.created_at).toLocaleString("es-PA", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="font-mono text-xs text-accent-dark">
                        T{String(r.taller_n).padStart(2, "0")}
                      </div>
                      <div className="text-xs text-muted line-clamp-1">
                        {r.taller_title}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top font-medium">
                      {r.student_name}
                    </td>
                    <td className="px-4 py-3 align-top text-muted text-xs">
                      {r.student_email}
                    </td>
                    <td className="px-4 py-3 align-top text-muted text-xs">
                      {r.student_school ?? "—"}
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <div
                        className={`font-mono text-base ${
                          passing ? "text-emerald-700" : "text-amber-700"
                        }`}
                      >
                        {r.score}/{r.total}
                      </div>
                      <div className="text-xs text-muted">{pct}%</div>
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <DeleteButton
                        url={`/api/admin/respuestas/${r.id}`}
                        confirmMessage={`¿Eliminar la respuesta de ${r.student_name}?`}
                      />
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
