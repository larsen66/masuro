import { groq } from "next-sanity";

// Get all portfolio items
export const portfolioItemsQuery = groq`
  *[_type == "portfolioItem"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    image,
    videoUrl,
    description,
    client,
    year,
    featured
  }
`;

// Get portfolio items by category slug
export const portfolioItemsByCategoryQuery = groq`
  *[_type == "portfolioItem" && category->slug.current == $categorySlug] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    image,
    videoUrl,
    description,
    client,
    year,
    featured
  }
`;

// Get featured portfolio items
export const featuredPortfolioItemsQuery = groq`
  *[_type == "portfolioItem" && featured == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    image,
    videoUrl,
    description,
    client,
    year
  }
`;

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    color
  }
`;

// Get hero section for a specific page
export const heroSectionQuery = groq`
  *[_type == "heroSection" && page == $page][0] {
    _id,
    page,
    badge,
    titlePart1,
    titleHighlight,
    titlePart2,
    description,
    backgroundImage
  }
`;

// Get site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteName,
    logo,
    seoTitle,
    seoDescription,
    contactEmail,
    socialLinks
  }
`;

