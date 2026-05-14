import Proximamente from "@/components/Proximamente";

export const metadata = {
  title: "Entrega de proyectos — Próximamente",
  description:
    "La entrega de proyectos del Reto Nacional aún no está abierta. Pronto publicaremos los detalles.",
};

export default function EntregaPage() {
  return (
    <Proximamente
      eyebrow="Entrega · Reto Nacional"
      title="Próximamente."
      description="La entrega de proyectos del Reto Nacional aún no está abierta. Pronto publicaremos los detalles y la fecha del formulario de entrega."
    />
  );
}
