"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { FaShoppingCart, FaStar } from "react-icons/fa";

import { useCart } from "@/app/src/components/context/CartContext";
import { UseCurrency } from "@/components/ui/currency";

const API_URL = "https://demo.app.taskcocommerce.com/api/v1/offer-with-products";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Product = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  sold_amount: number | null;
  review: number | null;
  retail_price: string;
  discount_price: string;
  has_discount: boolean;
  sale_price: string;
  stock_qty: number | null;
  in_stock: boolean;
  stock_availability: boolean;
  weight: number;
  has_variants?: boolean;
};

type Offer = {
  uid: string;
  slug: string;
  name: string;
  products: Product[];
};

export default function SpcialOffersPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { addToCart } = useCart();
  const { currency } = UseCurrency();

  const { data, error, isLoading } = useSWR<{ data: Offer[] }>(API_URL, fetcher);

  if (error) {
    return (
      <div className="min-h-100 flex items-center justify-center text-destructive font-medium">
        Failed to load offers. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 md:px-16 py-6 space-y-8 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <div key={j} className="h-64 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Filter out sections where products list is empty or undefined
  const activeOffers = data?.data?.filter(
    (offer) => offer.products && offer.products.length > 0
  );

  return (
    <div className="min-h-screen bg-background py-4 space-y-2">
      {activeOffers && activeOffers.length > 0 ? (
        activeOffers.map((offer) => (
          <section
            key={offer.uid}
            className="container mx-auto px-3 sm:px-4 md:px-16 py-6 bg-background"
          >
            {/* Section Title */}
            <div className="flex items-end justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-3xl text-text-primary font-bold capitalize">
                {offer.name}
              </h2>

              <Link
                href={`/offers/${offer.slug}`}
                className="text-xs md:text-base font-medium text-text-blue hover:text-primary hover:underline underline-offset-4 transition-colors duration-200"
              >
                See All
              </Link>
            </div>

            {/* Products Horizontal Snap-Scroll on Mobile / Grid on Desktop */}
            <div className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-2 pb-2 md:pb-0 md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-4">
              {offer.products.map((item) => {
                const salePriceNum = parseFloat(item.sale_price);
                const isOutOfStock =
                  !item.in_stock || (item.stock_qty !== null && item.stock_qty <= 0);

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setHovered(hovered === item.id ? null : item.id)}
                    className="snap-start flex-shrink-0 w-[calc(50%-6px)] sm:w-[180px] md:w-auto bg-background rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative flex flex-col"
                  >
                    {/* IMAGE AREA WITH OVERLAID ACTION BUTTONS */}
                    <div className="relative bg-background w-full flex items-center justify-center p-2 overflow-hidden aspect-square">
                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        width={500}
                        height={500}
                        unoptimized
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                      />

                      {/* Discount Badge */}
                      {item.has_discount && item.discount_price !== "0" && (
                        <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-text-secondary text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">
                          {item.discount_price} OFF
                        </div>
                      )}

                      {/* Overlaid Action Bar */}
                      <div
                        className={`absolute inset-x-0 bottom-0 p-1.5 sm:p-2 flex items-center justify-center gap-1 sm:gap-1.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 z-20 ${
                          hovered === item.id
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                        }`}
                      >
                        {/* Add to Cart / Select Variants / Out of Stock Button */}
                        <button
                          type="button"
                          disabled={isOutOfStock}
                          title="Add to Cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isOutOfStock) return;
                            addToCart({
                              id: item.id,
                              image: item.image || "/placeholder.png",
                              brand: "Taskco",
                              name: item.name,
                              price: Number(item.sale_price),
                            });
                          }}
                          className="flex-1 bg-foreground/80 hover:bg-foreground text-text-secondary text-[10px] sm:text-xs font-medium py-1.5 px-1 sm:px-2 rounded flex items-center justify-center gap-1 shadow hover:shadow-md active:scale-95 transition-all disabled:opacity-50"
                        >
                          <FaShoppingCart className="text-[10px] sm:text-xs shrink-0" />
                          <span className="truncate">
                            {isOutOfStock
                              ? "Out of stock"
                              : item.has_variants
                              ? "Select variants"
                              : "Add to Cart"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* DETAILS AREA */}
                    <Link
                      href={`/products/${item.slug}`}
                      className="p-2 sm:p-3 flex-1 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="font-semibold text-text-primary text-sm sm:text-md md:text-xl lg:text-xl line-clamp-1 hover:text-primary transition">
                          {item.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex gap-0.5 text-yellow-400 text-[9px] sm:text-xs mt-1">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} />
                          ))}
                        </div>
                      </div>

                      <div className="mt-2">
                        {/* Price */}
                        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                          {item.has_discount && salePriceNum > 0 && (
                            <span className="line-through text-ring/70 text-[10px] sm:text-xs">
                              {currency} {Number(item.retail_price).toFixed(0)}
                            </span>
                          )}

                          <span className="font-bold text-destructive text-md sm:text-md md:text-xl">
                            {currency}{" "}
                            {salePriceNum > 0
                              ? Number(item.sale_price).toFixed(0)
                              : Number(item.retail_price).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        ))
      ) : (
        <div className="text-center py-12 text-muted-foreground font-medium">
          No active offers available at this time.
        </div>
      )}
    </div>
  );
}