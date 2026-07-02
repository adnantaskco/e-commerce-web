"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaStar, FaEye } from "react-icons/fa";
import { useCart } from "@/app/src/components/context/CartContext";
import { DataDress } from "@/lib/DataDress";
import Link from "next/link";





const DressCard = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const { addToCart } = useCart();

  return (
<section className="w-full px-2 sm:px-6 lg:px-10 py-6 bg-background">
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
    {DataDress.map((item) => (
      <div
        key={item.id}
        onMouseEnter={() => setHovered(item.id)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => setHovered(hovered === item.id ? null : item.id)}
        className="bg-background rounded-xl overflow-hidden border  hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
      >
       
        {/* IMAGE BOX */}
        <div className="relative bg-ring/5 h-[140px] sm:h-[280px] flex items-center justify-center p-2">
          <img
            src={item.image}
            alt={item.name}
            width={260}
            height={300}
            draggable={false}
            className="object-contain max-h-full pointer-events-none"
          />

          {/* DISCOUNT BADGE */}
          {item.discount && (
            <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-primary text-text-secondary text-[9px] sm:text-xs font-medium sm:font-bold px-1.5 sm:px-3 py-0.5 sm:py-1 rounded">
              {item.discount}%
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div
            className={`
              absolute top-2 right-2 sm:top-5 sm:right-4 flex flex-col gap-2 z-10 transition-all duration-300
              ${hovered === item.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3 sm:opacity-0 sm:translate-x-5"}
              group-hover:opacity-100 group-hover:translate-x-0
            `}
          >
            <button className="w-8 h-8 sm:w-5 sm:h-5 md:w-10 md:h-10 text-xs md:text-base bg-background rounded-full flex items-center justify-center shadow hover:bg-primary hover:text-text-primary transition">
              <FaHeart />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents click handler triggers on the parent card wrapper
                addToCart({
                  id: item.id,
                  image: item.image,
                  brand: item.brand,
                  name: item.name,
                  price: item.price,
                });
              }}
              className="w-8 h-8 md:w-10 sm:w-5 sm:h-5 md:h-10 text-xs md:text-base bg-background rounded-full flex items-center justify-center shadow hover:bg-foreground hover:text-text-secondary active:scale-96 transition"
            >
              <FaShoppingCart />
            </button>

            <button className="w-8 h-8 sm:w-5 sm:h-5 md:w-10 md:h-10 text-xs md:text-base bg-background rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition">
              <FaEye />
            </button>
          </div>
        </div>
              <Link href={`/products/${item.id}`}>
        {/* DETAILS/CONTENT BOX */}
        <div className="p-2 sm:p-4">
          <p className="text-[11px] sm:text-sm text-ring truncate">{item.brand}</p>
          <h2 className="text-xs sm:text-base whitespace-nowrap overflow-hidden text-text-primary font-semibold mt-0.5">
            {item.name}
          </h2>

          <div className="flex gap-0.5 text-yellow-400 text-[10px] sm:text-sm mt-1">
            {[...Array(item.rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5">
            <span className="line-through text-ring text-[11px] sm:text-sm">
              ${item.oldPrice}
            </span>
            <span className="text-destructive font-bold text-xs sm:text-base">
              ${item.price}
            </span>
          </div>
        </div>
       </Link>
      </div>
    ))}
  </div>
</section>
  );
};

export default DressCard;