"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import img1 from "../components/image/3609477xg.png";
import img2 from "../components/image/9130.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroSection() {
  const plugin = React.useMemo(
    () => Autoplay({ delay: 3000, stopOnInteraction: true }),
    []
  );

  const slides = [{ image: img1 }, { image: img2 }];

  return (
    <section className="w-full relative">

      <Carousel plugins={[plugin]} className="w-full">

        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">

                {/* IMAGE */}
                <Image
                  src={slide.image}
                  alt={`slide-${index}`}
                  fill
                  priority={index === 0}
                  className="object-cover scale-105 sm:scale-100"
                />

               

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* NAV BUTTONS (hidden on mobile for clean UI) */}
        <div className="hidden sm:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>

      </Carousel>
    </section>
  );
}