import Container from "../Container";
import DiagonalSlash from "../DiagonalSlash";
import EmprendedorForm from "./EmprendedorForm";

export default function EmprendedorCTA() {
  return (
    <section className="py-20 sm:py-28 md:py-32 border-t border-neutral-light">
      <Container>
        <div className="max-w-3xl mx-auto">
          <DiagonalSlash size="md" className="text-narvaez-red/40 mb-6 mx-auto" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl editorial-heading text-charcoal text-center mb-6">
            Cada proyecto comienza con una <em>conversación.</em>
          </h2>
          <p className="text-base md:text-lg text-graphite leading-relaxed text-center max-w-xl mx-auto mb-16">
            Cuéntanos un poco de tu negocio. Te respondemos hoy mismo en horas hábiles
            (lun — vie, 9am — 6pm PST).
          </p>
          <EmprendedorForm />
        </div>
      </Container>
    </section>
  );
}
