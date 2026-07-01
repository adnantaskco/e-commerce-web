"use client";

import Link from 'next/link';
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaEye,
} from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../../app/src/components/context/CartContext";
import { DataFeature } from "@/lib/Datafeature";

export default function ProductSlider() {
  const { addToCart } = useCart();

  const [hovered, setHovered] = useState<number | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Drag refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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

      const maxScroll =
        container.scrollWidth - container.clientWidth;

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

  // =========================
  // DRAG FUNCTIONS
  // =========================

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
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

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
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
    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
<section className="container mx-auto px-6 md:px-10 lg:px-20 md:py-16 py-8 bg-white">
  {/* TITLE */}
  <div className="text-center mb-10">
    <span className="uppercase tracking-[5px] text-primary font-semibold">
      Feature Products
    </span>

    <h1 className="text-3xl md:text-5xl font-bold sm:font-semibold mt-4">
      New Feature Products
    </h1>

    <div className="flex justify-center pt-4">
      <div className="border-t-4 border-primary w-60"></div>
    </div>
  </div>

  {/* SLIDER WRAPPER */}
 <div className="relative">
    {/* LEFT BUTTON */}
    <button
      onClick={() => scroll("left")}
      className="
        hidden md:flex
        absolute
        left-0
        md:-left-5
        lg:-left-6
        top-1/2
        -translate-y-1/2
        z-30
        w-12
        h-12
        rounded-full
        bg-white
        shadow-lg
        border
        items-center
        justify-center
        hover:bg-primary
        hover:text-white
        transition
      "
    >
      <ChevronLeft size={22} />
    </button>

    {/* RIGHT BUTTON */}
    <button
      onClick={() => scroll("right")}
      className="
        hidden md:flex
        absolute
        right-0
        md:-right-3
        lg:-right-3
        top-1/2
        -translate-y-1/2
        z-30
        w-12
        h-12
        rounded-full
        bg-white
        shadow-lg
        border
        items-center
        justify-center
        hover:bg-primary
        hover:text-white
        transition
      "
    >
      <ChevronRight size={22} />
    </button>

    {/* SLIDER */}
    <div
      ref={sliderRef}
      onMouseEnter={() =>
        intervalRef.current &&
        clearInterval(intervalRef.current)
      }
      onMouseLeave={stopDragging}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      className="
        flex
        gap-3
        md:gap-6
        overflow-x-auto
        scroll-smooth
        no-scrollbar
        cursor-grab
        select-none
        touch-pan-x
        pb-2
      "
    >
      {DataFeature.map((item) => (
        <div
          key={item.id}
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
          className="
            flex-shrink-0
            w-[48%]
            md:w-[31.5%]
            lg:w-[23.5%]
            bg-white
            border
            rounded-xl
            overflow-hidden
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-xl
            group
          "
        >
          {/* IMAGE */}
          <div className="relative h-[180px] sm:h-[180px] md:h-[260px] lg:h-[280px] bg-gray-100 flex items-center justify-center">
            <Image
              src={item.image}
              alt={item.name}
              width={240}
              height={280}
              draggable={false}
              className="object-contain max-h-full pointer-events-none"
            />

            {/* DISCOUNT */}
            <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-primary text-white text-[10px] sm:text-xs font-medium sm:font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md">
              {item.discount}%
            </div>

            {/* ACTION BUTTONS */}
            <div
              className={`
                absolute top-5 right-4
                flex flex-col gap-3
                transition-all duration-300
                ${
                  hovered === item.id
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-5"
                }
                group-hover:opacity-100
                group-hover:translate-x-0
              `}
            >
              <button className="w-5 h-5 sm:w-5 sm:h-5 md:w-10 md:h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-primary hover:text-white transition">
                <FaHeart />
              </button>

              <button
                onClick={() =>
                  addToCart({
                    id: item.id,
                    image: item.image,
                    brand: item.brand,
                    name: item.name,
                    price: item.price,
                  })
                }
                className="w-5 h-5 sm:w-5 sm:h-5 md:w-10 md:h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <FaShoppingCart />
              </button>

              <button className="w-5 h-5 sm:w-5 sm:h-5 md:w-10 md:h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-blue-500 hover:text-white transition">
                <FaEye />
              </button>
            </div>
          </div>
                 <Link href={`/products/${item.id}`}>
          {/* CONTENT */}
          <div className="p-3 md:p-4">
            <p className="text-xs md:text-sm text-gray-500">
              {item.brand}
            </p>

            <h2 className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold mt-1 text-sm md:text-base min-h-[28px] line-clamp-2">
              {item.name}
            </h2>

            <div className="flex gap-1 text-yellow-400 mt- text-sm">
              {[...Array(item.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-3 items-center">
              <span className="line-through text-gray-400 text-sm">
                ${item.oldPrice}
              </span>

              <span className="text-red-500 font-bold text-base">
                ${item.price}
              </span>
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