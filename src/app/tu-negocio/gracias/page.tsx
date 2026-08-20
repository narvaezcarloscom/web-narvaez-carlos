import Link from "next/link";
import Container from "../../../components/Container";
import DiagonalSlash from "../../../components/DiagonalSlash";
import { whatsappHref } from "../../../lib/whatsapp";

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const params = await searchParams;
  const firstName = (params.name || "").trim().split(/\s+/)[0];
  const greeting = firstName ? `Gracias, ${firstName}.` : "Gracias.";

  return (
    <section className="flex min-h-[80vh] items-center py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-graphite/40">
            Mensaje recibido
          </p>
          <DiagonalSlash size="md" className="mx-auto mb-6 text-narvaez-red/40" />
          <h1 className="mb-6 font-serif editorial-heading text-4xl text-charcoal sm:text-5xl md:text-6xl">
            {greeting}
          </h1>
          <p className="mb-4 text-base leading-relaxed text-graphite md:text-lg">
            Recibimos tu mensaje. Te escribimos dentro de las próximas 24 horas.
          </p>
          <p className="mb-12 text-base leading-relaxed text-graphite md:text-lg">
            Si prefieres adelantar, escríbenos directo por WhatsApp.
          </p>

          <a
            href={whatsappHref("Hola, acabo de llenar el formulario en su página.")}
            target="_blank"
            rel="noopener noreferrer"
            data-track-event="whatsapp_click"
            data-track-prop-position="gracias"
            className="inline-flex items-center gap-3 bg-narvaez-red px-8 py-4 text-sm font-medium uppercase tracking-wide text-ivory transition-colors duration-300 hover:bg-narvaez-red-hover"
          >
            Escribir por WhatsApp
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>

          <div className="mt-16 border-t border-neutral-light pt-12">
            <p className="text-sm leading-relaxed text-graphite/60">
              Narvaez Digital Marketing · Estudio digital boutique · Seattle, WA
            </p>
            <Link
              href="/tu-negocio"
              className="link-underline mt-4 inline-block text-sm text-graphite transition-colors hover:text-charcoal"
            >
              ← Volver
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
