import Link from "next/link";
import CircuitBackdrop from "@/components/CircuitBackdrop";
import {
  verifyUnsubscribeToken,
  addUnsubscribe,
  normalizeEmail,
} from "@/lib/unsubscribe";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Darse de baja — CSI Arduino",
  description: "Excluyete de los correos del programa CSI · Principios de Arduino.",
  robots: { index: false, follow: false },
};

type Params = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const sp = await searchParams;
  const emailRaw = typeof sp.email === "string" ? sp.email : "";
  const token = typeof sp.token === "string" ? sp.token : "";

  const email = emailRaw ? normalizeEmail(emailRaw) : "";
  const validLink =
    email.length > 0 && verifyUnsubscribeToken(email, token);

  let status: "ok" | "invalid" | "error" = "invalid";
  let errorMessage: string | null = null;

  if (validLink) {
    const result = await addUnsubscribe(email, "user-link");
    if (result.ok) {
      status = "ok";
    } else {
      status = "error";
      errorMessage = result.error ?? "Error desconocido";
    }
  }

  return (
    <>
      <section className="bg-ink text-surface relative overflow-hidden">
        <CircuitBackdrop variant="angles" />
        <div className="relative mx-auto max-w-2xl px-6 py-20 md:py-24">
          <div className="text-xs font-mono text-muted-2 mb-4 uppercase tracking-[0.18em]">
            Suscripción
          </div>
          <h1 className="font-display text-[40px] sm:text-5xl md:text-6xl tracking-tight leading-[1.05] md:leading-[1.02]">
            {status === "ok"
              ? "Listo, te dimos de baja"
              : status === "invalid"
                ? "Enlace inválido"
                : "Algo no funcionó"}
          </h1>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-20 space-y-8 text-ink leading-relaxed">
          {status === "ok" && (
            <>
              <p className="text-lg">
                <strong>{email}</strong> ya no recibirá más correos del programa
                CSI · Principios de Arduino.
              </p>
              <div className="border-l-4 border-accent pl-4 py-1 text-sm text-muted">
                Si te diste de baja por error, escríbele a Daniel por{" "}
                <a
                  href="https://wa.me/50768641929"
                  className="text-ink font-semibold underline"
                >
                  WhatsApp +507 6864-1929
                </a>{" "}
                y te volvemos a incluir.
              </div>
            </>
          )}
          {status === "invalid" && (
            <p className="text-lg">
              El enlace no parece válido. Puede que esté incompleto, alterado o
              ya haya expirado. Si quieres darte de baja, escríbele directo a
              Daniel por{" "}
              <a
                href="https://wa.me/50768641929"
                className="text-ink font-semibold underline"
              >
                WhatsApp +507 6864-1929
              </a>
              .
            </p>
          )}
          {status === "error" && (
            <>
              <p className="text-lg">
                No pudimos registrar la baja en este momento. Por favor intenta
                más tarde o escríbele a Daniel por{" "}
                <a
                  href="https://wa.me/50768641929"
                  className="text-ink font-semibold underline"
                >
                  WhatsApp +507 6864-1929
                </a>
                .
              </p>
              {errorMessage && (
                <p className="text-xs text-muted-2 font-mono">
                  Detalle técnico: {errorMessage}
                </p>
              )}
            </>
          )}

          <div className="pt-8 border-t border-border">
            <Link
              href="/"
              className="text-sm text-muted hover:text-ink underline"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
