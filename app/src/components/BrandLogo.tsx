"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const brands = [
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/1.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/2.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/3.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/4.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/5.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/6.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/7.jpg",
];

export default function BrandLogo() {
  return (
    <section className="py-20 bg-black/5 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-20">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-[5px] text-primary font-semibold">
            Trusted Partners
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Our Brand Partners
          </h2>

          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-5" />
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {brands.map((brand, index) => (
              <CarouselItem
                key={index}
                className="
                  basis-1/2
                  sm:basis-1/3
                  md:basis-1/4
                  lg:basis-1/5
                "
              >
                <div
                  className="
                    h-[120px]
                    rounded-2xl
                    bg-white
                    border
                    flex
                    items-center
                    justify-center
                    p-6
                    transition-all
                    duration-300
                    hover:shadow-xl
                    hover:scale-105
                  "
                >
                  <img
                    src={brand}
                    alt={`brand-${index}`}
                    className="
                      max-h-16
                      object-contain
                      grayscale
                      opacity-70
                      transition-all
                      duration-300
                      hover:grayscale-0
                      hover:opacity-100
                    "
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

      </div>
    </section>
  );
}