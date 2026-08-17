"use client";

import React from "react";
import useSWR from "swr";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Brand {
  slug: string | null;
  name?: string;
  is_top: boolean;
  image_url: string | null;
  image_variants: any[];
}

interface BrandLogoProps {
  title?: string;
}

export default function BrandLogo2({
  title = "Shop By Brand",
}: BrandLogoProps) {
  // Fetch brand data dynamically
  const { data, error, isLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/brands",
    fetcher
  );

  // Filter out invalid items (e.g., items with null slug)
  const brands: Brand[] =
    data?.data?.filter((brand: Brand) => brand.slug !== null) || [];

  if (!isLoading && brands.length === 0) return null;

  // Helper function to format slug into readable title (e.g., "techpro" -> "Techpro")
  const formatBrandName = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section className="w-full py-12 bg-ring/10 border-t border-b">
      <div className="container mx-auto px-4 lg:px-20">
        
        {/* SECTION TITLE */}
        {title && (
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-800">
              {title}
            </h2>
            <div className="flex justify-center mt-3">
              <div className="h-[2px] w-16 bg-[#C2A38E]"></div>
            </div>
          </div>
        )}

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-24 rounded-lg bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-medium py-4">
            Failed to load brands.
          </div>
        ) : (
          /* BRAND CAROUSEL */
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2500,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {brands.map((brand, idx) => {
                const displayName =
                  brand.name || (brand.slug ? formatBrandName(brand.slug) : "Brand");

                return (
                  <CarouselItem
                    key={brand.slug || idx}
                    className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                  >
                    <Link
                      href={`/brand/${brand.slug}`}
                      className="h-24 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center justify-center p-4 transition-all duration-300 hover:shadow-md hover:border-slate-300 group"
                    >
                      {brand.image_url ? (
                        <img
                          src={brand.image_url}
                          alt={displayName}
                          className="max-h-12 w-auto object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-slate-700 text-center group-hover:text-black transition-colors line-clamp-1">
                          {displayName}
                        </span>
                      )}
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
}