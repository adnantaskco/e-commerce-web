"use client";

import Timer1 from "@/components/ui/timer";
import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
  discount: number;
  timer: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Textured Top With Cuffed Sleeves",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/4/34-home_default.jpg",
    price: 27,
    oldPrice: 30,
    rating: 4,
    discount: -10,
    timer: "568d : 10h : 09m : 40s",
  },
  {
    id: 2,
    name: "Casual Summer T-Shirt",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/140-large_default/textured-top-with-cuffed-sleeves.jpg",
    price: 18,
    oldPrice: 22,
    rating: 5,
    discount: -15,
    timer: "120d : 05h : 12m : 10s",
  },
  {
    id: 3,
    name: "Slim Fit Shirt",
    image: "https://i.imgur.com/3.jpg",
    price: 35,
    oldPrice: 40,
    rating: 4,
    discount: -12,
    timer: "300d : 02h : 44m : 55s",
  },
  {
    id: 4,
    name: "Classic Hoodie",
    image: "https://i.imgur.com/4.jpg",
    price: 45,
    oldPrice: 55,
    rating: 5,
    discount: -20,
    timer: "88d : 14h : 20m : 11s",
  },
  {
    id: 5,
    name: "Denim Jacket",
    image: "https://i.imgur.com/5.jpg",
    price: 60,
    oldPrice: 75,
    rating: 4,
    discount: -18,
    timer: "210d : 08h : 19m : 50s",
  },
  {
    id: 6,
    name: "Women Fashion Dress",
    image: "https://i.imgur.com/6.jpg",
    price: 50,
    oldPrice: 65,
    rating: 5,
    discount: -25,
    timer: "500d : 11h : 33m : 22s",
  },
  {
    id: 7,
    name: "Casual Sneakers",
    image: "https://i.imgur.com/7.jpg",
    price: 80,
    oldPrice: 95,
    rating: 4,
    discount: -15,
    timer: "99d : 03h : 12m : 01s",
  },
  {
    id: 8,
    name: "Elegant Watch",
    image: "https://i.imgur.com/8.jpg",
    price: 120,
    oldPrice: 150,
    rating: 5,
    discount: -30,
    timer: "600d : 20h : 45m : 59s",
  },
  {
    id: 9,
    name: "Leather Bag",
    image: "https://i.imgur.com/9.jpg",
    price: 90,
    oldPrice: 110,
    rating: 4,
    discount: -22,
    timer: "250d : 09h : 10m : 30s",
  },
  {
    id: 10,
    name: "Sport Jacket",
    image: "https://i.imgur.com/10.jpg",
    price: 70,
    oldPrice: 85,
    rating: 5,
    discount: -17,
    timer: "400d : 12h : 55m : 10s",
  },
];

export default function ProductGrid() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-6">
       <div className="text-center py-20">
            <h1 className="text-4xl font-semibold">Deal of the week</h1>
            <div className="flex justify-center mt-4">
                <div className="border-t-4 border-primary w-60"></div>
            </div>
            </div>
      <div className="flex gap-4 overflow-x-auto scroll-smooth pb-4">
        {products.map((product) => {
          const isHover = hovered === product.id;

          return (
            <div
              key={product.id}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              className="
                relative bg-white shadow-lg rounded-xl overflow-hidden
                min-w-[240px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px]
                flex-shrink-0
              "
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[220px] object-cover"
                />

                {/* DISCOUNT */}
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discount}%
                </span>

                {/* TIMER */}
                {!isHover && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 text-xs text-red-500 shadow">
                    <Timer1 />
                  </div>
                )}

                {/* ICONS */}
                <div
                  className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
                    isHover
                      ? "translate-x-0 opacity-100"
                      : "translate-x-10 opacity-0"
                  }`}
                >
                  <button className="bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white">
                    <FaHeart />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow hover:bg-black hover:text-white">
                    <FaShoppingCart />
                  </button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h2 className="text-sm font-medium">{product.name}</h2>

                {/* STARS */}
                <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
                  {[...Array(product.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  <span className="text-black ml-1">
                    ({product.rating})
                  </span>
                </div>

                {/* PRICE */}
                <div className="flex gap-2 mt-2 text-sm">
                  <span className="text-red-500 font-bold">
                    ${product.price}
                  </span>
                  <span className="line-through text-gray-400">
                    ${product.oldPrice}
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