"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Women T-Shirt",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cat-1.jpg",
  },
  {
    id: 2,
    name: "Leather Handbag",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cat-2.jpg",
  },
  {
    id: 3,
    name: "Burberry Sunglasses",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cat-3.jpg",
  },
  {
    id: 4,
    name: "Hooded Sweatshirt",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cat-4.jpg",
  },
  {
    id: 5,
    name: "Sneakers Shoes",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cat-5.jpg",
  },
  {
    id: 6,
    name: "Leather Belt Watch",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cat-6.jpg",
  },
];

const CategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (!container) return;

    const card = container.querySelector("div");
    const scrollAmount = card
      ? (card as HTMLElement).offsetWidth + 16
      : 260;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative bg-fixed bg-center bg-cover py-14 sm:py-20 md:py-24 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1289003879/photo/beautiful-happy-and-excited-young-girl-friends-with-paper-bags-and-smart-phone-are-walking.jpg')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* TITLE */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold">
            Shop By Category
          </h2>

          <div className="w-20 sm:w-28 h-[3px] bg-primary mx-auto mt-4 sm:mt-5"></div>
        </div>

        {/* LEFT BUTTON */}
        <button
          onClick={() => scroll("left")}
          className="
            absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20
            w-10 h-10 sm:w-12 sm:h-12
            rounded-full bg-black/40 text-white
            flex items-center justify-center
            hover:bg-black/70 transition
          "
        >
          <ChevronLeft size={24} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => scroll("right")}
          className="
            absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20
            w-10 h-10 sm:w-12 sm:h-12
            rounded-full bg-black/40 text-white
            flex items-center justify-center
            hover:bg-black/70 transition
          "
        >
          <ChevronRight size={24} />
        </button>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="
            flex gap-4 sm:gap-6
            overflow-x-auto scroll-smooth no-scrollbar
            scroll-snap-x
            px-2 sm:px-4
          "
        >
          {categories.map((item) => (
            <div
              key={item.id}
              className="
                flex-shrink-0
                w-full sm:w-full md:w-1/2 lg:w-1/4
                scroll-snap-align-start
                text-center
                group
              "
            >
              {/* CARD */}
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
                <div className="relative w-full h-[160px] sm:h-[200px] md:h-[220px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* TEXT */}
              <h3 className="text-white text-base sm:text-lg md:text-2xl font-semibold mt-3 sm:mt-5">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;