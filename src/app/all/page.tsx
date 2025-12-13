import { Suspense } from "react";
import dynamic from "next/dynamic";
import { MainLayout } from "@/components/layout";
import { HeroSectionServer } from "@/components/HeroSectionServer";
import { DefaultLoader } from "@/components/DefaultLoader";

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

export default function AllPage() {
  return (
    <MainLayout activeNav="/all">
      <Suspense fallback={<DefaultLoader size="small" />}>
        <HeroSectionServer 
          page="all"
          fallbackBadge="ყველა პროექტი"
          fallbackTitle={<>ჩვენი<span className="text-primary"> პორტფოლიო </span></>}
          fallbackDescription="ნახეთ ჩვენი ყველა პროექტი — ლოკალიზაცია, 2D ანიმაცია, გრაფიკა და სხვა. წლების განმავლობაში შექმნილი საუკეთესო ნამუშევრები."
        />
      </Suspense>
      <Suspense fallback={<DefaultLoader size="small" />}>
        <PortfolioGridServer />
      </Suspense>
    </MainLayout>
  );
}
