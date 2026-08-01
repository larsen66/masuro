import { client, urlFor } from "./client";
import {
  portfolioItemsQuery,
  portfolioItemsByCategoryQuery,
  heroSectionQuery,
  categoriesQuery,
  siteSettingsQuery,
} from "./queries";
import type { PortfolioItem, Category, HeroSection, SiteSettings } from "./types";
import { resolveLocalizedValue } from "@/i18n/localized-value";
import type { Locale } from "@/i18n/config";

// Revalidate data every 5 minutes for better performance
const REVALIDATE_TIME = 300;

function localizePortfolioItem(item: PortfolioItem, locale: Locale): PortfolioItem {
  return {
    ...item,
    title: resolveLocalizedValue(item.titleTranslations, locale, item.title),
    category: resolveLocalizedValue(
      item.categoryTranslations,
      locale,
      item.category
    ),
    description:
      resolveLocalizedValue(item.descriptionTranslations, locale, item.description) || undefined,
  };
}

function localizeCategory(category: Category, locale: Locale): Category {
  return {
    ...category,
    title: resolveLocalizedValue(category.titleTranslations, locale, category.title),
    description:
      resolveLocalizedValue(category.descriptionTranslations, locale, category.description) ||
      undefined,
  };
}

export async function getPortfolioItems(locale: Locale): Promise<PortfolioItem[]> {
  try {
    const items = await client.fetch<PortfolioItem[]>(
      portfolioItemsQuery,
      {},
      { next: { revalidate: REVALIDATE_TIME } }
    );
    return items.map((item) => localizePortfolioItem(item, locale));
  } catch {
    console.error("Failed to fetch portfolio items from Sanity");
    return [];
  }
}

export async function getPortfolioItemsByCategory(
  categorySlug: string,
  locale: Locale
): Promise<PortfolioItem[]> {
  try {
    const items = await client.fetch<PortfolioItem[]>(
      portfolioItemsByCategoryQuery,
      { categorySlug },
      { next: { revalidate: REVALIDATE_TIME } }
    );
    return items.map((item) => localizePortfolioItem(item, locale));
  } catch {
    console.error("Failed to fetch portfolio items by category from Sanity");
    return [];
  }
}

export async function getCategories(locale: Locale): Promise<Category[]> {
  try {
    const categories = await client.fetch<Category[]>(
      categoriesQuery,
      {},
      { next: { revalidate: REVALIDATE_TIME } }
    );
    return categories.map((category) => localizeCategory(category, locale));
  } catch {
    console.error("Failed to fetch categories from Sanity");
    return [];
  }
}

export async function getHeroSection(page: string, locale: Locale): Promise<HeroSection | null> {
  try {
    const hero = await client.fetch<HeroSection | null>(
      heroSectionQuery,
      { page },
      { next: { revalidate: REVALIDATE_TIME } }
    );
    if (!hero) return null;

    return {
      ...hero,
      badge: resolveLocalizedValue(hero.badgeTranslations, locale, hero.badge) || undefined,
      titlePart1:
        resolveLocalizedValue(hero.titlePart1Translations, locale, hero.titlePart1) || undefined,
      titleHighlight:
        resolveLocalizedValue(hero.titleHighlightTranslations, locale, hero.titleHighlight) ||
        undefined,
      titlePart2:
        resolveLocalizedValue(hero.titlePart2Translations, locale, hero.titlePart2) || undefined,
      description:
        resolveLocalizedValue(hero.descriptionTranslations, locale, hero.description) || undefined,
    };
  } catch {
    console.error("Failed to fetch hero section from Sanity");
    return null;
  }
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings | null> {
  try {
    const settings = await client.fetch<SiteSettings | null>(
      siteSettingsQuery,
      {},
      { next: { revalidate: REVALIDATE_TIME } }
    );
    if (!settings) return null;

    return {
      ...settings,
      siteName: resolveLocalizedValue(
        settings.siteNameTranslations,
        locale,
        settings.siteName
      ),
      seoTitle:
        resolveLocalizedValue(settings.seoTitleTranslations, locale, settings.seoTitle) ||
        undefined,
      seoDescription:
        resolveLocalizedValue(
          settings.seoDescriptionTranslations,
          locale,
          settings.seoDescription
        ) || undefined,
    };
  } catch {
    console.error("Failed to fetch site settings from Sanity");
    return null;
  }
}

export function getImageUrl(image: unknown, width = 600, height = 340): string {
  if (!image) return "";
  try {
    return urlFor(image).width(width).height(height).url();
  } catch {
    return "";
  }
}

export function getFileUrl(file: { asset?: { url?: string } } | null | undefined): string | undefined {
  if (!file?.asset?.url) return undefined;
  return file.asset.url;
}

// Extract video ID and type from URL
function getVideoInfo(url: string): { type: "youtube" | "vimeo" | "other"; id: string } | null {
  if (!url) return null;
  
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return { type: "youtube", id: youtubeMatch[1] };
  }
  
  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    return { type: "vimeo", id: vimeoMatch[1] };
  }
  
  return { type: "other", id: url };
}

// Get thumbnail URL for video (YouTube, Vimeo, or direct video file)
export function getVideoThumbnail(videoUrl?: string, videoFile?: { asset?: { url?: string } }): string | null {
  // Prioritize videoFile over videoUrl
  const url = (videoFile?.asset?.url) || videoUrl;
  if (!url) return null;
  
  const info = getVideoInfo(url);
  if (!info) return null;
  
  if (info.type === "youtube") {
    // Try maxresdefault first, fallback to hqdefault
    return `https://img.youtube.com/vi/${info.id}/maxresdefault.jpg`;
  }
  
  if (info.type === "vimeo") {
    // Use vumbnail.com service for Vimeo thumbnails (simple and reliable)
    // Alternative: could use Vimeo oEmbed API, but requires async fetch
    return `https://vumbnail.com/${info.id}.jpg`;
  }
  
  // For direct video files, we can't get thumbnail server-side easily
  // Return null and let client handle it
  return null;
}
