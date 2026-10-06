"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { translations, type Locale } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  text: (typeof translations)[Locale];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale: Locale }) {
  const router = useRouter();
  const [locale, updateLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale.toLowerCase() === "ge" ? "ka" : locale.toLowerCase();
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    document.cookie = `masuro_locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    updateLocale(nextLocale);
    router.refresh();
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, text: translations[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
