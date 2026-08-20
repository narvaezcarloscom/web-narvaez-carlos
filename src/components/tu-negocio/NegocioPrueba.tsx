import Container from "../Container";
import ShowcaseGrid from "../sitios/ShowcaseGrid";

/*
  La prueba va en la posicion 3, antes de los precios. En frio la credibilidad
  va antes que la oferta: nadie lee precios de un desconocido, lee precios de
  alguien que ya le mostro trabajo.

  Reusa ShowcaseGrid tal cual —incluido su orden, que pone primero el area de
  Seattle— porque el publico es el mismo y esta parado en el mismo condado.
*/
export default function NegocioPrueba() {
  return (
    <section className="border-t border-neutral-light py-20 sm:py-28 md:py-32">
      <Container>
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-graphite/40">
            Trabajo real
          </p>
          <h2 className="mb-4 font-serif editorial-heading text-3xl text-charcoal sm:text-4xl md:text-5xl">
            Doce negocios como el tuyo. Todos <em>en línea hoy.</em>
          </h2>
          <p className="text-base leading-relaxed text-graphite">
            Toca cualquiera para verlo.
          </p>
        </div>
      </Container>
      <ShowcaseGrid />
    </section>
  );
}
