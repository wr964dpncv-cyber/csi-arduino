import { notFound } from "next/navigation";
import TallerPage from "@/components/TallerPage";
import { talleres, getTaller } from "@/lib/talleres";

export function generateStaticParams() {
  return talleres.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = talleres.find((t) => t.slug === slug);
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
  const t = talleres.find((t) => t.slug === slug);
  if (!t) notFound();

  const prev = getTaller(t.n - 1);
  const next = getTaller(t.n + 1);

  return <TallerPage taller={t} prev={prev} next={next} />;
}
