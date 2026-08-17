import BrandLogo from '@/components/BrandLogo'
import CategorySection2 from '@/components/catagory2'
import TestimonialSection from '@/components/clientsSay'
import DiscountBanners2 from '@/components/DiscountPoster22'
import HeroSection from '@/components/heroSection'
import BrandLogo2 from '@/components/Logo2'
import ProductSlider from '@/components/Productcard/Rawdealcard'
import RawSpcialOffersPage from '@/components/rowproduct'
import Services from '@/components/services2'
import TrendingProductsTabs from '@/components/tabproduct2'
import GallerySlider from '@/components/ui/GallerySlider'
import React from 'react'

function page() {
  return (
    <>
    <HeroSection/>
    <Services/>
    <TrendingProductsTabs/>
    <RawSpcialOffersPage/>
  
    <CategorySection2/>
    <ProductSlider/>
    <BrandLogo2/>
    <TestimonialSection/>
    <GallerySlider/>
    
    </>
  )
}

export default page