import type { ReactNode } from "react";

export const metadata = {
  title: "Admin · Principios de Arduino",
  robots: { index: false, follow: false },
};

export default function AdminBaseLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
