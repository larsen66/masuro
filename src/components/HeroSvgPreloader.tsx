"use client";

import { useEffect } from "react";

export function HeroSvgPreloader() {
  useEffect(() => {
    // Preload critical hero SVG
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/hero-1.svg";
    link.fetchPriority = "high";
    document.head.appendChild(link);

    return () => {
      // Cleanup on unmount
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return null;
}


