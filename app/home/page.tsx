"use client";

import useSWR from "swr";

import HeroSection from "@/components/heroSection";
import Dressandjumpsuits from "@/components/Productcard/Dresscard";
import ProductSlider from "@/components/Productcard/dealcard";
import DiscountBanners from "@/components/DiscountPoster";

import CategorySection from "@/components/scrollsection";
import TestimonialSection from "@/components/clientsSay";
import GallerySlider from "@/components/ui/GallerySlider";
import BrandLogo from "@/components/BrandLogo";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home1() {
  const { data, error, isLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/home-sections",
    fetcher
  );

  // Updated Home Page Skeleton Loader matching actual layout structure
  if (isLoading) {
    return (
      <div className="space-y-12 py-6">
        {/* 1. Hero Section Skeleton */}
        <div className="container mx-auto px-4 md:px-16">
          <Skeleton className="w-full h-[250px] sm:h-[350px] md:h-[480px] rounded-2xl" />
        </div>

        {/* 2. Category Scroll Section Skeleton */}
        <div className="container mx-auto px-4 md:px-16">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-44 rounded-lg" />
            <Skeleton className="h-5 w-20 rounded-md" />
          </div>
          <div className="flex gap-4 overflow-hidden py-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[42%] sm:w-[28%] md:w-[20%] lg:w-[15%] bg-white rounded-2xl p-4 border border-gray-100 flex flex-col items-center gap-3"
              >
                <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Product Collection Grid Skeleton */}
        <div className="container mx-auto px-4 md:px-16">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-5 w-24 rounded-md" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-3 border border-gray-100 space-y-3">
                <Skeleton className="w-full h-44 rounded-xl" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Discount / Promotion Banner Skeleton */}
        <div className="container mx-auto px-4 md:px-16">
          <Skeleton className="w-full h-36 sm:h-48 md:h-64 rounded-2xl" />
        </div>

        {/* 5. Brand Logos Skeleton */}
        <div className="container mx-auto px-4 md:px-16">
          <div className="flex justify-between items-center gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-32 rounded-xl shrink-0" />
            ))}
          </div>
        </div>

        {/* 6. Testimonial Section Skeleton */}
        <div className="container mx-auto px-4 md:px-16">
          <div className="flex justify-center mb-6">
            <Skeleton className="h-8 w-56 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6 border border-gray-100 rounded-2xl space-y-4 bg-white">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded-md" />
                    <Skeleton className="h-3 w-16 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* 7. Gallery Slider Skeleton */}
        <div className="container mx-auto px-4 md:px-16">
          <div className="flex justify-between gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-1/5 rounded-xl shrink-0" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div className="text-center py-20 text-red-500 font-medium">Failed to load content.</div>;

  const sections = data?.data ?? [];

  return (
    <>
      <HeroSection />
      <CategorySection />

      {sections.map((section: any) => {
        switch (section.type) {
          case "product_collection":
            if (section.design_style === "grid") {
              return (
                <Dressandjumpsuits
                  key={section.uid}
                  title={section.name}
                  products={section.products}
                />
              );
            }

            if (section.design_style === "row") {
              return (
                <ProductSlider
                  key={section.uid}
                  title={section.name}
                  products={section.products}
                />
              );
            }

            return null;

          case "brand":
            return (
              <BrandLogo
                key={section.uid || section.name}
                brands={section.brands}
              />
            );

          case "promotion_banner":
            return (
              <DiscountBanners
                key={section.uid || section.name}
                banners={section.banners || []}
              />
            );

          default:
            return null;
        }
      })}

      <TestimonialSection />
      <GallerySlider />
    </>
  );
}