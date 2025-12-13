"use client";

import { useState, useEffect, useRef } from "react";

export function VideoPreloader() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Delay video loading to not block initial render
    const loadTimer = setTimeout(() => {
      setShouldLoad(true);
    }, 100);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    
    const video = videoRef.current;
    if (!video) return;

    // Загружаем видео с низким приоритетом
    video.load();

    // Обработчик завершения видео - проигрываем минимум 1 раз
    const handleEnded = () => {
      // После первого проигрывания скрываем
      setIsFadingOut(true);
      setTimeout(() => {
        setShowPreloader(false);
      }, 500);
    };

    // Пытаемся воспроизвести
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        // Если автовоспроизведение заблокировано, ждем события canplay
        const handleCanPlay = async () => {
          try {
            await video.play();
          } catch (e) {
            // Игнорируем ошибки
          }
        };
        video.addEventListener("canplay", handleCanPlay, { once: true });
      }
    };

    video.addEventListener("ended", handleEnded, { once: true });
    
    playVideo();

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [shouldLoad]);

  if (!showPreloader) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-background/95 transition-opacity duration-500 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-center h-full">
        <div className="relative max-w-[32px] w-8 h-8">
          {shouldLoad && (
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              playsInline
              muted
              preload="none"
            >
              <source src="/11.webm" type="video/webm" />
              Ваш браузер не поддерживает видео.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}

