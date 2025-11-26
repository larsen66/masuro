"use client";

import { PortfolioCard } from "./PortfolioCard";

// 12 portfolio items with placeholders
const portfolioItems = [
  {
    id: 1,
    title: "Linex Forte",
    category: "ლოკალიზაცია",
    imageUrl: "https://picsum.photos/seed/linex/600/340",
  },
  {
    id: 2,
    title: "Activia",
    category: "ლოკალიზაცია",
    imageUrl: "https://picsum.photos/seed/activia/600/340",
  },
  {
    id: 3,
    title: "Lenovo Legion",
    category: "ლოკალიზაცია",
    imageUrl: "https://picsum.photos/seed/lenovo/600/340",
  },
  {
    id: 4,
    title: "Brand Campaign",
    category: "გრაფიკა",
    imageUrl: "https://picsum.photos/seed/brand1/600/340",
  },
  {
    id: 5,
    title: "Skippy",
    category: "ლოკალიზაცია",
    imageUrl: "https://picsum.photos/seed/skippy/600/340",
  },
  {
    id: 6,
    title: "ARM Before",
    category: "2D ანიმაცია",
    imageUrl: "https://picsum.photos/seed/arm/600/340",
  },
  {
    id: 7,
    title: "Coca-Cola",
    category: "ლოკალიზაცია",
    imageUrl: "https://picsum.photos/seed/coca/600/340",
  },
  {
    id: 8,
    title: "Samsung Galaxy",
    category: "ლოკალიზაცია",
    imageUrl: "https://picsum.photos/seed/samsung/600/340",
  },
  {
    id: 9,
    title: "Nike Campaign",
    category: "გრაფიკა",
    imageUrl: "https://picsum.photos/seed/nike/600/340",
  },
  {
    id: 10,
    title: "McDonald's",
    category: "ლოკალიზაცია",
    imageUrl: "https://picsum.photos/seed/mcdonalds/600/340",
  },
  {
    id: 11,
    title: "Pepsi Max",
    category: "2D ანიმაცია",
    imageUrl: "https://picsum.photos/seed/pepsi/600/340",
  },
  {
    id: 12,
    title: "Adidas Original",
    category: "გრაფიკა",
    imageUrl: "https://picsum.photos/seed/adidas/600/340",
  },
];

interface PortfolioGridProps {
  category?: string;
}

export function PortfolioGrid({ category }: PortfolioGridProps) {
  const filteredItems = category
    ? portfolioItems.filter((item) => item.category === category)
    : portfolioItems;

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">ჩვენი პროექტები</h2>
        <span className="text-xs md:text-sm text-muted-foreground">{filteredItems.length} ვიდეო</span>
      </div>
      
      {/* Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredItems.map((item, index) => (
          <PortfolioCard
            key={item.id}
            title={item.title}
            category={item.category}
            imageUrl={item.imageUrl}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
