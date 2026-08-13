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
  const [activePageIndex, setActivePageIndex] = useState(0);
  const { addToCart } = useCart();

  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { currency } = UseCurrency();

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Calculates full page scroll distance (2 cards width + gap on mobile)
  const getPageScrollAmount = () => {
    const container = sliderRef.current;
    if (!container) return 320;

    const gap = 16; // Corresponds to gap-4
    const isMobile = window.innerWidth < 640;

    if (isMobile) {
      // Full inner width of 2 cards plus 1 gap
      const containerWidth = container.clientWidth;
      return containerWidth + gap;
    }

    const card = container.firstElementChild as HTMLElement;
    return card ? card.offsetWidth + gap : 320;
  };

  // Tracks active page index when scrolled
  const handleScroll = () => {
    const container = sliderRef.current;
    if (!container) return;

    const pageAmount = getPageScrollAmount();
    const page = Math.round(container.scrollLeft / pageAmount);
    setActivePageIndex(page);
  };

  // Scrolls to specific page index
  const scrollToPage = (pageIndex: number) => {
    const container = sliderRef.current;
    if (!container) return;

    container.scrollTo({
      left: pageIndex * getPageScrollAmount(),
      behavior: "smooth",
    });
  };

  // Auto Slide Logic (advances 2 cards at a time on mobile)
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const container = sliderRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: getPageScrollAmount(), behavior: "smooth" });
      }
    }, 3500);
  };

  // Mouse Drag Handlers
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

  // Group items into 2-card pages for mobile dots
  const mobilePagesCount = Math.ceil(products.length / 2);

  return (
    <section className="container mx-auto px-3 sm:px-4 md:px-10 lg:px-20 py-6 md:py-16 bg-background">
      {/* Header Section */}
      {title && (
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-xl md:text-3xl text-text-primary font-bold mt-2 capitalize ">
            {title}
          </h2>
        </div>
      )}

      {/* Slider Area */}
      <div className="relative group">
        {/* Product Cards Container with Snap Scroll */}
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
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar cursor-grab select-none py-2"
        >
          {products.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              /* Exactly 2 cards per view (w-[calc(50%-8px)]) with mandatory snap alignment */
              className="snap-start flex-shrink-0 w-[calc(50%-8px)] sm:w-[30%] md:w-[23%] lg:w-[18%] bg-background border rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group/card flex flex-col"
            >
              {/* Product Image Area */}
              <div className="relative aspect-square w-full flex items-center justify-center p-2 bg-background/10 overflow-hidden">
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
                  <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-text-secondary text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">
                    {item.discount_price}
                  </div>
                )}

                {/* Action Bar */}
                <div
                  className={`absolute bottom-0 inset-x-0 p-1.5 sm:p-2 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 z-20 ${
                    hovered === item.id
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none group-hover/card:opacity-100 group-hover/card:translate-y-0 group-hover/card:pointer-events-auto"
                  }`}
                >
                  <button
                    type="button"
                    disabled={!item.in_stock || item.stock_qty <= 0}
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
                    className="flex-1 bg-foreground/80 hover:bg-foreground text-text-secondary text-[10px] sm:text-xs font-medium py-1.5 px-1 rounded flex items-center justify-center gap-1 shadow hover:shadow-md active:scale-95 transition-all disabled:opacity-50"
                  >
                    <FaShoppingCart className="text-[10px] sm:text-xs shrink-0" />
                    <span className="truncate">
                      {!item.in_stock || item.stock_qty <= 0
                        ? "Out of stock"
                        : "Add to Cart"}
                    </span>
                  </button>

                  <Link
                    href={`/products/${item.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    title="Quick View"
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-background text-ring hover:bg-blue-600 hover:text-text-secondary rounded flex items-center justify-center shadow hover:shadow-md active:scale-95 transition-all shrink-0"
                  >
                    <FaEye className="text-xs" />
                  </Link>
                </div>
              </div>

              {/* Product Details */}
              <Link href={`/products/${item.slug}`} className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-text-primary text-[11px] sm:text-sm line-clamp-1 hover:text-primary transition">
                    {item.name}
                  </h2>

                  <div className="flex text-yellow-500 text-[9px] sm:text-xs gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                    {item.has_discount && (
                      <span className="line-through text-ring text-[10px] sm:text-xs">
                        {currency} {Number(item.retail_price).toFixed(0)}
                      </span>
                    )}
                    <span className="font-bold text-destructive text-[11px] sm:text-sm">
                      {currency} {item.sale_price}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel Indicators (Dots) */}
        {products.length > 0 && (
          <div className="flex justify-center items-center gap-1.5 pt-4">
            {Array.from({ length: mobilePagesCount }).map((_, pageIdx) => (
              <button
                key={pageIdx}
                onClick={() => scrollToPage(pageIdx)}
                aria-label={`Go to page ${pageIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activePageIndex === pageIdx
                    ? "w-6 bg-primary"
                    : "w-2 bg-ring/70 hover:bg-ring/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}