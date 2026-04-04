import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "../../../lib/i18n";
import Container from "../../../components/Container";
import DiagonalSlash from "../../../components/DiagonalSlash";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn
      ? "About · Boutique Digital Studio in Seattle"
      : "Acerca · Estudio Digital Boutique en Seattle",
    description: isEn
      ? "A boutique digital studio designing with intention — from brand to platform. Founded by Carlos Narvaez, Venezuelan-born, Seattle-based."
      : "Un estudio digital boutique que diseña con intención — de la marca a la plataforma. Fundado por Carlos Narvaez, venezolano, basado en Seattle.",
  };
}

const BASE_URL = "https://narvaezcarlos.com";

function aboutJsonLd(isEn: boolean) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Person",
      name: "Carlos A Narvaez Urbina",
      jobTitle: "Founder & Creative Director",
      worksFor: {
        "@type": "Organization",
        name: "Narvaez Digital Marketing",
        url: BASE_URL,
      },
      knowsLanguage: ["en", "es"],
      nationality: { "@type": "Country", name: "Venezuela" },
      workLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Renton",
          addressRegion: "WA",
          addressCountry: "US",
        },
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isEn = lang === "en";
  const prefix = lang === "en" ? "" : `/${lang}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd(isEn)) }}
      />

      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
                {isEn ? "About the studio" : "Acerca del estudio"}
              </p>
              <DiagonalSlash className="text-graphite/20 mb-4" />
              <h1 className="font-serif text-[2.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl editorial-heading">
                {isEn ? (
                  <>
                    A studio built
                    <br />
                    on <span className="italic">intention.</span>
                  </>
                ) : (
                  <>
                    Un estudio construido
                    <br />
                    con <span className="italic">intención.</span>
                  </>
                )}
              </h1>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex items-end">
              <div>
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-3">
                  {isEn
                    ? "A boutique digital studio designing with intention — from brand to platform."
                    : "Un estudio digital boutique que diseña con intención — de la marca a la plataforma."}
                </p>
                <p className="text-graphite/60 text-sm md:text-base">
                  {isEn
                    ? "Founded by Carlos Narvaez — Venezuelan-born, Seattle-based."
                    : "Fundado por Carlos Narvaez — venezolano, basado en Seattle."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The practice */}
      <section className="pb-20 md:pb-24">
        <Container>
          <div className="border-t border-neutral-light pt-12 md:pt-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-6">
                  {isEn
                    ? "Narvaez Digital Marketing is the independent practice of Carlos Narvaez — working at the intersection of branding, technology, and digital growth."
                    : "Narvaez Digital Marketing es la práctica independiente de Carlos Narvaez — trabajando en la intersección de branding, tecnología y crecimiento digital."}
                </p>
                <p className="text-graphite text-base md:text-lg leading-relaxed">
                  {isEn
                    ? "What started as a hands-on approach to web development has evolved into a refined practice focused on building complete digital ecosystems — from brand identity to custom platforms."
                    : "Lo que comenzó como un enfoque práctico hacia el desarrollo web ha evolucionado hacia una práctica refinada enfocada en construir ecosistemas digitales completos — desde identidad de marca hasta plataformas a medida."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Founder portrait */}
      <section className="pb-20 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-5 md:col-start-4">
              <Image
                src="/carlos-narvaez.jpg"
                alt="Carlos Narvaez — Founder of Narvaez Digital Marketing"
                width={1233}
                height={1224}
                className="w-full grayscale"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="pb-20 md:pb-24">
        <Container>
          <div className="border-t border-neutral-light pt-12 md:pt-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-6">
                  {isEn
                    ? "This is not a volume-driven agency."
                    : "Esta no es una agencia de volumen."}
                </p>
                <p className="font-serif text-charcoal text-xl md:text-2xl leading-snug mb-8">
                  {isEn
                    ? "It is a studio built on intention."
                    : "Es un estudio construido con intención."}
                </p>
                <p className="text-graphite text-base md:text-lg leading-relaxed">
                  {isEn
                    ? "Every project is treated as a singular piece — designed with clarity, structure, and purpose. No templates. No shortcuts. Only thoughtful systems crafted to perform and endure."
                    : "Cada proyecto es tratado como una pieza singular — diseñado con claridad, estructura y propósito. Sin plantillas. Sin atajos. Solo sistemas pensados para funcionar y perdurar."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-cultural perspective */}
      <section className="pb-20 md:pb-24">
        <Container>
          <div className="border-t border-neutral-light pt-12 md:pt-16">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-10 md:mb-12">
              {isEn ? "A cross-cultural perspective" : "Una perspectiva multicultural"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-6">
                  {isEn
                    ? "Operating in both English and Spanish, the studio collaborates with clients across the United States and Latin America."
                    : "Operando en inglés y español, el estudio colabora con clientes en Estados Unidos y América Latina."}
                </p>
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-6">
                  {isEn
                    ? "This goes beyond translation."
                    : "Esto va más allá de la traducción."}
                </p>
                <p className="text-graphite text-base md:text-lg leading-relaxed">
                  {isEn
                    ? "It's about understanding how businesses communicate within their cultural context — how they sell, how they connect, and how they grow. Each project reflects that awareness."
                    : "Se trata de entender cómo los negocios comunican dentro de su contexto cultural — cómo venden, cómo conectan y cómo crecen. Cada proyecto refleja esa conciencia."}
                </p>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <p className="text-graphite text-base leading-relaxed">
                  {isEn
                    ? "Travel, observation, and direct collaboration with clients in different regions continue to inform this perspective."
                    : "Los viajes, la observación y la colaboración directa con clientes en diferentes regiones continúan nutriendo esta perspectiva."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Who we work with */}
      <section className="pb-20 md:pb-24">
        <Container>
          <div className="border-t border-neutral-light pt-12 md:pt-16">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-10 md:mb-12">
              {isEn ? "Who we work with" : "Con quién trabajamos"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-6">
                  {isEn
                    ? "We partner with service-based businesses that treat design as a competitive advantage."
                    : "Trabajamos con empresas de servicios que tratan el diseño como una ventaja competitiva."}
                </p>
                <p className="text-graphite text-base md:text-lg leading-relaxed">
                  {isEn
                    ? "From local Latin-owned businesses building their digital foundation, to institutions requiring custom systems — every collaboration is grounded in clarity, precision, and long-term thinking."
                    : "Desde negocios latinos locales construyendo su base digital, hasta instituciones que requieren sistemas a medida — cada colaboración se fundamenta en claridad, precisión y pensamiento a largo plazo."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="pb-20 md:pb-24">
        <Container>
          <div className="border-t border-neutral-light pt-12 md:pt-16">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-10 md:mb-12">
              {isEn ? "Our work spans" : "Nuestro trabajo abarca"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <div className="space-y-4 mb-8">
                  {[
                    { href: `${prefix}/services/web-design`, label: "Web Design & Development" },
                    { href: `${prefix}/services/custom-apps-platforms`, label: isEn ? "Custom Digital Platforms" : "Plataformas Digitales a Medida" },
                    { href: `${prefix}/services/digital-advertising`, label: isEn ? "Digital Advertising" : "Publicidad Digital" },
                    { href: `${prefix}/services/content-social-media`, label: isEn ? "Content & Social Media Systems" : "Sistemas de Contenido y Redes Sociales" },
                  ].map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="group flex items-center gap-4 text-charcoal hover:text-narvaez-red transition-colors duration-300"
                    >
                      <span className="text-graphite/30">—</span>
                      <span className="font-serif text-lg md:text-xl">{service.label}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="text-graphite/30 group-hover:text-narvaez-red transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                      >
                        <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <p className="text-graphite text-base leading-relaxed">
                  {isEn
                    ? "Each built from the ground up. Each aligned with how the business actually works."
                    : "Cada uno construido desde cero. Cada uno alineado con cómo el negocio realmente funciona."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Credibility */}
      <section className="pb-20 md:pb-24">
        <Container>
          <div className="border-t border-neutral-light pt-12 md:pt-16">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-10 md:mb-12">
              {isEn ? "Built on credibility" : "Construido sobre credibilidad"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-6">
                  {isEn
                    ? "Narvaez Digital Marketing is a registered studio in Washington State, serving clients across multiple countries."
                    : "Narvaez Digital Marketing es un estudio registrado en el Estado de Washington, sirviendo clientes en múltiples países."}
                </p>
                <p className="text-graphite text-base md:text-lg leading-relaxed">
                  {isEn
                    ? "The studio maintains a consistent record of 5-star reviews and has developed projects ranging from commercial brand platforms to consular systems — including SIRCON, built for the Consulate of Guatemala in Washington, D.C."
                    : "El estudio mantiene un historial consistente de reseñas de 5 estrellas y ha desarrollado proyectos que van desde plataformas comerciales de marca hasta sistemas consulares — incluyendo SIRCON, construido para el Consulado de Guatemala en Washington, D.C."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="border-t border-neutral-light pt-16 md:pt-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <p className="font-serif text-charcoal text-2xl md:text-3xl lg:text-4xl editorial-heading leading-[1.1]">
                  {isEn
                    ? "A small studio by structure."
                    : "Un estudio pequeño por estructura."}
                  <br />
                  <span className="italic">
                    {isEn
                      ? "A global perspective by nature."
                      : "Global por naturaleza."}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
