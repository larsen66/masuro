"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n";

const languages: { code: Locale; label: string }[] = [
  { code: "RU", label: "Русский" },
  { code: "EN", label: "English" },
  { code: "GE", label: "ქართული" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          aria-pressed={locale === lang.code}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
            locale === lang.code
              ? "bg-primary text-primary-foreground"
              : "text-foreground/70 hover:text-foreground hover:bg-primary/10"
          )}
          title={lang.label}
        >
          {lang.code}
        </button>
      ))}
    </div>
  );
}





