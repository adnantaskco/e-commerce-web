"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaStar, FaEye
} from "react-icons/fa";

import { useCart } from "@/app/src/components/context/CartContext";

type item = {
  id: number;
  image: string;
  brand: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  discount?: number;
  hasOffer: boolean;
};
const products: item[] = [
  {
    id: 21,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/1/31-home_default.jpg",
    brand: "EcoShop",
    name: "Premium Running Sports Shoes",
    rating: 5,
    reviews: 22,
    price: 85,
    oldPrice: 100,
    discount: 15,
    hasOffer: true,
  },
  {
    id: 22,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/2/32-home_default.jpg",
    brand: "EcoShop",
    name: "Casual White Sneakers",
    rating: 4,
    reviews: 18,
    price: 60,
    hasOffer: false,
  },
  {
    id: 23,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/3/33-home_default.jpg",
    brand: "EcoShop",
    name: "Luxury Leather Formal Shoes",
    rating: 5,
    reviews: 30,
    price: 120,
    oldPrice: 140,
    discount: 14,
    hasOffer: true,
  },
  {
    id: 24,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/4/34-home_default.jpg",
    brand: "EcoShop",
    name: "Men's Black Loafers",
    rating: 4,
    reviews: 12,
    price: 75,
    hasOffer: false,
  },
  {
    id: 25,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/5/35-home_default.jpg",
    brand: "EcoShop",
    name: "Premium Hiking Outdoor Shoes",
    rating: 5,
    reviews: 16,
    price: 95,
    oldPrice: 110,
    discount: 13,
    hasOffer: true,
  },
  {
    id: 26,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/6/36-home_default.jpg",
    brand: "EcoShop",
    name: "Comfortable Slip-On Shoes",
    rating: 4,
    reviews: 10,
    price: 55,
    hasOffer: false,
  },
  {
    id: 27,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/7/37-home_default.jpg",
    brand: "EcoShop",
    name: "Stylish High Heel Sandals",
    rating: 5,
    reviews: 25,
    price: 70,
    oldPrice: 85,
    discount: 18,
    hasOffer: true,
  },
  {
    id: 28,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/8/38-home_default.jpg",
    brand: "EcoShop",
    name: "Sports Training Sneakers",
    rating: 4,
    reviews: 14,
    price: 65,
    hasOffer: false,
  },
  {
    id: 29,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/9/39-home_default.jpg",
    brand: "EcoShop",
    name: "Premium Leather Boots",
    rating: 5,
    reviews: 19,
    price: 140,
    oldPrice: 160,
    discount: 12,
    hasOffer: true,
  },
  {
    id: 30,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/4/0/40-home_default.jpg",
    brand: "EcoShop",
    name: "Casual Flip Flops Summer Wear",
    rating: 4,
    reviews: 8,
    price: 25,
    hasOffer: false,
  },
];
 

const Sheos = () => {
   const [hovered, setHovered] = useState<number | null>(null);
   // ✅ CART
  const { addToCart } = useCart();
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-6 bg-white">
    
         
    
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
    
            {products.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className="
                  bg-white rounded-xl overflow-hidden
                  border border-gray-100
                  hover:shadow-xl
                  transition-all duration-500
                  hover:-translate-y-2
                  group
                "
              >
    
                <div className="relative bg-gray-100 h-[300px] flex items-center justify-center">
    
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    width={260}
                    height={300}
                    className="object-contain"
                  />
    
                  {item.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md">
                      {item.discount}%
                    </div>
                  )}
    
                  <div
                    className="
                      absolute top-5 right-4 flex flex-col gap-3 z-10
                      transition-all duration-500
    
                      opacity-100 translate-x-0
    
                      md:opacity-0 md:translate-x-14
                      md:group-hover:opacity-100
                      md:group-hover:translate-x-0
                    "
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
    
                <div className="p-4">
    
                  <p className="text-sm text-gray-500">
                    {item.brand}
                  </p>
    
                  <h2 className="text-base font-semibold text-gray-800 mt-1">
                    {item.name}
                  </h2>
    
                  <div className="flex items-center gap-1 mt-2 text-yellow-400 text-sm">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
    
                    <span className="text-gray-500 text-xs ml-1">
                      ({item.reviews})
                    </span>
                  </div>
    
                  <div className="flex items-center gap-3 mt-3">
    
                    {item.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        ${item.oldPrice}
                      </span>
    
                    )}
    
                    <span className="text-red-500 font-bold text-lg">
                      ${item.price}
                    </span>
                  </div>
    
                </div>
              </div>
            ))}
          </div>
        </section>
  );
};

export default Sheos;