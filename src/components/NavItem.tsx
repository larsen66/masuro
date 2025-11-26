"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
}

export function NavItem({ label, href, isActive = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-200",
        "rounded-full",
        isActive
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
          : "text-foreground/70 hover:text-foreground hover:bg-primary/10"
      )}
    >
      {label}
    </Link>
  );
}
