"use client";

import { useState, useEffect, useRef } from "react";

export function VideoPreloader() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Предзагрузка видео через link preload
  // Removed preload to avoid blocking page load
  // Video will load on demand

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Принудительно начинаем загрузку сразу
    video.load();

    let hasStarted = false;

    // Обработчик загрузки данных - срабатывает раньше чем canplay
    const handleLoadedData = async () => {
      if (hasStarted) return;
      hasStarted = true;
      setIsLoading(false);
      try {
        await video.play();
      } catch (error) {
        console.error("Error playing video:", error);
        // Если не удалось воспроизвести, скрываем прелоадер
        setIsFadingOut(true);
        setTimeout(() => {
          setShowPreloader(false);
        }, 500);
      }
    };

    // Обработчик загрузки видео (fallback)
    const handleCanPlay = async () => {
      if (hasStarted || !isLoading) return;
      hasStarted = true;
      setIsLoading(false);
      try {
        await video.play();
      } catch (error) {
        console.error("Error playing video:", error);
        setIsFadingOut(true);
        setTimeout(() => {
          setShowPreloader(false);
        }, 500);
      }
    };

    // Обработчик завершения видео
    const handleEnded = () => {
      // Запускаем анимацию исчезновения
      setIsFadingOut(true);
      // Скрываем после завершения анимации
      setTimeout(() => {
        setShowPreloader(false);
      }, 500);
    };

    // Обработчик ошибок
    const handleError = () => {
      console.error("Error loading video");
      setIsFadingOut(true);
      setTimeout(() => {
        setShowPreloader(false);
      }, 500);
    };

    video.addEventListener("loadeddata", handleLoadedData, { once: true });
    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("ended", handleEnded, { once: true });
    video.addEventListener("error", handleError, { once: true });

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, []);

  if (!showPreloader) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-background/95 flex items-center justify-center transition-opacity duration-500 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className={`relative max-w-[160px] w-full mx-4 transition-all duration-500 ${
        isFadingOut ? "scale-95 opacity-0" : "scale-100 opacity-100"
      }`}>
        <video
          ref={videoRef}
          className="w-full h-auto rounded-lg shadow-2xl"
          playsInline
          muted
          preload="metadata"
          autoPlay
        >
          <source src="/11.webm" type="video/webm" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    </div>
  );
}

