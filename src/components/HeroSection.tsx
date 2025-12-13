"use client";

import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { ReactNode, useState, useRef, useCallback, useEffect } from "react";

interface HeroSectionProps {
  badge?: string;
  title?: ReactNode;
  description?: string;
  showSvgHero?: boolean;
}

export function HeroSection({ 
  badge = "ლოკალიზაცია • დუბლაჟი • გრაფიკა",
  title = <>პროფესიონალური<span className="text-primary"> ვიდეო </span>ლოკალიზაცია</>,
  description = "ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია — ყველაფერი ერთ სივრცეში.",
  showSvgHero = false
}: HeroSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hero1Ref = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const maskElementRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const throttleDelay = 16; // ~60fps
  const radius = 210; // Радиус области в пикселях

  // Ensure hero-1 image is visible when component mounts (for cached images)
  useEffect(() => {
    if (showSvgHero && hero1Ref.current) {
      const img = hero1Ref.current;
      // If image is already loaded (cached), ensure it's visible
      if (img.complete && img.naturalHeight !== 0) {
        img.style.opacity = '1';
      }
    }
  }, [showSvgHero]);

  // Handle mouse move to track cursor position with throttling via requestAnimationFrame
  // Прямое обновление маски через ref для максимальной производительности
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Отменяем таймер скрытия, если курсор вернулся
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
      
      // Прямое обновление маски через DOM - быстрее чем через React state
      const maskValue = `radial-gradient(circle ${radius}px at ${x}px ${y}px, black 0%, black 30%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 70%, transparent 100%)`;
      maskElementRef.current.style.maskImage = maskValue;
      maskElementRef.current.style.webkitMaskImage = maskValue;
      
      rafRef.current = null;
    });
  }, [radius]);

  // Cleanup таймеров при размонтировании
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

  // If showSvgHero is true, render SVG hero section
  if (showSvgHero) {
    
    return (
      <section 
        className="relative h-screen mb-4 md:mb-8"
        style={{
          width: '138vw',
          maxWidth: '138vw',
          marginLeft: 'calc(-69vw + 50%)',
          marginRight: 'calc(-69vw + 50%)',
        }}
        // Add fetchpriority hint for critical hero images
        data-fetchpriority="high"
      >
        <div 
          ref={containerRef}
          className="relative w-full h-full cursor-pointer"
          style={{
            width: '100%',
            height: '100%',
          }}
          onMouseEnter={() => {
            // Отменяем таймер скрытия, если он был установлен
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
              hideTimeoutRef.current = null;
            }
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            // Плавно скрываем маску с небольшой задержкой для плавности
            hideTimeoutRef.current = setTimeout(() => {
              setIsHovered(false);
              if (maskElementRef.current) {
                // Не убираем маску сразу, пусть она исчезнет через opacity transition
                // maskElementRef.current.style.maskImage = 'none';
                // maskElementRef.current.style.webkitMaskImage = 'none';
              }
            }, 150); // Небольшая задержка для плавности
          }}
          onMouseMove={handleMouseMove}
        >
            {/* Placeholder background while SVG loads */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5"
              style={{
                width: '138vw',
                minWidth: '138vw',
                height: '100%',
                left: '50%',
                top: '0',
                transform: 'translateX(-50%)',
              }}
            />
            
            {/* Base SVG (1.svg) - loaded with priority for above-the-fold content */}
            <img
              ref={hero1Ref}
              src="/hero-1.svg"
              alt="Hero"
              className="absolute transition-opacity duration-500"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onLoad={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onError={(e) => {
                console.error('Failed to load hero-1.svg');
                e.currentTarget.style.opacity = '1';
              }}
              style={{
                width: '138vw',
                minWidth: '138vw',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block',
                left: '50%',
                top: '0',
                transform: 'translateX(-50%)',
                willChange: 'transform',
                opacity: 1,
                filter: 'none',
                WebkitFilter: 'none',
              }}
            />
            
            {/* Gradient overlay for edges */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                width: '138vw',
                height: '100%',
                background: `
                  linear-gradient(to right, 
                    rgba(0,0,0,0.4) 0%, 
                    transparent 8%, 
                    transparent 92%, 
                    rgba(0,0,0,0.4) 100%
                  ),
                  linear-gradient(to bottom, 
                    rgba(0,0,0,0.3) 0%, 
                    transparent 5%, 
                    transparent 95%, 
                    rgba(0,0,0,0.3) 100%
                  )
                `,
                mixBlendMode: 'multiply',
              }}
            />
            
            {/* Hover SVG (2.svg) with circular mask effect - lazy loaded */}
            <div 
              ref={maskElementRef}
              className={`absolute pointer-events-none ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                width: '138vw',
                minWidth: '138vw',
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
              <img
                src="/hero-2.svg"
                alt="Hero Hover"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                onLoad={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onError={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                style={{
                  width: '138vw',
                  minWidth: '138vw',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                  willChange: 'opacity, mask-image',
                  opacity: 1,
                  filter: 'none',
                  WebkitFilter: 'none',
                }}
              />
            </div>
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
        {/* Badge - animated */}
        <div 
          className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/20 border border-primary/30 mb-4 md:mb-6 animate-fade-in-down"
          style={{ animationDelay: "0ms" }}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs md:text-sm text-primary font-medium">{badge}</span>
        </div>
        
        {/* Main heading - animated */}
        <h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          {title}
        </h1>
        
        {/* Description - animated */}
        <p 
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 px-2 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          {description}
        </p>
        
        {/* CTA Buttons - animated */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 gap-2 group"
          >
            <Play className="w-4 md:w-5 h-4 md:h-5" fill="currentColor" />
            შოურილის ნახვა
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto border-primary/50 text-foreground hover:bg-primary/10 px-6 md:px-8 gap-2 group"
          >
            კონტაქტი
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        {/* Stats - animated */}
        <div 
          className="grid grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary/20 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
            <div className="text-xs md:text-sm text-muted-foreground">პროექტი</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
            <div className="text-xs md:text-sm text-muted-foreground">ბრენდი</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">10+</div>
            <div className="text-xs md:text-sm text-muted-foreground">წლის გამოცდილება</div>
          </div>
        </div>
      </div>
    </section>
  );
}
