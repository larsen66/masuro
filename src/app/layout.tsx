import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";
import { FloatingSocialServer } from "@/components/FloatingSocialServer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Masuro - Localization & Video Production",
  description: "Professional video localization and production services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preload" href="/hero-1.webp" as="image" type="image/webp" fetchPriority="high" />
      </head>
      <body
        className={`${geistSans.variable} antialiased min-h-screen`}
      >
        {children}
        <Suspense fallback={null}>
          <FloatingSocialServer />
        </Suspense>
      </body>
    </html>
  );
}
