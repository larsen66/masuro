"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { localeCookieName, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const languages = [
  { code: "RU", locale: "ru", label: "Русский" },
  { code: "EN", locale: "en", label: "English" },
  { code: "GE", locale: "ka", label: "ქართული" },
] satisfies Array<{ code: string; locale: Locale; label: string }>;

function persistLocale(nextLocale: Locale) {
  document.documentElement.lang = nextLocale;
  document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageSwitcher() {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    setLocale(nextLocale);
    persistLocale(nextLocale);
    startTransition(() => router.refresh());
  };

  return (
    <div
      className="flex items-center gap-1 bg-muted/50 rounded-lg p-1"
      aria-label={t("language.change")}
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => handleLanguageChange(lang.locale)}
          disabled={isPending}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
            locale === lang.locale
              ? "bg-primary text-primary-foreground"
              : "text-foreground/70 hover:text-foreground hover:bg-primary/10",
            isPending && "disabled:opacity-70"
          )}
          title={lang.label}
          aria-pressed={locale === lang.locale}
        >
          {lang.code}
        </button>
      ))}
    </div>
  );
}



