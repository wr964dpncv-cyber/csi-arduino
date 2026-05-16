import { adminClient } from "@/lib/supabase/admin";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/PageHeader";
import StudentsTable, { type StudentRow } from "./StudentsTable";

export const metadata = { title: "Estudiantes · Admin" };
export const dynamic = "force-dynamic";

type RawResp = {
  created_at: string;
  taller_n: number;
  student_name: string;
  student_email: string;
  student_school: string | null;
  score: number;
  total: number;
};

async function getStudents(): Promise<{
  students: StudentRow[];
  totalTalleres: number;
}> {
  if (!isSupabaseConfigured())
    return { students: [], totalTalleres: 0 };
  try {
    const admin = adminClient();
    const supabase = await createClient();
    const [respRes, talleresRes] = await Promise.all([
      admin
        .from("quiz_responses")
        .select(
          "created_at, taller_n, student_name, student_email, student_school, score, total"
        )
        .order("created_at", { ascending: false }),
      supabase.from("talleres").select("id", { count: "exact", head: true }),
    ]);

    const resps = (respRes.data ?? []) as RawResp[];
    const totalTalleres = talleresRes.count ?? 0;

    // Group by email
    const byEmail = new Map<
      string,
      {
        name: string;
        email: string;
        school: string | null;
        tallerNs: Set<number>;
        scoreSum: number;
        totalSum: number;
        passing: number;
        validCount: number;
        lastDate: string;
      }
    >();
    for (const r of resps) {
      const key = r.student_email.toLowerCase();
      let entry = byEmail.get(key);
      if (!entry) {
        entry = {
          name: r.student_name,
          email: r.student_email,
          school: r.student_school,
          tallerNs: new Set(),
          scoreSum: 0,
          totalSum: 0,
          passing: 0,
          validCount: 0,
          lastDate: r.created_at,
        };
        byEmail.set(key, entry);
      }
      entry.tallerNs.add(r.taller_n);
      entry.scoreSum += r.score;
      entry.totalSum += r.total;
      if (r.total > 0) {
        entry.validCount++;
        if (r.score / r.total >= 0.6) entry.passing++;
      }
      // Keep most recent name/school if different (response is sorted desc)
      if (+new Date(r.created_at) > +new Date(entry.lastDate)) {
        entry.lastDate = r.created_at;
      }
    }

    const students: StudentRow[] = Array.from(byEmail.values()).map((s) => ({
      name: s.name,
      email: s.email,
      school: s.school,
      talleresCount: s.tallerNs.size,
      avgPct:
        s.validCount > 0
          ? Math.round((s.scoreSum / s.totalSum) * 100)
          : 0,
      passRate:
        s.validCount > 0
          ? Math.round((s.passing / s.validCount) * 100)
          : 0,
      lastActivity: s.lastDate,
    }));

    return { students, totalTalleres };
  } catch {
    return { students: [], totalTalleres: 0 };
  }
}

export default async function EstudiantesPage() {
  const { students, totalTalleres } = await getStudents();
  const totalSubmissions = students.reduce(
    (acc, s) => acc + s.talleresCount,
    0
  );
  const completed = students.filter(
    (s) => s.talleresCount === totalTalleres && totalTalleres > 0
  ).length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Programa · Estudiantes"
        title="Estudiantes"
        description="Cada estudiante con su progreso en los talleres. Click para ver el detalle."
        meta={
          <>
            <span>{students.length} estudiantes únicos</span>
            <span>{totalSubmissions} quizzes entregados</span>
            {totalTalleres > 0 && (
              <span>
                {completed} completaron los {totalTalleres} talleres
              </span>
            )}
          </>
        }
      />

      <StudentsTable students={students} totalTalleres={totalTalleres} />
    </div>
  );
}
