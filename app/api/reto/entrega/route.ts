import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { isEntregaOpen } from "@/lib/reto";
import { notifyEntrega } from "@/lib/notify";

type Body = {
  equipoNombre: string;
  proyectoNombre: string;
  tinkercadUrl: string;
  videoUrl: string;
  descripcion: string;
};

function validate(body: unknown): body is Body {
  if (!body || typeof body !== "object") return false;
  const b = body as Body;
  return Boolean(
    b.equipoNombre &&
      b.proyectoNombre &&
      b.tinkercadUrl &&
      b.videoUrl &&
      b.descripcion
  );
}

export async function POST(req: Request) {
  if (!isEntregaOpen()) {
    return NextResponse.json(
      { error: "La entrega de proyectos aún no está abierta." },
      { status: 403 }
    );
  }

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

  if (!isSupabaseConfigured()) {
    console.log("[reto:entrega] Supabase no configurado, registrando en consola:", body);
    return NextResponse.json({ ok: true, configured: false });
  }

  try {
    const supabase = await createClient();
    const b = body as Body;
    const { error } = await supabase.from("reto_entregas").insert({
      equipo_nombre: b.equipoNombre,
      proyecto_nombre: b.proyectoNombre,
      tinkercad_url: b.tinkercadUrl,
      video_url: b.videoUrl,
      descripcion: b.descripcion,
    });

    if (error) {
      console.error("[reto:entrega] DB error", error);
      return NextResponse.json(
        { error: "No se pudo guardar la entrega. Intenta de nuevo." },
        { status: 500 }
      );
    }

    await notifyEntrega({
      equipoNombre: b.equipoNombre,
      proyectoNombre: b.proyectoNombre,
      tinkercadUrl: b.tinkercadUrl,
      videoUrl: b.videoUrl,
      descripcion: b.descripcion,
    });

    return NextResponse.json({ ok: true, configured: true });
  } catch (err) {
    console.error("[reto:entrega] failed", err);
    return NextResponse.json(
      { error: "Error al procesar la entrega." },
      { status: 500 }
    );
  }
}
