import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";
import { notifyQuiz, sendQuizConfirmation } from "@/lib/notify";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);
const MAX_FILE_SIZE = 10 * 1024 * 1024;

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

  const contentType = req.headers.get("content-type") ?? "";
  const isMultipart = contentType.startsWith("multipart/form-data");

  let studentName = "";
  let studentEmail = "";
  let studentSchool = "";
  let studentPhone = "";
  let answers: Array<{ question_id: string; selected_index: number }> = [];
  let textAnswers: Record<string, string> = {};
  const filesByQuestion = new Map<string, File>();

  if (isMultipart) {
    const form = await req.formData();
    studentName = String(form.get("studentName") ?? "");
    studentEmail = String(form.get("studentEmail") ?? "");
    studentSchool = String(form.get("studentSchool") ?? "");
    studentPhone = String(form.get("studentPhone") ?? "");
    try {
      answers = JSON.parse(String(form.get("answers") ?? "[]"));
    } catch {
      return NextResponse.json({ error: "answers inválido" }, { status: 400 });
    }
    try {
      textAnswers = JSON.parse(String(form.get("text_answers") ?? "{}"));
    } catch {
      textAnswers = {};
    }
    for (const [key, value] of form.entries()) {
      if (key.startsWith("file:") && value instanceof File) {
        filesByQuestion.set(key.slice(5), value);
      }
    }
  } else {
    try {
      const body = await req.json();
      studentName = body.studentName ?? "";
      studentEmail = body.studentEmail ?? "";
      studentSchool = body.studentSchool ?? "";
      studentPhone = body.studentPhone ?? "";
      answers = body.answers ?? [];
      textAnswers = body.text_answers ?? {};
    } catch {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }
  }

  if (
    !studentName.trim() ||
    !studentEmail.trim() ||
    !studentPhone.trim() ||
    !Array.isArray(answers)
  ) {
    return NextResponse.json({ error: "Datos incompletos." }, { status: 400 });
  }

  const admin = adminClient();
  const emailLower = studentEmail.trim().toLowerCase();

  // Find taller
  const { data: taller, error: tallerErr } = await admin
    .from("talleres")
    .select("id, n, title")
    .eq("slug", slug)
    .single();

  if (tallerErr || !taller) {
    return NextResponse.json({ error: "Taller no encontrado" }, { status: 404 });
  }

  // Reject duplicate submission
  const { data: existing } = await admin
    .from("quiz_responses")
    .select("id, score, total, created_at")
    .eq("taller_id", taller.id)
    .eq("student_email", emailLower)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      {
        error: "Ya enviaste este quiz con ese correo.",
        alreadySubmitted: true,
        previous: {
          score: existing.score,
          total: existing.total,
          created_at: existing.created_at,
        },
      },
      { status: 409 }
    );
  }

  // Get questions with correct answers + type
  const { data: questions, error: qErr } = await admin
    .from("quiz_questions")
    .select("id, correct_index, question_type")
    .eq("taller_id", taller.id);

  if (qErr || !questions || questions.length === 0) {
    return NextResponse.json(
      { error: "Este taller no tiene quiz disponible." },
      { status: 400 }
    );
  }

  type QuestionRow = {
    id: string;
    correct_index: number;
    question_type: string | null;
  };
  const qList = questions as QuestionRow[];

  const correctMap = new Map<string, number>(
    qList.map((q) => [q.id, q.correct_index])
  );
  const fileQuestionIds = new Set(
    qList.filter((q) => q.question_type === "file_upload").map((q) => q.id)
  );
  const textQuestionIds = new Set(
    qList.filter((q) => q.question_type === "text_long").map((q) => q.id)
  );

  // Validate all file_upload questions have an uploaded file
  for (const fid of fileQuestionIds) {
    if (!filesByQuestion.has(fid)) {
      return NextResponse.json(
        { error: "Falta subir el archivo requerido." },
        { status: 400 }
      );
    }
  }

  // Validate all text_long questions have a non-empty answer
  const cleanedTextAnswers: Record<string, string> = {};
  for (const tid of textQuestionIds) {
    const txt = (textAnswers[tid] ?? "").trim();
    if (!txt) {
      return NextResponse.json(
        { error: "Falta responder una pregunta de texto." },
        { status: 400 }
      );
    }
    cleanedTextAnswers[tid] = txt;
  }

  // Upload files to Storage
  const fileUploads: Record<string, string> = {};
  for (const [questionId, file] of filesByQuestion.entries()) {
    if (!fileQuestionIds.has(questionId)) continue;
    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        { error: `Tipo de archivo no permitido: ${file.type}` },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Archivo demasiado grande (máx 10 MB).` },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
    const safeExt = ext.replace(/[^a-z0-9]/g, "").slice(0, 8) || "bin";
    const path = `${taller.id}/${questionId}/${crypto.randomUUID()}.${safeExt}`;
    const buf = new Uint8Array(await file.arrayBuffer());

    const { error: upErr } = await admin.storage
      .from("quiz-uploads")
      .upload(path, buf, {
        contentType: file.type,
        upsert: false,
      });

    if (upErr) {
      console.error("[quiz:submit] upload error", upErr);
      return NextResponse.json(
        { error: "No se pudo subir el archivo. Intenta de nuevo." },
        { status: 500 }
      );
    }

    const { data: pub } = admin.storage
      .from("quiz-uploads")
      .getPublicUrl(path);
    fileUploads[questionId] = pub.publicUrl;
  }

  // Score multiple-choice answers (file_upload questions don't count)
  const mcQuestions = qList.filter((q) => q.question_type !== "file_upload");
  const mcQuestionIds = new Set(mcQuestions.map((q) => q.id));

  const scoredAnswers = answers
    .filter((a) => mcQuestionIds.has(a.question_id))
    .map((a) => {
      const correctIdx = correctMap.get(a.question_id);
      return {
        question_id: a.question_id,
        selected_index: a.selected_index,
        correct: correctIdx === a.selected_index,
      };
    });

  const score = scoredAnswers.filter((a) => a.correct).length;
  const total = mcQuestions.length;

  // Save response
  const { error } = await admin.from("quiz_responses").insert({
    taller_id: taller.id,
    taller_n: taller.n,
    taller_title: taller.title,
    student_name: studentName.trim(),
    student_email: emailLower,
    student_school: studentSchool.trim() || null,
    student_phone: studentPhone.trim(),
    answers: scoredAnswers,
    file_uploads: fileUploads,
    text_answers: cleanedTextAnswers,
    score,
    total,
  });

  if (error) {
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json(
        {
          error: "Ya enviaste este quiz con ese correo.",
          alreadySubmitted: true,
        },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Backfill: rellena nombre/escuela en otras respuestas del mismo estudiante.
  // Ej: si entregó Taller 0 como histórico (sólo email + score), al hacer
  // un quiz nuevo con su nombre real, ese se propaga a sus quizzes anteriores.
  try {
    const backfill: Record<string, string> = {
      student_name: studentName.trim(),
      student_phone: studentPhone.trim(),
    };
    if (studentSchool.trim()) {
      backfill.student_school = studentSchool.trim();
    }
    await admin
      .from("quiz_responses")
      .update(backfill)
      .eq("student_email", emailLower)
      .neq("taller_id", taller.id);
  } catch (err) {
    console.error("[quiz:submit] backfill failed", err);
  }

  await notifyQuiz({
    tallerN: taller.n,
    tallerTitle: taller.title,
    studentName: studentName.trim(),
    studentEmail: emailLower,
    studentSchool: studentSchool.trim() || null,
    score,
    total,
  });

  await sendQuizConfirmation({
    to: emailLower,
    studentName: studentName.trim(),
    tallerN: taller.n,
    tallerTitle: taller.title,
    tallerSlug: slug,
  });

  return NextResponse.json({
    ok: true,
    score,
    total,
    answers: scoredAnswers,
    file_uploads: fileUploads,
  });
}
