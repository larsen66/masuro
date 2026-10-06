import { getCategories } from "@/sanity/lib";
import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";
import { MainLayoutClient } from "./MainLayout";

interface MainLayoutProps {
  children: React.ReactNode;
  activeNav?: string;
}

export async function MainLayout({ children, activeNav }: MainLayoutProps) {
  const [categories, cookieStore] = await Promise.all([getCategories(), cookies()]);
  const savedLocale = cookieStore.get("masuro_locale")?.value;
  const locale: Locale = savedLocale === "RU" || savedLocale === "EN" ? savedLocale : "GE";

  return (
    <MainLayoutClient activeNav={activeNav} categories={categories} initialLocale={locale}>
      {children}
    </MainLayoutClient>
  );
}
