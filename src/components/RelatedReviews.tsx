import Link from "next/link";
import { getDictionary, type Locale } from "../lib/i18n";
import { getReviewsByService, gmbProfile, type ServiceId } from "../lib/reviews";

export default async function RelatedReviews({
  lang,
  serviceId,
  limit = 2,
  location,
}: {
  lang: Locale;
  serviceId: ServiceId;
  limit?: number;
  location: string;
}) {
  const matched = getReviewsByService(serviceId, limit);
  if (matched.length === 0) return null;

  const dict = await getDictionary(lang);
  const t = dict.trust.related;
  const tSignal = dict.trust.signal;
  const trustHref = lang === "en" ? "/trust" : "/es/trust";

  return (
    <aside className="border-t border-neutral-light pt-12 md:pt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
        <p className="text-xs uppercase tracking-widest text-graphite/50">
          {t.heading}
        </p>
        <span className="text-xs uppercase tracking-widest text-graphite/50">
          {tSignal.label} · {gmbProfile.ratingValue.toFixed(1)}★
        </span>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 list-none m-0 p-0">
        {matched.map((r) => (
          <li key={r.id}>
            <figure>
              <blockquote
                cite={r.reviewUrl}
                lang={r.language}
                className="text-base text-charcoal leading-relaxed mb-5"
              >
                “{r.body.length > 220 ? `${r.body.slice(0, 220).trimEnd()}…` : r.body}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-charcoal text-ivory text-xs font-medium tracking-wide shrink-0"
                >
                  {r.initials}
                </span>
                <div className="min-w-0">
                  <p className="font-serif text-lg editorial-heading text-charcoal leading-tight">
                    {r.authorName}
                  </p>
                  {r.authorContext && (
                    <p className="text-xs text-graphite/60 mt-1">{r.authorContext}</p>
                  )}
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Link
          href={trustHref}
          data-track-event="cta_click"
          data-track-prop-location={location}
          data-track-prop-destination="trust_page"
          className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-charcoal hover:text-narvaez-red transition-colors"
        >
          {t.seeAll}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
