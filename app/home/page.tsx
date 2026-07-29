
"use client"

import GallerySlider from "@/components/ui/GallerySlider";
import TestimonialSection from "../../components/clientsSay";
import ProductSlider from "../../components/Productcard/dealcard";
import DiscountBanners from "../../components/DiscountPoster";
import DiscountBanners2 from "../../components/DiscountPoster2";
import FeatureProduct from "../../components/Productcard/Featurescard";
import HeroSection from "@/components/heroSection";
import ProductCard1 from "../../components/Productcard/jacketcard";
import CategorySection from "../../components/scrollsection";
import Services from "../../components/services";
import { TabsDemo } from "../../components/TabProduct";
import BrandLogo from "../../components/BrandLogo";
import CategorySidebar from "../../components/Sidebar";

import TrendingProductsTabs from "../../components/tabproduct2";
import CategorySection2 from "@/components/catagory";
import Navbar from "@/components/Navbar5";



function Home1() {
  return (
    <>
    
    <HeroSection></HeroSection>
    {/* <Services></Services> */}
    {/* <TrendingProductsTabs></TrendingProductsTabs> */}
 
    <TabsDemo />
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