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

export function MainLayout({ children, activeNav = "/" }: MainLayoutProps) {
  const [cursorIcon, setCursorIcon] = useState<string>("/cursors/selection.svg");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div 
      className={`min-h-screen bg-background relative overflow-x-hidden ${!isMobile ? "cursor-none" : ""}`}
    >
      {/* Custom cursor - only on desktop */}
      {!isMobile && <CustomCursor cursorIcon={cursorIcon} />}
      
      {/* Grid background pattern */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(163, 25, 91, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163, 25, 91, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Dotted pattern on the right - hidden on mobile */}
      <div className="hidden md:block">
        <DottedPattern />
      </div>
      
      {/* Sticky Header */}
      <Header activeNav={activeNav} />
      
      {/* Floating Sidebar - hidden on mobile via component */}
      <Sidebar onToolChange={setCursorIcon} />
      
      {/* Main content - less padding on mobile */}
      <main className="relative z-10 pt-16 md:pt-20 px-4 md:pl-20 md:pr-6 pb-6">
        {children}
      </main>
    </div>
  );
}
