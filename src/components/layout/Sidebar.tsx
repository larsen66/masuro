"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ToolItem {
  id: string;
  label: string;
  icon: string;
}

const tools: ToolItem[] = [
  { id: "selection", label: "Selection Tool", icon: "/cursors/selection.svg" },
  { id: "direct-selection", label: "Direct Selection", icon: "/cursors/direct-selection.svg" },
  { id: "pen", label: "Pen Tool", icon: "/cursors/pen.svg" },
  { id: "type", label: "Type Tool", icon: "/cursors/type.svg" },
  { id: "line", label: "Line Segment Tool", icon: "/cursors/line.svg" },
  { id: "rectangle", label: "Rectangle Tool", icon: "/cursors/rectangle.svg" },
  { id: "brush", label: "Brush Tool", icon: "/cursors/brush.svg" },
  { id: "eraser", label: "Eraser Tool", icon: "/cursors/eraser.svg" },
  { id: "gradient", label: "Gradient Tool", icon: "/cursors/gradient.svg" },
  { id: "eyedropper", label: "Eyedropper Tool", icon: "/cursors/eyedropper.svg" },
  { id: "transform", label: "Free Transform", icon: "/cursors/transform.svg" },
  { id: "scale", label: "Scale Tool", icon: "/cursors/scale.svg" },
  { id: "zoom", label: "Zoom Tool", icon: "/cursors/zoom.svg" },
  { id: "artboard", label: "Artboard Tool", icon: "/cursors/artboard.svg" },
];

interface SidebarProps {
  onToolChange?: (iconPath: string) => void;
  initialCursor?: string;
}

const CURSOR_STORAGE_KEY = "masuro_selected_cursor";

export function Sidebar({ onToolChange, initialCursor }: SidebarProps) {
  // Определяем активный инструмент на основе сохраненного курсора
  const getActiveToolFromCursor = (cursorPath: string): string => {
    const tool = tools.find(t => t.icon === cursorPath);
    return tool?.id || "selection";
  };

  const [activeTool, setActiveTool] = useState<string>(() => {
    if (initialCursor) {
      return getActiveToolFromCursor(initialCursor);
    }
    // Пытаемся восстановить из localStorage
    if (typeof window !== "undefined") {
      const savedCursor = localStorage.getItem(CURSOR_STORAGE_KEY);
      if (savedCursor) {
        return getActiveToolFromCursor(savedCursor);
      }
    }
    return "selection";
  });

  // Синхронизируем активный инструмент при изменении initialCursor
  useEffect(() => {
    if (initialCursor) {
      const toolId = getActiveToolFromCursor(initialCursor);
      setActiveTool(toolId);
    }
  }, [initialCursor]); // getActiveToolFromCursor стабильна, так как tools не изменяется
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleToolClick = (tool: ToolItem) => {
    setActiveTool(tool.id);
    onToolChange?.(tool.icon);
  };

  return (
    <aside 
      className={cn(
        // Hidden on mobile, visible on desktop
        "hidden md:flex",
        "fixed left-4 top-1/2 -translate-y-1/2 z-40",
        "w-12 py-3",
        "bg-sidebar/80 backdrop-blur-md",
        "border border-primary/30 rounded-xl",
        "shadow-xl shadow-black/20",
        "flex-col items-center gap-0.5",
        "transition-all duration-300 ease-in-out",
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
      )}
    >
      {tools.map((tool, index) => (
        <button
          key={tool.id}
          onClick={() => handleToolClick(tool)}
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded",
            "transition-all duration-200",
            activeTool === tool.id
              ? "bg-primary/20 ring-1 ring-primary/50"
              : "hover:bg-primary/10",
            index === 0 && "mb-1"
          )}
          title={tool.label}
        >
          <Image
            src={tool.icon}
            alt={tool.label}
            width={20}
            height={20}
            className="w-5 h-5"
            style={{
              filter: activeTool === tool.id 
                ? "brightness(0) saturate(100%) invert(18%) sepia(82%) saturate(2847%) hue-rotate(322deg) brightness(89%) contrast(97%)" 
                : "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(70%) contrast(100%)"
            }}
          />
        </button>
      ))}
    </aside>
  );
}
