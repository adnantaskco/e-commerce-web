"use client"
import GallerySlider from "@/components/ui/GallerySlider";
import DiscountBanners from "./src/components/DiscountPoster";
import DiscountBanners2 from "./src/components/DiscountPoster2";
import Footer from "./src/components/footer";
import HeroCarousel from "./src/components/heroSection";
import Navbar1 from "./src/components/navbar1";
import Services from "./src/components/services";
import Navbar2 from "./src/components/navbar2";



export default function Home() {
  return (
    <> 
    <Navbar1></Navbar1>
    <Navbar2></Navbar2>
    <HeroCarousel></HeroCarousel>
    <Services/>
    <DiscountBanners/>
    <DiscountBanners2/>
    <GallerySlider/>
    
    <Footer></Footer>
    
    </>
  );
}
