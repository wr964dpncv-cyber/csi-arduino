import Proximamente from "@/components/Proximamente";
import InteresForm from "@/components/InteresForm";

export const metadata = {
  title: "Reto Nacional — Próximamente",
  description:
    "Próximamente estaremos publicando los detalles del Reto Nacional de Arduino del Programa CSI de MEDUCA.",
};

export default function RetoNacionalPage() {
  return (
    <Proximamente
      eyebrow="Reto Nacional"
      title="Próximamente."
      description="Estamos finalizando los detalles del Reto Nacional con MEDUCA. Pronto publicaremos las bases, fechas y el formulario de inscripción."
    >
      <InteresForm />
    </Proximamente>
  );
}
