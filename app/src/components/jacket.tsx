"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaStar ,FaEye} from "react-icons/fa";
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

const products3: item[] = [
  {
    id: 31,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/1/21-home_default.jpg",
    brand: "EcoShop",
    name: "Classic Winter Wool Blazer Jacket",
    rating: 5,
    reviews: 12,
    price: 120,
    oldPrice: 150,
    discount: 20,
    hasOffer: true,
  },
  {
    id: 32,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/2/22-home_default.jpg",
    brand: "EcoShop",
    name: "Slim Fit Formal Black Blazer",
    rating: 4,
    reviews: 18,
    price: 95,
    oldPrice: 110,
    discount: 15,
    hasOffer: true,
  },
  {
    id: 33,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/3/23-home_default.jpg",
    brand: "EcoShop",
    name: "Premium Navy Blue Office Blazer",
    rating: 5,
    reviews: 22,
    price: 130,
    oldPrice: 145,
    discount: 10,
    hasOffer: true,
  },
  {
    id: 34,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/4/24-home_default.jpg",
    brand: "EcoShop",
    name: "Casual Street Style Jacket Blazer",
    rating: 4,
    reviews: 9,
    price: 75,
    hasOffer: false,
  },
  {
    id: 35,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/5/25-home_default.jpg",
    brand: "EcoShop",
    name: "Men’s Formal Wedding Blazer",
    rating: 5,
    reviews: 30,
    price: 160,
    oldPrice: 180,
    discount: 12,
    hasOffer: true,
  },
  {
    id: 36,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/6/26-home_default.jpg",
    brand: "EcoShop",
    name: "Slim Fit Grey Business Blazer",
    rating: 4,
    reviews: 14,
    price: 105,
    hasOffer: false,
  },
  {
    id: 37,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/7/27-home_default.jpg",
    brand: "EcoShop",
    name: "Luxury Double Button Blazer Jacket",
    rating: 5,
    reviews: 25,
    price: 140,
    oldPrice: 160,
    discount: 13,
    hasOffer: true,
  },
  {
    id: 38,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/8/28-home_default.jpg",
    brand: "EcoShop",
    name: "Casual Denim Blazer Jacket Style",
    rating: 4,
    reviews: 11,
    price: 85,
    hasOffer: false,
  },
  {
    id: 39,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/9/29-home_default.jpg",
    brand: "EcoShop",
    name: "Winter Thick Warm Blazer Coat",
    rating: 5,
    reviews: 19,
    price: 150,
    oldPrice: 175,
    discount: 14,
    hasOffer: true,
  },
  {
    id: 40,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/0/30-home_default.jpg",
    brand: "EcoShop",
    name: "Modern Casual Slim Fit Blazer Jacket",
    rating: 4,
    reviews: 8,
    price: 90,
    hasOffer: false,
  },
];

export default function Jackets() {
   const [hovered, setHovered] = useState<number | null>(null);
   // ✅ CART
    const { addToCart } = useCart();
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-6 bg-white">
      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
      >
        {products3.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() =>
              setHovered(hovered === item.id ? null : item.id)
            }
            className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
          >
            {/* IMAGE */}
           <div className="relative h-[180px] sm:h-[180px] md:h-[260px] lg:h-[280px] bg-gray-100 flex items-center justify-center">
                       <Image
                         src={item.image}
                         alt={item.name}
                         width={260}
                         height={300}
                         draggable={false}
                         className="object-contain max-h-full pointer-events-none"
                       />

              {item.discount && (
                <div className="absolute top-3 left-3 bg-primay text-white text-xs font-bold px-3 py-1 rounded-md">
                  {item.discount}%
                </div>
              )}

              {/* ICONS */}
              <div
                className={`
                  absolute top-5 right-4 flex flex-col gap-3 z-10 transition-all duration-300
                  ${
                    hovered === item.id
                      ? "opacity-100 translate-x-0"
                      : "sm:opacity-0 sm:translate-x-5"
                  }
                  sm:group-hover:opacity-100 sm:group-hover:translate-x-0
                `}
              >
                <button className="w-5 h-5 sm:w-5 sm:h-5 md:h-10 md:w-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-primary hover:text-white transition">
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
                  className="w-5 h-5 sm:w-5 sm:h-5 md:h-10 md:w-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-black hover:text-white transition"
                >
                  <FaShoppingCart />
                </button>

                <button className="w-5 h-5 sm:w-5 sm:h-5 md:h-10 md:w-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition">
                  <FaEye />
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-3 md:p-4">
                        <p className="text-xs md:text-sm text-gray-500">
                          {item.brand}
                        </p>
            
                        <h2 className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold mt-1 text-sm md:text-base min-h-[28px] line-clamp-2">
                          {item.name}
                        </h2>
            
                        <div className="flex gap-1 text-yellow-400 mt- text-sm">
                          {[...Array(item.rating)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
            
                        <div className="flex flex-wrap gap-2 mt-3 items-center">
                          <span className="line-through text-gray-400 text-sm">
                            ${item.oldPrice}
                          </span>
            
                          <span className="text-red-500 font-bold text-base">
                            ${item.price}
                          </span>
                        </div>
                      </div>
          </div>
        ))}
      </div>
    </section>
  )
}