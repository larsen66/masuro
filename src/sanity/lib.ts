import { client, urlFor } from "./client";
import {
  portfolioItemsQuery,
  portfolioItemsByCategoryQuery,
  heroSectionQuery,
  categoriesQuery,
  siteSettingsQuery,
} from "./queries";
import type { PortfolioItem, Category, HeroSection, SiteSettings } from "./types";

// Revalidate data every 10 seconds for fresh content
const REVALIDATE_TIME = 10;

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
