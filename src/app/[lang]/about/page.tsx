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
      ? "Founded by Carlos Narvaez — a Venezuelan-born strategist based in Seattle. We design brands, websites, and platforms for businesses across the Americas."
      : "Fundado por Carlos Narvaez — estratega venezolano basado en Seattle. Diseñamos marcas, sitios web y plataformas para negocios en las Américas.",
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
              <p className="text-graphite text-base md:text-lg leading-relaxed">
                {isEn
                  ? "Narvaez Digital Marketing is a boutique digital studio founded by Carlos Narvaez — a Venezuelan-born strategist and creative, currently based in Seattle, Washington."
                  : "Narvaez Digital Marketing es un estudio digital boutique fundado por Carlos Narvaez — estratega y creativo nacido en Venezuela, actualmente basado en Seattle, Washington."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Origin */}
      <section className="pb-20 md:pb-24">
        <Container>
          <div className="border-t border-neutral-light pt-12 md:pt-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-6">
                  {isEn
                    ? "What began as a hands-on approach to web design and digital marketing has evolved into a multidisciplinary practice focused on building brands, digital platforms, and systems that are both functional and emotionally resonant."
                    : "Lo que comenzó como un enfoque práctico hacia el diseño web y el marketing digital ha evolucionado hacia una práctica multidisciplinaria enfocada en construir marcas, plataformas digitales y sistemas que son tanto funcionales como emocionalmente resonantes."}
                </p>
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-6">
                  {isEn
                    ? "This is not a volume-driven agency."
                    : "Esta no es una agencia de volumen."}
                </p>
                <p className="font-serif text-charcoal text-xl md:text-2xl leading-snug">
                  {isEn
                    ? "It is a studio built on intention."
                    : "Es un estudio construido con intención."}
                </p>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <p className="text-graphite text-base leading-relaxed">
                  {isEn
                    ? "Every project is approached with the same level of care — from early concept to final execution. No templates, no shortcuts. Just thoughtful design, structured strategy, and a deep respect for the businesses behind each brand."
                    : "Cada proyecto se aborda con el mismo nivel de cuidado — desde el concepto inicial hasta la ejecución final. Sin plantillas, sin atajos. Solo diseño intencional, estrategia estructurada y un profundo respeto por los negocios detrás de cada marca."}
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
                    ? "Operating in both English and Spanish, the studio works across markets including the United States, Mexico, Venezuela, and Chile."
                    : "Operando en inglés y español, el estudio trabaja en mercados que incluyen Estados Unidos, México, Venezuela y Chile."}
                </p>
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-6">
                  {isEn
                    ? "But this is not simply about language."
                    : "Pero esto no se trata simplemente del idioma."}
                </p>
                <p className="text-graphite text-base md:text-lg leading-relaxed">
                  {isEn
                    ? "It's about understanding how businesses communicate, grow, and position themselves within different cultural contexts. Each project is shaped by that awareness — translating not just words, but meaning, behavior, and expectation."
                    : "Se trata de entender cómo los negocios comunican, crecen y se posicionan dentro de diferentes contextos culturales. Cada proyecto está moldeado por esa conciencia — traduciendo no solo palabras, sino significado, comportamiento y expectativa."}
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
                    ? "Narvaez Digital Marketing partners with service-based businesses that understand design as a strategic advantage."
                    : "Narvaez Digital Marketing trabaja con empresas de servicios que entienden el diseño como una ventaja estratégica."}
                </p>
                <p className="text-graphite text-base md:text-lg leading-relaxed">
                  {isEn
                    ? "From local Latin-owned businesses looking to establish a strong digital presence, to institutions requiring custom internal systems, each collaboration is grounded in clarity, structure, and long-term thinking."
                    : "Desde negocios latinos locales que buscan establecer una presencia digital sólida, hasta instituciones que requieren sistemas internos a medida, cada colaboración se fundamenta en claridad, estructura y pensamiento a largo plazo."}
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
              {isEn ? "What we do" : "Qué hacemos"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-8">
                  {isEn
                    ? "The studio operates at the intersection of strategy, design, and technology:"
                    : "El estudio opera en la intersección de estrategia, diseño y tecnología:"}
                </p>
                <div className="space-y-4">
                  {[
                    { href: `${prefix}/services/web-design`, label: "Web Design & Development" },
                    { href: `${prefix}/services/custom-apps-platforms`, label: isEn ? "Custom Digital Platforms & Applications" : "Plataformas y Aplicaciones Digitales a Medida" },
                    { href: `${prefix}/services/digital-advertising`, label: isEn ? "Digital Advertising & Campaign Strategy" : "Publicidad Digital y Estrategia de Campañas" },
                    { href: `${prefix}/services/content-social-media`, label: isEn ? "Content & Social Media Systems" : "Sistemas de Contenido y Redes Sociales" },
                  ].map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="group flex items-center gap-4 text-charcoal hover:text-narvaez-red transition-colors duration-300"
                    >
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
                    ? "Every solution is built from the ground up — aligned with business goals, user experience, and brand identity."
                    : "Cada solución se construye desde cero — alineada con los objetivos del negocio, la experiencia de usuario y la identidad de marca."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Built on credibility */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="border-t border-neutral-light pt-12 md:pt-16">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-10 md:mb-12">
              {isEn ? "Built on credibility" : "Construido sobre credibilidad"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <p className="text-graphite text-base md:text-lg leading-relaxed mb-6">
                  {isEn
                    ? "Narvaez Digital Marketing is a registered business in Washington State, operating with an active license and serving clients across four countries."
                    : "Narvaez Digital Marketing es un negocio registrado en el Estado de Washington, operando con licencia activa y sirviendo clientes en cuatro países."}
                </p>
                <p className="text-graphite text-base md:text-lg leading-relaxed">
                  {isEn
                    ? "With a consistent record of 5-star reviews on Google, the studio has developed projects ranging from commercial brand platforms to custom consular systems — including SIRCON, built for the Consulate of Guatemala in Washington, D.C."
                    : "Con un historial consistente de reseñas de 5 estrellas en Google, el estudio ha desarrollado proyectos que van desde plataformas comerciales de marca hasta sistemas consulares a medida — incluyendo SIRCON, construido para el Consulado de Guatemala en Washington, D.C."}
                </p>
              </div>
              <div className="md:col-span-4 md:col-start-9 flex flex-col justify-end">
                <Link
                  href={`${prefix}/contact`}
                  className="group inline-flex items-center gap-3 text-charcoal hover:text-narvaez-red transition-colors duration-300"
                >
                  <span className="font-serif text-lg md:text-xl italic">
                    {isEn
                      ? "Let's start a conversation"
                      : "Iniciemos una conversación"}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-graphite/30 group-hover:text-narvaez-red transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  >
                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
