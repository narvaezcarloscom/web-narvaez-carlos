import Container from "../Container";
import ProcessDots from "../ProcessDots";

const steps = [
  {
    label: "Conversamos",
    description: "Entendemos tu negocio y reunimos lo esencial de tu marca.",
  },
  {
    label: "Construimos",
    description: "Levantamos tu sitio real, con nuestros estándares.",
  },
  {
    label: "Revisas en vivo",
    description: "Ves tu sitio funcionando antes de publicar y pides ajustes.",
  },
  {
    label: "En línea",
    description: "Publicamos en tu dominio y queda bajo nuestro resguardo.",
  },
];

export default function EmprendedorProcess() {
  return (
    <section className="py-20 sm:py-28 md:py-32 border-t border-neutral-light">
      <Container>
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-graphite/40 mb-4">
            Cómo funciona
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl editorial-heading text-charcoal">
            Cuatro pasos, sin <em>sorpresas.</em>
          </h2>
        </div>
        <ProcessDots steps={steps} />
      </Container>
    </section>
  );
}
