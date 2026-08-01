"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { DottedPattern } from "@/components/DottedPattern";
import { CustomCursor } from "@/components/CustomCursor";
import { useLocale } from "@/i18n/LocaleProvider";
import { translate } from "@/i18n/messages";

interface MainLayoutProps {
  children: React.ReactNode;
  activeNav?: string;
}

const CURSOR_STORAGE_KEY = "masuro_selected_cursor";

function subscribeToViewport(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

function getIsDesktop() {
  return window.innerWidth >= 768;
}

export function MainLayout({ children, activeNav = "/" }: MainLayoutProps) {
  const { locale } = useLocale();
  const [cursorIcon, setCursorIcon] = useState<string>("/cursors/selection.svg");
  const isDesktop = useSyncExternalStore(
    subscribeToViewport,
    getIsDesktop,
    () => false
  );

  useEffect(() => {
    const savedCursor = localStorage.getItem(CURSOR_STORAGE_KEY);
    if (!savedCursor) return;

    const frameId = requestAnimationFrame(() => setCursorIcon(savedCursor));
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleCursorChange = (iconPath: string) => {
    setCursorIcon(iconPath);
    localStorage.setItem(CURSOR_STORAGE_KEY, iconPath);
  };

  return (
    <div 
      className={`min-h-screen bg-background relative overflow-x-hidden ${isDesktop ? "cursor-none" : ""}`}
      suppressHydrationWarning
    >
      {/* Custom cursor - only on desktop */}
      {isDesktop && <CustomCursor cursorIcon={cursorIcon} />}
      
      {/* Grid background pattern */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none bg-grid-pattern"
        suppressHydrationWarning
      />
      
      {/* Dotted pattern on the right - hidden on mobile */}
      <div className="hidden md:block">
        <DottedPattern />
      </div>
      
      {/* Sticky Header */}
      <Header activeNav={activeNav} />
      
      {/* Floating Sidebar - hidden on mobile via component */}
      <Sidebar onToolChange={handleCursorChange} initialCursor={cursorIcon} />
      
      {/* Main content - less padding on mobile */}
      <main className="relative z-10 pt-16 md:pt-20 px-4 md:pl-20 md:pr-6 pb-6">
        {children}
      </main>

      <footer className="relative z-10 px-4 md:pl-20 md:pr-6 pb-8 pt-2">
        <p className="text-xs text-muted-foreground/80">
          {translate(locale, "credit.siteBy")}{" "}
          <a
            href="https://daliagents.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            Dali Agents
          </a>
          {" · daliagents.com"}
        </p>
      </footer>
    </div>
  );
}
