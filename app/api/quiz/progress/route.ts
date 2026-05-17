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
      .select("taller_n")
      .eq("student_email", email),
    admin
      .from("talleres")
      .select("n, title")
      .eq("published", true)
      .order("n", { ascending: true }),
    admin
      .from("reto_interes")
      .select("id")
      .eq("email", email)
      .maybeSingle(),
  ]);

  const completed = Array.from(
    new Set(((respRes.data ?? []) as Array<{ taller_n: number }>).map((r) => r.taller_n))
  ).sort((a, b) => a - b);

  const allTalleres = (talleresRes.data ?? []) as Array<{ n: number; title: string }>;
  const retoInteresado = Boolean(interesRes.data);

  return NextResponse.json({ completed, allTalleres, retoInteresado });
}
