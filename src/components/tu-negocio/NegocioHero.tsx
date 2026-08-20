import Container from "../Container";
import DiagonalSlash from "../DiagonalSlash";
import HeroVideo from "./HeroVideo";
import { whatsappHref, WA_GENERAL } from "../../lib/whatsapp";

/*
  Hero sobre video. Notas de por que se ve asi:

  - EL TEXTO SE INVIERTE A IVORY. Sobre el velo oscuro de HeroVideo el charcoal
    no se lee. La inversion es del hero unicamente: la pagina sigue siendo
    ivory de la segunda seccion en adelante.

  - SE FUE `GridTexture`. Sus lineas a 0.04 de opacidad sobre video no aportan
    textura, aportan ruido. El video ocupa ese papel.

  - pb-40 en movil: el banner de cookies es `fixed bottom-0` y mide ~150px en
    un telefono. Sin ese respiro tapa el boton de WhatsApp —el CTA principal—
    en el primer pantallazo de quien acaba de escanear el QR.

  - PROTOTIPO. El material de video es generado (fal.ai). La decision sobre la
    regla de "cero stock, cero IA" de esta pagina sigue abierta. Ver spec §9.
*/
export default function NegocioHero() {
  return (
    <section className="relative flex min-h-[82vh] items-end overflow-hidden pb-40 sm:min-h-[92vh] sm:items-center sm:pb-0">
      <HeroVideo />

      <div className="relative z-10 w-full">
        <Container>
          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8">
              <div className="mb-3 flex items-center gap-6 text-[0.65rem] uppercase tracking-[0.18em] text-ivory/50 sm:gap-12 sm:text-sm sm:tracking-[0.25em]">
                <span>Negocios de servicios</span>
                <span>King County, WA</span>
              </div>
              <DiagonalSlash size="md" className="mb-4 text-ivory/30" />
              {/*
                Titular confrontativo, no aspiracional. Este publico ya ignoro
                "haz crecer tu negocio" cien veces. Lo que no puede ignorar es
                que le esten pidiendo el sitio para poder trabajar.
              */}
              <h1 className="font-serif editorial-heading text-[3rem] text-ivory sm:text-5xl md:text-7xl lg:text-8xl">
                <span className="block">Te lo piden para trabajar.</span>
                <span className="block">Ya no es <em>opcional.</em></span>
              </h1>
            </div>

            <div className="md:col-span-4 md:pb-3">
              <p className="max-w-md text-base leading-relaxed text-ivory/75 md:text-lg">
                Aseguradoras, financiadoras y bancos revisan si tu negocio
                existe en internet antes de decir que sí.{" "}
                <strong className="font-semibold text-ivory">
                  Construimos el sitio que responde por ti
                </strong>{" "}
                — en inglés y en español.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:flex-col md:items-start lg:flex-row lg:items-center">
                <a
                  href={whatsappHref(WA_GENERAL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="whatsapp_click"
                  data-track-prop-position="hero"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-narvaez-red px-8 py-4 text-sm font-medium uppercase tracking-wide text-ivory transition-colors duration-300 hover:bg-narvaez-red-hover"
                >
                  Escríbenos por WhatsApp
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
                <a
                  href="#paquetes"
                  className="whitespace-nowrap text-sm text-ivory/70 underline underline-offset-4 transition-colors hover:text-ivory"
                >
                  Ver los paquetes ↓
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
