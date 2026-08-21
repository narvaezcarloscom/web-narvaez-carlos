import Container from "../Container";
import DiagonalSlash from "../DiagonalSlash";
import NegocioForm from "./NegocioForm";
import { whatsappHref, WA_GENERAL } from "../../lib/whatsapp";

export default function NegocioCTA() {
  return (
    // pb extra en movil para que la barra fija de WhatsApp no tape el boton.
    <section className="border-t border-neutral-light py-20 pb-32 sm:py-28 md:py-32 md:pb-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <DiagonalSlash size="md" className="mx-auto mb-6 text-narvaez-red/40" />
          <h2 className="mb-6 text-center font-serif editorial-heading text-3xl text-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
            Cuéntanos de <em>tu negocio.</em>
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-base leading-relaxed text-graphite md:text-lg">
            Te leemos personalmente. Si prefieres hablar, escríbenos directo por
            WhatsApp.
          </p>

          <div className="mb-16 flex justify-center">
            <a
              href={whatsappHref(WA_GENERAL)}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="whatsapp_click"
              data-track-prop-position="cierre"
              className="inline-flex items-center gap-3 bg-narvaez-red px-8 py-4 text-sm font-medium uppercase tracking-wide text-ivory transition-colors duration-300 hover:bg-narvaez-red-hover"
            >
              Escríbenos por WhatsApp
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>

          <p className="mb-8 text-center text-xs uppercase tracking-[0.25em] text-graphite/40">
            O escríbenos aquí
          </p>
          <NegocioForm />
        </div>
      </Container>
    </section>
  );
}
