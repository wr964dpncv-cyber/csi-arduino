import { getCalendarEvents } from "@/lib/data";
import CalendarEditor from "./CalendarEditor";

export const metadata = { title: "Calendario · Admin" };
export const dynamic = "force-dynamic";

export default async function CalendarioAdminPage() {
  const events = await getCalendarEvents();
  return <CalendarEditor initialEvents={events} />;
}
