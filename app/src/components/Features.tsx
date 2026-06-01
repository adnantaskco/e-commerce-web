"use client";

import Timer1 from "@/components/ui/timer";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaEye,
} from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "./context/CartContext";

type item = {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
  discount: number;
  hasOffer: boolean;
  
};

const products: item[] = [
  {
    id: 41,
    name: "Floral Pointelle Smoocked Crop Top",
    brand: "StyleHub",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/41-large_default/floral-pointelle-smocked-crop-top-in-whitecap.jpg",
    price: 27,
    oldPrice: 30,
    rating: 4,
    discount: -10,
    hasOffer: false,
  },
  {
    id: 42,
    name: "textured Top With Cuffed Sleeves",
    brand: "FashionEra",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/140-medium_default/textured-top-with-cuffed-sleeves.jpg",
    price: 18,
    oldPrice: 22,
    rating: 5,
    discount: -15,
    hasOffer: true,
  },
  {
    id: 43,
    name: "Peach Coloured Ruched Tie-Front Crop",
    brand: "UrbanWear",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/122-medium_default/peach-coloured-ruched-tie-front-crop-top.jpg",
    price: 35,
    oldPrice: 40,
    rating: 4,
    discount: -12,
    hasOffer: false,
  },
  {
    id: 44,
    name: "Women Pink Cotton Long Sleeve Crop Top",
    brand: "TrendLine",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/52-medium_default/women-pink-cotton-long-sleeve-crop-top.jpg",
    price: 45,
    oldPrice: 55,
    rating: 5,
    discount: -20,
    hasOffer: true,
  },
  {
    id: 45,
    name: "DressBary Women's Printed Ploy Crop Top",
    brand: "ModernFit",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/132-large_default/dressberry-women-s-printed-poly-crop-top.jpg",
    price: 60,
    oldPrice: 75,
    rating: 4,
    discount: -18,
    hasOffer: true,
  },
  {
    id: 46,
    name: "long Sleeve Neck Top",
    brand: "EliteStyle",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/56-medium_default/womens-self-design-long-sleeve-neck-top.jpg",
    price: 50,
    oldPrice: 65,
    rating: 5,
    discount: -25,
    hasOffer: true,
  },
  {
    id: 47,
    name: "Summer Shirt",
    brand: "CoolWear",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/4/7/47-home_default.jpg",
    price: 80,
    oldPrice: 95,
    rating: 4,
    discount: -15,
    hasOffer: true,
  },
  {
    id: 48,
    name: "Woman's Jacket",
    brand: "StyleNova",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/4/9/49-home_default.jpg",
    price: 120,
    oldPrice: 150,
    rating: 5,
    discount: -30,
    hasOffer: false,
  },
  {
    id: 49,
    name: "Woman's Jacket",
    brand: "WinterEdge",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/5/1/51-home_default.jpg",
    price: 90,
    oldPrice: 110,
    rating: 4,
    discount: -22,
    hasOffer: true,
  },
  {
    id: 50,
    name: "Women's Dress",
    brand: "ChicStyle",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/5/3/53-home_default.jpg",
    price: 70,
    oldPrice: 85,
    rating: 5,
    discount: -17,
    hasOffer: true,
  },
];

export default function FeatureProduct() {
     // ✅ CART
      const { addToCart } = useCart();
  const [hovered, setHovered] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-16 bg-white relative overflow-hidden">
    
          {/* TITLE */}
          <div className="text-center mb-14">
            <p className="text-primary uppercase tracking-[4px] text-sm font-semibold">
              FEATURES
            </p>
    
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              Feature Products
            </h1>
    
            <div className="flex justify-center mt-5">
              <div className="w-28 h-[3px] bg-primary rounded-full"></div>
            </div>
          </div>
    
          {/* LEFT */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-primary hover:text-white duration-300"
          >
            <ChevronLeft size={24} />
          </button>
    
          {/* RIGHT */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-primary hover:text-white duration-300"
          >
            <ChevronRight size={24} />
          </button>
    
          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-5"
          >
            {products.map((item) => {
              const isHover = hovered === item.id;
    
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="min-w-[260px] sm:min-w-70 lg:min-w-75 bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex-shrink-0 group"
                >
    
                  {/* IMAGE */}
                  <div className="relative bg-gray-100 h-[300px] flex items-center justify-center">
    
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={260}
                      height={300}
                      className="object-contain"
                    />
    
                    {/* DISCOUNT */}
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md">
                      {item.discount}%
                    </div>
    
                    {/* TIMER */}
                    {/* {product.hasOffer && (
                    <div
                      className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                        isHover ? "opacity-0 translate-y-5" : "opacity-100 translate-y-0"
                      }`}
                    >
                      <div className="backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                        <Timer1 />
                      </div>
                    </div>
                    )} */}
    
                    {/* ICONS */}
                    {/* ICONS */}
                    <div
                      className={`
                        absolute top-5 right-4 flex flex-col gap-3 z-10
                        transition-all duration-500

                        /* MOBILE = ALWAYS SHOW */
                        opacity-100 translate-x-0

                        /* MD & LG = HOVER EFFECT */
                        md:opacity-0 md:translate-x-14
                        md:group-hover:opacity-100
                        md:group-hover:translate-x-0
                      `}
                    >
                      <button className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition">
                        <FaHeart />
                      </button>


                  <button
  onClick={() =>
    addToCart({
      id: item.id,
      image: item.image,
      brand: item.brand,
      name: item.name,
      price: item.price,
    })
  }
  className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition"
>
  <FaShoppingCart />
                  </button>

                      <button className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition">
                        <FaEye />
                      </button>
                    </div>
                    </div>
    
                  {/* CONTENT (EcoShop STYLE) */}
                  <div className="p-4">
    
                    {/* NAME */}
                    <p className="text-sm text-gray-500">EcoShop</p>
    
                    <h2 className="text-base font-semibold text-gray-800 mt-1">
                      {item.name}
                    </h2>
    
                    {/* STARS */}
                    <div className="flex items-center gap-1 mt-2 text-yellow-400 text-sm">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      <span className="text-gray-500 text-xs ml-1">
                        ({item.rating})
                      </span>
                    </div>
    
                    {/* PRICE */}
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-gray-400 line-through text-sm">
                        ${item.oldPrice}
                      </span>
    
                      <span className="text-red-500 font-bold text-lg">
                        ${item.price}
                      </span>
                    </div>
    
                  </div>
    
                </div>
              );
            })}
          </div>
        </section>
  );
}