"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface CustomCursorProps {
  cursorIcon: string | null;
}

export function CustomCursor({ cursorIcon }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Используем requestAnimationFrame для плавности
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!cursorIcon) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[99999]"
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        opacity: isVisible ? 1 : 0,
        willChange: "transform",
      }}
    >
      <Image
        src={cursorIcon}
        alt="Cursor"
        width={32}
        height={32}
        className="w-8 h-8"
        style={{
          filter: "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(70%) contrast(100%) drop-shadow(0 1px 3px rgba(0,0,0,0.6))"
        }}
        priority
        unoptimized
      />
    </div>
  );
}
