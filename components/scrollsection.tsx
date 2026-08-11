"use client";

import React, { useState, useRef } from "react";
import useSWR from "swr";
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
}

interface CategorySectionProps {
  sectionTitle?: string;
  apiUrl?: string;
}

const DEFAULT_API_URL = "https://demo.app.taskcocommerce.com/api/v1/categories";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CategorySection(props: CategorySectionProps) {
  const [activeItem, setActiveItem] = useState<{
    category: Category;
    rect: DOMRect;
  } | null>(null);

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading } = useSWR<ApiResponse>(
    props.apiUrl || DEFAULT_API_URL,
    fetcher,
    { revalidateOnFocus: false }
  );

  const categories = data?.data || [];

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    item: Category
  ) => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveItem({ category: item, rect });
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 200);
  };

  if (isLoading || !categories.length) {
    return null;
  }

  // Split categories into two rows
  const halfLength = Math.ceil(categories.length / 2);
  const row1Categories = categories.slice(0, halfLength);
  const row2Categories = categories.slice(halfLength);

  // Duplicate arrays to ensure seamless infinite looping
  const row1Loop = [...row1Categories, ...row1Categories, ...row1Categories];
  const row2Loop = [...row2Categories, ...row2Categories, ...row2Categories];

  return (
    <section className="py-10 container mx-auto px-4 md:px-16 bg-background overflow-hidden">
      {/* Keyframe Animations */}
      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 35s linear infinite;
        }

        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 35s linear infinite;
        }

        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-8 mb-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center">
          {props.sectionTitle || data?.title || "Featured Categories"}
        </h2>
      </div>

      <div className="marquee-container flex flex-col ">
        {/* ROW 1 (Scrolls Left) */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee-left flex ">
            {row1Loop.map((item, index) => {
              const imgSrc =
                item.image ||
                item.image_url ||
                item.image_variants ||
                "/placeholder.png";

              return (
                <div
                  key={`r1-${item.id}-${index}`}
                  onMouseEnter={(e) => handleMouseEnter(e, item)}
                  onMouseLeave={handleMouseLeave}
                  className="flex-shrink-0"
                >
                  <Link href={`/category/${item.slug}`}>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32   border-ring/20 border-r border-t flex items-center justify-center transition-transform duration-300 hover:scale-105">
                      <img
                        src={imgSrc}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain p-1  pointer-events-none"
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2 (Scrolls Right) */}
        <div className="flex overflow-hidden select-none ">
          <div className="animate-marquee-right flex ">
            {row2Loop.map((item, index) => {
              const imgSrc =
                item.image ||
                item.image_url ||
                item.image_variants ||
                "/placeholder.png";

              return (
                <div
                  key={`r2-${item.id}-${index}`}
                  onMouseEnter={(e) => handleMouseEnter(e, item)}
                  onMouseLeave={handleMouseLeave}
                  className="flex-shrink-0"
                >
                  <Link href={`/category/${item.slug}`}>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32  border-y border-r border-ring/20  flex items-center justify-center transition-transform duration-300 hover:scale-105">
                      <img
                        src={imgSrc}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain  pointer-events-none"
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hover Popover showing Category Name & Child Subcategories */}
      {activeItem && (
        <div
          onMouseEnter={() => {
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "fixed",
            top: `${activeItem.rect.bottom + 8}px`,
            left: `${activeItem.rect.left + activeItem.rect.width / 2}px`,
            transform: "translateX(-50%)",
          }}
          className="fixed z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="bg-white rounded-xl p-3 shadow-xl border border-gray-100 min-w-[140px] max-w-[280px] flex flex-col items-center gap-2">
            {/* Category Name */}
            <Link
              href={`/category/${activeItem.category.slug}`}
              className="text-xs font-bold text-gray-900 hover:text-blue-600 transition-colors text-center line-clamp-1"
            >
              {activeItem.category.name}
            </Link>

            {/* Child Subcategories (If present) */}
            {activeItem.category.children &&
              activeItem.category.children.length > 0 && (
                <div className="w-full border-t border-gray-100 pt-2 flex flex-wrap justify-center gap-2">
                  {activeItem.category.children.map((child) => (
                    <Link
                      key={child.id}
                      href={`/category/${child.slug}`}
                      className="flex flex-col items-center  hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-20 h-20 rounded-md border border-gray-100 flex items-center justify-center  overflow-hidden">
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
                      <span className="text-[10px] text-gray-600 font-medium text-center line-clamp-1 max-w-[60px]">
                        {child.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
          </div>
        </div>
      )}
    </section>
  );
}