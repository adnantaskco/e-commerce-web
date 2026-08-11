"use client";

import * as React from "react";
import useSWR from "swr";
import Autoplay from "embla-carousel-autoplay";

import fetcher from "@/lib/herofetcher";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

type ImageItem = {
  uid: string;
  status: number;
  promotion_type: string;
  media_url: string;
};

type BannerResponse = {
  sliders: ImageItem[];
};

export default function HeroSection() {
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 3500,
        stopOnInteraction: true,
      }),
    []
  );

  const { data, error, isLoading } = useSWR<BannerResponse>(
    "https://demo.app.taskcocommerce.com/api/v1/promotion-banners?page_name=home&theme_id=1",
    fetcher
  );

  // Skeleton Loader State
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 md:px-16 py-4">
        <div className="relative w-full h-[200px] sm:h-[300px] md:h-[420px] lg:h-[480px]">
          <Skeleton className="w-full h-full rounded-2xl shadow-sm" />
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <div className="h-[300px] md:h-[450px] flex items-center justify-center text-red-500">
        <p className="text-sm font-medium">Failed to load hero banner</p>
      </div>
    );
  }

  // Merge sliders
  const heroImages = [...data.sliders];

  return (
    <section className="container mx-auto px-4 md:px-16 py-4">
      <Carousel
        plugins={[plugin]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {heroImages.map((item) => (
            <CarouselItem key={item.uid}>
              <div className="relative w-full h-[200px] sm:h-[300px] md:h-[420px] lg:h-[480px] overflow-hidden rounded-2xl">
                <img
                  src={item.media_url}
                  alt="Hero Banner"
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 hidden md:flex" />
        <CarouselNext className="right-4 hidden md:flex" />
      </Carousel>
    </section>
  );
}