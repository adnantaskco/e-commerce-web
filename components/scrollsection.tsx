"use client";

import Image from "next/image";
import React, { useEffect, useRef, useCallback, useState } from "react";
import useSWR from "swr";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

// API Data Interfaces
interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  image_url?: string;
  image_variants?: string;
  is_top?: boolean;
  sort_order?: number;
  children?: Category[];
}

interface ApiResponse {
  data: Category[];
}

const API_URL = "https://demo.app.taskcocommerce.com/api/v1/categories";

// Typed fetcher function
const fetcher = async (url: string): Promise<ApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export default function CategorySection() {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<number, boolean>
  >({});

  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // SWR hook with generic types
  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(
    API_URL,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const categories = data?.data || [];

  const toggleSubcategories = (id: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getScrollAmount = useCallback(() => {
    const container = sliderRef.current;
    if (!container) return 350;

    const card = container.querySelector(".category-card") as HTMLElement;
    return card ? card.offsetWidth + 24 : 350;
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -getScrollAmount() : getScrollAmount(),
      behavior: "smooth",
    });
  };

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!categories || categories.length <= 1) return;

    intervalRef.current = setInterval(() => {
      const container = sliderRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

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
  }, [categories, getScrollAmount]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [categories, startAutoSlide, stopAutoSlide]);

  return (
    <section
      className="relative overflow-hidden py-8 md:py-20 lg:py-28"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1289003879/photo/beautiful-happy-and-excited-young-girl-friends-with-paper-bags-and-smart-phone-are-walking.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/70 to-foreground/90" />

      <div className="relative z-10 container mx-auto px-4 lg:px-20">
        {/* Heading Section */}
        <div className="text-center mb-14">
          <span className="uppercase tracking-[4px] text-primary font-semibold">
            Trending Collections
          </span>

          <h2 className="text-text-secondary text-2xl md:text-5xl font-bold sm:font-bold mt-4 lg:text-5xl">
            Shop By Category
          </h2>

          <div className="w-68 sm:w-48 h-1 bg-primary mx-auto mt-5 rounded-full" />
        </div>

        {/* Left Navigation Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className="
            hidden md:flex items-center justify-center
            absolute left-4 lg:left-8 top-2/3 -translate-y-1/2 z-20
            w-12 h-12 lg:w-14 lg:h-14
            rounded-full bg-background/20 backdrop-blur-md
            border border-ring/20 text-text-secondary
            hover:bg-primary hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-primary
            transition-all duration-300
          "
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Navigation Button (Fixed positioning class) */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className="
            hidden md:flex items-center justify-center
            absolute right-4 lg:right-8 top-2/3 -translate-y-1/2 z-20
            w-12 h-12 lg:w-14 lg:h-14
            rounded-full bg-background/20 backdrop-blur-md
            border border-ring/20 text-text-secondary
            hover:bg-primary hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-primary
            transition-all duration-300
          "
        >
          <ChevronRight size={24} />
        </button>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
          className="
            flex gap-4 sm:gap-6
            overflow-x-auto scroll-smooth
            snap-x snap-mandatory no-scrollbar
            px-2 py-4
          "
        >
          {/* 1. Loading State */}
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[48%] sm:w-[48%] md:w-[32%] lg:w-[24%] snap-start"
              >
                <div className="animate-pulse rounded-3xl bg-background/20 backdrop-blur-lg border border-text-secondary/10 overflow-hidden">
                  <div className="h-[180px] md:h-[260px] lg:h-[280px] bg-foreground/30" />
                  <div className="p-4 md:p-6 space-y-3">
                    <div className="h-4 bg-foreground/30 rounded w-3/4 mx-auto sm:mx-0" />
                    <div className="hidden md:block h-3 bg-foreground/20 rounded w-full" />
                  </div>
                </div>
              </div>
            ))}

          {/* 2. Error State */}
          {error && (
            <div className="w-full text-center py-10 text-text-secondary bg-background/10 backdrop-blur-md rounded-2xl border border-text-secondary/20">
              <p className="text-primary font-medium mb-3">Failed to load categories.</p>
              <button
                onClick={() => mutate()}
                className="px-4 py-2 bg-primary text-text-secondary text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            </div>
          )}

          {/* 3. Empty State */}
          {!isLoading && !error && categories.length === 0 && (
            <div className="w-full text-center py-10 text-text-secondary bg-background/10 backdrop-blur-md rounded-2xl border border-text-secondary/20">
              <p>No categories found.</p>
            </div>
          )}

          {/* 4. Loaded Cards State */}
          {!isLoading &&
            !error &&
            categories.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedCategories[item.id];

              return (
                <div
                  key={item.id ?? index}
                  className="
                    category-card
                    flex-shrink-0
                    w-[48%] sm:w-[48%]
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
                      bg-background/10 backdrop-blur-lg
                      border border-text-secondary/20
                      shadow-xl
                      transition-all duration-500
                      hover:-translate-y-2
                      hover:shadow-[0_15px_40px_rgba(243,59,59,0.3)]
                    "
                  >
                    {/* Image Container */}
                    <div className="relative h-[180px] md:h-[260px] lg:h-[280px] overflow-hidden">
                      <img
                        src={
                          item.image ||
                          item.image_url ||
                          item.image_variants ||
                          "/placeholder.png"
                        }
                        alt={item.name || "Category Image"}
                        className="
                          w-full h-full object-cover
                          transition-all duration-700
                          group-hover:scale-110
                        "
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                      {/* <span className="absolute top-4 sm:top-2 sm:left-2 left-4 bg-primary text-text-secondary text-xs sm:text-sm px-3 py-1 rounded-full font-semibold">
                        New Arrival
                      </span> */}
                    </div>

                    {/* Card Content Header */}
                    <div className="p-4 md:p-6 text-center sm:text-left">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-text-secondary whitespace-nowrap sm:text-sm text-sm md:text-lg font-bold group-hover:text-primary transition overflow-hidden text-ellipsis">
                         {`${item.name || "Unnamed Category"} (${item.children?.length})`}
                        </h3>

                        {hasChildren && (
                          <button
                            onClick={() => toggleSubcategories(item.id)}
                            className="p-1.5 rounded-full hover:bg-background/20 text-text-secondary transition-colors"
                            aria-label="Toggle subcategories"
                          >
                            {isExpanded ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </button>
                        )}
                      </div>



                      {/* Subcategories (Children) List */}
                      {hasChildren && isExpanded && (
                        <div className="mt-4 pt-3 border-t border-text-secondary/20 space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                          {item.children?.map((child) => (
                            <a
                              key={child.id}
                              href={`/category/${child.slug}`}
                              className="block text-xs md:text-sm text-text-secondary/90 hover:text-primary hover:underline transition-colors truncate"
                            >
                              • {child.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}