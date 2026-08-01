"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Play,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DefaultLoader } from "./DefaultLoader";
import { useLocale } from "@/i18n/LocaleProvider";

interface VideoPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string;
  imageUrl: string;
  imageUrls?: string[]; // Array of images for carousel
  videoUrl?: string;
  description?: string;
  autoPlay?: boolean;
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

export function VideoPreview({
  isOpen,
  onClose,
  title,
  category,
  imageUrl,
  imageUrls,
  videoUrl,
  description,
  autoPlay = false,
}: VideoPreviewProps) {
  const { t } = useLocale();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Use imageUrls array if provided, otherwise fallback to single imageUrl
  const images = imageUrls && imageUrls.length > 0 ? imageUrls : [imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoInfo = videoUrl ? getVideoInfo(videoUrl) : null;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play video when dialog opens
  useEffect(() => {
    if (!isOpen || !autoPlay || !videoUrl) return;

    const playTimer = window.setTimeout(() => {
      setIsLoading(true);
      setIsPlaying(true);
    }, 0);

    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.clearTimeout(playTimer);
      window.clearTimeout(loadingTimer);
    };
  }, [isOpen, autoPlay, videoUrl]);
  
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

  const handlePlay = () => {
    if (videoUrl) {
      setIsLoading(true);
      setIsPlaying(true);
      // Скрываем загрузчик через небольшую задержку после начала воспроизведения
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (open) return;

    setIsPlaying(false);
    setIsLoading(false);
    setCurrentImageIndex(0);
    onClose();
  };

  const renderVideoPlayer = () => {
    if (!videoUrl || !isPlaying) return null;

    if (!videoInfo) return null;

    if (videoInfo.type === "youtube") {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoInfo.id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      );
    }

    if (videoInfo.type === "vimeo") {
      return (
        <iframe
          src={`https://player.vimeo.com/video/${videoInfo.id}?autoplay=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      );
    }

    // Direct video URL (including files from Sanity)
    return (
      <video
        key={videoUrl}
        src={videoUrl}
        controls
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-contain"
        onError={(e) => {
          console.error("Video playback error:", e);
        }}
      >
        {t("video.unsupported")}
      </video>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent
        closeLabel={t("dialog.close")}
        className="w-[95vw] max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] max-h-[90vh] gap-0 bg-card border-primary/30 p-0 overflow-hidden"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <DialogHeader className="px-3 pt-3 pb-0 shrink-0">
          <DialogTitle className="flex items-center justify-between gap-4 pr-8">
            <div>
              <span className="text-primary text-sm font-normal">{category}</span>
              <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            </div>
            {videoUrl && !isPlaying && (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label={t("video.openTab")}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {/* Video player area */}
        <div 
          className="relative aspect-video min-h-0 shrink bg-black m-2 rounded-lg overflow-hidden group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <DefaultLoader size="medium" />
            </div>
          )}
          {isPlaying ? (
            renderVideoPlayer()
          ) : (
            <>
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
                      alt={t("portfolio.image", { title, number: imgIndex + 1 })}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 900px"
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-opacity duration-300 text-white"
                    aria-label={t("carousel.previous")}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-opacity duration-300 text-white"
                    aria-label={t("carousel.next")}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Carousel indicators - only show if more than one image */}
              {images.length > 1 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {images.map((_, imgIndex) => (
                    <button
                      key={imgIndex}
                      onClick={(e) => handleDotClick(e, imgIndex)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        imgIndex === currentImageIndex
                          ? "bg-primary w-8"
                          : "bg-white/50 hover:bg-white/70"
                      )}
                      aria-label={t("carousel.goTo", { number: imgIndex + 1 })}
                    />
                  ))}
                </div>
              )}
              
              {/* Play button overlay - only show if video exists */}
              {videoUrl && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors cursor-pointer z-10"
                  onClick={handlePlay}
                >
                  <button className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-primary/30">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Video info */}
        <div className="px-3 pb-3 pt-0 shrink-0">
          {description && (
            <DialogDescription className="text-sm text-muted-foreground mb-1">
              {description}
            </DialogDescription>
          )}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {videoUrl
                ? videoInfo?.type === "youtube"
                  ? "YouTube"
                  : videoInfo?.type === "vimeo"
                    ? "Vimeo"
                    : t("portfolio.video")
                : t("portfolio.photo")}
            </span>
            {videoUrl && !isPlaying && (
              <span className="text-primary">{t("portfolio.clickToPlay")}</span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
