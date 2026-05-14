import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";

const VALID_KEYS = new Set(["interes", "inscripcion", "quiz", "entrega"]);

export async function PATCH(req: Request) {
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
  if (!user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  let body: { key?: string; enabled?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!body.key || !VALID_KEYS.has(body.key) || typeof body.enabled !== "boolean") {
    return NextResponse.json(
      { error: "Datos inválidos." },
      { status: 400 }
    );
  }

  const admin = adminClient();
  const { error } = await admin
    .from("notification_settings")
    .update({ enabled: body.enabled, updated_at: new Date().toISOString() })
    .eq("key", body.key);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/admin/notificaciones");
  return NextResponse.json({ ok: true });
}
