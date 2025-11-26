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

export default function GraphicsPage() {
  return (
    <MainLayout activeNav="/graphics">
      <Suspense fallback={
        <HeroSection 
          badge="გრაფიკა"
          title={<>ვიზუალური<span className="text-primary"> გრაფიკა </span></>}
          description="თანამედროვე გრაფიკული დიზაინი თქვენი ვიდეო კონტენტისთვის. მოშენ გრაფიკა, ტიტრები, ლოგოები და სხვა."
        />
      }>
        <HeroSectionServer 
          page="graphics"
          fallbackBadge="გრაფიკა"
          fallbackTitle={<>ვიზუალური<span className="text-primary"> გრაფიკა </span></>}
          fallbackDescription="თანამედროვე გრაფიკული დიზაინი თქვენი ვიდეო კონტენტისთვის. მოშენ გრაფიკა, ტიტრები, ლოგოები და სხვა."
        />
      </Suspense>
      <Suspense fallback={<PortfolioGridSkeleton />}>
        <PortfolioGridServer categorySlug="graphics" category="გრაფიკა" />
      </Suspense>
    </MainLayout>
  );
}
