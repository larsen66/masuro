import { client, urlFor } from "./client";
import {
  portfolioItemsQuery,
  portfolioItemsByCategoryQuery,
  heroSectionQuery,
  categoriesQuery,
  siteSettingsQuery,
} from "./queries";
import type { PortfolioItem, Category, HeroSection, SiteSettings } from "./types";

// Revalidate data every 5 minutes for better performance
const REVALIDATE_TIME = 300;

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    return await client.fetch(
      portfolioItemsQuery,
      {},
      { next: { revalidate: REVALIDATE_TIME } }
    );
  } catch {
    console.error("Failed to fetch portfolio items from Sanity");
    return [];
  }
}

export async function getPortfolioItemsByCategory(
  categorySlug: string
): Promise<PortfolioItem[]> {
  try {
    return await client.fetch(
      portfolioItemsByCategoryQuery,
      { categorySlug },
      { next: { revalidate: REVALIDATE_TIME } }
    );
  } catch {
    console.error("Failed to fetch portfolio items by category from Sanity");
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await client.fetch(
      categoriesQuery,
      {},
      { next: { revalidate: REVALIDATE_TIME } }
    );
  } catch {
    console.error("Failed to fetch categories from Sanity");
    return [];
  }
}

export async function getHeroSection(page: string): Promise<HeroSection | null> {
  try {
    return await client.fetch(
      heroSectionQuery,
      { page },
      { next: { revalidate: REVALIDATE_TIME } }
    );
  } catch {
    console.error("Failed to fetch hero section from Sanity");
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(
      siteSettingsQuery,
      {},
      { next: { revalidate: REVALIDATE_TIME } }
    );
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
