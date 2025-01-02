'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export default function Carousel({
  children,
  autoSlide = false,
  autoSlideInterval = 3000,
}: CarouselProps) {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? children.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === children.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideTimer = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button size="icon" variant="outline" onClick={prev} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={next} className="rounded-full">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 