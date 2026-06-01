"use client"
import GallerySlider from "@/components/ui/GallerySlider";
import DiscountBanners from "./src/components/DiscountPoster";
import DiscountBanners2 from "./src/components/DiscountPoster2";
import Footer from "./src/components/footer";
import HeroCarousel from "./src/components/heroSection";

import Services from "./src/components/services";

import TestimonialSection from "./src/components/clientsSay";
import { TabsDemo } from "./src/components/TabProduct";
import BrandLogo from "./src/components/BrandLogo";
import ProductGrid from "./src/components/deal";
import CategorySection from "./src/components/scrollsection";
import FeatureProduct from "./src/components/Features";
import { Drop } from "./src/components/navbar4";



export default function Home() {
  return (
    <> 
    
   
    <HeroCarousel></HeroCarousel>
    <Services/>
    <TabsDemo/>
    <DiscountBanners/>
    <CategorySection></CategorySection>
    <ProductGrid/>
    <DiscountBanners2/>
    <FeatureProduct></FeatureProduct>
    <TestimonialSection></TestimonialSection>
    <GallerySlider/>
    <BrandLogo></BrandLogo>
    <Footer></Footer>
    
    </>
  );
}
