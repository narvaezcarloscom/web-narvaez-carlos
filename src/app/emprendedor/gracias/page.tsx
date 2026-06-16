import Link from "next/link";
import Container from "../../../components/Container";
import DiagonalSlash from "../../../components/DiagonalSlash";

const WHATSAPP_NUMBER = "12069817078";
const WHATSAPP_MESSAGE = "Hola, vengo del programa emprendedor latino";

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const params = await searchParams;
  const firstName = (params.name || "").trim().split(/\s+/)[0];
  const greeting = firstName ? `Gracias, ${firstName}.` : "Gracias.";

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <section className="min-h-[80vh] flex items-center py-20 sm:py-32">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-graphite/40 mb-6">
            Mensaje recibido
          </p>
          <DiagonalSlash size="md" className="text-narvaez-red/40 mb-6 mx-auto" />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl editorial-heading text-charcoal mb-6">
            {greeting}
          </h1>
          <p className="text-base md:text-lg text-graphite leading-relaxed mb-4">
            Recibimos lo que nos contaste. Lo leemos personalmente y te
            contactamos para agendar la primera conversación.
          </p>
          <p className="text-base md:text-lg text-graphite leading-relaxed mb-12">
            Si prefieres, también puedes escribirnos directo por WhatsApp.
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-track-event="cta_click"
            data-track-prop-location="emprendedor_gracias"
            data-track-prop-destination="whatsapp"
            className="inline-flex items-center gap-3 bg-narvaez-red text-ivory px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-narvaez-red-hover transition-colors duration-300"
          >
            Escribir por WhatsApp
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>

          <div className="mt-16 pt-12 border-t border-neutral-light">
            <p className="text-sm text-graphite/60 leading-relaxed">
              Narvaez Digital Marketing · Estudio digital boutique · Seattle, WA
            </p>
            <Link
              href="/emprendedor"
              className="link-underline text-sm text-graphite hover:text-charcoal transition-colors mt-4 inline-block"
            >
              ← Volver al programa
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
