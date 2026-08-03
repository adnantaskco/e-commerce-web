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

type ImageItem = {
  uid: string;
  status: number;
  promotion_type: string;
  media_url: string;
};

type BannerResponse= {
sliders: ImageItem[];
banners: {
  home_top_right: ImageItem;
  home_middle_one: ImageItem;
  home_middle_two: ImageItem;

};

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

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-screen">
       <img src="https://media3.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aWVwMHk2YmNzM21vczk5ZW8yanNtNnlraW9uNG9rcmc3YXJxdHo4dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SMEGj0pb5eUKcnot8x/giphy.webp" alt="" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-[450px] flex items-center justify-center text-red-500">
        <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXF1bnZyODFhdDV4cHU0ZGFhNXg0bXRzNWNoaGo0YTdsdmE1ZXAyMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohs83bO7MKV9koZuE/giphy.webp" alt="" />
      </div>
    );
  }

  // Merge sliders + banners
  const heroImages = [
    ...data.sliders,
    data.banners.home_top_right,
    data.banners.home_middle_one,
    data.banners.home_middle_two,
  ];

  return (
    <section className="container mx-auto px-4 md:px-16">
      <Carousel
        plugins={[plugin]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {heroImages.map((item) => (
            <CarouselItem key={item.uid}>
              <div className="relative w-full ">
                <img
                  src={item.media_url}
                  alt="Hero Banner"
                  
                  className="object-cover"
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