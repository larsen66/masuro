"use client";

import { useState, lazy, Suspense, useCallback, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DefaultLoader } from "./DefaultLoader";

// Lazy load VideoPreview to improve initial page load
const VideoPreview = lazy(() => import("./VideoPreview").then(mod => ({ default: mod.VideoPreview })));

interface PortfolioCardProps {
  title: string;
  category: string;
  imageUrl: string;
  imageUrls?: string[]; // Array of images for carousel
  index: number;
  videoUrl?: string;
  description?: string;
}

export function PortfolioCard({ 
  title, 
  category, 
  imageUrl, 
  imageUrls,
  index, 
  videoUrl,
  description 
}: PortfolioCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Use imageUrls array if provided, otherwise fallback to single imageUrl
  const baseImages = imageUrls && imageUrls.length > 0 ? imageUrls : [imageUrl];
  
  // Compute final images array - include video thumbnail if available and no real images
  const images = useMemo(() => {
    const hasRealImages = baseImages.some(img => img && img !== "https://picsum.photos/seed/default/600/340");
    
    if (videoThumbnail && !hasRealImages) {
      return [videoThumbnail];
    }
    
    if (videoThumbnail && hasRealImages) {
      // Add video thumbnail as first image if we have real images too
      return [videoThumbnail, ...baseImages.filter(img => img && img !== "https://picsum.photos/seed/default/600/340")];
    }
    
    return baseImages.filter(img => img);
  }, [baseImages, videoThumbnail]);
  
  // If no images and we have a video, try to extract thumbnail from video
  useEffect(() => {
    const hasRealImages = baseImages.some(img => img && img !== "https://picsum.photos/seed/default/600/340");
    
    if (!hasRealImages && videoUrl && !videoThumbnail) {
      // Check if it's a direct video file (not YouTube/Vimeo)
      const isDirectVideo = videoUrl && !videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be') && !videoUrl.includes('vimeo.com');
      
      if (isDirectVideo && videoRef.current) {
        const video = videoRef.current;
        const handleLoadedData = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
              setVideoThumbnail(thumbnail);
            }
          } catch (error) {
            console.error('Failed to extract video thumbnail:', error);
          }
        };
        
        const handleSeeked = () => {
          handleLoadedData();
        };
        
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('seeked', handleSeeked);
        video.currentTime = 0.1; // Seek to first frame
        
        return () => {
          video.removeEventListener('loadeddata', handleLoadedData);
          video.removeEventListener('seeked', handleSeeked);
        };
      }
    }
  }, [baseImages, videoUrl, videoThumbnail]);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  
  const handlePrevious = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);
  
  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);
  
  const handleDotClick = useCallback((e: React.MouseEvent, dotIndex: number) => {
    e.stopPropagation();
    setCurrentImageIndex(dotIndex);
  }, []);
  
  // Swipe handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current || images.length <= 1) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      // Swipe left - next image
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous image
      setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  }, [images.length]);
  
  // Reset image index when images change
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images.length]);

  return (
    <>
      <div
        onClick={() => setIsPreviewOpen(true)}
        className={cn(
          "group relative overflow-hidden rounded cursor-pointer",
          "border-2 md:border-[3px] border-primary",
          "transition-all duration-300",
          "hover:border-primary/70 hover:shadow-xl hover:shadow-primary/20",
          "md:hover:scale-[1.02]",
          "active:scale-[0.98]",
          "animate-fade-in-up"
        )}
        style={{
          animationDelay: index < 6 ? `${index * 50}ms` : '0ms',
        }}
      >
        {/* Hidden video element for extracting thumbnail from direct video files */}
        {videoUrl && !videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be') && !videoUrl.includes('vimeo.com') && (
          <video
            ref={videoRef}
            src={videoUrl}
            className="hidden"
            preload="metadata"
            crossOrigin="anonymous"
          />
        )}
        
        {/* Image container with carousel */}
        <div 
          className="relative aspect-video overflow-hidden bg-card"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images carousel */}
          <div className="relative w-full h-full">
            {images.map((img, imgIndex) => (
              <div
                key={imgIndex}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  imgIndex === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <Image
                  src={img}
                  alt={`${title} - Image ${imgIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 3 && imgIndex === 0 ? "eager" : "lazy"}
                  priority={index < 3 && imgIndex === 0}
                  suppressHydrationWarning
                />
              </div>
            ))}
          </div>
          
          {/* Navigation arrows - only show if more than one image */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}
          
          {/* Carousel indicators - only show if more than one image */}
          {images.length > 1 && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              {images.map((_, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={(e) => handleDotClick(e, imgIndex)}
                  className={cn(
                    "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300",
                    imgIndex === currentImageIndex
                      ? "bg-primary w-4 md:w-6"
                      : "bg-white/50 hover:bg-white/70"
                  )}
                  aria-label={`Go to image ${imgIndex + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Video indicator badge */}
          {videoUrl && (
            <div className="absolute top-2 right-2 bg-primary/90 px-2 py-0.5 rounded text-xs text-white font-medium z-20">
              VIDEO
            </div>
          )}
          
          {/* Play button overlay - only show if video exists */}
          {videoUrl && (
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 z-10"
            >
              <div
                className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30 scale-75 group-hover:scale-100 transition-transform duration-300"
              >
                <Play className="w-5 md:w-6 h-5 md:h-6 text-white ml-0.5" fill="white" />
              </div>
            </div>
          )}
          
          {/* Title overlay - always visible on mobile */}
          <div
            className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 z-20"
          >
            <p className="text-xs text-primary font-medium">{category}</p>
            <h3 className="text-sm md:text-base font-semibold text-foreground">{title}</h3>
          </div>
        </div>
      </div>

      <Suspense fallback={<DefaultLoader size="small" />}>
        <VideoPreview
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title={title}
          category={category}
          imageUrl={images[currentImageIndex]}
          imageUrls={images}
          videoUrl={videoUrl}
          description={description}
          autoPlay={!!videoUrl}
        />
      </Suspense>
    </>
  );
}
