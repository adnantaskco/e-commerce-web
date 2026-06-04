
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
    <div className="container mx-auto px-4 md:px-10 lg:px-20">
    <HeroSection></HeroSection>
    <Services></Services>
    <div className="flex flex-col md:flex-row gap-4">
  
  {/* Sidebar */}
  <div className=" hidden md:block lg:block md:w-64 w-full">
    <CategorySidebar />
  </div>

  {/* Main Content */}
  <div className="flex-1">
    <TabsDemo />
  </div>

</div>
    
   <DiscountBanners/>
    <CategorySection/>
   <ProductSlider/>
    

    <DiscountBanners2/>
    <FeatureProduct/>
    <TestimonialSection/>
    <ProductFeatures/>
    <GallerySlider/>
    <BrandLogo/>
    </div>
   
    </>
  )
}

export default Home1;