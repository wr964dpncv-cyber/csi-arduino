import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { isInscripcionOpen } from "@/lib/reto";
import { notifyInscripcion } from "@/lib/notify";

type Member = {
  nombre: string;
  apellido: string;
  emailInstitucional: string;
  emailPersonal: string;
  telefono: string;
};

type Body = {
  equipo: { nombre: string; escuela: string; region: string };
  integrantes: Member[];
};

function validate(body: unknown): body is Body {
  if (!body || typeof body !== "object") return false;
  const b = body as Body;
  if (!b.equipo?.nombre || !b.equipo?.escuela || !b.equipo?.region) return false;
  if (!Array.isArray(b.integrantes) || b.integrantes.length !== 3) return false;
  for (const m of b.integrantes) {
    if (!m.nombre || !m.apellido || !m.emailInstitucional || !m.telefono)
      return false;
  }
  return true;
}

export async function POST(req: Request) {
  if (!isInscripcionOpen()) {
    return NextResponse.json(
      { error: "Las inscripciones aún no están abiertas." },
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
    console.log("[reto:inscripcion] Supabase no configurado, registrando en consola:", body);
    return NextResponse.json({ ok: true, configured: false });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("reto_inscripciones").insert({
      equipo_nombre: (body as Body).equipo.nombre,
      escuela: (body as Body).equipo.escuela,
      region: (body as Body).equipo.region,
      integrantes: (body as Body).integrantes,
    });

    if (error) {
      console.error("[reto:inscripcion] DB error", error);
      return NextResponse.json(
        { error: "No se pudo guardar la inscripción. Intenta de nuevo." },
        { status: 500 }
      );
    }

    const b = body as Body;
    await notifyInscripcion({
      equipoNombre: b.equipo.nombre,
      escuela: b.equipo.escuela,
      region: b.equipo.region,
      integrantes: b.integrantes,
    });

    return NextResponse.json({ ok: true, configured: true });
  } catch (err) {
    console.error("[reto:inscripcion] failed", err);
    return NextResponse.json(
      { error: "Error al procesar la inscripción." },
      { status: 500 }
    );
  }
}
