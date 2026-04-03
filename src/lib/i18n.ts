export type Locale = "en" | "es";
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "es"];

export type LocaleText = { en: string; es: string };

export function t(text: LocaleText, locale: Locale): string {
  return text[locale];
}

const dictionaries = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  es: () => import("./dictionaries/es").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
