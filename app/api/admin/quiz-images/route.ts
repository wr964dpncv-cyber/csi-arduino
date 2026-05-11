import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(req: Request) {
  if (!isSupabaseConfigured())
    return NextResponse.json(
      { error: "Supabase no configurado" },
      { status: 503 }
    );

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: `Tipo no permitido: ${file.type}` },
      { status: 400 }
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Imagen demasiado grande (máx 5 MB)" },
      { status: 400 }
    );
  }

  const admin = adminClient();
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const safeExt = ext.replace(/[^a-z0-9]/g, "").slice(0, 8) || "bin";
  const path = `admin-images/${crypto.randomUUID()}.${safeExt}`;
  const buf = new Uint8Array(await file.arrayBuffer());

  const { error: upErr } = await admin.storage
    .from("quiz-uploads")
    .upload(path, buf, { contentType: file.type, upsert: false });

  if (upErr) {
    console.error("[admin:quiz-images] upload error", upErr);
    return NextResponse.json(
      { error: "No se pudo subir la imagen." },
      { status: 500 }
    );
  }

  const { data: pub } = admin.storage
    .from("quiz-uploads")
    .getPublicUrl(path);

  return NextResponse.json({ ok: true, url: pub.publicUrl });
}
