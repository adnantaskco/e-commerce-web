"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getScrollAmount = () => {
    const container = sliderRef.current;
    if (!container) return 350;

    const card = container.querySelector(".category-card") as HTMLElement;
    return card ? card.offsetWidth + 24 : 350;
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
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const container = sliderRef.current;
      if (!container) return;

      const maxScroll =
        container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 20) {
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

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1289003879/photo/beautiful-happy-and-excited-young-girl-friends-with-paper-bags-and-smart-phone-are-walking.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/90" />

      <div className="relative z-10 container mx-auto px-4 lg:px-20">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-[4px] text-primary font-semibold">
            Trending Collections
          </span>

          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mt-3">
            Shop By Category
          </h2>

          <div className="w-28 h-1 bg-primary mx-auto mt-5 rounded-full" />
        </div>

        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="
            absolute left-4 lg:left-8 top-2/3 -translate-y-1/2 z-20
            w-12 h-12 lg:w-14 lg:h-14
            rounded-full
            bg-white/10
            backdrop-blur-md
            border border-white/20
            text-white
            hover:bg-primary
            hover:scale-110
            transition-all duration-300
          "
        >
          <ChevronLeft className="mx-auto" />
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="
            absolute right-3 lg:right-8 top-2/3 -translate-y-1/2 z-20
            w-12 h-12 lg:w-14 lg:h-14
            rounded-full
            bg-white/10
            backdrop-blur-md
            border border-white/20
            text-white
            hover:bg-primary
            hover:scale-110
            transition-all duration-300
          "
        >
          <ChevronRight className="mx-auto" />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
          className="
            flex gap-6
            overflow-x-auto
            scroll-smooth
            snap-x snap-mandatory
            no-scrollbar
            px-2
          "
        >
          {categories.map((item) => (
            <div
              key={item.id}
              className="
                category-card
                flex-shrink-0
                w-[85%]
                sm:w-[48%]
                md:w-[32%]
                lg:w-[24%]
                snap-start
                group
              "
            >
              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  bg-white/10
                  backdrop-blur-lg
                  border border-white/20
                  shadow-xl
                  transition-all duration-500
                  hover:-translate-y-3
                  hover:shadow-[0_15px_40px_rgba(243,59,59,0.4)]
                "
              >
                {/* Image */}
                <div className="relative h-[320px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="
                      object-cover
                      transition-all duration-700
                      group-hover:scale-110
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <span
                    className="
                      absolute top-4 left-4
                      bg-primary
                      text-white
                      text-xs
                      px-3 py-1
                      rounded-full
                      font-semibold
                    "
                  >
                    New Arrival
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3
                    className="
                      text-white
                      text-xl
                      font-bold
                      mb-2
                      transition
                      group-hover:text-primary
                    "
                  >
                    {item.name}
                  </h3>

                  <p className="text-gray-300 text-sm mb-5">
                    Explore our latest premium collection.
                  </p>

                  {/* <button
                    className="
                      px-5 py-2
                      rounded-full
                      bg-primary
                      text-white
                      font-medium
                      hover:scale-105
                      transition-all
                    "
                  >
                    Shop Now
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategorySection;