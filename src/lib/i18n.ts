export type Locale = "en" | "es";
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "es"];

export type LocaleText = { en: string; es: string };

export function t(text: LocaleText, locale: Locale): string {
  return text[locale];
}

/**
 * Tolerant localizer for content that may be a plain string (legacy / English-only)
 * or a bilingual { en, es } object. Lets the journal carry both shapes during the
 * migration to bilingual posts without forcing a translation of older entries.
 */
export function localizeText(text: string | LocaleText, locale: Locale): string {
  return typeof text === "string" ? text : text[locale];
}

const dictionaries = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  es: () => import("./dictionaries/es").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
