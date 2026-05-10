export const SPANISH_MONTHS: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

export const SHORT_SPANISH_MONTHS: Record<number, string> = {
  0: "ene",
  1: "feb",
  2: "mar",
  3: "abr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "ago",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dic",
};

export function parseEventDate(text: string): Date | null {
  const m = text.toLowerCase().match(/(\d+)\s*de\s*([a-záéíóúñ]+)/);
  if (!m) return null;
  const day = parseInt(m[1]);
  const month = SPANISH_MONTHS[m[2]];
  if (month === undefined) return null;
  const now = new Date();
  let year = now.getFullYear();
  let date = new Date(year, month, day);
  // If the date is more than 6 months in the past, assume next year
  const monthsAgo =
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (monthsAgo > 6) {
    year += 1;
    date = new Date(year, month, day);
  }
  return date;
}

export type EventStatus = "past" | "today" | "next" | "future" | "unscheduled";

export function getEventStatus(date: Date | null, today: Date): EventStatus {
  if (!date) return "unscheduled";
  const eventDay = new Date(date);
  eventDay.setHours(0, 0, 0, 0);
  const todayDay = new Date(today);
  todayDay.setHours(0, 0, 0, 0);
  if (eventDay < todayDay) return "past";
  if (eventDay.getTime() === todayDay.getTime()) return "today";
  return "future";
}
