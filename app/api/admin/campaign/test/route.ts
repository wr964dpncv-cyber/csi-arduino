import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { sendProgressReminder } from "@/lib/notify";

const TEST_RECIPIENT = "johnny018@live.com";

export async function POST() {
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
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY no configurado en el servidor" },
      { status: 503 }
    );
  }

  const total = 10;
  const samples: Array<{
    variant: "A" | "B" | "C";
    studentName: string;
    completed: number;
  }> = [
    { variant: "B", studentName: "Andrés Vargas", completed: 0 },
    { variant: "A", studentName: "Carlos Mendoza", completed: 3 },
    { variant: "C", studentName: "María Sánchez", completed: total },
  ];

  const results: Array<{ variant: string; ok: boolean; error?: string }> = [];
  for (const s of samples) {
    try {
      await sendProgressReminder({
        to: TEST_RECIPIENT,
        studentName: s.studentName,
        completed: s.completed,
        total,
      });
      results.push({ variant: s.variant, ok: true });
    } catch (err) {
      results.push({
        variant: s.variant,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return NextResponse.json({
    ok: true,
    recipient: TEST_RECIPIENT,
    results,
  });
}
