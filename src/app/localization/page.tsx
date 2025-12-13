import { Suspense } from "react";
import { MainLayout } from "@/components/layout";
import { PortfolioGridServer } from "@/components/PortfolioGridServer";
import { HeroSectionServer } from "@/components/HeroSectionServer";
import { DefaultLoader } from "@/components/DefaultLoader";

// Revalidate every 10 seconds
export const revalidate = 10;

export default function LocalizationPage() {
  return (
    <MainLayout activeNav="/localization">
      <Suspense fallback={<DefaultLoader size="small" />}>
        <HeroSectionServer 
          page="localization"
          fallbackBadge="ლოკალიზაცია"
          fallbackTitle={<>პროფესიონალური<span className="text-primary"> ვიდეო </span>ლოკალიზაცია</>}
          fallbackDescription="ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია — ყველაფერი ერთ სივრცეში."
        />
      </Suspense>
      <Suspense fallback={<DefaultLoader size="small" />}>
        <PortfolioGridServer categorySlug="localization" category="ლოკალიზაცია" />
      </Suspense>
    </MainLayout>
  );
}

