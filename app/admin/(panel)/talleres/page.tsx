import { getAllTalleres } from "@/lib/data";
import TalleresList from "./TalleresList";

export const metadata = { title: "Talleres · Admin" };
export const dynamic = "force-dynamic";

export default async function TalleresAdminPage() {
  const talleres = await getAllTalleres();
  return <TalleresList initialTalleres={talleres} />;
}
