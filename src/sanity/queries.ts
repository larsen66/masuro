import { groq } from "next-sanity";

// Get all portfolio items
export const portfolioItemsQuery = groq`
  *[_type == "portfolioItem" && (
    defined(image.asset->._id) ||
    count(coalesce(images[defined(asset->._id)], [])) > 0 ||
    length(coalesce(videoUrl, "")) > 0 ||
    defined(videoFile.asset->._id)
  )] | order(order asc) {
    _id,
    title,
    titleTranslations,
    "slug": slug.current,
    "category": category->title,
    "categoryTranslations": category->titleTranslations,
    "categorySlug": category->slug.current,
    image,
    images,
    videoUrl,
    videoFile {
      asset-> {
        _id,
        url,
        originalFilename,
        mimeType
      }
    },
    description,
    descriptionTranslations,
    client,
    year,
    featured
  }
`;

// Get portfolio items by category slug
export const portfolioItemsByCategoryQuery = groq`
  *[_type == "portfolioItem" &&
    category->slug.current == $categorySlug &&
    (
      defined(image.asset->._id) ||
      count(coalesce(images[defined(asset->._id)], [])) > 0 ||
      length(coalesce(videoUrl, "")) > 0 ||
      defined(videoFile.asset->._id)
    )
  ] | order(order asc) {
    _id,
    title,
    titleTranslations,
    "slug": slug.current,
    "category": category->title,
    "categoryTranslations": category->titleTranslations,
    "categorySlug": category->slug.current,
    image,
    images,
    videoUrl,
    videoFile {
      asset-> {
        _id,
        url,
        originalFilename,
        mimeType
      }
    },
    description,
    descriptionTranslations,
    client,
    year,
    featured
  }
`;

// Get featured portfolio items
export const featuredPortfolioItemsQuery = groq`
  *[_type == "portfolioItem" &&
    featured == true &&
    (
      defined(image.asset->._id) ||
      count(coalesce(images[defined(asset->._id)], [])) > 0 ||
      length(coalesce(videoUrl, "")) > 0 ||
      defined(videoFile.asset->._id)
    )
  ] | order(order asc) {
    _id,
    title,
    titleTranslations,
    "slug": slug.current,
    "category": category->title,
    "categoryTranslations": category->titleTranslations,
    "categorySlug": category->slug.current,
    image,
    images,
    videoUrl,
    videoFile {
      asset-> {
        _id,
        url,
        originalFilename,
        mimeType
      }
    },
    description,
    descriptionTranslations,
    client,
    year
  }
`;

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    titleTranslations,
    "slug": slug.current,
    description,
    descriptionTranslations,
    color
  }
`;

// Get hero section for a specific page
export const heroSectionQuery = groq`
  *[_type == "heroSection" && page == $page][0] {
    _id,
    page,
    badge,
    badgeTranslations,
    titlePart1,
    titlePart1Translations,
    titleHighlight,
    titleHighlightTranslations,
    titlePart2,
    titlePart2Translations,
    description,
    descriptionTranslations,
    backgroundImage
  }
`;

// Get site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteNameTranslations,
    logo,
    seoTitle,
    seoTitleTranslations,
    seoDescription,
    seoDescriptionTranslations,
    contactEmail,
    whatsappNumber,
    instagramUrl,
    facebookUrl,
    telegramUrl,
    phoneNumber
  }
`;
