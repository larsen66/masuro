import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";
import { FloatingSocialServer } from "@/components/FloatingSocialServer";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { translate } from "@/i18n/messages";
import { getLocale } from "@/i18n/server";
import { getSiteSettings } from "@/sanity/lib";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const settings = await getSiteSettings(locale);

  return {
    title: settings?.seoTitle || translate(locale, "metadata.title"),
    description: settings?.seoDescription || translate(locale, "metadata.description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preload" href="/hero-1.webp" as="image" type="image/webp" fetchPriority="high" />
      </head>
      <body
        className={`${geistSans.variable} antialiased min-h-screen`}
      >
        <LocaleProvider initialLocale={locale}>
          {children}
          <Suspense fallback={null}>
            <FloatingSocialServer />
          </Suspense>
        </LocaleProvider>
      </body>
    </html>
  );
}
