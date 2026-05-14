import Proximamente from "@/components/Proximamente";

export const metadata = {
  title: "Inscribir equipo — Próximamente",
  description:
    "Las inscripciones al Reto Nacional aún no están abiertas. Pronto publicaremos los detalles.",
};

export default function InscripcionPage() {
  return (
    <Proximamente
      eyebrow="Inscripción · Reto Nacional"
      title="Próximamente."
      description="Las inscripciones al Reto Nacional aún no están abiertas. Pronto publicaremos los detalles del proyecto y la fecha de apertura del formulario."
    />
  );
}
