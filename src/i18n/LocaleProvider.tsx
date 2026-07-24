"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "./config";
import {
  formatProjectCount,
  translate,
  type MessageKey,
  type TranslationValues,
} from "./messages";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, values?: TranslationValues) => string;
  projectCount: (count: number) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState(initialLocale);
  const t = useCallback(
    (key: MessageKey, values?: TranslationValues) => translate(locale, key, values),
    [locale]
  );
  const projectCount = useCallback(
    (count: number) => formatProjectCount(locale, count),
    [locale]
  );
  const value = useMemo(
    () => ({ locale, setLocale, t, projectCount }),
    [locale, projectCount, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return context;
}
