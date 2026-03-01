import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface PortfolioItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  image?: SanityImageSource; // Legacy field, kept for backward compatibility
  images?: SanityImageSource[]; // Array of images for carousel
  videoUrl?: string;
  videoFile?: {
    asset?: {
      _id: string;
      url: string;
      originalFilename?: string;
      mimeType?: string;
    };
  };
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
  whatsappNumber?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  telegramUrl?: string;
  phoneNumber?: string;
}



