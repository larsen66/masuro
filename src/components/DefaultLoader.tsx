"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

interface DefaultLoaderProps {
  /** Размер загрузчика: 'small' | 'medium' | 'large' | 'fullscreen' */
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  /** Показывать ли фон */
  showBackground?: boolean;
  /** Классы для контейнера */
  className?: string;
}

export function DefaultLoader({ 
  size = 'small',
  showBackground = false,
  className = ''
}: DefaultLoaderProps) {
  const { t } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (size === "small") return;
    const video = videoRef.current;
    if (!video) return;

    // Принудительно начинаем загрузку
    video.load();
    
    // Пытаемся воспроизвести сразу
    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Игнорируем ошибки автовоспроизведения
      }
    };

    // Обработчики для надежной загрузки
    const handleCanPlay = () => {
      playVideo();
    };

    const handleLoadedData = () => {
      playVideo();
    };

    // Зацикливаем видео
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("ended", handleEnded);
    
    // Пробуем воспроизвести сразу
    playVideo();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("ended", handleEnded);
    };
  }, [size]);

  const containerClasses = size === 'fullscreen' 
    ? 'fixed inset-0 z-[9999] flex items-center justify-center'
    : 'flex items-center justify-center';

  const backgroundClasses = showBackground 
    ? 'bg-background/95' 
    : '';

  if (size === "small") {
    return (
      <div className={`${containerClasses} ${backgroundClasses} ${className}`}>
        <div
          className="w-6 h-6 rounded-full border-2 border-primary/40 border-t-primary animate-spin"
          aria-label={t("loading")}
        />
      </div>
    );
  }

  // Размеры для разных вариантов (как спиннер)
  const sizeClasses = {
    small: 'max-w-[32px] w-8 h-8', // Размер как у спиннера
    medium: 'max-w-[160px]',
    large: 'max-w-[240px]',
    fullscreen: 'max-w-[320px] w-full'
  };

  // Всегда показываем видео 11.webm
  return (
    <div className={`${containerClasses} ${backgroundClasses} ${className}`}>
      <div className={`relative ${sizeClasses[size]} mx-4`}>
        <video
          ref={videoRef}
          className="w-full h-auto rounded-lg shadow-2xl"
          playsInline
          muted
          loop
          preload="auto"
          autoPlay
        >
          <source src="/11.webm" type="video/webm" />
          {t("video.unsupported")}
        </video>
      </div>
    </div>
  );
}
