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


const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());


export default function Home1() {

  const { data, error, isLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/home-sections",
    fetcher
  );


  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div>Error loading homepage</div>;
  }


  const sections = data?.data ?? [];


  return (
    <>

      {/* Static Hero */}
      <HeroSection />


      {/* Dynamic Home Sections */}
      {sections.map((section: any, index: number) => {

        return (
          <div key={section.uid || index}>


            {/* Product Collection */}
            {section.type === "product_collection" && (

              section.design_style === "grid" ? (

                <Dressandjumpsuits
                  title={section.name}
                  products={section.products || []}
                />

              ) : section.design_style === "row" ? (

                <ProductSlider
                  title={section.name}
                  products={section.products || []}
                />

              ) : null

            )}



            {/* Brand Section */}
            {section.type === "brand" && (

              <BrandLogo
                brands={section.brands || []}
              />

            )}



            {/* Promotion Banner */}
            {section.type === "promotion_banner" && (

              <DiscountBanners
                banners={section.banners || []}
              />

            )}




            {/* 
              Custom Sections Position Control

              API section index অনুযায়ী
              মাঝখানে component বসবে
            */}



            {/* After 1st API section */}
            {index === 0 && (
              <CategorySection />
            )}



            {/* After 3rd API section */}
            {/* {index === 2 && (
              <FeatureProduct />
            )} */}



            {/* After 5th API section */}
            {index === 4 && (
              <TestimonialSection />
            )}



            {/* After 6th API section */}
            {index === 5 && (
              <GallerySlider />
            )}



          </div>
        );

      })}


    </>
  );
}