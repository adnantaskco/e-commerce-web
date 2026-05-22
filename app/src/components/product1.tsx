"use client";

import Timer1 from "@/components/ui/timer";
import Timer from "@/components/ui/timer";
import Image from "next/image";
import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

type Product = {
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

const products: Product[] = [
  {
    id: 1,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/5/15-home_default.jpg",
    brand: "Top-10",
    name: "Benetton Regular Fit Sweatshirt",
    rating: 5,
    reviews: 5,
    price: 47.5,
    oldPrice: 50,
    discount: 5,
    hasOffer: true,
  },
  {
    id: 2,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/6/16-home_default.jpg",
    brand: "EcoShop",
    name: "Premium Cotton Hoodie",
    rating: 5,
    reviews: 8,
    price: 65,
    hasOffer: false,
  },
  {
    id: 3,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/7/17-home_default.jpg",
    brand: "JARA",
    name: "Slim Fit Denim Jacket",
    rating: 4,
    reviews: 12,
    price: 80,
    oldPrice: 90,
    discount: 10,
    hasOffer: true,
  },
  {
    id: 4,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/8/18-home_default.jpg",
    brand: "EcoShop",
    name: "Classic White Shirt",
    rating: 5,
    reviews: 20,
    price: 35,
    hasOffer: false,
  },
  {
    id: 5,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/9/19-home_default.jpg",
    brand: "Ferrari",
    name: "Summer T-Shirt Premium",
    rating: 4,
    reviews: 7,
    price: 25,
    oldPrice: 30,
    discount: 15,
    hasOffer: true,
  },
  {
    id: 6,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/0/20-home_default.jpg",
    brand: "EcoShop",
    name: "Casual Black Hoodie",
    rating: 5,
    reviews: 10,
    price: 55,
    hasOffer: false,
  },
  {
    id: 7,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/1/21-home_default.jpg",
    brand: "EcoShop",
    name: "Stylish Winter Coat",
    rating: 5,
    reviews: 14,
    price: 120,
    oldPrice: 150,
    discount: 20,
    hasOffer: true,
  },
  {
    id: 8,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/2/22-home_default.jpg",
    brand: "EcoShop",
    name: "Sport Jacket",
    rating: 4,
    reviews: 9,
    price: 70,
    hasOffer: false,
  },
  {
    id: 9,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/3/23-home_default.jpg",
    brand: "EcoShop",
    name: "Premium Hoodie Grey",
    rating: 5,
    reviews: 18,
    price: 60,
    oldPrice: 68,
    discount: 12,
    hasOffer: true,
  },
  {
    id: 10,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/4/24-home_default.jpg",
    brand: "EcoShop",
    name: "Casual Streetwear Tee",
    rating: 4,
    reviews: 11,
    price: 28,
    hasOffer: false,
  },

  // EXTRA 10 PRODUCTS

  {
    id: 11,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/5/25-home_default.jpg",
    brand: "EcoShop",
    name: "Winter Fashion Hoodie",
    rating: 5,
    reviews: 13,
    price: 72,
    oldPrice: 80,
    discount: 10,
    hasOffer: true,
  },
  {
    id: 12,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/6/26-home_default.jpg",
    brand: "EcoShop",
    name: "Premium Casual Jacket",
    rating: 4,
    reviews: 9,
    price: 85,
    hasOffer: false,
  },
  {
    id: 13,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/7/27-home_default.jpg",
    brand: "EcoShop",
    name: "Oversized Sweatshirt",
    rating: 5,
    reviews: 15,
    price: 58,
    oldPrice: 65,
    discount: 8,
    hasOffer: true,
  },
  {
    id: 14,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/8/28-home_default.jpg",
    brand: "EcoShop",
    name: "Modern Street Jacket",
    rating: 4,
    reviews: 6,
    price: 95,
    hasOffer: false,
  },
  {
    id: 15,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/9/29-home_default.jpg",
    brand: "EcoShop",
    name: "Men's Denim Shirt",
    rating: 5,
    reviews: 21,
    price: 42,
    oldPrice: 50,
    discount: 15,
    hasOffer: true,
  },
  {
    id: 16,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/0/30-home_default.jpg",
    brand: "EcoShop",
    name: "Warm Winter Hoodie",
    rating: 4,
    reviews: 10,
    price: 62,
    hasOffer: false,
  },
  {
    id: 17,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/1/31-home_default.jpg",
    brand: "EcoShop",
    name: "Luxury Cotton T-Shirt",
    rating: 5,
    reviews: 17,
    price: 33,
    oldPrice: 40,
    discount: 18,
    hasOffer: true,
  },
  {
    id: 18,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/2/32-home_default.jpg",
    brand: "EcoShop",
    name: "Urban Style Coat",
    rating: 5,
    reviews: 19,
    price: 140,
    oldPrice: 170,
    discount: 20,
    hasOffer: true,
  },
  {
    id: 19,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/3/33-home_default.jpg",
    brand: "EcoShop",
    name: "Classic Polo T-Shirt",
    rating: 4,
    reviews: 7,
    price: 38,
    hasOffer: false,
  },
  {
    id: 20,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/4/34-home_default.jpg",
    brand: "EcoShop",
    name: "Fashionable Sports Hoodie",
    rating: 5,
    reviews: 16,
    price: 68,
    oldPrice: 75,
    discount: 9,
    hasOffer: true,
  },
];

const ProductCard1 = () => {
  return (
    <section className="py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl border relative overflow-hidden"
                >
      
                  {/* IMAGE */}
                  <div className="relative aspect-[3/4] bg-white overflow-hidden">
      
                    {/* DISCOUNT */}
                    {product.hasOffer && (
                      <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs px-2 py-1  rounded">
                        -{product.discount}%
                      </span>
                    )}
      
                    {/* ICONS (mobile always visible, lg hover slide) */}
                    <div className="
                      absolute top-3 right-3 z-20 flex flex-col gap-2
                      lg:-right-16 lg:top-12 lg:group-hover:right-3
                      transition-all duration-300
                    ">
                      <button className="sm:w-2 sm:h-2 md:w-11 md:h-11 bg-white shadow rounded flex items-center justify-center hover:bg-black hover:text-white">
                        <FaHeart />
                      </button>
      
                      <button className="sm:w-2 sm:h-2 md:w-11 md:h-11 bg-white shadow rounded flex items-center justify-center hover:bg-black hover:text-white">
                        <FaShoppingCart />
                      </button>
                    </div>
      
                    {/* IMAGE */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
      
                  {/* CONTENT */}
                  <div className="p-3 space-y-1">
      
                    <p className="text-gray-500 text-sm">{product.brand}</p>
      
                    <h2 className="text-sm font-medium line-clamp-2 hover:text-red-500 cursor-pointer">
                      {product.name}
                    </h2>
      
                    {/* RATING */}
                    <div className="flex items-center text-yellow-400 text-sm gap-1">
                      {[...Array(Math.floor(product.rating))].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      <span className="text-black ml-1">({product.rating})</span>
                    </div>
      
                    {/* PRICE */}
                    <div className="flex items-center gap-2">
                      {product.oldPrice && (
                        <span className="text-gray-400 line-through text-xs">
                          ${product.oldPrice}
                        </span>
                      )}
      
                      <span className="text-red-500 font-semibold">
                        ${product.price}
                      </span>
                    </div>
      
                  </div>
      
                </div>
              ))}
      
            </div>
    </section>
  );
};

export default ProductCard1;