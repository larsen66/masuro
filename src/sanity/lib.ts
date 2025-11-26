import { client, urlFor } from "./client";
import {
  portfolioItemsQuery,
  portfolioItemsByCategoryQuery,
  heroSectionQuery,
  categoriesQuery,
  siteSettingsQuery,
} from "./queries";
import type { PortfolioItem, Category, HeroSection, SiteSettings } from "./types";

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    return await client.fetch(portfolioItemsQuery);
  } catch {
    console.error("Failed to fetch portfolio items from Sanity");
    return [];
  }
}

export async function getPortfolioItemsByCategory(
  categorySlug: string
): Promise<PortfolioItem[]> {
  try {
    return await client.fetch(portfolioItemsByCategoryQuery, { categorySlug });
  } catch {
    console.error("Failed to fetch portfolio items by category from Sanity");
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await client.fetch(categoriesQuery);
  } catch {
    console.error("Failed to fetch categories from Sanity");
    return [];
  }
}

export async function getHeroSection(page: string): Promise<HeroSection | null> {
  try {
    return await client.fetch(heroSectionQuery, { page });
  } catch {
    console.error("Failed to fetch hero section from Sanity");
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(siteSettingsQuery);
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

