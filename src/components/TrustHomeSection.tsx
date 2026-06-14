import Link from "next/link";
import { getDictionary, type Locale } from "../lib/i18n";
import Container from "./Container";
import DiagonalSlash from "./DiagonalSlash";
import { gmbProfile } from "../lib/reviews";

export default async function TrustHomeSection({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.trust.home;
  const tMetrics = dict.trust.metrics;
  const trustHref = lang === "en" ? "/trust" : "/es/trust";

  return (
    <section className="py-20 md:py-28 border-t border-neutral-light">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-widest text-graphite/50 mb-4">
              {t.label}
            </p>
            <DiagonalSlash size="sm" className="text-graphite/20 mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl editorial-heading mb-6">
              {t.heading[0]}
              <br />
              <span className="italic">{t.heading[1]}</span>
            </h2>
            <p className="text-graphite text-base md:text-lg leading-relaxed max-w-xl mb-8">
              {t.body}
            </p>
            <Link
              href={trustHref}
              data-track-event="cta_click"
              data-track-prop-location="home_trust_section"
              data-track-prop-destination="trust_page"
              className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-charcoal hover:text-narvaez-red transition-colors"
            >
              {t.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              <Metric value={gmbProfile.ratingValue.toFixed(1)} label={tMetrics.rating} suffix="★" />
              <Metric value={String(gmbProfile.reviewCount)} label={tMetrics.reviews} />
              <Metric value="45+" label={tMetrics.sites} />
              <Metric value="2022" label={tMetrics.founded} />
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Metric({ value, label, suffix }: { value: string; label: string; suffix?: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-graphite/50 mb-1">
        {label}
      </dt>
      <dd className="font-serif text-3xl md:text-4xl editorial-heading text-charcoal tabular-nums">
        {value}
        {suffix && <span className="text-narvaez-red ml-1">{suffix}</span>}
      </dd>
    </div>
  );
}
