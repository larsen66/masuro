import { getPortfolioItems, getPortfolioItemsByCategory, getImageUrl, getFileUrl, getVideoThumbnail } from "@/sanity/lib";
import { PortfolioGridClient } from "./PortfolioGridClient";
import type { PortfolioItem } from "@/sanity/types";
import type { Locale } from "@/i18n/config";

interface PortfolioGridServerProps {
  categorySlug?: string;
  locale: Locale;
}

export async function PortfolioGridServer({ categorySlug, locale }: PortfolioGridServerProps) {
  // Try to fetch from CMS
  let items: PortfolioItem[] = [];
  
  try {
    if (categorySlug) {
      items = await getPortfolioItemsByCategory(categorySlug, locale);
    } else {
      items = await getPortfolioItems(locale);
    }
  } catch {
    items = [];
  }

  // If CMS returns data, transform it
  if (items && items.length > 0) {
    const transformedItems = items.map((item) => {
      // Prioritize videoFile over videoUrl if both exist
      const videoUrl = getFileUrl(item.videoFile) || item.videoUrl;
      
      // Get image URLs - prioritize images array, fallback to single image
      let imageUrls: string[] | undefined;
      let imageUrl: string;
      
      if (item.images && Array.isArray(item.images) && item.images.length > 0) {
        // Use images array
        imageUrls = item.images
          .map((img) => getImageUrl(img))
          .filter((url) => url !== "");
        imageUrl = imageUrls[0] || "";
      } else if (item.image) {
        // Fallback to single image (backward compatibility)
        imageUrl = getImageUrl(item.image) || "";
      } else {
        imageUrl = "";
      }
      
      // If no image is available, try to use video thumbnail
      if (!imageUrl && videoUrl) {
        const videoThumbnail = getVideoThumbnail(videoUrl, item.videoFile);
        if (videoThumbnail) {
          imageUrl = videoThumbnail;
          // If we have imageUrls array, add thumbnail to it, otherwise create new array
          if (imageUrls) {
            imageUrls = [videoThumbnail, ...imageUrls];
          } else {
            imageUrls = [videoThumbnail];
          }
        }
      }
      
      return {
        id: item._id,
        title: item.title,
        category: item.category,
        imageUrl: imageUrl,
        imageUrls: imageUrls, // Pass array if available
        videoUrl: videoUrl,
        description: item.description,
      };
    }).filter((item) => item.imageUrl || item.videoUrl);

    return <PortfolioGridClient items={transformedItems} />;
  }

  return <PortfolioGridClient items={[]} />;
}
