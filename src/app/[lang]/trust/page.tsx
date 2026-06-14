import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "../../../lib/i18n";
import { buildAlternates, BASE_URL } from "../../../lib/seo";
import Container from "../../../components/Container";
import AnimatedDiagonal from "../../../components/AnimatedDiagonal";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { reviews, reviewThemes, gmbProfile, type Review } from "../../../lib/reviews";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn ? "Trust, verified" : "Confianza, verificada",
    description: isEn
      ? `What clients say about Narvaez Digital Marketing, validated by ${gmbProfile.reviewCount} verified Google Business reviews (${gmbProfile.ratingValue.toFixed(1)} average rating).`
      : `Lo que los clientes dicen sobre Narvaez Digital Marketing, validado por ${gmbProfile.reviewCount} reseñas verificadas de Google Business (calificación promedio ${gmbProfile.ratingValue.toFixed(1)}).`,
    alternates: buildAlternates("/trust", lang),
  };
}

function dateFormatter(lang: Locale): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-ES", {
    year: "numeric",
    month: "long",
  });
}

export default async function TrustPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.trust;
  const fmt = dateFormatter(lang);
  const pageUrl = `${BASE_URL}${lang === "en" ? "" : "/es"}/trust`;

  // @graph pattern: WebPage references the Organization by @id only (no field
  // redefinition), and Review[] entities live at the top level pointing back to
  // the same @id via itemReviewed. The Organization itself is defined once and
  // only once — in the global JSON-LD in [lang]/layout.tsx (which carries
  // aggregateRating, sameAs incl. GMB, address, telephone, etc).
  //
  // This avoids field accumulation: redefining the Organization here would make
  // Google concatenate every field (sameAs x2, aggregateRating x2, url x2…)
  // and trigger the critical "review has multiple aggregate ratings" error.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: t.label,
        description: t.description,
        inLanguage: lang === "en" ? "en-US" : "es-ES",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        mainEntity: { "@id": `${BASE_URL}/#organization` },
        about: { "@id": `${BASE_URL}/#organization` },
      },
      ...reviews.map((r) => ({
        "@type": "Review",
        "@id": `${pageUrl}#review-${r.id}`,
        author: { "@type": "Person", name: r.authorName },
        datePublished: r.datePublished,
        reviewBody: r.body,
        inLanguage: r.language,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
        publisher: {
          "@type": "Organization",
          name: "Google",
          url: "https://www.google.com/maps",
        },
        itemReviewed: { "@id": `${BASE_URL}/#organization` },
        url: r.reviewUrl,
      })),
    ],
  };

  return (
    <>
      <Breadcrumbs
        lang={lang}
        items={[{ name: t.label, path: "/trust" }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-16 md:pt-24 pb-12 md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
              {t.label}
            </p>
            <AnimatedDiagonal className="text-graphite/20 mb-4" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl editorial-heading mb-6">
              {t.heading[0]}
              <br />
              <span className="italic">{t.heading[1]}</span>
            </h1>
            <p className="text-graphite text-base md:text-lg leading-relaxed max-w-2xl">
              {t.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Metrics */}
      <section className="pb-12 md:pb-16">
        <Container>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-neutral-light py-10">
            <Metric value={gmbProfile.ratingValue.toFixed(1)} label={t.metrics.rating} suffix="★" />
            <Metric value={String(gmbProfile.reviewCount)} label={t.metrics.reviews} />
            <Metric value={t.sitesValue} label={t.metrics.sites} />
            <Metric value={t.foundedValue} label={t.metrics.founded} />
          </dl>
        </Container>
      </section>

      {/* Attribution */}
      <section className="pb-16 md:pb-20">
        <Container>
          <div className="max-w-3xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-l-2 border-narvaez-red pl-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-graphite/50 mb-1">
                {lang === "en" ? "Source" : "Fuente"}
              </p>
              <p className="font-serif text-xl md:text-2xl text-charcoal">
                {t.attribution}
              </p>
            </div>
            <a
              href={gmbProfile.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="external_click"
              data-track-prop-destination="google_business_profile"
              data-track-prop-location="trust_attribution"
              data-track-prop-lang={lang}
              className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-charcoal hover:text-narvaez-red transition-colors shrink-0"
            >
              {t.viewOnGoogle}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>
        </Container>
      </section>

      {/* Themes */}
      <section className="pb-16 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
              {t.themesLabel}
            </p>
            <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
              {reviewThemes.map((theme) => (
                <li key={theme.en}>
                  <span className="inline-flex items-baseline gap-2 border border-neutral-light px-3 py-1.5 text-sm text-graphite">
                    {lang === "en" ? theme.en : theme.es}
                    <span className="text-graphite/40 text-xs tabular-nums">{theme.count}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-2">
              {t.reviewsHeading}
            </p>
            <p className="text-graphite/70 text-sm mb-10">{t.reviewsNote}</p>
            <ol className="space-y-16 list-none m-0 p-0">
              {reviews.map((r) => (
                <li key={r.id}>
                  <ReviewBlock
                    review={r}
                    fmt={fmt}
                    readFullLabel={t.readFull}
                    truncatedNote={t.truncatedNote}
                  />
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32 border-t border-neutral-light pt-16 md:pt-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl md:text-5xl editorial-heading mb-6">
              {t.ctaHeading[0]}
              <br />
              <span className="italic">{t.ctaHeading[1]}</span>
            </h2>
            <p className="text-graphite text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              {t.ctaBody}
            </p>
            <Link
              href={lang === "en" ? "/contact" : "/es/contact"}
              data-track-event="cta_click"
              data-track-prop-location="trust_footer"
              data-track-prop-lang={lang}
              className="inline-flex items-center gap-2 bg-narvaez-red text-ivory px-8 py-4 text-sm font-medium tracking-wide uppercase hover:bg-narvaez-red-hover transition-colors duration-300"
            >
              {t.ctaButton}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
                <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function Metric({ value, label, suffix }: { value: string; label: string; suffix?: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-graphite/50 mb-2 order-2">
        {label}
      </dt>
      <dd className="font-serif text-4xl md:text-5xl editorial-heading text-charcoal tabular-nums">
        {value}
        {suffix && <span className="text-narvaez-red ml-1">{suffix}</span>}
      </dd>
    </div>
  );
}

function StarRating({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      className="text-narvaez-red tracking-wider"
    >
      {"★".repeat(rating)}
      <span className="text-graphite/20">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function ReviewBlock({
  review,
  fmt,
  readFullLabel,
  truncatedNote,
}: {
  review: Review;
  fmt: Intl.DateTimeFormat;
  readFullLabel: string;
  truncatedNote: string;
}) {
  const dateObj = new Date(review.datePublished);
  return (
    <figure>
      <div className="flex items-center justify-between gap-4 mb-4">
        <StarRating rating={review.rating} />
        <time
          dateTime={review.datePublished}
          className="text-xs uppercase tracking-widest text-graphite/50"
        >
          {fmt.format(dateObj)}
        </time>
      </div>
      <blockquote
        cite={review.reviewUrl}
        lang={review.language}
        className="text-base md:text-lg text-charcoal leading-relaxed mb-6"
      >
        “{review.body}”
        {review.bodyTruncated && (
          <span className="block mt-2 text-sm text-graphite/60">
            {truncatedNote}
          </span>
        )}
      </blockquote>
      <figcaption className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-charcoal text-ivory text-xs font-medium tracking-wide"
        >
          {review.initials}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-serif text-lg md:text-xl editorial-heading text-charcoal leading-tight">
            {review.authorName}
          </p>
          {review.authorContext && (
            <p className="text-xs text-graphite/60 mt-1">{review.authorContext}</p>
          )}
        </div>
        <a
          href={review.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track-event="external_click"
          data-track-prop-destination="google_business_profile"
          data-track-prop-location="trust_review"
          data-track-prop-review-id={review.id}
          className="text-xs uppercase tracking-widest text-graphite/60 hover:text-narvaez-red transition-colors shrink-0"
        >
          {readFullLabel}
        </a>
      </figcaption>
    </figure>
  );
}
