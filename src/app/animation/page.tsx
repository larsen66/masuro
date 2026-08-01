import { Suspense } from "react";
import { MainLayout } from "@/components/layout";
import { PortfolioGridServer } from "@/components/PortfolioGridServer";
import { HeroSectionServer } from "@/components/HeroSectionServer";
import { DefaultLoader } from "@/components/DefaultLoader";
import { translate } from "@/i18n/messages";
import { getLocale } from "@/i18n/server";

// Revalidate every 10 seconds
export const revalidate = 10;

export default async function AnimationPage() {
  const locale = await getLocale();

  return (
    <MainLayout activeNav="/animation">
      <Suspense fallback={<DefaultLoader size="small" />}>
        <HeroSectionServer 
          page="animation"
          locale={locale}
          fallbackBadge={translate(locale, "hero.animation.badge")}
          fallbackTitle={
            <>
              {translate(locale, "hero.animation.before")}
              <span className="text-primary"> {translate(locale, "hero.animation.highlight")} </span>
              {translate(locale, "hero.animation.after")}
            </>
          }
          fallbackDescription={translate(locale, "hero.animation.description")}
        />
      </Suspense>
      <Suspense fallback={<DefaultLoader size="small" />}>
        <PortfolioGridServer categorySlug="animation" locale={locale} />
      </Suspense>
    </MainLayout>
  );
}
