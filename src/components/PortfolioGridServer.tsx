import { getPortfolioItems, getPortfolioItemsByCategory, getImageUrl, getFileUrl, getVideoThumbnail } from "@/sanity/lib";
import { PortfolioGridClient } from "./PortfolioGridClient";
import type { PortfolioItem } from "@/sanity/types";

// Fallback data when CMS is not configured
const fallbackItems = [
  { id: "1", title: "Linex Forte", category: "ლოკალიზაცია", imageUrl: "https://picsum.photos/seed/linex/600/340" },
  { id: "2", title: "Activia", category: "ლოკალიზაცია", imageUrl: "https://picsum.photos/seed/activia/600/340" },
  { id: "3", title: "Lenovo Legion", category: "ლოკალიზაცია", imageUrl: "https://picsum.photos/seed/lenovo/600/340" },
  { id: "4", title: "Brand Campaign", category: "გრაფიკა", imageUrl: "https://picsum.photos/seed/brand1/600/340" },
  { id: "5", title: "Skippy", category: "ლოკალიზაცია", imageUrl: "https://picsum.photos/seed/skippy/600/340" },
  { id: "6", title: "ARM Before", category: "2D ანიმაცია", imageUrl: "https://picsum.photos/seed/arm/600/340" },
  { id: "7", title: "Coca-Cola", category: "ლოკალიზაცია", imageUrl: "https://picsum.photos/seed/coca/600/340" },
  { id: "8", title: "Samsung Galaxy", category: "ლოკალიზაცია", imageUrl: "https://picsum.photos/seed/samsung/600/340" },
  { id: "9", title: "Nike Campaign", category: "გრაფიკა", imageUrl: "https://picsum.photos/seed/nike/600/340" },
  { id: "10", title: "McDonald's", category: "ლოკალიზაცია", imageUrl: "https://picsum.photos/seed/mcdonalds/600/340" },
  { id: "11", title: "Pepsi Max", category: "2D ანიმაცია", imageUrl: "https://picsum.photos/seed/pepsi/600/340" },
  { id: "12", title: "Adidas Original", category: "გრაფიკა", imageUrl: "https://picsum.photos/seed/adidas/600/340" },
];

interface PortfolioGridServerProps {
  category?: string;
  categorySlug?: string;
}

export async function PortfolioGridServer({ category, categorySlug }: PortfolioGridServerProps) {
  // Try to fetch from CMS
  let items: PortfolioItem[] = [];
  
  try {
    if (categorySlug) {
      items = await getPortfolioItemsByCategory(categorySlug);
    } else {
      items = await getPortfolioItems();
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
      
      // Final fallback to placeholder
      if (!imageUrl) {
        imageUrl = "https://picsum.photos/seed/default/600/340";
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
    });

    return <PortfolioGridClient items={transformedItems} />;
  }

  // Fallback to static data
  const filteredFallback = category
    ? fallbackItems.filter((item) => item.category === category)
    : fallbackItems;

  return <PortfolioGridClient items={filteredFallback} />;
}

