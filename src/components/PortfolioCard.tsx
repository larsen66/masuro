"use client";

import { useState, lazy, Suspense } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

// Lazy load VideoPreview to improve initial page load
const VideoPreview = lazy(() => import("./VideoPreview").then(mod => ({ default: mod.VideoPreview })));

interface PortfolioCardProps {
  title: string;
  category: string;
  imageUrl: string;
  index: number;
  videoUrl?: string;
  description?: string;
}

export function PortfolioCard({ 
  title, 
  category, 
  imageUrl, 
  index, 
  videoUrl,
  description 
}: PortfolioCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
          animationDelay: `${index * 60}ms`,
        }}
      >
        {/* Image container */}
        <div className="relative aspect-video overflow-hidden bg-card">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={index < 3 ? "eager" : "lazy"}
            priority={index < 3}
          />
          
          {/* Video indicator badge */}
          {videoUrl && (
            <div className="absolute top-2 right-2 bg-primary/90 px-2 py-0.5 rounded text-xs text-white font-medium">
              VIDEO
            </div>
          )}
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
            <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-5 md:w-6 h-5 md:h-6 text-white ml-0.5" fill="white" />
            </div>
          </div>
          
          {/* Title overlay - always visible on mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-xs text-primary font-medium">{category}</p>
            <h3 className="text-sm md:text-base font-semibold text-foreground">{title}</h3>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <VideoPreview
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title={title}
          category={category}
          imageUrl={imageUrl}
          videoUrl={videoUrl}
          description={description}
        />
      </Suspense>
    </>
  );
}
