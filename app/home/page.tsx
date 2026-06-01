
"use client"

import GallerySlider from "@/components/ui/GallerySlider";
import TestimonialSection from "../src/components/clientsSay";
import ProductSlider from "../src/components/deal";
import DiscountBanners from "../src/components/DiscountPoster";
import DiscountBanners2 from "../src/components/DiscountPoster2";
import FeatureProduct from "../src/components/Features";
import HeroCarousel from "../src/components/heroSection";
import ProductCard1 from "../src/components/jacket";
import CategorySection from "../src/components/scrollsection";
import Services from "../src/components/services";
import { TabsDemo } from "../src/components/TabProduct";
import BrandLogo from "../src/components/BrandLogo";
import CategorySidebar from "../src/components/Sidebar";



function Home1() {
  return (
    <>
    <HeroCarousel/>
    <Services></Services>
    <div className="flex flex-col md:flex-row gap-4">
  
  {/* Sidebar */}
  <div className="md:w-64 w-full">
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
    <GallerySlider/>
    <BrandLogo/>
   
    </>
  )
}

export default Home1;