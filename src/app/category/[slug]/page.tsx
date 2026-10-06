import { notFound } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { HeroSection } from "@/components/HeroSection";
import { PortfolioGridServer } from "@/components/PortfolioGridServer";
import { getCategories } from "@/sanity/lib";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => encodeURIComponent(item.slug) === slug || item.slug === slug);

  if (!category) notFound();

  return (
    <MainLayout activeNav={`/category/${encodeURIComponent(category.slug)}`}>
      <HeroSection
        badge={category.title}
        title={<>{category.title}</>}
        description={category.description ?? ""}
      />
      <PortfolioGridServer categorySlug={category.slug} category={category.title} />
    </MainLayout>
  );
}
