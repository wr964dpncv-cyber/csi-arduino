import { notFound } from "next/navigation";
import { getTallerBySlug } from "@/lib/data";
import TallerEditor from "./TallerEditor";

export const metadata = { title: "Editar Taller · Admin" };
export const dynamic = "force-dynamic";

export default async function EditTallerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTallerBySlug(slug);
  if (!t) notFound();
  return <TallerEditor taller={t} />;
}
