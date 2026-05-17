// Imports históricos (migrations 0020-0029) insertan student_name como el
// email-prefix y student_school como null. Si el mismo estudiante completó
// algún quiz en el website su fila trae nombre y escuela reales — preferimos
// esos campos al mostrar el estudiante.

export type DisplayCandidate = {
  student_name: string;
  student_email: string;
  student_school: string | null;
  student_phone?: string | null;
  student_region?: string | null;
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
  phone: string | null;
  region: string | null;
} {
  if (responses.length === 0) {
    return { name: "", email: "", school: null, phone: null, region: null };
  }
  const byDateDesc = [...responses].sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
  );
  const newest = byDateDesc[0];
  const email = newest.student_email;

  const findNonEmpty = (key: keyof DisplayCandidate) =>
    byDateDesc.find((r) => {
      const v = r[key];
      return typeof v === "string" && v.trim() !== "";
    });

  const newestWithRealName =
    byDateDesc.find((r) => !isEmailPrefixName(r.student_name, email)) ?? newest;
  const withSchool = findNonEmpty("student_school");
  const withPhone = findNonEmpty("student_phone");
  const withRegion = findNonEmpty("student_region");

  return {
    name: newestWithRealName.student_name,
    email,
    school: (withSchool?.student_school as string | null | undefined) ?? null,
    phone: (withPhone?.student_phone as string | null | undefined) ?? null,
    region: (withRegion?.student_region as string | null | undefined) ?? null,
  };
}
