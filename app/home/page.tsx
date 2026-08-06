"use client";

import useSWR from "swr";

import HeroSection from "@/components/heroSection";
import Dressandjumpsuits from "@/components/Productcard/Dresscard";
import ProductSlider from "@/components/Productcard/dealcard";
import DiscountBanners from "@/components/DiscountPoster";
import DiscountBanners2 from "@/components/DiscountPoster2";

import CategorySection from "@/components/scrollsection";
import TestimonialSection from "@/components/clientsSay";
import GallerySlider from "@/components/ui/GallerySlider";
import BrandLogo from "@/components/BrandLogo";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home1() {
  const { data, error, isLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/home-sections",
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

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