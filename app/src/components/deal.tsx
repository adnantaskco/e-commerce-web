"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaShoppingCart, FaStar, FaEye } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "./context/CartContext";

type Product = {
  id: number;
  name: string;
  image: string;
  brand: string;
  price: number;
  oldPrice: number;
  rating: number;
  discount: number;
  timer: string;
};

const products: Product[] = [
  {
    id: 51,
    name: "Casual Hudi",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/4/34-home_default.jpg",
    price: 27,
    oldPrice: 30,
    brand: "EcoShop",
    rating: 4,
    discount: -10,
    timer: "7d : 10h : 09m : 40s",
  },
  {
    id: 52,
    name: "Casual Summer T-Shirt",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/140-large_default/textured-top-with-cuffed-sleeves.jpg",
    price: 18,
    oldPrice: 22,
    brand: "EcoShop",
    rating: 5,
    discount: -15,
    timer: "7d : 05h : 12m : 10s",
  },
  {
    id: 53,
    name: "Slim Fit Jacket",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/9/39-home_default.jpg",
    price: 35,
    oldPrice: 40,
    brand: "EcoShop",
    rating: 4,
    discount: -12,
    timer: "300d : 02h : 44m : 55s",
  },
  {
    id: 54,
    name: "Classic T-shirt",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/4/1/41-home_default.jpg",
    price: 45,
    oldPrice: 55,
    brand: "EcoShop",
    rating: 5,
    discount: -20,
    timer: "7d : 14h : 20m : 11s",
  },
  {
    id: 55,
    name: "Summer Shirt",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/4/3/43-home_default.jpg",
    price: 60,
    oldPrice: 75,
    brand: "EcoShop",
    rating: 4,
    discount: -18,
    timer: "7d : 08h : 19m : 50s",
  },
  {
    id: 56,
    name: "Fashion Shirt",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/4/5/45-home_default.jpg",
    price: 50,
    oldPrice: 65,
    brand: "EcoShop",
    rating: 5,
    discount: -25,
    timer: "7d : 11h : 33m : 22s",
  },
  {
    id: 57,
    name: "Summer Shirt",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/4/7/47-home_default.jpg",
    price: 80,
    oldPrice: 95,
    brand: "EcoShop",
    rating: 4,
    discount: -15,
    timer: "7d : 03h : 12m : 01s",
  },
  {
    id: 58,
    name: "Woman's Jacket",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/4/9/49-home_default.jpg",
    price: 120,
    oldPrice: 150,
    brand: "EcoShop",
    rating: 5,
    discount: -30,
    timer: "600d : 20h : 45m : 59s",
  },
  {
    id: 59,
    name: "Woman's Jacket",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/5/1/51-home_default.jpg",
    price: 90,
    oldPrice: 110,
    brand: "EcoShop",
    rating: 4,
    discount: -22,
    timer: "7d : 09h : 10m : 30s",
  },
  {
    id: 60,
    name: "Women's Dress",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/5/3/53-home_default.jpg",
    price: 70,
    oldPrice: 85,
    brand: "EcoShop",
    rating: 5,
    discount: -17,
    timer: "7d : 12h : 55m : 10s",
  },
];

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
<section className="container mx-auto px-6 md:px-10 lg:px-20 py-16 bg-white">
  {/* TITLE */}
  <div className="text-center mb-10">
    <span className="uppercase tracking-[5px] text-primary font-semibold">
      Weekend Deal
    </span>

    <h1 className="text-4xl md:text-5xl font-bold mt-4">
      Weekend Feature Deal Products
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
        flex
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
        absolute
        right-0
        md:-right-4
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
        flex
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
        gap-6
        overflow-x-auto
        scroll-smooth
        no-scrollbar
        cursor-grab
        select-none
        touch-pan-x
      "
    >
      {products.map((item) => (
        <div
          key={item.id}
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
          className="
            flex-shrink-0
            w-[50%]
            md:w-[33.33%]
            lg:w-[23.33%]
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
          <div className="relative h-[280px] bg-gray-100 flex items-center justify-center">
            <Image
              src={item.image}
              alt={item.name}
              width={260}
              height={300}
              draggable={false}
              className="object-contain pointer-events-none"
            />

            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
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
              <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-primary hover:text-white transition">
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
                className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <FaShoppingCart />
              </button>

              <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-blue-500 hover:text-white transition">
                <FaEye />
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-4">
            <p className="text-sm text-gray-500">
              {item.brand}
            </p>

            <h2 className="font-semibold mt-1">
              {item.name}
            </h2>

            <div className="flex gap-1 text-yellow-400 mt-2">
              {[...Array(item.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <div className="flex gap-2 mt-3 items-center">
              <span className="line-through text-gray-400">
                ${item.oldPrice}
              </span>

              <span className="text-red-500 font-bold">
                ${item.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}