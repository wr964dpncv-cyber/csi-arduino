import Proximamente from "@/components/Proximamente";
import InteresForm from "@/components/InteresForm";

export const metadata = {
  title: "Inscribir equipo — Próximamente",
  description:
    "Las inscripciones al Reto Nacional aún no están abiertas. Déjanos tu información y te avisamos cuando se abra.",
};

export default function InscripcionPage() {
  return (
    <Proximamente
      eyebrow="Inscripción · Reto Nacional"
      title="Próximamente."
      description="Las inscripciones al Reto Nacional aún no están abiertas. Déjanos tus datos y te avisamos por correo apenas se publique el formulario oficial."
    >
      <InteresForm />
    </Proximamente>
  );
}
