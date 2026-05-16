import type { ReactNode } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { isOwner } from "@/lib/adminAuth";
import AdminShell from "./AdminShell";

export const metadata = {
  title: "Admin · Principios de Arduino",
  robots: { index: false, follow: false },
};

const baseGroups = [
  {
    label: "Resumen",
    items: [{ href: "/admin", label: "Dashboard" }],
  },
  {
    label: "Reto Nacional",
    items: [
      { href: "/admin/interes", label: "Interesados" },
      { href: "/admin/inscripciones", label: "Inscripciones" },
      { href: "/admin/entregas", label: "Entregas" },
    ],
  },
  {
    label: "Programa",
    items: [
      { href: "/admin/talleres", label: "Talleres" },
      { href: "/admin/calendario", label: "Calendario" },
      { href: "/admin/respuestas", label: "Respuestas Quiz" },
    ],
  },
];

const ownerGroup = {
  label: "Sistema",
  items: [
    { href: "/admin/notificaciones", label: "Notificaciones" },
    { href: "/admin/usuarios", label: "Usuarios" },
  ],
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  let userEmail: string | null = null;
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userEmail = user?.email ?? null;
    } catch {}
  }

  const isOwnerUser = isOwner(userEmail);
  const groups = isOwnerUser ? [...baseGroups, ownerGroup] : baseGroups;

  return (
    <AdminShell groups={groups} userEmail={userEmail} isOwnerUser={isOwnerUser}>
      {children}
    </AdminShell>
  );
}
