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
/*
  POR QUE ESTE HERO NO USA `text-ivory` Y ESCRIBE EL COLOR A MANO.

  `.text-ivory` resuelve a `var(--text-on-dark)`, y en modo oscuro esa variable
  vale #171717 —casi negro—. No es un error del sistema: asume que en oscuro
  las secciones que eran oscuras se invierten a claras, asi que el "texto sobre
  oscuro" pasa a ser oscuro. Hay una valvula de escape,
  `.dark .bg-charcoal .text-ivory`, pero solo aplica dentro de un contenedor
  con la clase `bg-charcoal`.

  Este hero NO es una seccion tematica: su fondo es el velo de `HeroVideo`, con
  valores literales, oscuro en los DOS temas. Por eso se caia por la regla base
  y el titular se volvia negro sobre fondo oscuro. Medido en produccion, no
  deducido.

  Se escribe el color a mano en vez de agregarle `bg-charcoal` al <section>:
  esa clase se invierte en modo oscuro y, si el video y el poster no cargaran,
  el respaldo quedaria claro con texto claro encima. El velo no se invierte, y
  el texto tampoco debe hacerlo.

  MISMA RAZON PARA EL BOTON ROJO: `narvaez-red` es rojo en los dos temas, asi
  que su texto va claro en los dos. Con `text-ivory` se volvia negro sobre rojo.
*/
export default function NegocioHero() {
  return (
    <section className="relative flex min-h-[82vh] items-end overflow-hidden pb-40 sm:min-h-[92vh] sm:items-center sm:pb-0">
      <HeroVideo />

      <div className="relative z-10 w-full">
        <Container>
          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8">
              <div className="mb-3 flex items-center gap-6 text-[0.65rem] uppercase tracking-[0.18em] text-[#F8F9F5]/55 sm:gap-12 sm:text-sm sm:tracking-[0.25em]">
                <span>Negocios de servicios</span>
                <span>King County, WA</span>
              </div>
              <DiagonalSlash size="md" className="mb-4 text-[#F8F9F5]/35" />
              {/*
                Titular confrontativo, no aspiracional. Este publico ya ignoro
                "haz crecer tu negocio" cien veces.

                DOS COSAS QUE ESTE TITULAR TIENE QUE HACER A LA VEZ, y por que
                la version anterior fallaba una:

                  1. NOMBRAR LA COSA. Decia "Te lo piden para trabajar". El
                     pronombre "lo" no tenia referente en el titular: el sujeto
                     solo aparecia en el parrafo de la derecha. Quien escanea
                     el QR lee el titular primero y no sabia si le hablaban de
                     un seguro, una licencia o un sitio web.
                  2. CARGAR LA APUESTA. Nombrar el producto sin mas lo aplana a
                     "hacemos sitios web", la linea generica de agencia. Por eso
                     se conserva "opcional".

                "Dejo de ser" y no "ya no es": el primero dice que cambio el
                mundo, el segundo se puede leer como que el atrasado es el
                lector.
              */}
              <h1 className="font-serif editorial-heading text-[3rem] text-[#F8F9F5] sm:text-5xl md:text-7xl lg:text-8xl">
                <span className="block">Tu sitio web</span>
                <span className="block">dejó de ser <em>opcional.</em></span>
              </h1>
            </div>

            <div className="md:col-span-4 md:pb-3">
              <p className="max-w-md text-base leading-relaxed text-[#F8F9F5]/80 md:text-lg">
                Te lo piden las aseguradoras para renovar tu póliza, los
                bancos para abrirte la cuenta y las financiadoras para
                aprobarte.{" "}
                <strong className="font-semibold text-[#F8F9F5]">
                  Nosotros lo construimos
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
                  // La barra fija observa ESTE boton para saber si ya salio de
                  // pantalla. No quitar el atributo sin mirar WhatsAppSticky.
                  data-hero-cta
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-narvaez-red px-8 py-4 text-sm font-medium uppercase tracking-wide text-[#F8F9F5] transition-colors duration-300 hover:bg-narvaez-red-hover"
                >
                  Escríbenos por WhatsApp
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
                <a
                  href="#paquetes"
                  className="whitespace-nowrap text-sm text-[#F8F9F5]/75 underline underline-offset-4 transition-colors hover:text-[#F8F9F5]"
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
