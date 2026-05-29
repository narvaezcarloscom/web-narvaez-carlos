import type { Locale } from "./i18n";

export const BASE_URL = "https://narvaezcarlos.com";

export function buildAlternates(path: string, lang: Locale) {
  const normalized =
    path === "" || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const enUrl = `${BASE_URL}${normalized}` || BASE_URL;
  const esUrl = `${BASE_URL}/es${normalized}`;
  return {
    canonical: lang === "en" ? enUrl : esUrl,
    languages: {
      en: enUrl,
      es: esUrl,
      "x-default": enUrl,
    },
  };
}
