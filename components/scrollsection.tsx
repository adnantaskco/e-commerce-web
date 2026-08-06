"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import useSWR from "swr";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  image_url?: string;
  image_variants?: string;
  children?: Category[];
}

interface ApiResponse {
  data: Category[];
  title?: string;
  view_all_text?: string;
  view_all_url?: string;
  error_message?: string;
  empty_message?: string;
  try_again_text?: string;
}

interface CategorySectionProps {
  sectionTitle?: string;
  viewAllText?: string;
  viewAllLink?: string;
  errorMessage?: string;
  emptyMessage?: string;
  tryAgainText?: string;
  apiUrl?: string;
}

const DEFAULT_API_URL = "https://demo.app.taskcocommerce.com/api/v1/categories";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CategorySection(props: CategorySectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active item and trigger positioning state
  const [activeItem, setActiveItem] = useState<{
    category: Category;
    rect: DOMRect;
  } | null>(null);

  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(
    props.apiUrl || DEFAULT_API_URL,
    fetcher,
    { revalidateOnFocus: false }
  );

  const categories = data?.data || [];
  const getScroll = useCallback(
    () =>
      (sliderRef.current?.querySelector(".category-card") as HTMLElement)
        ?.offsetWidth + 16 || 200,
    []
  );

  const scroll = (dir: "left" | "right") => {
    setActiveItem(null);
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -getScroll() : getScroll(),
      behavior: "smooth",
    });
  };

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!categories.length) return;
    intervalRef.current = setInterval(() => {
      const el = sliderRef.current;
      if (!el) return;
      el.scrollLeft >= el.scrollWidth - el.clientWidth - 10
        ? el.scrollTo({ left: 0, behavior: "smooth" })
        : el.scrollBy({ left: getScroll(), behavior: "smooth" });
    }, 3500);
  }, [categories, getScroll]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (categories.length) startAutoSlide();
    return () => stopAutoSlide();
  }, [categories, startAutoSlide, stopAutoSlide]);

  // Keep popover open while hovering over trigger or menu
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, item: Category) => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (!item.children || item.children.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveItem({ category: item, rect });
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 200); // 200ms grace period to move mouse into popup
  };

  return (
    <section className="py-10 bg-[#F9FAFB]">
      <div className="container mx-auto px-4 md:px-8 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
          {props.sectionTitle || data?.title || "Featured Categories"}
        </h2>

        {/* Navigation Buttons */}
        {(["left", "right"] as const).map((dir) => (
          <button
            key={dir}
            onClick={() => scroll(dir)}
            className={`hidden md:flex items-center justify-center absolute ${
              dir === "left" ? "left-1" : "right-1"
            } top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 shadow-md hover:bg-gray-50`}
          >
            {dir === "left" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        ))}

        {/* Slider Container */}
        <div
          ref={sliderRef}
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
          onScroll={() => setActiveItem(null)}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-2"
        >
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[42%] sm:w-[28%] md:w-[20%] lg:w-[14%] animate-pulse bg-white rounded-2xl p-4 border h-36"
              />
            ))}

          {error && (
            <div className="w-full text-center py-8 bg-white rounded-2xl border text-red-500">
              <p>{props.errorMessage || data?.error_message || "Failed to load categories."}</p>
              <button
                onClick={() => mutate()}
                className="mt-2 px-4 py-1.5 bg-gray-800 text-white text-xs rounded-lg"
              >
                {props.tryAgainText || data?.try_again_text || "Try Again"}
              </button>
            </div>
          )}

          {!isLoading &&
            !error &&
            categories.map((item, index) => {
              const imgSrc =
                item.image || item.image_url || item.image_variants || "/placeholder.png";

              return (
                <div
                  key={item.id ?? index}
                  className="category-card relative flex-shrink-0 w-[42%] sm:w-[28%] md:w-[20%] lg:w-[14%] snap-start"
                >
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm transition-all flex flex-col items-center text-center">
                    {/* Category Image */}
                    <Link href={`/category/${item.slug}`} className="w-full">
                      <div className="w-full h-28 md:h-32 bg-[#F5F5F5] rounded-xl flex items-center justify-center p-2 mb-3">
                        <img
                          src={imgSrc}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>

                    {/* Category Name Hover Trigger */}
                    <div className="w-full">
                      <Link href={`/category/${item.slug}`}>
                        <h3
                          onMouseEnter={(e) => handleMouseEnter(e, item)}
                          onMouseLeave={handleMouseLeave}
                          className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer py-1"
                        >
                          {item.name}
                        </h3>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Global Popover for Children Categories */}
        {activeItem &&
          activeItem.category.children &&
          activeItem.category.children.length > 0 && (
            <div
              onMouseEnter={() => {
                if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
                stopAutoSlide();
              }}
              onMouseLeave={handleMouseLeave}
              style={{
                position: "fixed",
                top: `${activeItem.rect.bottom}px`,
                left: `${activeItem.rect.left + activeItem.rect.width / 2}px`,
                transform: "translateX(-50%)",
              }}
              className="fixed z-50 pt-2"
            >
              <div className="flex gap-2 bg-white p-2.5 rounded-xl shadow-2xl border border-gray-200 min-w-max">
                {activeItem.category.children.map((child) => (
                  <Link
                    key={child.id}
                    href={`/category/${child.slug}`}
                    className="flex flex-col items-center w-14 hover:scale-105 transition-transform"
                  >
                    <div className="w-11 h-11 bg-gray-50 rounded-lg p-1 flex items-center justify-center border border-gray-100">
                      <img
                        src={
                          child.image ||
                          child.image_url ||
                          child.image_variants ||
                          "/placeholder.png"
                        }
                        alt={child.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <span className="text-[10px] text-gray-700 font-medium line-clamp-1 mt-1 text-center">
                      {child.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        {/* View All Button */}
        <div className="text-center mt-6">
          <Link
            href={props.viewAllLink || data?.view_all_text || "/categories"}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-700 hover:text-black uppercase tracking-wider"
          >
            {props.viewAllText || data?.view_all_text || "VIEW ALL"} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}