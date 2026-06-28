import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { getArticle, articles, type Article } from "../../../../lib/journal";
import { type Locale, localizeText } from "../../../../lib/i18n";
import { buildAlternates, BASE_URL } from "../../../../lib/seo";
import Container from "../../../../components/Container";
import Breadcrumbs from "../../../../components/Breadcrumbs";

type Params = { lang: Locale; id: string };
type Props = { params: Promise<Params> };

export function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props) {
  const { lang, id } = await params;
  const article = getArticle(id);
  return {
    title: article ? localizeText(article.title, lang) : "Article not found",
    description: article ? localizeText(article.subtitle, lang) : "Journal article",
    alternates: buildAlternates(`/journal/${id}`, lang),
  };
}

/**
 * Renders inline Markdown links — [label](url) — as real anchors and leaves the
 * rest of the text untouched. No HTML is interpolated: only the matched link
 * pattern becomes an <a>, so there is no injection surface.
 */
function renderRichText(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    nodes.push(
      <a
        key={key++}
        href={match[2]}
        target="_blank"
        rel="external noopener"
        className="underline decoration-graphite/30 underline-offset-2 hover:decoration-narvaez-red transition-colors"
      >
        {match[1]}
      </a>
    );
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/**
 * Per-article JSON-LD. Models the post as an Article and references the canonical
 * NDM Organization (#organization) and founder Person (#person) by @id — never
 * redefining them (see CLAUDE.md "una entidad, un solo lugar").
 */
function articleJsonLd(article: Article, lang: Locale) {
  const isEn = lang === "en";
  const pageUrl = `${BASE_URL}${isEn ? "" : "/es"}/journal/${article.id}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: localizeText(article.title, lang),
        description: localizeText(article.subtitle, lang),
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: lang,
        url: pageUrl,
        mainEntityOfPage: { "@id": pageUrl },
        author: { "@id": `${BASE_URL}/#person` },
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
    ],
  };
}

export default async function ArticleDetail({ params }: Props) {
  const { lang, id } = await params;
  const article = getArticle(id);
  if (!article) return notFound();

  const isEn = lang === "en";
  const title = localizeText(article.title, lang);
  const subtitle = localizeText(article.subtitle, lang);
  const readTime = localizeText(article.readTime, lang);

  const currentIndex = articles.findIndex((a) => a.id === id);
  const nextArticle = articles[(currentIndex + 1) % articles.length];

  const labels = {
    published: isEn ? "Published" : "Publicado",
    readingTime: isEn ? "Reading time" : "Tiempo de lectura",
    listen: isEn ? "Listen to this article" : "Escucha este artículo",
    ctaPrompt: isEn
      ? "Have a project that needs this kind of thinking?"
      : "¿Tienes un proyecto que pida este tipo de criterio?",
    ctaButton: isEn ? "Start a conversation" : "Hablemos",
    nextArticle: isEn ? "Next article" : "Siguiente artículo",
    alsoOnInstagram: isEn
      ? "Also explored on Instagram"
      : "También conversado en Instagram",
    viewCarousel: isEn
      ? "View the visual carousel (June 2026)"
      : "Ver el carrusel visual (junio 2026)",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article, lang)) }}
      />
      <Breadcrumbs
        lang={lang}
        items={[
          { name: "Journal", path: "/journal" },
          { name: title, path: `/journal/${id}` },
        ]}
      />
      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-20">
        <Container>
          <Link
            href="/journal"
            className="link-underline text-xs uppercase tracking-widest text-graphite/50 mb-8 inline-block"
          >
            Journal
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
            <div className="md:col-span-8">
              <h1 className="font-serif text-[2.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl editorial-heading">
                {title}
              </h1>
              <p className="mt-6 text-graphite text-lg md:text-xl max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-10 flex flex-col gap-6 md:justify-end">
              <div>
                <p className="text-xs uppercase tracking-widest text-graphite/50 mb-2">
                  {labels.published}
                </p>
                <p className="text-charcoal">
                  {new Date(article.date).toLocaleDateString(isEn ? "en-US" : "es-ES", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-graphite/50 mb-2">
                  {labels.readingTime}
                </p>
                <p className="text-charcoal">{readTime}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Article Body */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-7 md:col-start-1">
              <div className="border-t border-neutral-light pt-12 space-y-12 md:space-y-16">
                {article.body.map((block, i) => {
                  const heading = block.heading
                    ? localizeText(block.heading, lang)
                    : null;
                  return (
                    <div key={i}>
                      {heading && (
                        <h2 className="font-serif text-2xl md:text-3xl editorial-heading leading-[1.15] mb-5">
                          {heading}
                        </h2>
                      )}
                      <p className="text-graphite text-base md:text-lg leading-[1.8]">
                        {renderRichText(localizeText(block.text, lang))}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Podcast Embed */}
              {article.spotifyEpisodeId && (
                <div className="mt-16 md:mt-20 pt-12 border-t border-neutral-light">
                  <p className="text-xs uppercase tracking-widest text-graphite/50 mb-6">
                    {labels.listen}
                  </p>
                  <iframe
                    src={`https://open.spotify.com/embed/episode/${article.spotifyEpisodeId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl"
                  />
                </div>
              )}

              {/* CTA — suppressed for depth pieces where a sales funnel is tonally wrong */}
              {!article.hideCta && (
                <div className="mt-16 md:mt-20 pt-12 border-t border-neutral-light">
                  <p className="text-graphite text-base mb-6">{labels.ctaPrompt}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-narvaez-red text-ivory px-7 py-3.5 text-sm font-medium tracking-wide uppercase hover:bg-narvaez-red-hover transition-colors duration-300"
                  >
                    {labels.ctaButton}
                  </Link>
                </div>
              )}

              {/* Cross-link to the IG carousel — the visual "show" to this "tell" */}
              {article.instagramUrl && (
                <div className="mt-16 md:mt-20 pt-12 border-t border-neutral-light">
                  <p className="text-xs uppercase tracking-widest text-graphite/50 mb-3">
                    {labels.alsoOnInstagram}
                  </p>
                  <a
                    href={article.instagramUrl}
                    target="_blank"
                    rel="external noopener"
                    className="link-underline text-charcoal hover:text-narvaez-red transition-colors"
                  >
                    {labels.viewCarousel}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Next Article */}
          <div className="mt-24 md:mt-32 pt-12 border-t border-neutral-light">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
              {labels.nextArticle}
            </p>
            <Link
              href={`/journal/${nextArticle.id}`}
              className="group inline-block"
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl editorial-heading text-charcoal group-hover:text-narvaez-red transition-colors duration-300">
                {localizeText(nextArticle.title, lang)}
              </h2>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
