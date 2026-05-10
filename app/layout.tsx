import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Principios de Arduino — Programa CSI | Daniel Abadi",
  description:
    "Programa educativo gratuito del Cuerpo de Solidaridad Informática (MEDUCA) que introduce a estudiantes de escuelas públicas de Panamá en electrónica, programación y pensamiento lógico con Arduino.",
  keywords: [
    "Arduino",
    "Panamá",
    "MEDUCA",
    "CSI",
    "Daniel Abadi",
    "educación",
    "electrónica",
    "programación",
    "STEM",
  ],
  openGraph: {
    title: "Principios de Arduino — Programa CSI",
    description:
      "12 talleres gratuitos de Arduino para estudiantes de escuelas públicas de Panamá.",
    type: "website",
    locale: "es_PA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
