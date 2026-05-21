"use client";

import Image from "next/image";
import React from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

// ✅ FIX: Missing type added
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
    id: 2,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/2/32-home_default.jpg",
    brand: "EcoShop",
    name: "Casual White Sneakers",
    rating: 4,
    reviews: 18,
    price: 60,
    hasOffer: false,
  },
  {
    id: 3,
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
    id: 4,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/4/34-home_default.jpg",
    brand: "EcoShop",
    name: "Men's Black Loafers",
    rating: 4,
    reviews: 12,
    price: 75,
    hasOffer: false,
  },
  {
    id: 5,
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
    id: 6,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/6/36-home_default.jpg",
    brand: "EcoShop",
    name: "Comfortable Slip-On Shoes",
    rating: 4,
    reviews: 10,
    price: 55,
    hasOffer: false,
  },
  {
    id: 7,
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
    id: 8,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/p/3/8/38-home_default.jpg",
    brand: "EcoShop",
    name: "Sports Training Sneakers",
    rating: 4,
    reviews: 14,
    price: 65,
    hasOffer: false,
  },
  {
    id: 9,
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
    id: 10,
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
  return (
    <section className="py-5 px-4">

      {/* X-axis Scroll Container */}
      <div className="mx-auto flex gap-8 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth">

        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white overflow-hidden rounded-2xl p-5 border-2 relative min-w-[280px]"
          >

            {/* Image */}
            <div className="relative bg-[#f5f5f5] overflow-hidden">

              {product.hasOffer && (
                <span className="absolute top-4 left-4 z-20 bg-red-500 text-white px-3 py-1 text-sm font-semibold">
                  -{product.discount}%
                </span>
              )}

              <div className="absolute top-15 -right-15 group-hover:right-4 transition-all duration-500 z-20 flex flex-col gap-3">

                <button className="w-12 h-12 bg-white shadow-md flex items-center justify-center rounded-md hover:bg-black hover:text-white transition">
                  <FaHeart />
                </button>

                <button className="w-12 h-12 bg-white shadow-md flex items-center justify-center rounded-md hover:bg-black hover:text-white transition">
                  <FaShoppingCart />
                </button>

              </div>

              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="pt-5 space-y-0">

              <p className="text-gray-500 text-lg">{product.brand}</p>

              <h2 className="text-xl font-medium text-secondary hover:text-red-500 transition cursor-pointer">
                {product.name}
              </h2>

              <div className="flex items-center gap-2">
                <div className="flex items-center text-yellow-400 gap-1">
                  {[...Array(product.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <span className="text-lg text-gray-600">
                  ({product.reviews})
                </span>
              </div>

              <div className="flex items-center gap-3">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-md">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}

                <span className="text-red-400 font-semibold text-xl">
                  ${product.price.toFixed(2)}
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