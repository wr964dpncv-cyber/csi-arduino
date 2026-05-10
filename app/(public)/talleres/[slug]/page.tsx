import { notFound } from "next/navigation";
import TallerPage from "@/components/TallerPage";
import {
  getAllTalleres,
  getTallerBySlug,
  getCalendarEvents,
} from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  const talleres = await getAllTalleres();
  return talleres.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTallerBySlug(slug);
  if (!t) return {};
  return {
    title: `Taller ${t.n} · ${t.title} — Principios de Arduino`,
    description: t.tagline,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTallerBySlug(slug);
  if (!t) notFound();

  const [all, calendar] = await Promise.all([
    getAllTalleres(),
    getCalendarEvents(),
  ]);
  const prev = all.find((x) => x.n === t.n - 1);
  const next = all.find((x) => x.n === t.n + 1);
  const calendarEvent = calendar.find((c) => c.taller_n === t.n);

  return (
    <TallerPage
      taller={t}
      prev={prev}
      next={next}
      calendarEvent={
        calendarEvent
          ? {
              day: calendarEvent.day,
              dateText: calendarEvent.date_text,
              time: calendarEvent.time,
            }
          : undefined
      }
    />
  );
}
