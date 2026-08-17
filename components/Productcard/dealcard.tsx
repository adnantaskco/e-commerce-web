"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
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
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const { addToCart } = useCart();

  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { currency } = UseCurrency();

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Update items visible per breakpoint
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(6);
      } else if (width >= 768) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculates the scroll distance for exactly ONE card (card width + 16px gap)
  const getSingleCardScrollAmount = () => {
    const container = sliderRef.current;
    if (!container || !container.firstElementChild) return 200;

    const firstCard = container.firstElementChild as HTMLElement;
    const gap = 16; // gap-4 (16px)
    return firstCard.offsetWidth + gap;
  };

  // Tracks active card index based on single card scroll distance
  const handleScroll = () => {
    const container = sliderRef.current;
    if (!container) return;

    const cardAmount = getSingleCardScrollAmount();
    if (cardAmount === 0) return;

    const index = Math.round(container.scrollLeft / cardAmount);
    setActiveIndex(index);
  };

  // Scrolls to a specific card index
  const scrollToCard = (index: number) => {
    const container = sliderRef.current;
    if (!container) return;

    container.scrollTo({
      left: index * getSingleCardScrollAmount(),
      behavior: "smooth",
    });
  };

  // Auto Slide Logic: advances 1 card at a time
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const container = sliderRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({
          left: getSingleCardScrollAmount(),
          behavior: "smooth",
        });
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
  }, [products.length, itemsPerPage]);

  // Dots indicator count (total steps available to scroll one by one)
  const totalSteps = Math.max(1, products.length - itemsPerPage + 1);

  return (
    <section className="container mx-auto px-3 sm:px-4 md:px-10 lg:px-20 sm:py-5 md:py-4 lg:py-5 bg-background">
      {/* Header Section */}
      {title && (
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-xl md:text-3xl text-text-primary font-bold mt-2 capitalize">
            {title}
          </h2>
        </div>
      )}

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
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar cursor-grab select-none py-2"
        >
          {products.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="snap-start flex-shrink-0 w-[calc(50%-8px)] md:w-[calc(33.333%-10.666px)] lg:w-[calc(16.666%-13.333px)] bg-background border rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group/card flex flex-col"
            >
              {/* Product Image Area */}
              <div className="relative snap-start aspect-square w-full flex items-center justify-center p-2 bg-background/10 overflow-hidden">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  width={500}
                  height={500}
                
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105 pointer-events-none"
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
                </div>
              </div>

              {/* Product Details */}
              <Link
                href={`/products/${item.slug}`}
                className="p-2 sm:p-3 flex-1 flex flex-col justify-between"
              >
                <div>
                  <h2 className="font-semibold text-text-primary text-xs sm:text-sm md:text-base line-clamp-1 hover:text-primary transition">
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
                    <span className="font-bold text-destructive text-sm sm:text-base md:text-lg">
                      {currency} {item.sale_price}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel Indicators (Dots) */}
        {products.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-1.5 pt-4">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
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