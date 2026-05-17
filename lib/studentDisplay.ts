// Imports históricos (migrations 0020-0029) insertan student_name como el
// email-prefix y student_school como null. Si el mismo estudiante completó
// algún quiz en el website su fila trae nombre y escuela reales — preferimos
// esos campos al mostrar el estudiante.

export type DisplayCandidate = {
  student_name: string;
  student_email: string;
  student_school: string | null;
  created_at: string;
};

function isEmailPrefixName(name: string, email: string): boolean {
  const prefix = email.split("@")[0]?.toLowerCase() ?? "";
  return name.trim().toLowerCase() === prefix;
}

export function pickStudentDisplay(responses: DisplayCandidate[]): {
  name: string;
  email: string;
  school: string | null;
} {
  if (responses.length === 0) {
    return { name: "", email: "", school: null };
  }
  const byDateDesc = [...responses].sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
  );
  const newest = byDateDesc[0];
  const email = newest.student_email;

  const newestWithRealName =
    byDateDesc.find((r) => !isEmailPrefixName(r.student_name, email)) ?? newest;
  const newestWithSchool =
    byDateDesc.find((r) => r.student_school && r.student_school.trim()) ??
    newest;

  return {
    name: newestWithRealName.student_name,
    email,
    school: newestWithSchool.student_school,
  };
}
