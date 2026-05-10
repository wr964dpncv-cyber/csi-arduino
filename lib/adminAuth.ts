export const OWNER_EMAIL = (
  process.env.ADMIN_OWNER_EMAIL ?? "daniel10abadi@gmail.com"
).toLowerCase();

export function isOwner(email: string | null | undefined): boolean {
  return !!email && email.toLowerCase() === OWNER_EMAIL;
}
