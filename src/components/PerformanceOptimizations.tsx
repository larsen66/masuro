"use client";

import { useEffect } from "react";

export function PerformanceOptimizations() {
  useEffect(() => {
    // Add preconnect links for external domains
    const preconnectSanity = document.createElement("link");
    preconnectSanity.rel = "preconnect";
    preconnectSanity.href = "https://cdn.sanity.io";
    preconnectSanity.crossOrigin = "anonymous";
    document.head.appendChild(preconnectSanity);

    const dnsPrefetchSanity = document.createElement("link");
    dnsPrefetchSanity.rel = "dns-prefetch";
    dnsPrefetchSanity.href = "https://cdn.sanity.io";
    document.head.appendChild(dnsPrefetchSanity);

    // Preload critical hero image
    const preloadHero = document.createElement("link");
    preloadHero.rel = "preload";
    preloadHero.href = "/hero-1.svg";
    preloadHero.as = "image";
    preloadHero.setAttribute("fetchPriority", "high");
    document.head.appendChild(preloadHero);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(preconnectSanity);
      document.head.removeChild(dnsPrefetchSanity);
      document.head.removeChild(preloadHero);
    };
  }, []);

  return null;
}

