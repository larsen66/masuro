import { getCategories, getSiteNavigation } from "@/sanity/lib";
import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";
import { MainLayoutClient } from "./MainLayout";

interface MainLayoutProps {
  children: React.ReactNode;
  activeNav?: string;
}

export async function MainLayout({ children, activeNav }: MainLayoutProps) {
  const [categories, siteNavigation, cookieStore] = await Promise.all([getCategories(), getSiteNavigation(), cookies()]);
  const savedLocale = cookieStore.get("masuro_locale")?.value;
  const locale: Locale = savedLocale === "RU" || savedLocale === "EN" ? savedLocale : "GE";

  return (
    <MainLayoutClient activeNav={activeNav} categories={categories} siteNavigation={siteNavigation} initialLocale={locale}>
      {children}
    </MainLayoutClient>
  );
}
