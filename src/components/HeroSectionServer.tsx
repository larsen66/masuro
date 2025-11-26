import { getHeroSection } from "@/sanity/lib";
import { HeroSection } from "./HeroSection";

interface HeroSectionServerProps {
  page: string;
  // Fallback props when CMS is not configured
  fallbackBadge?: string;
  fallbackTitle?: React.ReactNode;
  fallbackDescription?: string;
}

export async function HeroSectionServer({
  page,
  fallbackBadge,
  fallbackTitle,
  fallbackDescription,
}: HeroSectionServerProps) {
  const heroData = await getHeroSection(page);

  if (heroData && heroData.titlePart1) {
    // Use CMS data
    const title = (
      <>
        {heroData.titlePart1}
        {heroData.titleHighlight && (
          <span className="text-primary"> {heroData.titleHighlight} </span>
        )}
        {heroData.titlePart2}
      </>
    );

    return (
      <HeroSection
        badge={heroData.badge}
        title={title}
        description={heroData.description}
      />
    );
  }

  // Fallback to static props
  return (
    <HeroSection
      badge={fallbackBadge}
      title={fallbackTitle}
      description={fallbackDescription}
    />
  );
}

