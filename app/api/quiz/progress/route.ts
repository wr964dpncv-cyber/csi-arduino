import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ completed: [], allTalleres: [] });
  }

  const url = new URL(req.url);
  const email = (url.searchParams.get("email") ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ completed: [], allTalleres: [] });
  }

  const admin = adminClient();
  const [respRes, talleresRes, interesRes] = await Promise.all([
    admin
      .from("quiz_responses")
      .select(
        "taller_n, created_at, student_name, student_phone, student_school, student_region"
      )
      .eq("student_email", email)
      .order("created_at", { ascending: false }),
    admin
      .from("talleres")
      .select("n, title")
      .eq("published", true)
      .order("n", { ascending: true }),
    admin
      .from("reto_interes")
      .select("nombre, telefono, escuela, region")
      .eq("email", email)
      .maybeSingle(),
  ]);

  type Resp = {
    taller_n: number;
    created_at: string;
    student_name: string | null;
    student_phone: string | null;
    student_school: string | null;
    student_region: string | null;
  };
  const resps = (respRes.data ?? []) as Resp[];

  const completed = Array.from(new Set(resps.map((r) => r.taller_n))).sort(
    (a, b) => a - b
  );

  const allTalleres = (talleresRes.data ?? []) as Array<{
    n: number;
    title: string;
  }>;

  const interes = (interesRes.data ?? null) as {
    nombre: string | null;
    telefono: string | null;
    escuela: string | null;
    region: string | null;
  } | null;
  const retoInteresado = Boolean(interes);

  // Pre-llenado: mejor valor disponible para cada campo.
  // Para name: ignora si parece email-prefix (caso de imports históricos).
  const emailPrefix = email.split("@")[0]?.toLowerCase() ?? "";
  const isEmailPrefix = (s: string | null | undefined) =>
    !!s && s.trim().toLowerCase() === emailPrefix;
  const firstNonEmpty = (vals: Array<string | null | undefined>) =>
    vals.find((v) => v && v.trim() && !isEmailPrefix(v))?.trim() ?? null;
  const firstNonEmptyAny = (vals: Array<string | null | undefined>) =>
    vals.find((v) => v && v.trim())?.trim() ?? null;

  const prefill = {
    name: firstNonEmpty([
      ...resps.map((r) => r.student_name),
      interes?.nombre,
    ]),
    phone: firstNonEmptyAny([
      ...resps.map((r) => r.student_phone),
      interes?.telefono,
    ]),
    school: firstNonEmptyAny([
      ...resps.map((r) => r.student_school),
      interes?.escuela,
    ]),
    region: firstNonEmptyAny([
      ...resps.map((r) => r.student_region),
      interes?.region,
    ]),
  };

  return NextResponse.json({
    completed,
    allTalleres,
    retoInteresado,
    prefill,
  });
}
