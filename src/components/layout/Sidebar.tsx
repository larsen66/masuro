"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleProvider";
import type { MessageKey } from "@/i18n/messages";

interface ToolItem {
  id: string;
  labelKey: MessageKey;
  icon: string;
}

const tools: ToolItem[] = [
  { id: "selection", labelKey: "tool.selection", icon: "/cursors/selection.svg" },
  { id: "direct-selection", labelKey: "tool.directSelection", icon: "/cursors/direct-selection.svg" },
  { id: "pen", labelKey: "tool.pen", icon: "/cursors/pen.svg" },
  { id: "type", labelKey: "tool.type", icon: "/cursors/type.svg" },
  { id: "line", labelKey: "tool.line", icon: "/cursors/line.svg" },
  { id: "rectangle", labelKey: "tool.rectangle", icon: "/cursors/rectangle.svg" },
  { id: "brush", labelKey: "tool.brush", icon: "/cursors/brush.svg" },
  { id: "eraser", labelKey: "tool.eraser", icon: "/cursors/eraser.svg" },
  { id: "gradient", labelKey: "tool.gradient", icon: "/cursors/gradient.svg" },
  { id: "eyedropper", labelKey: "tool.eyedropper", icon: "/cursors/eyedropper.svg" },
  { id: "transform", labelKey: "tool.transform", icon: "/cursors/transform.svg" },
  { id: "scale", labelKey: "tool.scale", icon: "/cursors/scale.svg" },
  { id: "zoom", labelKey: "tool.zoom", icon: "/cursors/zoom.svg" },
  { id: "artboard", labelKey: "tool.artboard", icon: "/cursors/artboard.svg" },
];

interface SidebarProps {
  onToolChange?: (iconPath: string) => void;
  initialCursor?: string;
}

export function Sidebar({ onToolChange, initialCursor }: SidebarProps) {
  const { t } = useLocale();
  // Определяем активный инструмент на основе сохраненного курсора
  const getActiveToolFromCursor = (cursorPath: string): string => {
    const tool = tools.find(t => t.icon === cursorPath);
    return tool?.id || "selection";
  };

  const [selectedTool, setSelectedTool] = useState("selection");
  const activeTool = initialCursor
    ? getActiveToolFromCursor(initialCursor)
    : selectedTool;
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
    setSelectedTool(tool.id);
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
          title={t(tool.labelKey)}
          aria-label={t(tool.labelKey)}
        >
          <Image
            src={tool.icon}
            alt=""
            width={20}
            height={20}
            className="w-5 h-5"
            suppressHydrationWarning
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
