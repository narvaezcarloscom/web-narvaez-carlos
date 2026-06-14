import Link from "next/link";
import { getDictionary, type Locale } from "../lib/i18n";
import { gmbProfile } from "../lib/reviews";

export default async function TrustSignal({
  lang,
  className = "",
  location,
}: {
  lang: Locale;
  className?: string;
  location: string; // analytics: where on the site this signal lives
}) {
  const dict = await getDictionary(lang);
  const t = dict.trust.signal;
  const trustHref = lang === "en" ? "/trust" : "/es/trust";

  return (
    <p className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-graphite ${className}`}>
      <span aria-hidden="true" className="text-narvaez-red">★</span>
      <span className="text-charcoal font-medium tabular-nums">
        {gmbProfile.ratingValue.toFixed(1)}
      </span>
      <span className="text-graphite/40">·</span>
      <span>
        {gmbProfile.reviewCount}{" "}
        <span className="text-graphite">{t.label.toLowerCase()}</span>
      </span>
      <span className="text-graphite/40">·</span>
      <Link
        href={trustHref}
        data-track-event="cta_click"
        data-track-prop-location={location}
        data-track-prop-destination="trust_page"
        className="link-underline text-charcoal hover:text-narvaez-red transition-colors"
      >
        {t.seeAll}
      </Link>
    </p>
  );
}
