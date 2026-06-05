"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import img1 from "../components/image/3609477xg.png";
import img2 from "../components/image/img2.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroSection() {
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 3500,
        stopOnInteraction: true,
      }),
    []
  );

  const slides = [
    { image: img1 },
    { image: img2 },
  ];

  return (
    <section className="w-full">
      <Carousel plugins={[plugin]} className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="w-full">
                <Image
                  src={slide.image}
                  alt={`slide-${index}`}
                  priority={index === 0}
                  className="w-full h-auto object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="hidden sm:block">
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </div>
      </Carousel>
    </section>
  );
}