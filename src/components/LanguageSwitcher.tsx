"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "RU", label: "Русский" },
  { code: "EN", label: "English" },
  { code: "GE", label: "ქართული" },
];

export function LanguageSwitcher() {
  const [activeLanguage, setActiveLanguage] = useState("GE");

  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setActiveLanguage(lang.code)}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
            activeLanguage === lang.code
              ? "bg-primary text-primary-foreground"
              : "text-foreground/70 hover:text-foreground hover:bg-primary/10"
          )}
          title={lang.label}
        >
          {lang.code}
        </button>
      ))}
    </div>
  );
}




