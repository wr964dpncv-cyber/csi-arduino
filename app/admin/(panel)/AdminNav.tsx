"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };
type NavGroup = { label: string; items: NavItem[] };

export default function AdminNav({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav>
      <ul className="space-y-6 sticky top-20">
        {groups.map((group) => (
          <li key={group.label}>
            <div className="px-3 mb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-2">
              {group.label}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 text-sm transition border-l-2 ${
                        active
                          ? "border-accent bg-accent-soft text-ink font-medium"
                          : "border-transparent text-ink/65 hover:text-ink hover:bg-surface-2"
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
