"use client";

import React from "react";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter ";
import PriceFilter from "./PriceFilter";

import SizeFilter from "./SizeFilter";
import RatingFilter from "./RatingFilter";
import OfferFilter from "./OfferFilter";



export default function Sidebar() {
  return (
    <aside className="w-full max-w-[220px] bg-white border-r p-4 space-y-6 ">
      <CategoryFilter />
      <BrandFilter />
      <PriceFilter />
    
     
   
      <OfferFilter />
    </aside>
    
  );
}