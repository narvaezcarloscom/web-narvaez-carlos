import Container from "../Container";
import ProcessDots from "../ProcessDots";

const steps = [
  {
    label: "Conversamos",
    description:
      "Nos cuentas qué haces y en qué ciudades trabajas. Te decimos qué paquete te sirve.",
  },
  {
    label: "Reunimos",
    description: "Fotos, servicios y accesos. Nosotros pulimos las palabras.",
  },
  {
    label: "Revisas en vivo",
    description: "Ves tu sitio funcionando antes de publicar y pides ajustes.",
  },
  {
    label: "En línea",
    description: "Publicamos en tu dominio, a tu nombre, bajo nuestro resguardo.",
  },
];

export default function NegocioProceso() {
  return (
    <section className="border-t border-neutral-light py-20 sm:py-28 md:py-32">
      <Container>
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-graphite/40">
            Cómo funciona
          </p>
          <h2 className="font-serif editorial-heading text-3xl text-charcoal sm:text-4xl md:text-5xl">
            Cuatro pasos, sin <em>sorpresas.</em>
          </h2>
        </div>
        <ProcessDots steps={steps} />
      </Container>
    </section>
  );
}
