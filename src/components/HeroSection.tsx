"use client";

import {
  ReactNode,
  useState,
  useRef,
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react";
import { useLocale } from "@/i18n/LocaleProvider";

interface HeroSectionProps {
  badge?: string;
  title?: ReactNode;
  description?: string;
  showSvgHero?: boolean;
}

function subscribeToViewport(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

function getIsDesktop() {
  return window.innerWidth >= 768;
}

export function HeroSection({
  title,
  description,
  showSvgHero = false
}: HeroSectionProps) {
  const { t } = useLocale();
  const resolvedTitle = title ?? (
    <>
      {t("hero.localization.before")}
      <span className="text-primary"> {t("hero.localization.highlight")} </span>
      {t("hero.localization.after")}
    </>
  );
  const resolvedDescription = description ?? t("hero.localization.description");
  const [isHovered, setIsHovered] = useState(false);
  const isDesktop = useSyncExternalStore(
    subscribeToViewport,
    getIsDesktop,
    () => false
  );
  const hero1Ref = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const maskElementRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const throttleDelay = 16; // ~60fps
  const radius = 210;

  // Ensure hero-1 image is visible when component mounts (for cached images)
  useEffect(() => {
    if (showSvgHero && hero1Ref.current) {
      const img = hero1Ref.current;
      if (img.complete && img.naturalHeight !== 0) {
        img.style.opacity = '1';
      }
    }
  }, [showSvgHero]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    const now = performance.now();
    if (now - lastUpdateTime.current < throttleDelay) {
      return;
    }
    lastUpdateTime.current = now;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current || !maskElementRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maskValue = `radial-gradient(circle ${radius}px at ${x}px ${y}px, black 0%, black 30%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 70%, transparent 100%)`;
      maskElementRef.current.style.maskImage = maskValue;
      maskElementRef.current.style.webkitMaskImage = maskValue;

      rafRef.current = null;
    });
  }, [radius]);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (showSvgHero) {
    return (
      <section
        className="relative h-[45vh] md:h-screen mb-4 md:mb-8"
        style={{
          width: '100vw',
          maxWidth: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
        }}
      >
        <div
          ref={containerRef}
          className="relative w-full h-full cursor-pointer"
          style={{
            width: '100%',
            height: '100%',
          }}
          onMouseEnter={!isDesktop ? undefined : () => {
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
              hideTimeoutRef.current = null;
            }
            setIsHovered(true);
          }}
          onMouseLeave={!isDesktop ? undefined : () => {
            hideTimeoutRef.current = setTimeout(() => {
              setIsHovered(false);
            }, 150);
          }}
          onMouseMove={!isDesktop ? undefined : handleMouseMove}
        >
            {/* Placeholder background while image loads */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5"
              style={{
                width: '100vw',
                minWidth: '100vw',
                height: '100%',
                left: '50%',
                top: '0',
                transform: 'translateX(-50%)',
              }}
            />

            {/* Base hero image - loaded with priority */}
            {/* Native img is intentional because the reveal mask needs exact viewport sizing. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={hero1Ref}
              src="/hero-1.webp"
              alt={t("hero.image")}
              className="absolute"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onLoad={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              style={{
                width: '100vw',
                minWidth: '100vw',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block',
                left: '50%',
                top: '0',
                transform: 'translateX(-50%)',
                opacity: 1,
              }}
            />

            {/* Smooth fade to background on all edges */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100vw',
                height: '100%',
                background: `
                  linear-gradient(to right,
                    #310c1e 0%,
                    rgba(49,12,30,0.6) 8%,
                    transparent 20%,
                    transparent 80%,
                    rgba(49,12,30,0.6) 92%,
                    #310c1e 100%
                  ),
                  linear-gradient(to bottom,
                    #310c1e 0%,
                    rgba(49,12,30,0.6) 5%,
                    transparent 15%,
                    transparent 85%,
                    rgba(49,12,30,0.6) 95%,
                    #310c1e 100%
                  )
                `,
              }}
            />

            {/* Hover layer with mask effect — desktop only, not loaded on mobile */}
            {isDesktop && (
              <div
                ref={maskElementRef}
                className={`absolute pointer-events-none ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  width: '100vw',
                  minWidth: '100vw',
                  height: '100%',
                  transition: 'opacity 0.3s ease-out',
                  left: '50%',
                  top: '0',
                  transform: 'translateX(-50%) translateZ(0)',
                  willChange: 'opacity, mask-image',
                  maskImage: 'none',
                  WebkitMaskImage: 'none',
                  maskSize: '100% 100%',
                  WebkitMaskSize: '100% 100%',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: '0 0',
                  WebkitMaskPosition: '0 0',
                }}
              >
                {/* Native img keeps both mask layers pixel-aligned. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-2.webp"
                  alt={t("hero.hoverImage")}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  style={{
                    width: '100vw',
                    minWidth: '100vw',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    display: 'block',
                    opacity: 1,
                  }}
                />
              </div>
            )}
        </div>
      </section>
    );
  }

  // Default text-based hero section
  return (
    <section className="relative py-8 md:py-16 px-4 mb-4 md:mb-8">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Main heading - animated */}
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight animate-fade-in-up"
          style={{ animationDelay: "0ms" }}
        >
          {resolvedTitle}
        </h1>

        {/* Description - animated */}
        <p
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2 animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          {resolvedDescription}
        </p>
      </div>
    </section>
  );
}
