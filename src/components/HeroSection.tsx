"use client";

import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface HeroSectionProps {
  badge?: string;
  title?: ReactNode;
  description?: string;
}

export function HeroSection({ 
  badge = "ლოკალიზაცია • დუბლაჟი • გრაფიკა",
  title = <>პროფესიონალური<span className="text-primary"> ვიდეო </span>ლოკალიზაცია</>,
  description = "ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია — ყველაფერი ერთ სივრცეში."
}: HeroSectionProps) {
  return (
    <section className="relative py-8 md:py-16 px-4 mb-4 md:mb-8">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge - animated */}
        <div 
          className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/20 border border-primary/30 mb-4 md:mb-6 animate-fade-in-down"
          style={{ animationDelay: "0ms" }}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs md:text-sm text-primary font-medium">{badge}</span>
        </div>
        
        {/* Main heading - animated */}
        <h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          {title}
        </h1>
        
        {/* Description - animated */}
        <p 
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 px-2 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          {description}
        </p>
        
        {/* CTA Buttons - animated */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 gap-2 group"
          >
            <Play className="w-4 md:w-5 h-4 md:h-5" fill="currentColor" />
            შოურილის ნახვა
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto border-primary/50 text-foreground hover:bg-primary/10 px-6 md:px-8 gap-2 group"
          >
            კონტაქტი
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        {/* Stats - animated */}
        <div 
          className="grid grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary/20 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
            <div className="text-xs md:text-sm text-muted-foreground">პროექტი</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
            <div className="text-xs md:text-sm text-muted-foreground">ბრენდი</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">10+</div>
            <div className="text-xs md:text-sm text-muted-foreground">წლის გამოცდილება</div>
          </div>
        </div>
      </div>
    </section>
  );
}
