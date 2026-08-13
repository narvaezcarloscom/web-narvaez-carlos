import Container from "../../components/Container";
import ShowcaseGrid from "../../components/sitios/ShowcaseGrid";

/**
 * La pagina que abre el QR impreso en el mostrador de Graficolor Printing.
 *
 * No lleva CTA a proposito. Javier presenta el trabajo y cierra con el
 * cliente ahi mismo; un formulario propio competiria con el por el primer
 * contacto. La pagina es material de venta, no captura.
 */
export default function PortafolioPage() {
  return (
    <main className="py-16 md:py-24">
      <Container>
        <header className="mb-12 md:mb-16 max-w-2xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl editorial-heading text-charcoal">
            Sitios web para negocios de servicios
          </h1>
          <p className="mt-5 text-base md:text-lg text-[var(--text-body)]">
            Todos estos son sitios reales, en línea hoy. Toca cualquiera para
            verlo.
          </p>
        </header>
      </Container>

      <ShowcaseGrid />
    </main>
  );
}
