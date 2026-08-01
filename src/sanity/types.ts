import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { LocalizedValue } from "@/i18n/localized-value";

export interface PortfolioItem {
  _id: string;
  title: string;
  titleTranslations?: LocalizedValue;
  slug: string;
  category: string;
  categoryTranslations?: LocalizedValue;
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
  descriptionTranslations?: LocalizedValue;
  client?: string;
  year?: number;
  featured?: boolean;
}

export interface Category {
  _id: string;
  title: string;
  titleTranslations?: LocalizedValue;
  slug: string;
  description?: string;
  descriptionTranslations?: LocalizedValue;
  color?: string;
}

export interface HeroSection {
  _id: string;
  page: string;
  badge?: string;
  badgeTranslations?: LocalizedValue;
  titlePart1?: string;
  titlePart1Translations?: LocalizedValue;
  titleHighlight?: string;
  titleHighlightTranslations?: LocalizedValue;
  titlePart2?: string;
  titlePart2Translations?: LocalizedValue;
  description?: string;
  descriptionTranslations?: LocalizedValue;
  backgroundImage?: SanityImageSource;
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  siteNameTranslations?: LocalizedValue;
  logo?: SanityImageSource;
  seoTitle?: string;
  seoTitleTranslations?: LocalizedValue;
  seoDescription?: string;
  seoDescriptionTranslations?: LocalizedValue;
  contactEmail?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  telegramUrl?: string;
  phoneNumber?: string;
}

