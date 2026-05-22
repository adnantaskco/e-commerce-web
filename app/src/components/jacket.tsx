"use client";

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
  return (
    <section className="py-6 px-3">
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
}