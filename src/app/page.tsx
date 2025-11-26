import { Suspense } from "react";
import { MainLayout } from "@/components/layout";
import { HeroSection } from "@/components/HeroSection";
import { PortfolioGridServer } from "@/components/PortfolioGridServer";
import { HeroSectionServer } from "@/components/HeroSectionServer";

// Revalidate every 10 seconds
export const revalidate = 10;

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

export default function Home() {
  return (
    <MainLayout activeNav="/">
      <Suspense fallback={
        <HeroSection 
          badge="ლოკალიზაცია • დუბლაჟი • გრაფიკა"
          title={<>პროფესიონალური<span className="text-primary"> ვიდეო </span>ლოკალიზაცია</>}
          description="ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია — ყველაფერი ერთ სივრცეში."
        />
      }>
        <HeroSectionServer 
          page="home"
          fallbackBadge="ლოკალიზაცია • დუბლაჟი • გრაფიკა"
          fallbackTitle={<>პროფესიონალური<span className="text-primary"> ვიდეო </span>ლოკალიზაცია</>}
          fallbackDescription="ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია — ყველაფერი ერთ სივრცეში."
        />
      </Suspense>
      <Suspense fallback={<PortfolioGridSkeleton />}>
        <PortfolioGridServer categorySlug="localization" />
      </Suspense>
    </MainLayout>
  );
}
