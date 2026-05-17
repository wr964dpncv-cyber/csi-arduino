import { NextResponse } from "next/server";
import {
  verifyUnsubscribeToken,
  addUnsubscribe,
  normalizeEmail,
} from "@/lib/unsubscribe";

// RFC 8058 one-click endpoint. Triggered by Gmail/Outlook when the user clicks
// the native "Unsubscribe" button next to the sender.

async function handle(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email") ?? "";
  const token = url.searchParams.get("token") ?? "";

  if (!email || !token) {
    return NextResponse.json(
      { error: "Faltan email o token" },
      { status: 400 }
    );
  }

  const normalized = normalizeEmail(email);
  if (!verifyUnsubscribeToken(normalized, token)) {
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }

  const result = await addUnsubscribe(normalized, "one-click");
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "Error" },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, email: normalized });
}

export const POST = handle;
export const GET = handle;
