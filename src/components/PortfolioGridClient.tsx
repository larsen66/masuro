"use client";

import { PortfolioCard } from "./PortfolioCard";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  description?: string;
}

interface PortfolioGridClientProps {
  items: PortfolioItem[];
}

export function PortfolioGridClient({ items }: PortfolioGridClientProps) {
  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">ჩვენი პროექტები</h2>
        <span className="text-xs md:text-sm text-muted-foreground">{items.length} ვიდეო</span>
      </div>
      
      {/* Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((item, index) => (
          <PortfolioCard
            key={item.id}
            title={item.title}
            category={item.category}
            imageUrl={item.imageUrl}
            videoUrl={item.videoUrl}
            description={item.description}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
