import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface PortfolioItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  image: SanityImageSource;
  videoUrl?: string;
  description?: string;
  client?: string;
  year?: number;
  featured?: boolean;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface HeroSection {
  _id: string;
  page: string;
  badge?: string;
  titlePart1?: string;
  titleHighlight?: string;
  titlePart2?: string;
  description?: string;
  backgroundImage?: SanityImageSource;
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  logo?: SanityImageSource;
  seoTitle?: string;
  seoDescription?: string;
  contactEmail?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}

