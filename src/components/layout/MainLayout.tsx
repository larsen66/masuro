"use client";

import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { DottedPattern } from "@/components/DottedPattern";
import { CustomCursor } from "@/components/CustomCursor";

interface MainLayoutProps {
  children: React.ReactNode;
  activeNav?: string;
}

const CURSOR_STORAGE_KEY = "masuro_selected_cursor";

export function MainLayout({ children, activeNav = "/" }: MainLayoutProps) {
  const [cursorIcon, setCursorIcon] = useState<string>("/cursors/selection.svg");
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Убеждаемся, что компонент монтирован только на клиенте
  useEffect(() => {
    setIsMounted(true);
    
    // Восстанавливаем курсор из localStorage при загрузке
    const savedCursor = localStorage.getItem(CURSOR_STORAGE_KEY);
    if (savedCursor) {
      setCursorIcon(savedCursor);
    }

    // Проверяем размер экрана
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Сохраняем курсор в localStorage при изменении
  const handleCursorChange = (iconPath: string) => {
    setCursorIcon(iconPath);
    if (isMounted) {
      localStorage.setItem(CURSOR_STORAGE_KEY, iconPath);
    }
  };

  return (
    <div 
      className={`min-h-screen bg-background relative overflow-x-hidden ${isMounted && !isMobile ? "cursor-none" : ""}`}
      suppressHydrationWarning
    >
      {/* Custom cursor - only on desktop */}
      {isMounted && !isMobile && <CustomCursor cursorIcon={cursorIcon} />}
      
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
    </div>
  );
}
