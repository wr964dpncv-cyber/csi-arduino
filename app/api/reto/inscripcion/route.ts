import { NextResponse } from "next/server";

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
    if (!m.nombre || !m.apellido || !m.emailInstitucional || !m.telefono) return false;
  }
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

  const url = process.env.RETO_INSCRIPCION_URL;

  if (!url) {
    console.log("[reto:inscripcion] (sin RETO_INSCRIPCION_URL configurada):", body);
    return NextResponse.json({ ok: true, configured: false });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: "inscripcion", ...(body as Body) }),
    });
    if (!res.ok) {
      console.error("[reto:inscripcion] upstream error", res.status);
      return NextResponse.json(
        { error: "El servidor de registro no respondió. Intenta de nuevo." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, configured: true });
  } catch (err) {
    console.error("[reto:inscripcion] fetch failed", err);
    return NextResponse.json(
      { error: "No se pudo conectar al servidor de registro." },
      { status: 502 }
    );
  }
}
