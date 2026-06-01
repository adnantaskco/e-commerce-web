"use client";

import Image from "next/image";
import React from "react";
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

const products: item[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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

export default function ProductCard1() {
   // ✅ CART
    const { addToCart } = useCart();
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-6 bg-white">
    
          
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
    
            {products.map((item) => (
              <div
                key={item.id}
                // onMouseEnter={() => setHovered(product.id)}
                // onMouseLeave={() => setHovered(null)}
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
                                             quantity: 1,
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
  )
}