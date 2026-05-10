import { adminClient } from "@/lib/supabase/admin";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import UsersClient from "./UsersClient";

export const metadata = { title: "Usuarios · Admin" };
export const dynamic = "force-dynamic";

type User = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
};

async function getUsers(): Promise<User[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const admin = adminClient();
    const { data } = await admin.auth.admin.listUsers({ perPage: 200 });
    return (data.users ?? []).map((u) => ({
      id: u.id,
      email: u.email ?? "",
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
    }));
  } catch {
    return [];
  }
}

async function getCurrentUserId(): Promise<string | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}

export default async function UsuariosPage() {
  const [users, currentUserId] = await Promise.all([
    getUsers(),
    getCurrentUserId(),
  ]);
  return <UsersClient initialUsers={users} currentUserId={currentUserId} />;
}
