"use client";

import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function GallerySlider() {
  const gallery = [
    {
      id: 1,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-01.jpg",
      description:
        "How to Write a Blog Post Your Readers Will Love in 5 Steps",
    },
    {
      id: 2,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-06.jpg",
      description:
        "9 Content Marketing Trends and Ideas to Increase Traffic",
    },
    {
      id: 3,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-05.jpg",
      description:
        "The Ultimate Guide to Marketing Strategies to Improve Sales",
    },
    {
      id: 4,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-04.jpg",
      description:
        "50 Best Sales Questions to Determine Your Customer's Need",
    },
    {
      id: 5,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-02.jpg",
      description:
        "6 Simple Ways to Boost Your Ecommerce Conversion Rate",
    },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getScrollAmount = () => {
    const container = sliderRef.current;

    if (!container) return 0;

    const firstCard = container.children[0] as HTMLElement;

    if (!firstCard) return 0;

    return firstCard.offsetWidth + 24; // gap-6 = 24px
  };

  const scroll = (direction: "left" | "right") => {
    const container = sliderRef.current;

    if (!container) return;

    container.scrollBy({
      left:
        direction === "left"
          ? -getScrollAmount()
          : getScrollAmount(),
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

      const scrollAmount = getScrollAmount();

      const maxScrollLeft =
        container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft - 10) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 3000);
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
    <section className="py-12">
      <div className="relative  mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">
            Gallery
          </h1>
          <p className="mt-3 text-gray-600 font-medium">
            You Can Explore Ourself
          </p>
        </div>

        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-[60%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-[60%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          onMouseEnter={() => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }}
          onMouseLeave={startAutoSlide}
          className="
            flex gap-6
            overflow-x-auto
            scroll-smooth
            snap-x snap-mandatory
            no-scrollbar
          "
        >
          {gallery.map((item) => (
            <div
              key={item.id}
              className="
                flex-shrink-0
                w-full
                md:w-[calc((100%-48px)/3)]
                snap-start
                bg-white
                rounded-xl
                overflow-hidden
                shadow-md
                hover:shadow-xl
                transition-all duration-300
              "
            >
              <img
                src={item.image}
                alt={item.description}
                className="w-full h-[240px] object-cover"
              />

              <div className="p-5">
                <p className="text-md font-medium leading-6">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySlider;