"use client";

import { useState } from "react";

export type ReportData = {
  generatedAt: string;
  kpis: {
    interes: { total: number; week: number; deltaPct: number | null };
    inscripciones: { total: number; week: number; deltaPct: number | null };
    entregas: { total: number; week: number; deltaPct: number | null };
    quizzes: { total: number; week: number; deltaPct: number | null };
  };
  overall: {
    uniqueStudents: number;
    uniqueSchools: number;
    talleresActivos: number;
    talleresTotal: number;
    eventos: number;
    avgScore: number | null;
    passRate: number | null;
    passing: number;
    validResp: number;
  };
  funnel: Array<{ label: string; count: number; conversionPct: number | null }>;
  activity30d: Array<{ label: string; count: number }>;
  tallerStats: Array<{
    n: number;
    title: string;
    published: boolean;
    count: number;
    avgPct: number;
    passRate: number;
  }>;
  scoreDist: Array<{ bucket: string; count: number }>;
  topSchools: Array<{ key: string; count: number }>;
  regional: Array<{ key: string; count: number }>;
};

const COLORS = {
  ink: "1A1A1A",
  bg: "FAFAF9",
  surface: "FFFFFF",
  border: "E7E5E4",
  muted: "6B7280",
  mutedLight: "9CA3AF",
  accent: "D97706",
  accentDark: "92400E",
  emerald: "047857",
  amber: "B45309",
  rose: "BE123C",
  violet: "6D28D9",
};

const FONT = "Helvetica Neue";
const MONO = "Menlo";

export default function ReportButton({ data }: { data: ReportData }) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const PptxGenJS = (await import("pptxgenjs")).default;
      const pptx = new PptxGenJS();

      pptx.layout = "LAYOUT_WIDE";
      pptx.title = "Reporte CSI Arduino";
      pptx.author = "Daniel Abadi";
      pptx.company = "Programa CSI Arduino";
      pptx.subject = "Resumen de estadísticas del proyecto";

      buildCoverSlide(pptx, data);
      buildExecutiveSlide(pptx, data);
      buildKpisSlide(pptx, data);
      buildFunnelSlide(pptx, data);
      buildActivitySlide(pptx, data);
      buildTallerSlide(pptx, data);
      buildScoreDistSlide(pptx, data);
      buildTopSchoolsSlide(pptx, data);
      buildRegionalSlide(pptx, data);
      buildClosingSlide(pptx, data);

      const filename = `Reporte_CSI_Arduino_${todayStamp()}.pptx`;
      await pptx.writeFile({ fileName: filename });
    } catch (err) {
      console.error("Error generando reporte:", err);
      alert("No se pudo generar el reporte. Revisá la consola.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 border border-ink bg-ink text-surface px-4 py-2.5 text-xs font-medium tracking-wide uppercase hover:bg-accent-dark hover:border-accent-dark transition disabled:opacity-60 disabled:cursor-wait"
    >
      <span aria-hidden>↓</span>
      <span>{loading ? "Generando…" : "Descargar reporte PPT"}</span>
    </button>
  );
}

function todayStamp() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

function prettyDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-PA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ============================================================
// Slide builders
// ============================================================

type Slide = ReturnType<InstanceType<typeof import("pptxgenjs").default>["addSlide"]>;

function addFooter(slide: Slide, pageNum: number, total: number) {
  slide.addText("Preparado por Daniel Abadi", {
    x: 0.5,
    y: 7.1,
    w: 6,
    h: 0.3,
    fontFace: MONO,
    fontSize: 9,
    color: COLORS.muted,
  });
  slide.addText(`${pageNum} / ${total}`, {
    x: 7.0,
    y: 7.1,
    w: 5.83,
    h: 0.3,
    align: "right",
    fontFace: MONO,
    fontSize: 9,
    color: COLORS.muted,
  });
}

function addPageHeader(slide: Slide, eyebrow: string, title: string) {
  slide.addText(eyebrow, {
    x: 0.5,
    y: 0.4,
    w: 12.33,
    h: 0.3,
    fontFace: MONO,
    fontSize: 10,
    color: COLORS.muted,
    charSpacing: 3,
  });
  slide.addText(title, {
    x: 0.5,
    y: 0.7,
    w: 12.33,
    h: 0.7,
    fontFace: FONT,
    fontSize: 32,
    bold: true,
    color: COLORS.ink,
  });
  slide.addShape("line", {
    x: 0.5,
    y: 1.5,
    w: 1.0,
    h: 0,
    line: { color: COLORS.accent, width: 3 },
  });
}

const TOTAL_SLIDES = 10;

// ----- 1. Cover -----
function buildCoverSlide(
  pptx: InstanceType<typeof import("pptxgenjs").default>,
  data: ReportData
) {
  const s = pptx.addSlide();
  s.background = { color: COLORS.ink };

  // Accent bar top
  s.addShape("rect", {
    x: 0.5,
    y: 0.5,
    w: 1.5,
    h: 0.08,
    fill: { color: COLORS.accent },
    line: { color: COLORS.accent },
  });

  s.addText("CSI ARDUINO · PANAMÁ", {
    x: 0.5,
    y: 0.8,
    w: 10,
    h: 0.4,
    fontFace: MONO,
    fontSize: 12,
    color: COLORS.accent,
    charSpacing: 6,
  });

  s.addText("Reporte de Resultados", {
    x: 0.5,
    y: 2.4,
    w: 12.33,
    h: 1.2,
    fontFace: FONT,
    fontSize: 60,
    bold: true,
    color: COLORS.surface,
  });

  s.addText("Programa de Talleres + Reto Nacional", {
    x: 0.5,
    y: 3.6,
    w: 12.33,
    h: 0.6,
    fontFace: FONT,
    fontSize: 24,
    color: COLORS.mutedLight,
  });

  // Stat strip
  const stats = [
    { v: data.overall.uniqueStudents, l: "estudiantes" },
    { v: data.overall.uniqueSchools, l: "escuelas" },
    { v: data.kpis.quizzes.total, l: "quizzes" },
    { v: data.kpis.entregas.total, l: "entregas" },
  ];
  const stripY = 4.9;
  const stripX = 0.5;
  const stripW = 12.33;
  const cellW = stripW / stats.length;
  stats.forEach((stat, i) => {
    s.addText(String(stat.v), {
      x: stripX + i * cellW,
      y: stripY,
      w: cellW,
      h: 0.7,
      fontFace: MONO,
      fontSize: 36,
      bold: true,
      color: COLORS.surface,
    });
    s.addText(stat.l, {
      x: stripX + i * cellW,
      y: stripY + 0.7,
      w: cellW,
      h: 0.35,
      fontFace: MONO,
      fontSize: 11,
      color: COLORS.mutedLight,
      charSpacing: 3,
    });
  });

  // Footer block
  s.addShape("line", {
    x: 0.5,
    y: 6.7,
    w: 12.33,
    h: 0,
    line: { color: COLORS.muted, width: 1 },
  });

  s.addText("Preparado por", {
    x: 0.5,
    y: 6.85,
    w: 4,
    h: 0.3,
    fontFace: MONO,
    fontSize: 10,
    color: COLORS.mutedLight,
    charSpacing: 3,
  });
  s.addText("Daniel Abadi", {
    x: 0.5,
    y: 7.1,
    w: 4,
    h: 0.35,
    fontFace: FONT,
    fontSize: 16,
    bold: true,
    color: COLORS.surface,
  });

  s.addText(prettyDate(data.generatedAt), {
    x: 8.33,
    y: 7.1,
    w: 4.5,
    h: 0.35,
    align: "right",
    fontFace: MONO,
    fontSize: 11,
    color: COLORS.mutedLight,
  });
}

// ----- 2. Executive summary -----
function buildExecutiveSlide(
  pptx: InstanceType<typeof import("pptxgenjs").default>,
  data: ReportData
) {
  const s = pptx.addSlide();
  s.background = { color: COLORS.bg };
  addPageHeader(s, "01 · RESUMEN EJECUTIVO", "Estado general del programa");

  const cards = [
    {
      v: String(data.overall.uniqueStudents),
      l: "Estudiantes únicos",
      sub: "que han enviado al menos un quiz",
      color: COLORS.ink,
    },
    {
      v: String(data.overall.uniqueSchools),
      l: "Escuelas alcanzadas",
      sub: "interés + inscripciones + quizzes",
      color: COLORS.ink,
    },
    {
      v: data.overall.avgScore !== null ? `${data.overall.avgScore}%` : "—",
      l: "Promedio de quizzes",
      sub: `${data.overall.validResp} quizzes evaluados`,
      color:
        data.overall.avgScore !== null && data.overall.avgScore >= 60
          ? COLORS.emerald
          : COLORS.amber,
    },
    {
      v: data.overall.passRate !== null ? `${data.overall.passRate}%` : "—",
      l: "Tasa de aprobación",
      sub: `${data.overall.passing} de ${data.overall.validResp} aprobaron`,
      color:
        data.overall.passRate !== null && data.overall.passRate >= 60
          ? COLORS.emerald
          : COLORS.rose,
    },
    {
      v: `${data.overall.talleresActivos}/${data.overall.talleresTotal}`,
      l: "Talleres publicados",
      sub: `${data.overall.eventos} eventos en calendario`,
      color: COLORS.ink,
    },
    {
      v: String(data.kpis.entregas.total),
      l: "Entregas del Reto",
      sub: "proyectos enviados",
      color: COLORS.ink,
    },
  ];

  const cols = 3;
  const rows = 2;
  const startX = 0.5;
  const startY = 2.0;
  const cardW = 4.0;
  const cardH = 2.2;
  const gapX = 0.17;
  const gapY = 0.17;

  cards.forEach((c, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);

    s.addShape("rect", {
      x,
      y,
      w: cardW,
      h: cardH,
      fill: { color: COLORS.surface },
      line: { color: COLORS.border, width: 1 },
    });

    s.addText(c.l.toUpperCase(), {
      x: x + 0.25,
      y: y + 0.25,
      w: cardW - 0.5,
      h: 0.35,
      fontFace: MONO,
      fontSize: 10,
      color: COLORS.muted,
      charSpacing: 3,
    });

    s.addText(c.v, {
      x: x + 0.25,
      y: y + 0.7,
      w: cardW - 0.5,
      h: 0.9,
      fontFace: MONO,
      fontSize: 42,
      bold: true,
      color: c.color,
    });

    s.addText(c.sub, {
      x: x + 0.25,
      y: y + 1.65,
      w: cardW - 0.5,
      h: 0.4,
      fontFace: FONT,
      fontSize: 11,
      color: COLORS.muted,
    });
  });

  void rows;
  addFooter(s, 2, TOTAL_SLIDES);
}

// ----- 3. KPIs principales -----
function buildKpisSlide(
  pptx: InstanceType<typeof import("pptxgenjs").default>,
  data: ReportData
) {
  const s = pptx.addSlide();
  s.background = { color: COLORS.bg };
  addPageHeader(s, "02 · INDICADORES CLAVE", "KPIs y tendencia semanal");

  const kpis = [
    { label: "Interesados", k: data.kpis.interes, color: COLORS.amber },
    {
      label: "Inscripciones",
      k: data.kpis.inscripciones,
      color: COLORS.violet,
    },
    { label: "Entregas Reto", k: data.kpis.entregas, color: COLORS.accent },
    { label: "Quizzes", k: data.kpis.quizzes, color: COLORS.emerald },
  ];

  const startX = 0.5;
  const startY = 2.1;
  const cardW = 3.0;
  const cardH = 3.5;
  const gap = 0.11;

  kpis.forEach((kpi, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape("rect", {
      x,
      y: startY,
      w: cardW,
      h: cardH,
      fill: { color: COLORS.surface },
      line: { color: COLORS.border, width: 1 },
    });

    s.addShape("rect", {
      x,
      y: startY,
      w: cardW,
      h: 0.12,
      fill: { color: kpi.color },
      line: { color: kpi.color },
    });

    s.addText(kpi.label.toUpperCase(), {
      x: x + 0.25,
      y: startY + 0.35,
      w: cardW - 0.5,
      h: 0.35,
      fontFace: MONO,
      fontSize: 11,
      color: COLORS.muted,
      charSpacing: 3,
    });

    s.addText(String(kpi.k.total), {
      x: x + 0.25,
      y: startY + 0.85,
      w: cardW - 0.5,
      h: 1.3,
      fontFace: MONO,
      fontSize: 64,
      bold: true,
      color: COLORS.ink,
    });

    s.addText("Total acumulado", {
      x: x + 0.25,
      y: startY + 2.2,
      w: cardW - 0.5,
      h: 0.3,
      fontFace: FONT,
      fontSize: 11,
      color: COLORS.muted,
    });

    s.addShape("line", {
      x: x + 0.25,
      y: startY + 2.55,
      w: cardW - 0.5,
      h: 0,
      line: { color: COLORS.border, width: 1 },
    });

    const deltaText =
      kpi.k.deltaPct === null
        ? "—"
        : kpi.k.deltaPct === 0
          ? "0%"
          : `${kpi.k.deltaPct > 0 ? "+" : ""}${kpi.k.deltaPct}%`;
    const deltaColor =
      kpi.k.deltaPct === null || kpi.k.deltaPct === 0
        ? COLORS.muted
        : kpi.k.deltaPct > 0
          ? COLORS.emerald
          : COLORS.rose;

    s.addText(`+${kpi.k.week}`, {
      x: x + 0.25,
      y: startY + 2.7,
      w: cardW - 0.5,
      h: 0.5,
      fontFace: MONO,
      fontSize: 24,
      bold: true,
      color: kpi.color,
    });
    s.addText("últimos 7 días", {
      x: x + 0.25,
      y: startY + 3.15,
      w: cardW - 0.5,
      h: 0.25,
      fontFace: FONT,
      fontSize: 9,
      color: COLORS.muted,
    });

    s.addText(deltaText, {
      x: x + cardW - 1.0,
      y: startY + 2.85,
      w: 0.75,
      h: 0.35,
      align: "right",
      fontFace: MONO,
      fontSize: 12,
      bold: true,
      color: deltaColor,
    });
    s.addText("vs prev.", {
      x: x + cardW - 1.0,
      y: startY + 3.15,
      w: 0.75,
      h: 0.25,
      align: "right",
      fontFace: FONT,
      fontSize: 9,
      color: COLORS.muted,
    });
  });

  addFooter(s, 3, TOTAL_SLIDES);
}

// ----- 4. Funnel -----
function buildFunnelSlide(
  pptx: InstanceType<typeof import("pptxgenjs").default>,
  data: ReportData
) {
  const s = pptx.addSlide();
  s.background = { color: COLORS.bg };
  addPageHeader(s, "03 · EMBUDO RETO NACIONAL", "Conversión por etapa");

  const startX = 0.5;
  const startY = 2.3;
  const cardW = 3.95;
  const cardH = 3.2;
  const gap = 0.25;
  const colors = [COLORS.amber, COLORS.violet, COLORS.accent];

  data.funnel.forEach((step, i) => {
    const x = startX + i * (cardW + gap);

    s.addShape("rect", {
      x,
      y: startY,
      w: cardW,
      h: cardH,
      fill: { color: COLORS.surface },
      line: { color: COLORS.border, width: 1 },
    });

    s.addText(`${String(i + 1).padStart(2, "0")} · ${step.label.toUpperCase()}`, {
      x: x + 0.3,
      y: startY + 0.3,
      w: cardW - 0.6,
      h: 0.35,
      fontFace: MONO,
      fontSize: 11,
      color: colors[i],
      charSpacing: 3,
    });

    s.addText(String(step.count), {
      x: x + 0.3,
      y: startY + 0.85,
      w: cardW - 0.6,
      h: 1.5,
      fontFace: MONO,
      fontSize: 80,
      bold: true,
      color: COLORS.ink,
    });

    if (step.conversionPct !== null) {
      s.addShape("line", {
        x: x + 0.3,
        y: startY + 2.45,
        w: cardW - 0.6,
        h: 0,
        line: { color: COLORS.border, width: 1 },
      });
      s.addText(`${step.conversionPct}%`, {
        x: x + 0.3,
        y: startY + 2.55,
        w: cardW - 0.6,
        h: 0.4,
        fontFace: MONO,
        fontSize: 18,
        bold: true,
        color: colors[i],
      });
      s.addText("del paso anterior", {
        x: x + 0.3,
        y: startY + 2.9,
        w: cardW - 0.6,
        h: 0.25,
        fontFace: FONT,
        fontSize: 10,
        color: COLORS.muted,
      });
    } else {
      s.addText("punto de entrada", {
        x: x + 0.3,
        y: startY + 2.7,
        w: cardW - 0.6,
        h: 0.3,
        fontFace: FONT,
        fontSize: 11,
        italic: true,
        color: COLORS.muted,
      });
    }

    if (i < data.funnel.length - 1) {
      s.addText("→", {
        x: x + cardW - 0.05,
        y: startY + 1.4,
        w: gap + 0.1,
        h: 0.5,
        align: "center",
        fontFace: FONT,
        fontSize: 28,
        bold: true,
        color: COLORS.muted,
      });
    }
  });

  // Insight line
  const overallConv =
    data.funnel[0].count > 0
      ? Math.round((data.funnel[2].count / data.funnel[0].count) * 100)
      : 0;
  s.addText(
    `Conversión global: ${overallConv}% de los interesados llegaron a entregar proyecto.`,
    {
      x: 0.5,
      y: 5.9,
      w: 12.33,
      h: 0.5,
      fontFace: FONT,
      fontSize: 14,
      italic: true,
      color: COLORS.muted,
    }
  );

  addFooter(s, 4, TOTAL_SLIDES);
}

// ----- 5. Quiz activity 30 days -----
function buildActivitySlide(
  pptx: InstanceType<typeof import("pptxgenjs").default>,
  data: ReportData
) {
  const s = pptx.addSlide();
  s.background = { color: COLORS.bg };
  addPageHeader(s, "04 · ACTIVIDAD", "Quizzes enviados — últimos 30 días");

  const total = data.activity30d.reduce((a, b) => a + b.count, 0);
  const peak = Math.max(...data.activity30d.map((b) => b.count), 0);

  if (total === 0) {
    s.addText("Aún no hay quizzes enviados.", {
      x: 0.5,
      y: 3,
      w: 12.33,
      h: 0.6,
      align: "center",
      fontFace: FONT,
      fontSize: 18,
      italic: true,
      color: COLORS.muted,
    });
  } else {
    s.addChart(
      "bar",
      [
        {
          name: "Quizzes",
          labels: data.activity30d.map((b) => b.label),
          values: data.activity30d.map((b) => b.count),
        },
      ],
      {
        x: 0.5,
        y: 2.0,
        w: 12.33,
        h: 4.6,
        barDir: "col",
        chartColors: [COLORS.accent],
        showLegend: false,
        showTitle: false,
        catAxisLabelFontFace: MONO,
        catAxisLabelFontSize: 8,
        catAxisLabelColor: COLORS.muted,
        valAxisLabelFontFace: MONO,
        valAxisLabelFontSize: 9,
        valAxisLabelColor: COLORS.muted,
        valGridLine: { style: "solid", size: 0.5, color: COLORS.border },
        catGridLine: { style: "none" },
        plotArea: { fill: { color: COLORS.surface } },
      }
    );
  }

  // Stat row
  const stats = [
    { v: total, l: "quizzes en 30 días" },
    { v: peak, l: "pico en un solo día" },
    { v: data.kpis.quizzes.week, l: "en los últimos 7 días" },
  ];
  const stripY = 6.55;
  const stripX = 0.5;
  const stripW = 12.33;
  const cellW = stripW / stats.length;
  stats.forEach((stat, i) => {
    s.addText(String(stat.v), {
      x: stripX + i * cellW,
      y: stripY,
      w: cellW,
      h: 0.4,
      align: "center",
      fontFace: MONO,
      fontSize: 22,
      bold: true,
      color: COLORS.ink,
    });
    s.addText(stat.l, {
      x: stripX + i * cellW,
      y: stripY + 0.42,
      w: cellW,
      h: 0.25,
      align: "center",
      fontFace: FONT,
      fontSize: 10,
      color: COLORS.muted,
    });
  });

  addFooter(s, 5, TOTAL_SLIDES);
}

// ----- 6. Per-taller -----
function buildTallerSlide(
  pptx: InstanceType<typeof import("pptxgenjs").default>,
  data: ReportData
) {
  const s = pptx.addSlide();
  s.background = { color: COLORS.bg };
  addPageHeader(s, "05 · DESEMPEÑO POR TALLER", "Quizzes, promedio y aprobación");

  if (data.tallerStats.length === 0) {
    s.addText("Sin datos por taller.", {
      x: 0.5,
      y: 3,
      w: 12.33,
      h: 0.6,
      align: "center",
      fontFace: FONT,
      fontSize: 18,
      italic: true,
      color: COLORS.muted,
    });
    addFooter(s, 6, TOTAL_SLIDES);
    return;
  }

  const header = ["N", "Taller", "Quizzes", "Promedio", "Aprobados"];
  const headerRow = header.map((h) => ({
    text: h,
    options: {
      bold: true,
      color: COLORS.surface,
      fill: { color: COLORS.ink },
      fontFace: MONO,
      fontSize: 10,
      align: "left" as const,
      valign: "middle" as const,
    },
  }));

  const rows = data.tallerStats.map((t) => [
    {
      text: String(t.n).padStart(2, "0"),
      options: { fontFace: MONO, fontSize: 11, color: COLORS.accentDark },
    },
    {
      text: t.title + (t.published ? "" : "  (oculto)"),
      options: {
        fontFace: FONT,
        fontSize: 11,
        color: t.published ? COLORS.ink : COLORS.muted,
      },
    },
    {
      text: String(t.count),
      options: {
        fontFace: MONO,
        fontSize: 11,
        align: "right" as const,
        color: COLORS.ink,
      },
    },
    {
      text: t.count === 0 ? "—" : `${t.avgPct}%`,
      options: {
        fontFace: MONO,
        fontSize: 11,
        align: "right" as const,
        color:
          t.count === 0
            ? COLORS.muted
            : t.avgPct >= 60
              ? COLORS.emerald
              : COLORS.amber,
        bold: t.count > 0,
      },
    },
    {
      text: t.count === 0 ? "—" : `${t.passRate}%`,
      options: {
        fontFace: MONO,
        fontSize: 11,
        align: "right" as const,
        color:
          t.count === 0
            ? COLORS.muted
            : t.passRate >= 60
              ? COLORS.emerald
              : COLORS.rose,
        bold: t.count > 0,
      },
    },
  ]);

  s.addTable([headerRow, ...rows], {
    x: 0.5,
    y: 2.0,
    w: 12.33,
    colW: [0.8, 6.83, 1.4, 1.5, 1.8],
    rowH: 0.38,
    border: { type: "solid", color: COLORS.border, pt: 0.5 },
    fill: { color: COLORS.surface },
  });

  addFooter(s, 6, TOTAL_SLIDES);
}

// ----- 7. Score distribution -----
function buildScoreDistSlide(
  pptx: InstanceType<typeof import("pptxgenjs").default>,
  data: ReportData
) {
  const s = pptx.addSlide();
  s.background = { color: COLORS.bg };
  addPageHeader(
    s,
    "06 · DISTRIBUCIÓN DE PUNTAJES",
    "Cómo se distribuyen los resultados"
  );

  const total = data.scoreDist.reduce((a, b) => a + b.count, 0);

  if (total === 0) {
    s.addText("Sin datos.", {
      x: 0.5,
      y: 3,
      w: 12.33,
      h: 0.6,
      align: "center",
      fontFace: FONT,
      fontSize: 18,
      italic: true,
      color: COLORS.muted,
    });
    addFooter(s, 7, TOTAL_SLIDES);
    return;
  }

  const labels = data.scoreDist.map((b) => b.bucket);
  const values = data.scoreDist.map((b) => b.count);
  const barColors = data.scoreDist.map((b) =>
    parseInt(b.bucket) >= 60 ? COLORS.emerald : COLORS.amber
  );

  s.addChart(
    "bar",
    [
      {
        name: "Quizzes",
        labels,
        values,
      },
    ],
    {
      x: 0.5,
      y: 2.0,
      w: 8.0,
      h: 4.8,
      barDir: "col",
      chartColors: barColors,
      chartColorsOpacity: 100,
      showLegend: false,
      showTitle: false,
      showValue: true,
      dataLabelFontFace: MONO,
      dataLabelFontSize: 10,
      dataLabelColor: COLORS.ink,
      catAxisLabelFontFace: MONO,
      catAxisLabelFontSize: 11,
      catAxisLabelColor: COLORS.muted,
      valAxisLabelFontFace: MONO,
      valAxisLabelFontSize: 10,
      valAxisLabelColor: COLORS.muted,
      plotArea: { fill: { color: COLORS.surface } },
    }
  );

  // Side commentary
  const sideX = 9.0;
  const sideY = 2.0;
  const sideW = 3.83;
  s.addShape("rect", {
    x: sideX,
    y: sideY,
    w: sideW,
    h: 4.8,
    fill: { color: COLORS.surface },
    line: { color: COLORS.border, width: 1 },
  });
  s.addText("INTERPRETACIÓN", {
    x: sideX + 0.3,
    y: sideY + 0.3,
    w: sideW - 0.6,
    h: 0.3,
    fontFace: MONO,
    fontSize: 10,
    color: COLORS.muted,
    charSpacing: 3,
  });

  const passingHigh = data.scoreDist
    .filter((b) => parseInt(b.bucket) >= 60)
    .reduce((a, b) => a + b.count, 0);
  const passingPct = Math.round((passingHigh / total) * 100);

  s.addText(`${passingPct}%`, {
    x: sideX + 0.3,
    y: sideY + 0.7,
    w: sideW - 0.6,
    h: 1.0,
    fontFace: MONO,
    fontSize: 56,
    bold: true,
    color: passingPct >= 60 ? COLORS.emerald : COLORS.amber,
  });
  s.addText("de quizzes con 60% o más", {
    x: sideX + 0.3,
    y: sideY + 1.75,
    w: sideW - 0.6,
    h: 0.5,
    fontFace: FONT,
    fontSize: 13,
    color: COLORS.ink,
  });

  s.addShape("line", {
    x: sideX + 0.3,
    y: sideY + 2.5,
    w: sideW - 0.6,
    h: 0,
    line: { color: COLORS.border, width: 1 },
  });

  const breakdown = data.scoreDist
    .map((b) => `${b.bucket}: ${b.count} quizzes`)
    .join("\n");
  s.addText(breakdown, {
    x: sideX + 0.3,
    y: sideY + 2.7,
    w: sideW - 0.6,
    h: 2.0,
    fontFace: MONO,
    fontSize: 11,
    color: COLORS.muted,
    paraSpaceAfter: 6,
  });

  addFooter(s, 7, TOTAL_SLIDES);
}

// ----- 8. Top schools -----
function buildTopSchoolsSlide(
  pptx: InstanceType<typeof import("pptxgenjs").default>,
  data: ReportData
) {
  const s = pptx.addSlide();
  s.background = { color: COLORS.bg };
  addPageHeader(
    s,
    "07 · ESCUELAS",
    "Top escuelas por participación total"
  );

  if (data.topSchools.length === 0) {
    s.addText("Sin datos de escuelas.", {
      x: 0.5,
      y: 3,
      w: 12.33,
      h: 0.6,
      align: "center",
      fontFace: FONT,
      fontSize: 18,
      italic: true,
      color: COLORS.muted,
    });
    addFooter(s, 8, TOTAL_SLIDES);
    return;
  }

  const ordered = [...data.topSchools].reverse();

  s.addChart(
    "bar",
    [
      {
        name: "Participación",
        labels: ordered.map((x) => x.key),
        values: ordered.map((x) => x.count),
      },
    ],
    {
      x: 0.5,
      y: 2.0,
      w: 12.33,
      h: 4.8,
      barDir: "bar",
      chartColors: [COLORS.ink],
      showLegend: false,
      showTitle: false,
      showValue: true,
      dataLabelFontFace: MONO,
      dataLabelFontSize: 10,
      dataLabelColor: COLORS.ink,
      catAxisLabelFontFace: FONT,
      catAxisLabelFontSize: 11,
      catAxisLabelColor: COLORS.ink,
      valAxisLabelFontFace: MONO,
      valAxisLabelFontSize: 9,
      valAxisLabelColor: COLORS.muted,
      plotArea: { fill: { color: COLORS.surface } },
    }
  );

  addFooter(s, 8, TOTAL_SLIDES);
}

// ----- 9. Regional -----
function buildRegionalSlide(
  pptx: InstanceType<typeof import("pptxgenjs").default>,
  data: ReportData
) {
  const s = pptx.addSlide();
  s.background = { color: COLORS.bg };
  addPageHeader(
    s,
    "08 · REGIÓN EDUCATIVA",
    "Distribución geográfica"
  );

  if (data.regional.length === 0) {
    s.addText("Sin datos regionales.", {
      x: 0.5,
      y: 3,
      w: 12.33,
      h: 0.6,
      align: "center",
      fontFace: FONT,
      fontSize: 18,
      italic: true,
      color: COLORS.muted,
    });
    addFooter(s, 9, TOTAL_SLIDES);
    return;
  }

  const ordered = [...data.regional].reverse();

  s.addChart(
    "bar",
    [
      {
        name: "Personas",
        labels: ordered.map((x) => x.key),
        values: ordered.map((x) => x.count),
      },
    ],
    {
      x: 0.5,
      y: 2.0,
      w: 12.33,
      h: 4.8,
      barDir: "bar",
      chartColors: [COLORS.accent],
      showLegend: false,
      showTitle: false,
      showValue: true,
      dataLabelFontFace: MONO,
      dataLabelFontSize: 10,
      dataLabelColor: COLORS.ink,
      catAxisLabelFontFace: FONT,
      catAxisLabelFontSize: 11,
      catAxisLabelColor: COLORS.ink,
      valAxisLabelFontFace: MONO,
      valAxisLabelFontSize: 9,
      valAxisLabelColor: COLORS.muted,
      plotArea: { fill: { color: COLORS.surface } },
    }
  );

  addFooter(s, 9, TOTAL_SLIDES);
}

// ----- 10. Closing -----
function buildClosingSlide(
  pptx: InstanceType<typeof import("pptxgenjs").default>,
  data: ReportData
) {
  const s = pptx.addSlide();
  s.background = { color: COLORS.ink };

  s.addShape("rect", {
    x: 0.5,
    y: 0.5,
    w: 1.5,
    h: 0.08,
    fill: { color: COLORS.accent },
    line: { color: COLORS.accent },
  });

  s.addText("Gracias.", {
    x: 0.5,
    y: 2.6,
    w: 12.33,
    h: 1.5,
    fontFace: FONT,
    fontSize: 96,
    bold: true,
    color: COLORS.surface,
  });

  s.addText(
    `Reporte generado a partir de ${data.kpis.quizzes.total} quizzes, ${data.kpis.inscripciones.total} inscripciones y ${data.kpis.entregas.total} entregas registrados al ${prettyDate(data.generatedAt)}.`,
    {
      x: 0.5,
      y: 4.4,
      w: 12.33,
      h: 1.0,
      fontFace: FONT,
      fontSize: 16,
      color: COLORS.mutedLight,
    }
  );

  s.addShape("line", {
    x: 0.5,
    y: 6.7,
    w: 12.33,
    h: 0,
    line: { color: COLORS.muted, width: 1 },
  });
  s.addText("Preparado por", {
    x: 0.5,
    y: 6.85,
    w: 4,
    h: 0.3,
    fontFace: MONO,
    fontSize: 10,
    color: COLORS.mutedLight,
    charSpacing: 3,
  });
  s.addText("Daniel Abadi", {
    x: 0.5,
    y: 7.1,
    w: 4,
    h: 0.35,
    fontFace: FONT,
    fontSize: 16,
    bold: true,
    color: COLORS.surface,
  });
  s.addText(`Página 10 de ${TOTAL_SLIDES}`, {
    x: 8.33,
    y: 7.1,
    w: 4.5,
    h: 0.35,
    align: "right",
    fontFace: MONO,
    fontSize: 10,
    color: COLORS.mutedLight,
  });
}
