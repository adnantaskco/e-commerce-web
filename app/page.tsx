"use client"
import GallerySlider from "@/components/ui/GallerySlider";
import DiscountBanners from "./src/components/DiscountPoster";
import DiscountBanners2 from "./src/components/DiscountPoster2";
import Footer from "./src/components/footer";
import HeroCarousel from "./src/components/heroSection";
import Navbar1 from "./src/components/navbar1";
import Services from "./src/components/services";
import Navbar2 from "./src/components/navbar2";
import TestimonialSection from "./src/components/clientsSay";
import { TabsDemo } from "./src/components/TabProduct";
import BrandLogo from "./src/components/BrandLogo";
import ProductGrid from "./src/components/deal";
import CategorySection from "./src/components/scrollsection";
import FeatureProduct from "./src/components/Features";



export default function Home() {
  return (
    <> 
    <Navbar1></Navbar1>
    <Navbar2></Navbar2>
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
