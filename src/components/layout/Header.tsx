"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { NavItem } from "@/components/NavItem";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "სულ", href: "/all" },
  { label: "ლოკალიზაცია", href: "/" },
  { label: "2D ანიმაცია", href: "/animation" },
  { label: "გრაფიკა", href: "/graphics" },
];

interface HeaderProps {
  activeNav?: string;
}

export function Header({ activeNav = "/" }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "grid grid-cols-3 items-center px-4 md:px-6 py-3",
          "bg-background/90 backdrop-blur-md border-b border-primary/20",
          "transition-transform duration-300 ease-in-out",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {/* Left: Logo */}
        <div className="flex items-center justify-start">
          <Logo />
        </div>
        
        {/* Center: Navigation - desktop */}
        <nav className="hidden md:flex items-center justify-center gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              label={item.label}
              href={item.href}
              isActive={activeNav === item.href}
            />
          ))}
        </nav>
        
        {/* Right: Language switcher and mobile menu */}
        <div className="flex items-center justify-end gap-3">
          <LanguageSwitcher />
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          "bg-background/95 backdrop-blur-lg",
          "transition-all duration-300 ease-in-out",
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
        style={{ top: "60px" }}
      >
        <nav className="flex flex-col items-center justify-center gap-2 p-6 pt-8">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "w-full text-center py-4 px-6 rounded-xl text-lg font-medium",
                "transition-all duration-200",
                "animate-fade-in-up",
                activeNav === item.href
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-foreground hover:bg-primary/20"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
