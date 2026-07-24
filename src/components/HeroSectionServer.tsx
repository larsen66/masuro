import { getHeroSection } from "@/sanity/lib";
import { HeroSection } from "./HeroSection";
import type { Locale } from "@/i18n/config";

interface HeroSectionServerProps {
  page: string;
  locale: Locale;
  // Fallback props when CMS is not configured
  fallbackBadge?: string;
  fallbackTitle?: React.ReactNode;
  fallbackDescription?: string;
}

export async function HeroSectionServer({
  page,
  locale,
  fallbackBadge,
  fallbackTitle,
  fallbackDescription,
}: HeroSectionServerProps) {
  // For "all" page, show SVG hero instead of text
  if (page === "all") {
    return <HeroSection showSvgHero={true} />;
  }

  const heroData = await getHeroSection(page, locale);

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


