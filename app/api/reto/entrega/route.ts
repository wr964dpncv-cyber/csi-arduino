import { NextResponse } from "next/server";

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

  const url = process.env.RETO_ENTREGA_URL;

  if (!url) {
    console.log("[reto:entrega] (sin RETO_ENTREGA_URL configurada):", body);
    return NextResponse.json({ ok: true, configured: false });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: "entrega", ...(body as Body) }),
    });
    if (!res.ok) {
      console.error("[reto:entrega] upstream error", res.status);
      return NextResponse.json(
        { error: "El servidor de registro no respondió. Intenta de nuevo." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, configured: true });
  } catch (err) {
    console.error("[reto:entrega] fetch failed", err);
    return NextResponse.json(
      { error: "No se pudo conectar al servidor de registro." },
      { status: 502 }
    );
  }
}
