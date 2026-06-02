"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import img1 from "../components/image/3609477xg.png";
import img2 from "../components/image/lj.png";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroSection() {
  const plugin = React.useMemo(
    () => Autoplay({ delay: 2000, stopOnInteraction: true }),
    []
  );

  const slides = [
    { image: img1 },
    { image: img2 },
  ];

  return (
    <Carousel
      plugins={[plugin]}
      className="w-full  mx-auto"
      onMouseEnter={plugin.stop}
      onMouseLeave={plugin.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={slide.image.src}
                  alt={`slide-${index}`}
                  className="w-full h-full object-cover"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}