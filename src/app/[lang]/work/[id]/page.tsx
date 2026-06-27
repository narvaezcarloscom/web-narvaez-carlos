import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject, projects, type Project } from "../../../../lib/projects";
import { type Locale, getDictionary, t as localize } from "../../../../lib/i18n";
import { buildAlternates } from "../../../../lib/seo";
import Breadcrumbs from "../../../../components/Breadcrumbs";

const BASE_URL = "https://narvaezcarlos.com";

/**
 * Per-case-study JSON-LD. Models the project as a CreativeWork and references the
 * canonical NDM Organization (#organization) and founder Person (#person) by @id —
 * never redefining them (see CLAUDE.md "una entidad, un solo lugar"). The client's
 * live URL is emitted as `sameAs` for cross-source verification. Client geo lives on
 * the `about` Organization only when `clientLocation` is set (omitted for white-label).
 */
function projectJsonLd(project: Project, lang: Locale) {
  const isEn = lang === "en";
  const pageUrl = `${BASE_URL}${isEn ? "" : "/es"}/work/${project.id}`;

  const about: Record<string, unknown> = {
    "@type": "Organization",
    name: project.name,
    url: project.url,
  };
  if (project.clientLocation) {
    const loc = project.clientLocation;
    about.address = {
      "@type": "PostalAddress",
      addressLocality: loc.city,
      ...(loc.region ? { addressRegion: loc.region } : {}),
      addressCountry: loc.country,
    };
    if (loc.areaServed) {
      about.areaServed = { "@type": "Place", name: loc.areaServed };
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#project`,
        name: project.name,
        description: localize(project.tagline, lang),
        url: project.url,
        sameAs: [project.url],
        image: `${BASE_URL}${project.heroImage ?? project.image}`,
        datePublished: project.year,
        inLanguage: lang,
        keywords: project.services.map((s) => localize(s, lang)),
        creator: { "@id": `${BASE_URL}/#organization` },
        provider: { "@id": `${BASE_URL}/#organization` },
        author: { "@id": `${BASE_URL}/#person` },
        about,
      },
    ],
  };
}

type Params = { lang: Locale; id: string };
type Props = { params: Promise<Params> };

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { lang, id } = await params;
  const project = getProject(id);
  return {
    title: project ? project.name : "Project not found",
    description: project ? localize(project.tagline, lang) : "Project detail",
    alternates: buildAlternates(`/work/${id}`, lang),
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { lang, id } = await params;
  const project = getProject(id);
  if (!project) return notFound();

  const isEn = lang === "en";
  const dict = await getDictionary(lang);
  const t = dict.work;

  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const langPrefix = isEn ? "" : "/es";

  // Localized content
  const tagline = localize(project.tagline, lang);
  const category = localize(project.category, lang);
  const services = project.services.map((s) => localize(s, lang));
  const overview = localize(project.overview, lang);
  const challenge = localize(project.challenge, lang);
  const solution = localize(project.solution, lang);
  const pullQuote = project.pullQuote ? localize(project.pullQuote, lang) : undefined;
  const editorialHeadline = project.editorialHeadline
    ? localize(project.editorialHeadline, lang)
    : undefined;
  const solutionPoints = project.solutionPoints?.map((p) => localize(p, lang));
  const results = project.results.map((r) => localize(r, lang));

  const heroImage = project.heroImage ?? project.image;
  const hasHeroImage = Boolean(heroImage);
  const heroPlaceholderText = editorialHeadline ?? tagline;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project, lang)) }}
      />
      <Breadcrumbs
        lang={lang}
        items={[
          { name: isEn ? "Work" : "Proyectos", path: "/work" },
          { name: project.name, path: `/work/${id}` },
        ]}
      />

      {/* BLOQUE 1 — HERO full-viewport */}
      <section
        aria-label={project.name}
        className="relative h-screen min-h-[600px] w-full overflow-hidden bg-charcoal"
      >
        {hasHeroImage ? (
          <Image
            src={heroImage}
            alt={`${project.name} — ${tagline}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-ivory/20 text-4xl md:text-6xl px-8 text-center max-w-4xl">
              {heroPlaceholderText}
            </span>
          </div>
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="relative z-10 flex h-full w-full items-center justify-center px-6 md:px-12">
          <div className="text-center max-w-5xl">
            <p className="text-xs uppercase tracking-[0.25em] text-ivory/60 mb-6">
              {category}
            </p>
            <h1 className="font-serif editorial-heading text-ivory text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              {project.name}
            </h1>
            <p className="mt-8 font-sans text-lg md:text-xl text-ivory/70 max-w-2xl mx-auto leading-relaxed">
              {tagline}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-ivory/50">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            {t.scrollHint}
          </span>
          <svg
            className="animate-bounce"
            width="14"
            height="22"
            viewBox="0 0 14 22"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 1V21M7 21L1 15M7 21L13 15"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </section>

      {/* BLOQUE 2 — METADATA BAR (sticky below navbar h-20) */}
      <section className="sticky top-20 z-10 bg-ivory border-b border-neutral-light">
        <div className="px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
            <dl className="grid grid-cols-2 md:flex md:flex-row md:items-end gap-6 md:gap-12 flex-1">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-graphite/50 font-sans mb-2">
                  {t.client}
                </dt>
                <dd className="font-serif text-charcoal text-base">
                  {project.name}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-graphite/50 font-sans mb-2">
                  {t.category}
                </dt>
                <dd className="font-serif text-charcoal text-base">
                  {category}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-graphite/50 font-sans mb-2">
                  {t.servicesLabel}
                </dt>
                <dd className="font-serif text-charcoal text-base">
                  {services.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-graphite/50 font-sans mb-2">
                  {t.year}
                </dt>
                <dd className="font-serif text-charcoal text-base">
                  {project.year}
                </dd>
              </div>
            </dl>

            {project.url !== "#" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-charcoal hover:text-narvaez-red transition-colors self-start md:self-end"
                data-track-event="external_click"
                data-track-prop-location={`case_study_${id}`}
                data-track-prop-destination="live_site"
              >
                {t.liveSite}
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* BLOQUE 3 — INTRO EDITORIAL */}
      <section className="bg-ivory py-20 md:py-32 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[35fr_65fr] gap-12 md:gap-20 max-w-[1440px] mx-auto">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-graphite/50 mb-4">
              {t.overview}
            </p>
            <p className="text-narvaez-red text-2xl leading-none mb-4" aria-hidden="true">
              —
            </p>
            {editorialHeadline && (
              <h2 className="font-serif editorial-heading text-charcoal text-3xl md:text-4xl">
                {editorialHeadline}
              </h2>
            )}
          </div>
          <div>
            <p className="font-sans text-graphite text-lg md:text-xl leading-relaxed">
              {overview}
            </p>
          </div>
        </div>
      </section>

      {/* BLOQUE 4 — THE CHALLENGE */}
      <section className="bg-neutral-light/40 py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-graphite/50 mb-6">
            {t.challenge}
          </p>
          <div className="max-w-3xl">
            <p className="font-sans text-graphite text-lg leading-relaxed">
              {challenge}
            </p>
            {pullQuote && (
              <blockquote className="font-serif italic text-charcoal text-2xl md:text-3xl border-l-2 border-narvaez-red pl-6 my-10 leading-snug">
                {pullQuote}
              </blockquote>
            )}
          </div>
        </div>
      </section>

      {/* BLOQUE 5 — FULL-BLEED IMAGE */}
      <section className="bg-charcoal" aria-hidden={!hasHeroImage}>
        <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
          {hasHeroImage ? (
            <Image
              src={project.image}
              alt={`${project.name} — case study visual`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-ivory/30 text-3xl md:text-5xl text-center px-8 max-w-3xl">
                {heroPlaceholderText}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* BLOQUE 6 — THE SOLUTION */}
      <section className="bg-ivory py-20 md:py-32 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[35fr_65fr] gap-12 md:gap-20 max-w-[1440px] mx-auto">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-graphite/50 mb-4">
              {t.solution}
            </p>
            <h2 className="font-serif editorial-heading text-charcoal text-2xl md:text-3xl">
              {isEn
                ? "How we built it."
                : "Cómo lo construimos."}
            </h2>
          </div>
          <div>
            <p className="font-sans text-graphite text-lg md:text-xl leading-relaxed mb-10">
              {solution}
            </p>
            {solutionPoints && solutionPoints.length > 0 && (
              <>
                <p className="text-[10px] uppercase tracking-[0.25em] text-graphite/50 mb-5">
                  {t.keyDecisions}
                </p>
                <ul className="list-none m-0 p-0 space-y-4">
                  {solutionPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 border-t border-neutral-light pt-4"
                    >
                      <span className="text-narvaez-red text-xs font-sans tracking-wider shrink-0 mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-sans text-graphite text-base leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* BLOQUE 7 — RESULTS (dark) */}
      <section className="bg-charcoal text-ivory py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/40 mb-12">
            {t.results}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-16">
            {results.map((result, i) => (
              <div key={i} className="flex flex-col gap-4">
                <span className="font-serif text-narvaez-red text-5xl md:text-6xl editorial-heading">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-sans text-ivory/80 text-lg leading-relaxed max-w-md">
                  {result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 8 — CTA STRIP */}
      <section className="bg-narvaez-red py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-8 text-center">
          <h2 className="font-serif editorial-heading text-ivory text-3xl md:text-4xl">
            {t.ctaHeading}
          </h2>
          <Link
            href={`${langPrefix}/contact`}
            data-track-event="cta_click"
            data-track-prop-location={`case_study_${id}`}
            data-track-prop-destination="contact"
            className="inline-flex items-center gap-3 border-2 border-ivory text-ivory px-8 py-3.5 text-sm font-medium tracking-[0.2em] uppercase hover:bg-ivory hover:text-narvaez-red transition-colors duration-300"
          >
            {t.ctaButton}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </section>

      {/* BLOQUE 9 — NEXT PROJECT */}
      <section className="bg-ivory border-t border-neutral-light py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-graphite/50 mb-6">
            {t.nextProject}
          </p>
          <Link
            href={`${langPrefix}/work/${nextProject.id}`}
            className="group inline-flex items-baseline gap-6 hover:gap-8 transition-all duration-300"
          >
            <h2 className="font-serif editorial-heading text-charcoal text-4xl md:text-5xl lg:text-6xl group-hover:text-narvaez-red transition-colors duration-300">
              {nextProject.name}
            </h2>
            <span
              aria-hidden="true"
              className="text-narvaez-red text-3xl md:text-4xl shrink-0"
            >
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
