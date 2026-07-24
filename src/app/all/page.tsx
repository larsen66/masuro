import { Suspense } from "react";
import dynamic from "next/dynamic";
import { MainLayout } from "@/components/layout";
import { HeroSectionServer } from "@/components/HeroSectionServer";
import { DefaultLoader } from "@/components/DefaultLoader";
import { translate } from "@/i18n/messages";
import { getLocale } from "@/i18n/server";

// Dynamically import PortfolioGridServer to reduce initial bundle size
const PortfolioGridServer = dynamic(
  () => import("@/components/PortfolioGridServer").then(mod => ({ default: mod.PortfolioGridServer })),
  {
    loading: () => <DefaultLoader size="small" />,
    ssr: true,
  }
);

// Revalidate every 5 minutes for better performance
export const revalidate = 300;

export default async function AllPage() {
  const locale = await getLocale();

  return (
    <MainLayout activeNav="/all">
      <Suspense fallback={<DefaultLoader size="small" />}>
        <HeroSectionServer 
          page="all"
          locale={locale}
          fallbackBadge={translate(locale, "hero.all.badge")}
          fallbackTitle={
            <>
              {translate(locale, "hero.all.before")}
              <span className="text-primary"> {translate(locale, "hero.all.highlight")} </span>
              {translate(locale, "hero.all.after")}
            </>
          }
          fallbackDescription={translate(locale, "hero.all.description")}
        />
      </Suspense>
      <Suspense fallback={<DefaultLoader size="small" />}>
        <PortfolioGridServer locale={locale} />
      </Suspense>
    </MainLayout>
  );
}
