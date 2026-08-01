"use client";

import { PortfolioCard } from "./PortfolioCard";
import { useLocale } from "@/i18n/LocaleProvider";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  imageUrls?: string[]; // Array of images for carousel
  videoUrl?: string;
  description?: string;
}

interface PortfolioGridClientProps {
  items: PortfolioItem[];
}

export function PortfolioGridClient({ items }: PortfolioGridClientProps) {
  const { t, projectCount } = useLocale();

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          {t("portfolio.heading")}
        </h2>
        <span className="text-xs md:text-sm text-muted-foreground">
          {projectCount(items.length)}
        </span>
      </div>
      
      {/* Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((item, index) => (
          <PortfolioCard
            key={item.id}
            title={item.title}
            category={item.category}
            imageUrl={item.imageUrl}
            imageUrls={item.imageUrls}
            videoUrl={item.videoUrl}
            description={item.description}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
