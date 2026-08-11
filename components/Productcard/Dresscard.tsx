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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-text-primary">
          {title}
        </h2>
        <span className="text-blue-400 text-md font-medium cursor-pointer hover:underline">
          See All
        </span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        {products.slice(0, 4).map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() =>
              setHovered(hovered === item.id ? null : item.id)
            }
            className="bg-background rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group relative"
          >
            {/* IMAGE AREA */}
            <div className="relative bg-background h-[140px] sm:h-[280px] flex items-center justify-center p-2 overflow-hidden">
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name}
                width={260}
                height={300}
                unoptimized
                className="object-contain max-h-full pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />

              {/* Discount Badge */}
              {item.has_discount && (
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
                  {item.discount_price}
                </div>
              )}

              {/* Bottom Action Bar */}
              <div
                className={`absolute bottom-0 inset-x-0 p-2 sm:p-3 flex items-center justify-center gap-2 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-300 z-20 ${
                  hovered === item.id
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
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
                  className="flex-1 bg-black/90 hover:bg-black text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all"
                >
                  <FaShoppingCart className="text-xs sm:text-sm" />
                  <span className="hidden sm:inline">Add to Cart</span>
                </button>

                {/* Quick View Button */}
                <Link href={`/products/${item.slug}`}> <button
                  type="button"
                  title="Quick View"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-white text-gray-800 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg active:scale-95 transition-all"
                >
                  <FaEye className="text-xs sm:text-sm" />
                </button></Link>
              </div>
            </div>

            {/* Details */}
            <Link href={`/products/${item.slug}`}>
              <div className="p-2 sm:p-4">
                <p className="text-[11px] sm:text-sm text-gray-500">
                  Taskco
                </p>

                <h2 className="text-xs sm:text-base font-semibold truncate text-text-primary">
                  {item.name}
                </h2>

                {/* Rating */}
                <div className="flex gap-1 text-yellow-400 text-xs mt-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                  {item.has_discount && (
                    <span className="line-through text-gray-400 text-sm">
                      {currency} {Number(item.retail_price).toFixed(0)}
                    </span>
                  )}

                  <span className="font-bold text-red-500 text-base">
                    {currency} {Number(item.sale_price).toFixed(0)}
                  </span>
                </div>

                {/* Stock */}
                <div className="mt-1">
                  {item.in_stock ? (
                    <span className="text-green-600 text-xs font-medium">
                      In Stock ({item.stock_qty})
                    </span>
                  ) : (
                    <span className="text-red-500 text-xs font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dressandjumpsuits;