import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { talleres as seedTalleres, type Taller } from "@/lib/talleres";

export type CalendarEvent = {
  id?: string;
  taller_n: number;
  day: string;
  date_text: string;
  time: string;
  sort_order: number;
};

const seedCalendar: CalendarEvent[] = [
  { taller_n: 1, day: "Sáb", date_text: "28 de marzo", time: "18:00", sort_order: 1 },
  { taller_n: 2, day: "Jue", date_text: "2 de abril", time: "18:00", sort_order: 2 },
  { taller_n: 3, day: "Sáb", date_text: "4 de abril", time: "18:00", sort_order: 3 },
  { taller_n: 4, day: "Lun", date_text: "6 de abril", time: "18:00", sort_order: 4 },
  { taller_n: 5, day: "Lun", date_text: "20 de abril", time: "18:00", sort_order: 5 },
  { taller_n: 6, day: "Jue", date_text: "23 de abril", time: "18:00", sort_order: 6 },
  { taller_n: 7, day: "Lun", date_text: "27 de abril", time: "18:00", sort_order: 7 },
  { taller_n: 8, day: "Jue", date_text: "30 de abril", time: "18:00", sort_order: 8 },
  { taller_n: 9, day: "Lun", date_text: "4 de mayo", time: "18:00", sort_order: 9 },
  { taller_n: 10, day: "Jue", date_text: "7 de mayo", time: "18:00", sort_order: 10 },
  { taller_n: 11, day: "Lun", date_text: "11 de mayo", time: "18:00", sort_order: 11 },
  { taller_n: 12, day: "Jue", date_text: "14 de mayo", time: "18:00", sort_order: 12 },
];

type TallerRow = {
  n: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  objectives: string[];
  outcome: string;
  video_id: string;
  quiz_url: string;
  level: Taller["level"];
  topic: string;
};

function rowToTaller(row: TallerRow): Taller {
  return {
    n: row.n,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    objectives: row.objectives ?? [],
    outcome: row.outcome,
    videoId: row.video_id,
    quizUrl: row.quiz_url,
    level: row.level,
    topic: row.topic,
  };
}

export async function getAllTalleres(): Promise<Taller[]> {
  if (!isSupabaseConfigured()) return seedTalleres;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("talleres")
      .select("*")
      .order("n");
    if (error || !data || data.length === 0) return seedTalleres;
    return (data as TallerRow[]).map(rowToTaller);
  } catch {
    return seedTalleres;
  }
}

export async function getTallerBySlug(slug: string): Promise<Taller | null> {
  if (!isSupabaseConfigured()) {
    return seedTalleres.find((t) => t.slug === slug) ?? null;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("talleres")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error || !data) {
      return seedTalleres.find((t) => t.slug === slug) ?? null;
    }
    return rowToTaller(data as TallerRow);
  } catch {
    return seedTalleres.find((t) => t.slug === slug) ?? null;
  }
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  if (!isSupabaseConfigured()) return seedCalendar;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .order("sort_order");
    if (error || !data || data.length === 0) return seedCalendar;
    return data as CalendarEvent[];
  } catch {
    return seedCalendar;
  }
}
