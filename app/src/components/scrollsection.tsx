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

    const scrollAmount = window.innerWidth < 640 ? 250 : 350;

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
          "url('https://static.vecteezy.com/system/resources/thumbnails/027/055/861/small/asian-girls-holding-sale-shopping-bags-consumerism-lifestyle-concept-in-the-shopping-mall-lady-tourist-walk-shopping-center-with-shopping-bags-photo.jpg')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* title */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold">
            Shop By Category
          </h2>

          <div className="w-20 sm:w-28 h-[3px] bg-primary mx-auto mt-4 sm:mt-5"></div>
        </div>

        {/* left button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 
          w-10 h-10 sm:w-12 sm:h-12 rounded-full 
          bg-white/20 backdrop-blur-md text-white 
          flex items-center justify-center 
          hover:bg-primery duration-300"
        >
          <ChevronLeft size={24} />
        </button>

        {/* right button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 
          w-10 h-10 sm:w-12 sm:h-12 rounded-full 
          bg-[#f4a896] text-white 
          flex items-center justify-center 
          hover:bg-white/20 duration-300"
        >
          <ChevronRight size={24} />
        </button>

        {/* slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {categories.map((item) => (
            <div
              key={item.id}
              className="
              min-w-[220px]
              sm:min-w-[260px]
              md:min-w-[280px]
              flex-shrink-0 text-center"
            >
              {/* card */}
              <div className="bg-white p-5 sm:p-8 md:p-10">
                <div className="relative w-full h-[180px] sm:h-[220px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain hover:scale-105 duration-300"
                  />
                </div>
              </div>

              {/* text */}
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mt-4 sm:mt-5">
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