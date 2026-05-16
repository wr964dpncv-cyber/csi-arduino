"use client";

import { Fragment, useMemo, useState } from "react";
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
  answers?: Array<{
    question_id: string;
    selected_index: number;
    correct: boolean;
  }> | null;
  file_uploads?: Record<string, string> | null;
  text_answers?: Record<string, string> | null;
};

export type QuestionInfo = {
  question: string;
  options: string[];
  correct_index: number;
  question_type: string | null;
};

type SortKey =
  | "date_desc"
  | "date_asc"
  | "score_desc"
  | "score_asc"
  | "name_asc"
  | "taller_asc";

const initialState = {
  search: "",
  tallerFilter: "all",
  scoreFilter: "all" as "all" | "pass" | "fail",
  schoolFilter: "all",
  dateFrom: "",
  dateTo: "",
  sortKey: "date_desc" as SortKey,
};

export default function ResponsesTable({
  rows,
  questionsMap,
}: {
  rows: Row[];
  questionsMap: Record<string, QuestionInfo>;
}) {
  const [state, setState] = useState(initialState);
  const set = <K extends keyof typeof state>(k: K, v: (typeof state)[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const talleres = useMemo(() => {
    const map = new Map<number, string>();
    rows.forEach((r) => map.set(r.taller_n, r.taller_title));
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [rows]);

  const schools = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => {
      if (r.student_school) set.add(r.student_school);
    });
    return Array.from(set).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    const q = state.search.trim().toLowerCase();
    const from = state.dateFrom ? new Date(state.dateFrom) : null;
    const to = state.dateTo ? new Date(state.dateTo) : null;
    if (to) to.setHours(23, 59, 59, 999);

    const list = rows.filter((r) => {
      if (state.tallerFilter !== "all" && String(r.taller_n) !== state.tallerFilter)
        return false;
      const pct = (r.score / r.total) * 100;
      if (state.scoreFilter === "pass" && pct < 60) return false;
      if (state.scoreFilter === "fail" && pct >= 60) return false;
      if (
        state.schoolFilter !== "all" &&
        (r.student_school ?? "") !== state.schoolFilter
      )
        return false;
      const date = new Date(r.created_at);
      if (from && date < from) return false;
      if (to && date > to) return false;
      if (!q) return true;
      const haystack =
        `${r.student_name} ${r.student_email} ${r.student_school ?? ""} ${r.taller_title}`.toLowerCase();
      return haystack.includes(q);
    });

    list.sort((a, b) => {
      switch (state.sortKey) {
        case "date_asc":
          return +new Date(a.created_at) - +new Date(b.created_at);
        case "score_desc":
          return b.score / b.total - a.score / a.total;
        case "score_asc":
          return a.score / a.total - b.score / b.total;
        case "name_asc":
          return a.student_name.localeCompare(b.student_name, "es");
        case "taller_asc":
          return a.taller_n - b.taller_n;
        case "date_desc":
        default:
          return +new Date(b.created_at) - +new Date(a.created_at);
      }
    });
    return list;
  }, [rows, state]);

  const activeCount =
    Number(state.search.trim() !== "") +
    Number(state.tallerFilter !== "all") +
    Number(state.scoreFilter !== "all") +
    Number(state.schoolFilter !== "all") +
    Number(state.dateFrom !== "") +
    Number(state.dateTo !== "");

  return (
    <>
      {/* Filters */}
      <div className="border border-border bg-surface-2 p-4 space-y-3">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <FilterField label="Buscar">
            <input
              type="search"
              value={state.search}
              onChange={(e) => set("search", e.target.value)}
              placeholder="Nombre, email, escuela…"
              className="w-full border border-border bg-surface px-3 py-2 text-sm"
            />
          </FilterField>
          <FilterField label="Taller">
            <select
              value={state.tallerFilter}
              onChange={(e) => set("tallerFilter", e.target.value)}
              className="w-full border border-border bg-surface px-3 py-2 text-sm"
            >
              <option value="all">Todos</option>
              {talleres.map(([n, title]) => (
                <option key={n} value={String(n)}>
                  T{String(n).padStart(2, "0")} · {title}
                </option>
              ))}
            </select>
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
          <FilterField label="Score">
            <select
              value={state.scoreFilter}
              onChange={(e) =>
                set("scoreFilter", e.target.value as typeof state.scoreFilter)
              }
              className="w-full border border-border bg-surface px-3 py-2 text-sm"
            >
              <option value="all">Todos</option>
              <option value="pass">Aprobado (≥60%)</option>
              <option value="fail">Reprobado (&lt;60%)</option>
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
              <option value="score_desc">Score más alto</option>
              <option value="score_asc">Score más bajo</option>
              <option value="name_asc">Nombre A–Z</option>
              <option value="taller_asc">Taller 0 → 11</option>
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
            ? "Aún no hay respuestas. Aparecerán aquí cuando los estudiantes completen quizzes."
            : "Sin resultados para los filtros aplicados."}
        </div>
      ) : (
        <div className="border border-border overflow-x-auto bg-surface-2">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-surface">
              <tr className="text-left">
                <Th>Fecha</Th>
                <Th>Taller</Th>
                <Th>Estudiante</Th>
                <Th>Email</Th>
                <Th>Escuela</Th>
                <Th align="right">Score</Th>
                <Th>Archivos</Th>
                <Th align="right">Acciones</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => {
                const pct = Math.round((r.score / r.total) * 100);
                const passing = pct >= 60;
                return (
                  <Fragment key={r.id}>
                  <tr className="hover:bg-surface transition">
                    <td className="px-4 py-3 align-top font-mono text-xs text-muted whitespace-nowrap">
                      {new Date(r.created_at).toLocaleString("es-PA", {
                        timeZone: "America/Panama",
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
                    <td className="px-4 py-3 align-top text-xs">
                      {r.file_uploads && Object.keys(r.file_uploads).length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {Object.values(r.file_uploads).map((url, idx) => (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-dark hover:underline whitespace-nowrap"
                            >
                              ↓ Archivo {idx + 1}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <DeleteButton
                        url={`/api/admin/respuestas/${r.id}`}
                        confirmMessage={`¿Eliminar la respuesta de ${r.student_name}?`}
                      />
                    </td>
                  </tr>
                  {((r.answers && r.answers.length > 0) ||
                    (r.text_answers && Object.keys(r.text_answers).length > 0)) && (
                    <tr className="bg-surface/60 border-t border-dashed border-border">
                      <td colSpan={8} className="px-4 py-3">
                        <details className="text-xs">
                          <summary className="cursor-pointer text-muted hover:text-ink select-none font-mono uppercase tracking-wider">
                            Ver detalle de respuestas
                          </summary>
                          <div className="mt-4 space-y-4">
                            {/* Multiple-choice answers */}
                            {r.answers?.map((ans, idx) => {
                              const q = questionsMap[ans.question_id];
                              return (
                                <div
                                  key={ans.question_id}
                                  className={`border-l-2 pl-4 py-2 ${
                                    ans.correct
                                      ? "border-emerald-500"
                                      : "border-rose-500"
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    <span
                                      className={`font-mono text-xs font-bold shrink-0 ${
                                        ans.correct
                                          ? "text-emerald-700"
                                          : "text-rose-700"
                                      }`}
                                    >
                                      {ans.correct ? "✓" : "✗"} {idx + 1}.
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-ink font-medium">
                                        {q?.question ?? (
                                          <span className="text-muted italic">
                                            (pregunta eliminada)
                                          </span>
                                        )}
                                      </div>
                                      {q && (
                                        <div className="mt-2 space-y-1">
                                          {q.options.map((opt, i) => {
                                            const isSelected =
                                              i === ans.selected_index;
                                            const isCorrect =
                                              i === q.correct_index;
                                            return (
                                              <div
                                                key={i}
                                                className={`flex items-center gap-2 ${
                                                  isCorrect
                                                    ? "text-emerald-700 font-medium"
                                                    : isSelected
                                                      ? "text-rose-700"
                                                      : "text-muted"
                                                }`}
                                              >
                                                <span className="font-mono w-4 shrink-0">
                                                  {isSelected ? "●" : "○"}
                                                </span>
                                                <span>{opt}</span>
                                                {isCorrect && (
                                                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700">
                                                    correcta
                                                  </span>
                                                )}
                                                {isSelected && !isCorrect && (
                                                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-700">
                                                    elegida
                                                  </span>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                            {/* Text answers */}
                            {r.text_answers &&
                              Object.entries(r.text_answers).map(([qid, txt]) => {
                                const q = questionsMap[qid];
                                return (
                                  <div
                                    key={qid}
                                    className="border-l-2 border-accent pl-4 py-2"
                                  >
                                    <div className="flex items-start gap-2">
                                      <span className="font-mono text-xs text-accent-dark shrink-0">
                                        ✎
                                      </span>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-ink font-medium">
                                          {q?.question ?? (
                                            <span className="text-muted italic">
                                              (pregunta de texto)
                                            </span>
                                          )}
                                        </div>
                                        <div className="mt-2 text-ink whitespace-pre-wrap bg-surface p-2 border border-border">
                                          {txt}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </details>
                      </td>
                    </tr>
                  )}
                  </Fragment>
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
