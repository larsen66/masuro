import { Suspense } from "react";
import { MainLayout } from "@/components/layout";
import { PortfolioGridServer } from "@/components/PortfolioGridServer";
import { HeroSectionServer } from "@/components/HeroSectionServer";
import { DefaultLoader } from "@/components/DefaultLoader";

// Revalidate every 10 seconds
export const revalidate = 10;

export default function AnimationPage() {
  return (
    <MainLayout activeNav="/animation">
      <Suspense fallback={<DefaultLoader size="small" />}>
        <HeroSectionServer 
          page="animation"
          fallbackBadge="2D ანიმაცია"
          fallbackTitle={<>კრეატიული<span className="text-primary"> 2D ანიმაცია </span></>}
          fallbackDescription="მოძრაობა, რომელიც იპყრობს ყურადღებას. ჩვენი ანიმატორები ქმნიან უნიკალურ 2D ანიმაციებს თქვენი ბრენდისთვის."
        />
      </Suspense>
      <Suspense fallback={<DefaultLoader size="small" />}>
        <PortfolioGridServer categorySlug="animation" category="2D ანიმაცია" />
      </Suspense>
    </MainLayout>
  );
}
