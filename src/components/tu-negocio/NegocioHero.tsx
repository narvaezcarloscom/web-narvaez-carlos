import Container from "../Container";
import GridTexture from "../GridTexture";
import DiagonalSlash from "../DiagonalSlash";
import { whatsappHref, WA_GENERAL } from "../../lib/whatsapp";

export default function NegocioHero() {
  /*
    pb-40 en movil no es capricho: el banner de cookies es `fixed bottom-0` y
    mide ~150px en un telefono. Sin ese respiro tapa el boton de WhatsApp —el
    CTA principal— en el primer pantallazo de alguien que acaba de escanear el
    QR, que es el unico momento en que se decide si se queda.
  */
  return (
    <section className="relative flex min-h-[82vh] items-end pb-40 sm:min-h-[92vh] sm:items-center sm:pb-0">
      <GridTexture />
      <Container>
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <div className="mb-3 flex items-center gap-6 text-[0.65rem] uppercase tracking-[0.18em] text-graphite/40 sm:gap-12 sm:text-sm sm:tracking-[0.25em]">
              <span>Negocios de servicios</span>
              <span>King County, WA</span>
            </div>
            <DiagonalSlash size="md" className="mb-4 text-graphite/20" />
            {/*
              Titular confrontativo, no aspiracional. Este publico ya ignoro
              "haz crecer tu negocio" cien veces. Lo que no puede ignorar es que
              le esten pidiendo el sitio para poder trabajar.
            */}
            <h1 className="font-serif editorial-heading text-[3rem] text-charcoal sm:text-5xl md:text-7xl lg:text-8xl">
              <span className="block">Te lo piden para trabajar.</span>
              <span className="block">Ya no es <em>opcional.</em></span>
            </h1>
          </div>

          <div className="md:col-span-4 md:pb-3">
            <p className="max-w-md text-base leading-relaxed text-graphite md:text-lg">
              Aseguradoras, financiadoras y bancos revisan si tu negocio existe
              en internet antes de decir que sí.{" "}
              <strong className="font-semibold text-charcoal">
                Construimos el sitio que responde por ti
              </strong>{" "}
              — en inglés y en español.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={whatsappHref(WA_GENERAL)}
                target="_blank"
                rel="noopener noreferrer"
                data-track-event="whatsapp_click"
                data-track-prop-position="hero"
                className="inline-flex items-center justify-center gap-2 bg-narvaez-red px-8 py-4 text-sm font-medium uppercase tracking-wide text-ivory transition-colors duration-300 hover:bg-narvaez-red-hover"
              >
                Escríbenos por WhatsApp
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
              <a
                href="#paquetes"
                className="link-underline text-sm text-graphite transition-colors hover:text-charcoal"
              >
                Ver los paquetes ↓
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
