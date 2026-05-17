import Link from "next/link";
import CircuitBackdrop from "@/components/CircuitBackdrop";

export const metadata = {
  title: "Política de Privacidad — Principios de Arduino",
  description:
    "Cómo usamos la información de los estudiantes del programa CSI · MEDUCA.",
};

export default function PrivacidadPage() {
  return (
    <>
      <section className="bg-ink text-surface relative overflow-hidden">
        <CircuitBackdrop variant="angles" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-24">
          <div className="text-xs font-mono text-muted-2 mb-4">Legal</div>
          <h1 className="font-display text-[40px] sm:text-5xl md:text-6xl tracking-tight leading-[1.05] md:leading-[1.02]">
            Política de Privacidad
          </h1>
          <p className="mt-6 text-base text-muted-2 max-w-2xl leading-relaxed">
            Última actualización: {new Date().toLocaleDateString("es-PA", { day: "numeric", month: "long", year: "numeric" })}.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20 space-y-10 text-ink leading-relaxed">
          <div className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight">
              Qué información recolectamos
            </h2>
            <p>
              Cuando completas un quiz o te registras como interesado en el
              Reto Nacional, guardamos tu <strong>nombre</strong>,{" "}
              <strong>correo electrónico</strong>,{" "}
              <strong>teléfono / WhatsApp</strong>, y opcionalmente tu{" "}
              <strong>escuela</strong> y <strong>región educativa</strong>.
              También guardamos tus respuestas a los quizzes para llevar el
              registro de tu progreso.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight">
              Para qué la usamos
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Llevar control académico de tu participación en los talleres
                del programa.
              </li>
              <li>
                Contactarte sobre asuntos relacionados al programa{" "}
                <strong>CSI · Principios de Arduino del MEDUCA</strong>:
                anuncios, recordatorios de talleres, resultados, y novedades
                del Reto Nacional.
              </li>
              <li>Enviarte la confirmación cuando entregues un quiz.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight">
              Lo que NO hacemos con tu información
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>No la compartimos</strong> con terceros ajenos al
                programa.
              </li>
              <li>
                <strong>No la vendemos</strong> ni la usamos con fines
                comerciales.
              </li>
              <li>
                No te enviamos publicidad ni promociones que no estén
                relacionadas al programa.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight">
              Autorización
            </h2>
            <p>
              Al enviar el formulario de un quiz o el formulario de interés,
              autorizas al equipo del programa CSI · Principios de Arduino del
              MEDUCA a contactarte por correo o WhatsApp para asuntos
              relacionados al programa.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight">
              Borrar tu información
            </h2>
            <p>
              Si quieres que eliminemos tus datos del sistema, escríbenos a{" "}
              <a
                href="mailto:daniel10abadi@gmail.com"
                className="text-accent-dark underline underline-offset-4 hover:text-ink transition"
              >
                daniel10abadi@gmail.com
              </a>{" "}
              y los borraremos.
            </p>
          </div>

          <div className="pt-6 border-t border-border">
            <Link
              href="/"
              className="text-sm font-mono text-muted hover:text-ink transition"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
