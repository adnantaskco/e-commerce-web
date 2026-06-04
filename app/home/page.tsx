
"use client"

import GallerySlider from "@/components/ui/GallerySlider";
import TestimonialSection from "../src/components/clientsSay";
import ProductSlider from "../src/components/deal";
import DiscountBanners from "../src/components/DiscountPoster";
import DiscountBanners2 from "../src/components/DiscountPoster2";
import FeatureProduct from "../src/components/Features";
import { HeroSection } from "../src/components/heroSection";
import ProductCard1 from "../src/components/jacket";
import CategorySection from "../src/components/scrollsection";
import Services from "../src/components/services";
import { TabsDemo } from "../src/components/TabProduct";
import BrandLogo from "../src/components/BrandLogo";
import CategorySidebar from "../src/components/Sidebar";
import ProductFeatures from "@/components/animata/hero/product-features";



function Home1() {
  return (
    <>
    <HeroSection></HeroSection>
    <Services></Services>
    {/* <div className="flex flex-col container mx-auto px-6 md:px-10 lg:px-20 md:flex-row gap-4"> */}
  
 
 


    <TabsDemo />


{/* </div> */}
    
   <DiscountBanners/>
    <CategorySection/>
   <ProductSlider/>
    

    <DiscountBanners2/>
    <FeatureProduct/>
    <TestimonialSection/>
    
    <GallerySlider/>
    <BrandLogo/>
   
    </>
  )
}

export default Home1;