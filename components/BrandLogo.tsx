"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Brand = {
  id?: number | string;
  name?: string;
  image?: string;
  media_url?: string;
  logo?: string;
};

interface BrandLogoProps {
  title?: string;
  subtitle?: string;
  brands?: (Brand | string)[];
}

export default function BrandLogo({
  title,
  subtitle,
  brands = [],
}: BrandLogoProps) {
  if (!brands || brands.length === 0) return null;

  return (
    <section className="md:py-20 py-8 bg-ring/10 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-20">
        {/* Dynamic Heading */}
        {(title || subtitle) && (
          <div className="text-center mb-14">
            {subtitle && (
              <span className="uppercase tracking-[5px] text-primary font-semibold">
                {subtitle}
              </span>
            )}

            {title && (
              <h2 className="text-3xl md:text-5xl text-text-primary font-bold sm:font-semibold mt-4">
                {title}
              </h2>
            )}

            <div className="w-28 h-1 bg-primary mx-auto rounded-full mt-5" />
          </div>
        )}

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
            {brands.map((brand, index) => {
              const imageUrl =
                typeof brand === "string"
                  ? brand
                  : brand?.media_url || brand?.image || brand?.logo || "";

              const brandName =
                typeof brand === "string"
                  ? `brand-${index}`
                  : brand?.name || `brand-${index}`;

              return (
                <CarouselItem
                  key={typeof brand === "object" && brand?.id ? brand.id : index}
                  className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="h-[120px] rounded-2xl bg-background border flex items-center justify-center p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 gap-5">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={brandName}
                        className="max-h-16 object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                      />
                    ) : (
                      <span className="text-sm font-medium text-gray-500">
                        {brandName}
                      </span>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}