"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import useSWR from "swr";
import { FaHeart, FaShoppingCart, FaStar, FaEye } from "react-icons/fa";
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

// SWR fetcher utility function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductSlider() {
  const [hovered, setHovered] = useState<number | null>(null);

  const { addToCart } = useCart();
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Drag refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Dynamic API Fetching using SWR
  const { data, error, isLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/products",
    fetcher
  );

  // Extract the product payload array safely
  const Dealproducts: Product[] = data?.data || data || [];

  const getScrollAmount = () => {
    const container = sliderRef.current;
    if (!container) return 320;

    const card = container.firstElementChild as HTMLElement;
    return card ? card.offsetWidth + 24 : 320;
  };

  const scroll = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -getScrollAmount() : getScrollAmount(),
      behavior: "smooth",
    });
  };

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const container = sliderRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: getScrollAmount(),
          behavior: "smooth",
        });
      }
    }, 3000);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;
    if (!slider) return;

    isDragging.current = true;
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;

    slider.style.cursor = "grabbing";

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
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

  // Synchronize auto-slide initialization with state initialization
  useEffect(() => {
    if (!isLoading && Dealproducts.length > 0) {
      startAutoSlide();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLoading, Dealproducts.length]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-lg font-semibold">
        Loading Products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-lg font-semibold text-destructive">
        Failed to load products.
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 md:px-10 lg:px-20 md:py-16 py-6 bg-background">
      {/* TITLE */}
      <div className="text-center mb-10">
        <span className="uppercase tracking-[5px] text-primary font-semibold">
          Weekend Deal
        </span>

        <h1 className="text-3xl md:text-5xl text-text-primary font-bold sm:font-semibold mt-4">
          Weekend Feature Deal Products
        </h1>

        <div className="flex justify-center pt-4">
          <div className="border-t-4 border-primary w-40 md:w-80"></div>
        </div>
      </div>

      {/* SLIDER WRAPPER */}
      <div className="relative">
        {/* LEFT BUTTON */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 md:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-background shadow-lg border items-center justify-center hover:bg-primary hover:text-text-secondary transition"
        >
          <ChevronLeft size={22} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 md:-right-3 lg:-right-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-background shadow-lg border items-center justify-center hover:bg-primary hover:text-text-secondary transition"
        >
          <ChevronRight size={22} />
        </button>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          onMouseEnter={() => intervalRef.current && clearInterval(intervalRef.current)}
          onMouseLeave={stopDragging}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          className="flex gap-3 md:gap-6 overflow-x-auto scroll-smooth no-scrollbar cursor-grab select-none touch-pan-x pb-2"
        >
          {Dealproducts.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="flex-shrink-0 w-[48%] md:w-[31.5%] lg:w-[23.5%] bg-background border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              {/* IMAGE */}
              <div className="relative h-[180px] sm:h-[180px] md:h-[260px] lg:h-[280px] bg-ring/5 flex items-center justify-center">
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  width={260}
                  height={300}
                  unoptimized
                  className="object-contain max-h-full pointer-events-none"
                />

                {/* DISCOUNT */}
                {item.has_discount && (
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-primary text-text-secondary text-[10px] sm:text-xs font-medium sm:font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md">
                    {item.discount_price}
                  </div>
                )}

                {/* ACTION BUTTONS */}
                <div
                  className={`absolute top-5 right-4 flex flex-col gap-3 transition-all duration-300 ${
                    hovered === item.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
                  } group-hover:opacity-100 group-hover:translate-x-0`}
                >
                  <button className="w-5 h-5 sm:w-5 sm:h-5 md:w-10 md:h-10 bg-background rounded-full shadow flex items-center justify-center hover:bg-primary hover:text-text-secondary transition">
                    <FaHeart />
                  </button>

                  <button
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
                    className="w-8 h-8 md:w-10 md:h-10 bg-background rounded-full flex items-center justify-center shadow hover:bg-foreground hover:text-text-secondary transition"
                  >
                    <FaShoppingCart />
                  </button>

                  <button className="w-5 h-5 sm:w-5 sm:h-5 md:w-10 md:h-10 bg-background rounded-full shadow flex items-center justify-center hover:bg-chart-3 hover:text-text-secondary transition">
                    <FaEye />
                  </button>
                </div>
              </div>

              <Link href={`/products/${item.slug}`}>
                {/* CONTENT */}
                <div className="p-3 md:p-4">
                  <p className="text-xs md:text-sm text-ring">Jumes</p>

                  <h2 className="whitespace-nowrap overflow-hidden text-text-primary font-semibold mt-1 text-sm md:text-base min-h-[28px] line-clamp-2">
                    {item.name}
                  </h2>

                  <div className="flex gap-1 text-yellow-500 text-sm">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-1 items-center">
                    <span className="line-through text-ring text-sm">
                      ${Number(item.retail_price).toFixed(0)}
                    </span>
                    <span className="text-destructive font-bold text-base">
                      ${item.sale_price}
                    </span>
                  </div>

                  {/* Stock */}
                  <div className="">
                    {item.in_stock ? (
                      <span className="text-green-600 text-xs font-medium">
                        In Stock ({item.stock_qty})
                      </span>
                    ) : (
                      <span className="text-destructive text-xs font-medium">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}