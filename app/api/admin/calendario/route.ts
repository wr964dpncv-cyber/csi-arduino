import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type Event = {
  id?: string;
  taller_n: number;
  day: string;
  date_text: string;
  time: string;
  sort_order: number;
};

export async function PUT(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase no configurado" },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  let body: { events?: Event[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!Array.isArray(body.events)) {
    return NextResponse.json({ error: "events requerido" }, { status: 400 });
  }

  // Update existing rows, insert new ones
  for (const e of body.events) {
    const payload = {
      taller_n: e.taller_n,
      day: e.day,
      date_text: e.date_text,
      time: e.time,
      sort_order: e.sort_order,
      updated_at: new Date().toISOString(),
    };
    if (e.id) {
      const { error } = await supabase
        .from("calendar_events")
        .update(payload)
        .eq("id", e.id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      const { error } = await supabase.from("calendar_events").insert(payload);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  }

  revalidatePath("/calendario");
  revalidatePath("/admin/calendario");
  return NextResponse.json({ ok: true });
}
