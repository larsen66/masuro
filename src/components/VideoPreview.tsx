"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play, ExternalLink } from "lucide-react";
import Image from "next/image";
import { DefaultLoader } from "./DefaultLoader";

interface VideoPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  description?: string;
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

// Get thumbnail URL for video
function getVideoThumbnail(url: string): string | null {
  const info = getVideoInfo(url);
  if (!info) return null;
  
  if (info.type === "youtube") {
    return `https://img.youtube.com/vi/${info.id}/maxresdefault.jpg`;
  }
  
  return null;
}

export function VideoPreview({
  isOpen,
  onClose,
  title,
  category,
  imageUrl,
  videoUrl,
  description,
}: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoInfo = videoUrl ? getVideoInfo(videoUrl) : null;
  
  // Reset playing state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [isOpen]);

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
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-card border-primary/30 p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="flex items-center justify-between">
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
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {/* Video player area */}
        <div className="relative aspect-video bg-black m-4 mt-2 rounded-lg overflow-hidden group">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <DefaultLoader size="medium" />
            </div>
          )}
          {isPlaying ? (
            renderVideoPlayer()
          ) : (
            <>
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                suppressHydrationWarning
              />
              
              {/* Play button overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors cursor-pointer"
                onClick={handlePlay}
              >
                <button className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-primary/30">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </button>
              </div>
              
              {/* No video indicator */}
              {!videoUrl && (
                <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-sm text-white/70">
                  ვიდეო არ არის დამატებული
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Video info */}
        <div className="p-4 pt-0">
          {description && (
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
          )}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{videoUrl ? (videoInfo?.type === "youtube" ? "YouTube" : videoInfo?.type === "vimeo" ? "Vimeo" : "Video") : "Preview only"}</span>
            {videoUrl && <span className="text-primary">Click to play</span>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
