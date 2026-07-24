import { Suspense } from "react";
import { MainLayout } from "@/components/layout";
import { PortfolioGridServer } from "@/components/PortfolioGridServer";
import { HeroSectionServer } from "@/components/HeroSectionServer";
import { DefaultLoader } from "@/components/DefaultLoader";
import { translate } from "@/i18n/messages";
import { getLocale } from "@/i18n/server";

// Revalidate every 10 seconds
export const revalidate = 10;

export default async function GraphicsPage() {
  const locale = await getLocale();

  return (
    <MainLayout activeNav="/graphics">
      <Suspense fallback={<DefaultLoader size="small" />}>
        <HeroSectionServer 
          page="graphics"
          locale={locale}
          fallbackBadge={translate(locale, "hero.graphics.badge")}
          fallbackTitle={
            <>
              {translate(locale, "hero.graphics.before")}
              <span className="text-primary"> {translate(locale, "hero.graphics.highlight")} </span>
              {translate(locale, "hero.graphics.after")}
            </>
          }
          fallbackDescription={translate(locale, "hero.graphics.description")}
        />
      </Suspense>
      <Suspense fallback={<DefaultLoader size="small" />}>
        <PortfolioGridServer categorySlug="graphics" locale={locale} />
      </Suspense>
    </MainLayout>
  );
}
