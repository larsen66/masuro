import { Suspense } from "react";
import { MainLayout } from "@/components/layout";
import { PortfolioGridServer } from "@/components/PortfolioGridServer";
import { HeroSectionServer } from "@/components/HeroSectionServer";
import { DefaultLoader } from "@/components/DefaultLoader";
import { translate } from "@/i18n/messages";
import { getLocale } from "@/i18n/server";

// Revalidate every 10 seconds
export const revalidate = 10;

export default async function LocalizationPage() {
  const locale = await getLocale();

  return (
    <MainLayout activeNav="/localization">
      <Suspense fallback={<DefaultLoader size="small" />}>
        <HeroSectionServer 
          page="localization"
          locale={locale}
          fallbackBadge={translate(locale, "hero.localization.badge")}
          fallbackTitle={
            <>
              {translate(locale, "hero.localization.before")}
              <span className="text-primary"> {translate(locale, "hero.localization.highlight")} </span>
              {translate(locale, "hero.localization.after")}
            </>
          }
          fallbackDescription={translate(locale, "hero.localization.description")}
        />
      </Suspense>
      <Suspense fallback={<DefaultLoader size="small" />}>
        <PortfolioGridServer categorySlug="localization" locale={locale} />
      </Suspense>
    </MainLayout>
  );
}
