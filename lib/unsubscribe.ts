import { createHmac, timingSafeEqual } from "node:crypto";
import { adminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";

const SITE_URL = process.env.SITE_URL ?? "https://csi-arduino.vercel.app";
const SECRET =
  process.env.UNSUBSCRIBE_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  "csi-arduino-default-unsubscribe-secret-change-me";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function unsubscribeToken(email: string): string {
  return createHmac("sha256", SECRET)
    .update(normalizeEmail(email))
    .digest("hex")
    .slice(0, 32);
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  if (!email || !token) return false;
  const expected = unsubscribeToken(email);
  if (expected.length !== token.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(token));
  } catch {
    return false;
  }
}

function buildUrl(path: string, email: string): string {
  const e = normalizeEmail(email);
  const t = unsubscribeToken(e);
  const u = new URL(`${SITE_URL}${path}`);
  u.searchParams.set("email", e);
  u.searchParams.set("token", t);
  return u.toString();
}

// User-facing URL shown in email body — renders a page with confirmation.
export function unsubscribeUrl(email: string): string {
  return buildUrl("/unsubscribe", email);
}

// One-click POST endpoint for RFC 8058 (Gmail / Outlook header).
export function unsubscribePostUrl(email: string): string {
  return buildUrl("/api/unsubscribe", email);
}

export async function isUnsubscribed(email: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const admin = adminClient();
    const { data } = await admin
      .from("email_unsubscribes")
      .select("email")
      .eq("email", normalizeEmail(email))
      .maybeSingle();
    return !!data;
  } catch (err) {
    console.error("[unsubscribe] check failed:", err);
    return false;
  }
}

export async function filterUnsubscribed(
  emails: string[]
): Promise<{ allowed: string[]; blocked: string[] }> {
  if (!isSupabaseConfigured()) {
    return { allowed: emails, blocked: [] };
  }
  const normalized = emails.map(normalizeEmail);
  try {
    const admin = adminClient();
    const { data } = await admin
      .from("email_unsubscribes")
      .select("email")
      .in("email", normalized);
    const blockedSet = new Set((data ?? []).map((r) => r.email));
    return {
      allowed: normalized.filter((e) => !blockedSet.has(e)),
      blocked: normalized.filter((e) => blockedSet.has(e)),
    };
  } catch (err) {
    console.error("[unsubscribe] filter failed:", err);
    return { allowed: normalized, blocked: [] };
  }
}

export async function addUnsubscribe(
  email: string,
  source?: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase no configurado" };
  }
  try {
    const admin = adminClient();
    const { error } = await admin.from("email_unsubscribes").upsert(
      {
        email: normalizeEmail(email),
        unsubscribed_at: new Date().toISOString(),
        source: source ?? null,
      },
      { onConflict: "email" }
    );
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
