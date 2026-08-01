import { defaultLocale, type Locale } from "./config";

export type LocalizedValue = Partial<Record<Locale, string>>;

export function resolveLocalizedValue(
  translations: LocalizedValue | null | undefined,
  locale: Locale,
  legacyValue?: string | null
): string {
  return (
    translations?.[locale]?.trim() ||
    translations?.[defaultLocale]?.trim() ||
    translations?.en?.trim() ||
    translations?.ru?.trim() ||
    legacyValue?.trim() ||
    ""
  );
}
