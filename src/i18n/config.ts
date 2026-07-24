export const locales = ["ru", "en", "ka"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ka";
export const localeCookieName = "masuro_locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

export function normalizeLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale;
}
