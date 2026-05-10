"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  url: string;
  confirmMessage?: string;
  label?: string;
  className?: string;
};

export default function DeleteButton({
  url,
  confirmMessage = "¿Eliminar este registro? Esta acción no se puede deshacer.",
  label = "Eliminar",
  className = "",
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    if (!window.confirm(confirmMessage)) return;
    setBusy(true);
    try {
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Error al eliminar");
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className={
        className ||
        "text-xs text-muted hover:text-rose-700 transition disabled:opacity-50"
      }
    >
      {busy ? "Eliminando..." : label}
    </button>
  );
}
