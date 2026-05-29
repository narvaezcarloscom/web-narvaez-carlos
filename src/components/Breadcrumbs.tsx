import type { Locale } from "../lib/i18n";
import { BASE_URL } from "../lib/seo";

type Crumb = { name: string; path: string };

const HOME_LABEL: Record<Locale, string> = {
  en: "Home",
  es: "Inicio",
};

export default function Breadcrumbs({
  lang,
  items,
}: {
  lang: Locale;
  items: Crumb[];
}) {
  const langPrefix = lang === "en" ? "" : "/es";
  const all: Crumb[] = [{ name: HOME_LABEL[lang], path: "" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE_URL}${langPrefix}${c.path}` || `${BASE_URL}${langPrefix || "/"}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
