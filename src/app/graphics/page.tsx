import { Suspense } from "react";
import { MainLayout } from "@/components/layout";
import { PortfolioGridServer } from "@/components/PortfolioGridServer";
import { HeroSectionServer } from "@/components/HeroSectionServer";
import { DefaultLoader } from "@/components/DefaultLoader";

// Revalidate every 10 seconds
export const revalidate = 10;

export default function GraphicsPage() {
  return (
    <MainLayout activeNav="/graphics">
      <Suspense fallback={<DefaultLoader size="small" />}>
        <HeroSectionServer 
          page="graphics"
          fallbackBadge="გრაფიკა"
          fallbackTitle={<>ვიზუალური<span className="text-primary"> გრაფიკა </span></>}
          fallbackDescription="თანამედროვე გრაფიკული დიზაინი თქვენი ვიდეო კონტენტისთვის. მოშენ გრაფიკა, ტიტრები, ლოგოები და სხვა."
        />
      </Suspense>
      <Suspense fallback={<DefaultLoader size="small" />}>
        <PortfolioGridServer categorySlug="graphics" category="გრაფიკა" />
      </Suspense>
    </MainLayout>
  );
}
