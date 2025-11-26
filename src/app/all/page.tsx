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
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-video bg-card animate-pulse rounded border-2 border-primary/20" />
        ))}
      </div>
    </section>
  );
}

export default function AllPage() {
  return (
    <MainLayout activeNav="/all">
      <Suspense fallback={
        <HeroSection 
          badge="ყველა პროექტი"
          title={<>ჩვენი<span className="text-primary"> პორტფოლიო </span></>}
          description="ნახეთ ჩვენი ყველა პროექტი — ლოკალიზაცია, 2D ანიმაცია, გრაფიკა და სხვა. წლების განმავლობაში შექმნილი საუკეთესო ნამუშევრები."
        />
      }>
        <HeroSectionServer 
          page="all"
          fallbackBadge="ყველა პროექტი"
          fallbackTitle={<>ჩვენი<span className="text-primary"> პორტფოლიო </span></>}
          fallbackDescription="ნახეთ ჩვენი ყველა პროექტი — ლოკალიზაცია, 2D ანიმაცია, გრაფიკა და სხვა. წლების განმავლობაში შექმნილი საუკეთესო ნამუშევრები."
        />
      </Suspense>
      <Suspense fallback={<PortfolioGridSkeleton />}>
        <PortfolioGridServer />
      </Suspense>
    </MainLayout>
  );
}
