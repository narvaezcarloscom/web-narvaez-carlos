import Container from "../Container";
import GridTexture from "../GridTexture";
import DiagonalSlash from "../DiagonalSlash";

export default function EmprendedorHero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-end pb-16 sm:items-center sm:pb-0">
      <GridTexture />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end">
          <div className="md:col-span-8">
            <div className="flex items-center justify-between sm:justify-start sm:gap-12 md:gap-20 lg:gap-32 text-[0.65rem] sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.25em] text-graphite/40 mb-2 max-w-md sm:max-w-none">
              <span>Programa</span>
              <span>Emprendedor</span>
              <span>Latino</span>
            </div>
            <DiagonalSlash size="md" className="text-graphite/20 mb-3 sm:mb-4" />
            <h1 className="font-serif text-[3.25rem] sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] editorial-heading text-charcoal">
              <span className="block">Verse profesional,</span>
              <span className="block">al alcance de quien <em>empieza.</em></span>
            </h1>
          </div>

          <div className="md:col-span-4 md:pb-2">
            <p className="text-sm sm:text-base md:text-lg text-graphite leading-relaxed max-w-md">
              Somos un estudio digital boutique. Diseñamos sitios web con{" "}
              <strong className="font-semibold text-charcoal">estándar de empresa</strong>{" "}
              — y creamos un programa para que el emprendedor latino en Estados
              Unidos entre al mercado con percepción de calidad desde el primer día.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
