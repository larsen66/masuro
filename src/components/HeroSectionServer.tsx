import { getHeroSection } from "@/sanity/lib";
import { HeroSection } from "./HeroSection";
import type { HeroPage } from "@/lib/i18n";

interface HeroSectionServerProps {
  page: HeroPage | "all";
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
  // For "all" page, show SVG hero instead of text
  if (page === "all") {
    return <HeroSection showSvgHero={true} />;
  }

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
        page={page}
        badge={heroData.badge}
        title={title}
        description={heroData.description}
      />
    );
  }

  // Fallback to static props
  return (
    <HeroSection
      page={page}
      badge={fallbackBadge}
      title={fallbackTitle}
      description={fallbackDescription}
    />
  );
}



