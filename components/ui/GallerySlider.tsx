"use client";

import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = {
  id: number;
  image: string;
  category: string;
  date: string;
  title: string;
};

const gallery: GalleryItem[] = [
  {
    id: 1,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-01.jpg",
    category: "Fashion",
    date: "May 20, 2026",
    title: "How to Write a Blog Post Your Readers Will Love in 5 Steps",
  },
  {
    id: 2,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-06.jpg",
    category: "Marketing",
    date: "May 24, 2026",
    title: "9 Content Marketing Trends and Ideas to Increase Traffic",
  },
  {
    id: 3,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-05.jpg",
    category: "Business",
    date: "May 27, 2026",
    title: "The Ultimate Guide to Marketing Strategies to Improve Sales",
  },
  {
    id: 4,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-04.jpg",
    category: "Sales",
    date: "May 30, 2026",
    title: "50 Best Sales Questions to Determine Your Customer Need",
  },
  {
    id: 5,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-02.jpg",
    category: "Ecommerce",
    date: "June 01, 2026",
    title: "6 Simple Ways to Boost Your Ecommerce Conversion Rate",
  },
];

export default function GallerySlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ✅ stable step = 1 card width (responsive safe)
  const getStep = () => {
    const container = sliderRef.current;
    if (!container) return 300;

    return container.clientWidth / 3;
  };

  const scroll = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -getStep() : getStep(),
      behavior: "smooth",
    });
  };

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const container = sliderRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 5) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: getStep(),
          behavior: "smooth",
        });
      }
    }, 2500);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-8 lg:py-12 bg-black/5">
      <div className="container mx-auto px-4 lg:px-20 relative z-10">

        {/* Heading */}
        <div className="text-center mb-4 md:mb-16 pb-4">
          <span className="uppercase tracking-[5px] text-primary font-semibold">
            Latest Articles
          </span>

          <h2 className="text-3xl md:text-5xl font-bold sm:font-semibold mt-4">
            Fashion Journal
          </h2>
          
          <div className="w-28 h-1 bg-primary mx-auto rounded-full mt-5" />
          
        </div>

        {/* Left Button */}
       {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="
            hidden md:flex
            absolute
            left-6 lg:left-12
            top-1/2
            -translate-y-1/2
            z-20
            w-12
            h-12
            items-center
            justify-center
            rounded-full
            bg-white
            border
            shadow-md
            hover:bg-primary
            hover:text-white
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          <ChevronLeft size={22} />
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="
            hidden md:flex
            absolute
            right-6 lg:right-12
            top-1/2
            -translate-y-1/2
            z-20
            w-12
            h-12
            items-center
            justify-center
            rounded-full
            bg-white
            border
            shadow-md
            hover:bg-primary
            hover:text-white
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          <ChevronRight size={22} />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          onMouseEnter={() => intervalRef.current && clearInterval(intervalRef.current)}
          onMouseLeave={startAutoSlide}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {gallery.map((item) => (
            <div
              key={item.id}
              className="
                flex-shrink-0
                w-full
                sm:w-1/2
                lg:w-1/3
                snap-start
              "
            >
              <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-xl hover:-translate-y-2 transition">

                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[320px] object-cover transition duration-700 hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <span className="absolute top-4 left-4 bg-primary text-xs px-3 py-1 rounded-full text-white">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-sm text-primary">{item.date}</p>

                  <h3 className="font-bold text-lg mt-2">
                    {item.title}
                  </h3>

                  <button className="mt-4 text-primary font-semibold">
                    Read More →
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}