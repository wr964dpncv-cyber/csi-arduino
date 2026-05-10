import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";

type Body = {
  studentName: string;
  studentEmail: string;
  studentSchool?: string;
  answers: Array<{ question_id: string; selected_index: number }>;
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isSupabaseConfigured())
    return NextResponse.json(
      { error: "Sistema no configurado" },
      { status: 503 }
    );

  const { slug } = await params;

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (
    !body.studentName?.trim() ||
    !body.studentEmail?.trim() ||
    !Array.isArray(body.answers)
  ) {
    return NextResponse.json(
      { error: "Datos incompletos." },
      { status: 400 }
    );
  }

  const admin = adminClient();

  // Find taller
  const { data: taller, error: tallerErr } = await admin
    .from("talleres")
    .select("id, n, title")
    .eq("slug", slug)
    .single();

  if (tallerErr || !taller) {
    return NextResponse.json(
      { error: "Taller no encontrado" },
      { status: 404 }
    );
  }

  // Get questions with correct answers
  const { data: questions, error: qErr } = await admin
    .from("quiz_questions")
    .select("id, correct_index")
    .eq("taller_id", taller.id);

  if (qErr || !questions || questions.length === 0) {
    return NextResponse.json(
      { error: "Este taller no tiene quiz disponible." },
      { status: 400 }
    );
  }

  // Score the answers
  const correctMap = new Map<string, number>(
    questions.map((q) => [q.id, q.correct_index])
  );

  const scoredAnswers = body.answers.map((a) => {
    const correctIdx = correctMap.get(a.question_id);
    return {
      question_id: a.question_id,
      selected_index: a.selected_index,
      correct: correctIdx === a.selected_index,
    };
  });

  const score = scoredAnswers.filter((a) => a.correct).length;
  const total = questions.length;

  // Save response
  const { error } = await admin.from("quiz_responses").insert({
    taller_id: taller.id,
    taller_n: taller.n,
    taller_title: taller.title,
    student_name: body.studentName.trim(),
    student_email: body.studentEmail.trim().toLowerCase(),
    student_school: body.studentSchool?.trim() ?? null,
    answers: scoredAnswers,
    score,
    total,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    score,
    total,
    answers: scoredAnswers,
  });
}
