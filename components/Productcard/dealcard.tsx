"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { FaShoppingCart, FaStar, FaEye } from "react-icons/fa";
import { useCart } from "../../app/src/components/context/CartContext";
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

interface ProductSliderProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
}

export default function ProductSlider({
  title,
  subtitle,
  products = [],
}: ProductSliderProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart } = useCart();

  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { currency } = UseCurrency();

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Dynamic Scroll Distance based on Card Width
  const getScrollAmount = () => {
    const container = sliderRef.current;
    if (!container) return 320;
    const card = container.firstElementChild as HTMLElement;
    return card ? card.offsetWidth + 24 : 320;
  };

  // Track active slide on scroll
  const handleScroll = () => {
    const container = sliderRef.current;
    if (!container) return;
    const scrollAmount = getScrollAmount();
    const index = Math.round(container.scrollLeft / scrollAmount);
    setActiveIndex(index);
  };

  // Scroll to Specific Dot/Slide Index
  const scrollToIndex = (index: number) => {
    const container = sliderRef.current;
    if (!container) return;

    container.scrollTo({
      left: index * getScrollAmount(),
      behavior: "smooth",
    });
  };

  // Auto Slide Logic
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const container = sliderRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      }
    }, 3000);
  };

  // Mouse Drag to Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;
    if (!slider) return;

    isDragging.current = true;
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;
    slider.style.cursor = "grabbing";

    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const slider = sliderRef.current;
    if (!slider) return;

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 2;
    slider.scrollLeft = scrollLeft.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
    const slider = sliderRef.current;
    if (slider) {
      slider.style.cursor = "grab";
    }
    startAutoSlide();
  };

  useEffect(() => {
    if (products.length > 0) {
      startAutoSlide();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [products.length]);

  return (
    <section className="container mx-auto px-4 md:px-10 lg:px-20 py-6 md:py-16 bg-background">
      {/* Header Section */}
      <div className="text-center mb-10">
        {subtitle && (
          <span className="uppercase tracking-[5px] text-primary font-semibold text-sm">
            {subtitle}
          </span>
        )}

        {title && (
          <h1 className="text-xl md:text-3xl text-text-primary font-bold mt-2 capitalize">
            {title}
          </h1>
        )}

        {(title || subtitle) && (
          <div className="flex justify-center pt-4">
            <div className="border-t-4 border-primary w-24 md:w-40 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Slider Area */}
        <div className="relative group">
          {/* Product Cards Container */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseEnter={() =>
              intervalRef.current && clearInterval(intervalRef.current)
            }
            onMouseLeave={stopDragging}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            className="flex gap-2 sm:gap-4 overflow-x-auto scroll-smooth no-scrollbar cursor-grab select-none py-2"
          >
            {products.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%] bg-background border rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group/card flex flex-col"
              >
                {/* Product Image Area */}
                <div className="relative h-30 sm:h-35 w-full flex items-center justify-center p-2 bg-backgroung/10 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    width={180}
                    height={180}
                    unoptimized
                    className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover/card:scale-105 pointer-events-none"
                  />

                  {/* Discount Badge */}
                  {item.has_discount && (
                    <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-text-secondary text-sm sm:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">
                      {item.discount_price}
                    </div>
                  )}

                  {/* Overlaid Bottom Action Bar */}
                  <div
                    className={`absolute bottom-0 inset-x-0 p-1.5 sm:p-2 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 z-20 ${
                      hovered === item.id
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none group-hover/card:opacity-100 group-hover/card:translate-y-0 group-hover/card:pointer-events-auto"
                    }`}
                  >
                    {/* Add to Cart Button */}
                    <button
                      type="button"
                      title="Add to Cart"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({
                          id: item.id,
                          image: item.image || "/placeholder.png",
                          brand: "Taskco",
                          name: item.name,
                          price: Number(item.sale_price),
                        });
                      }}
                      className="flex-1 bg-black/80 hover:bg-black text-white text-[11px] sm:text-xs font-medium py-1.5 px-2 rounded flex items-center justify-center gap-1 shadow hover:shadow-md active:scale-95 transition-all"
                    >
                      <FaShoppingCart className="text-[10px] sm:text-xs" />
                      <span className="hidden sm:inline">Add to Cart</span>
                    </button>

                    {/* Quick View Button */}
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      title="Quick View"
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-white text-ring hover:bg-blue-600 hover:text-white rounded flex items-center justify-center shadow hover:shadow-md active:scale-95 transition-all shrink-0"
                    >
                      <FaEye className="text-[10px] sm:text-xs" />
                    </Link>
                  </div>
                </div>

                {/* Product Details */}
                <Link href={`/products/${item.slug}`} className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold text-text-primary text-xs sm:text-sm line-clamp-1 hover:text-primary transition">
                      {item.name}
                    </h2>

                    {/* Rating Stars */}
                    <div className="flex text-yellow-500 text-[10px] sm:text-xs gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-2">
                    {/* Price */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {item.has_discount && (
                        <span className="line-through text-gray-400 text-[10px] sm:text-xs">
                          {currency} {Number(item.retail_price).toFixed(0)}
                        </span>
                      )}
                      <span className="font-bold text-destructive text-xs sm:text-sm">
                        {currency} {item.sale_price}
                      </span>
                    </div>

                    {/* Stock */}
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

          {/* Carousel Indicators (Dots) */}
          {products.length > 0 && (
            <div className="flex justify-center items-center gap-2 pt-4">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-6 bg-primary"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
    </section>
  );
}