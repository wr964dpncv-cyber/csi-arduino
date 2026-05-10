import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Principios de Arduino — Programa CSI · MEDUCA",
  description:
    "Programa educativo del Cuerpo de Solidaridad Informática. 12 módulos de electrónica y programación con Arduino para estudiantes de escuelas públicas de Panamá. Instructor: Daniel Abadi.",
  keywords: [
    "Arduino",
    "Panamá",
    "MEDUCA",
    "CSI",
    "Daniel Abadi",
    "ingeniería",
    "electrónica",
    "programación",
    "STEM",
    "educación pública",
  ],
  openGraph: {
    title: "Principios de Arduino — Programa CSI",
    description:
      "12 módulos de ingeniería electrónica con Arduino para escuelas públicas de Panamá.",
    type: "website",
    locale: "es_PA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
