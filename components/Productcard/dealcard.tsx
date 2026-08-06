"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaStar, FaEye, FaAngleDoubleRight } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../../app/src/components/context/CartContext";

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
  const { addToCart } = useCart();

  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Manual Scroll via Chevron Buttons
  const scroll = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -getScrollAmount() : getScrollAmount(),
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
          <h1 className="text-3xl md:text-5xl text-text-primary font-bold mt-2 capitalize">
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
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          aria-label="Previous Slide"
          className="hidden md:flex absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-background shadow-md border items-center justify-center hover:bg-primary hover:text-white transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          aria-label="Next Slide"
          className="hidden md:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-background shadow-md border items-center justify-center hover:bg-primary hover:text-white transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Product Cards Container */}
        <div
          ref={sliderRef}
          onMouseEnter={() =>
            intervalRef.current && clearInterval(intervalRef.current)
          }
          onMouseLeave={stopDragging}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth no-scrollbar cursor-grab select-none py-2"
        >
          {products.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="flex-shrink-0 w-[48%] md:w-[31.5%] lg:w-[23.5%] bg-background border rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image Area */}
              <div className="relative h-[260px] md:h-[280px] flex items-center justify-center p-4 bg-gray-50/50">
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  width={260}
                  height={300}
                  unoptimized
                  className="object-contain max-h-full transition-transform duration-300 hover:scale-105"
                />

                {/* Hover Action Buttons */}
                <div
                  className={`absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 ${
                    hovered === item.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                    <FaHeart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart({
                        id: item.id,
                        image: item.image || "/placeholder.png",
                        brand: "Taskco",
                        name: item.name,
                        price: Number(item.sale_price),
                      });
                    }}
                    className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"
                  >
                    <FaShoppingCart className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                    <FaEye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <Link href={`/products/${item.slug}`}>
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="font-semibold text-text-primary text-base line-clamp-1 hover:text-primary transition">
                    {item.name}
                  </h2>

                  {/* Rating Stars */}
                  <div className="flex text-yellow-500 text-xs gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="line-through text-gray-400 text-sm">
                      ${Number(item.retail_price).toFixed(0)}
                    </span>
                    <span className="font-bold text-primary text-lg">
                      ${item.sale_price}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center text-text-primary py-5">
          <h1 className="flex text-xl items-center gap-2">
            View All <FaAngleDoubleRight />
          </h1>
        </div>
      </div>
    </section>
  );
}