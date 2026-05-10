import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(req: Request) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {}
  }
  const url = new URL(req.url);
  return NextResponse.redirect(new URL("/admin/login", url.origin), {
    status: 303,
  });
}
