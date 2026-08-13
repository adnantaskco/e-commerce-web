"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaShoppingCart, FaStar, FaEye } from "react-icons/fa";

import { useCart } from "@/app/src/components/context/CartContext";
import { UseCurrency } from "../ui/currency";

type Product = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  sold_amount: number;
  review: number | null;
  retail_price: string;
  discount_price: string;
  has_discount: boolean;
  sale_price: string;
  stock_qty: number;
  in_stock: boolean;
  stock_availability: boolean;
  weight: number;
};

interface DressandjumpsuitsProps {
  title: string;
  products: Product[];
}

const Dressandjumpsuits = ({
  title,
  products,
}: DressandjumpsuitsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const { addToCart } = useCart();
  const { currency } = UseCurrency();

  return (
    <section className="container mx-auto px-4 md:px-16 py-6 bg-background">
      {/* Section Title */}
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-xl md:text-3xl lg:text-4xl text-text-primary font-bold capitalize">
          {title}
        </h2>

        <button
          type="button"
          className="text-sm md:text-base font-medium text-text-blue hover:text-primary hover:underline underline-offset-4 transition-colors duration-200"
        >
          See All
        </button>
      </div>

      {/* Products X-Axis Horizontal Scroll on Mobile / Grid on Desktop */}
      <div className="flex overflow-x-auto no-scrollbar scroll-smooth gap-3 pb-2 md:pb-0 md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-4">
        {products.slice(0, 6).map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered(hovered === item.id ? null : item.id)}
            className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-auto bg-background rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative flex flex-col"
          >
            {/* IMAGE AREA WITH OVERLAID ACTION BUTTONS */}
            <div className="relative bg-background h-full w-full flex items-center justify-center p-2 overflow-hidden">
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="max-h-full max-w-full object-contain pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />

              {/* Discount Badge */}
              {item.has_discount && (
                <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-text-primary text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">
                  {item.discount_price}
                </div>
              )}

              {/* Overlaid Action Bar */}
              <div
                className={`absolute inset-x-0 bottom-0 p-1.5 sm:p-2 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 z-20 ${
                  hovered === item.id
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                }`}
              >
                {/* Add to Cart Button */}
                <button
                  type="button"
                  title="Add to Cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      id: item.id,
                      image: item.image || "/placeholder.png",
                      brand: "Taskco",
                      name: item.name,
                      price: Number(item.sale_price),
                    });
                  }}
                  className="flex-1 bg-foreground/80 hover:bg-foreground text-text-secondary text-[11px] sm:text-xs font-medium py-1.5 px-2 rounded flex items-center justify-center gap-1 shadow hover:shadow-md active:scale-95 transition-all"
                >
                  <FaShoppingCart className="text-[10px] sm:text-xs" />
                  <span className="hidden sm:inline">Add to Cart</span>
                </button>

                {/* Quick View Button */}
                <Link
                  href={`/products/${item.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  title="Quick View"
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-background text-ring hover:bg-blue-600 hover:text-text-secondary rounded flex items-center justify-center shadow hover:shadow-md active:scale-95 transition-all shrink-0"
                >
                  <FaEye className="text-[10px] sm:text-xs" />
                </Link>
              </div>
            </div>

            {/* DETAILS AREA */}
            <Link href={`/products/${item.slug}`} className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[10px] sm:text-xs text-ring">Taskco</p>

                <h2 className="text-xs sm:text-sm font-semibold truncate text-text-primary">
                  {item.name}
                </h2>

                {/* Rating */}
                <div className="flex gap-0.5 text-yellow-400 text-[10px] sm:text-xs mt-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>
              </div>

              <div className="mt-2">
                {/* Price */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.has_discount && (
                    <span className="line-through text-ring/70 text-[10px] sm:text-xs">
                      {currency} {Number(item.retail_price).toFixed(0)}
                    </span>
                  )}

                  <span className="font-bold text-destructive text-xs sm:text-sm">
                    {currency} {Number(item.sale_price).toFixed(0)}
                  </span>
                </div>

                {/* Stock Status */}
                <div className="mt-0.5">
                  {item.in_stock ? (
                    <span className="text-green-600 text-[10px] sm:text-xs font-medium">
                      In Stock ({item.stock_qty})
                    </span>
                  ) : (
                    <span className="text-destructive text-[10px] sm:text-xs font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Mobile Only Drag Helper */}
      <div className="flex md:hidden items-center justify-center gap-2 text-xs text-muted-foreground mt-3 text-center">
        <span>←</span>
        <span>Drag to explore</span>
        <span>→</span>
      </div>
    </section>
  );
};

export default Dressandjumpsuits;