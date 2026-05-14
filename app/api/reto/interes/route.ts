import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { notifyInteres } from "@/lib/notify";

type Body = {
  nombre: string;
  email: string;
  telefono: string;
  escuela?: string;
  region?: string;
};

function validate(body: unknown): body is Body {
  if (!body || typeof body !== "object") return false;
  const b = body as Body;
  if (!b.nombre?.trim() || !b.email?.trim() || !b.telefono?.trim()) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim())) return false;
  return true;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!validate(body)) {
    return NextResponse.json(
      { error: "Datos incompletos o inválidos." },
      { status: 400 }
    );
  }

  const b = body as Body;
  const clean = {
    nombre: b.nombre.trim(),
    email: b.email.trim().toLowerCase(),
    telefono: b.telefono.trim(),
    escuela: b.escuela?.trim() || undefined,
    region: b.region?.trim() || undefined,
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("reto_interes").insert({
        nombre: clean.nombre,
        email: clean.email,
        telefono: clean.telefono,
        escuela: clean.escuela ?? null,
        region: clean.region ?? null,
      });
      if (error) console.error("[reto:interes] DB error", error);
    } catch (err) {
      console.error("[reto:interes] DB failed", err);
    }
  } else {
    console.log("[reto:interes] Supabase no configurado:", clean);
  }

  await notifyInteres(clean);

  return NextResponse.json({ ok: true });
}
