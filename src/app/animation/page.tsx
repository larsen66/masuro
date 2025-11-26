import { Suspense } from "react";
import { MainLayout } from "@/components/layout";
import { HeroSection } from "@/components/HeroSection";
import { PortfolioGridServer } from "@/components/PortfolioGridServer";
import { HeroSectionServer } from "@/components/HeroSectionServer";

// Loading fallback for portfolio grid
function PortfolioGridSkeleton() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="h-8 w-48 bg-card animate-pulse rounded" />
        <div className="h-5 w-20 bg-card animate-pulse rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-video bg-card animate-pulse rounded border-2 border-primary/20" />
        ))}
      </div>
    </section>
  );
}

export default function AnimationPage() {
  return (
    <MainLayout activeNav="/animation">
      <Suspense fallback={
        <HeroSection 
          badge="2D ანიმაცია"
          title={<>კრეატიული<span className="text-primary"> 2D ანიმაცია </span></>}
          description="მოძრაობა, რომელიც იპყრობს ყურადღებას. ჩვენი ანიმატორები ქმნიან უნიკალურ 2D ანიმაციებს თქვენი ბრენდისთვის."
        />
      }>
        <HeroSectionServer 
          page="animation"
          fallbackBadge="2D ანიმაცია"
          fallbackTitle={<>კრეატიული<span className="text-primary"> 2D ანიმაცია </span></>}
          fallbackDescription="მოძრაობა, რომელიც იპყრობს ყურადღებას. ჩვენი ანიმატორები ქმნიან უნიკალურ 2D ანიმაციებს თქვენი ბრენდისთვის."
        />
      </Suspense>
      <Suspense fallback={<PortfolioGridSkeleton />}>
        <PortfolioGridServer categorySlug="animation" category="2D ანიმაცია" />
      </Suspense>
    </MainLayout>
  );
}
