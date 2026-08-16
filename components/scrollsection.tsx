"use client";

import React, { useRef, useState } from "react";
import useSWR from "swr";
import Link from "next/link";

interface Brand {
  id: number;
  name: string;
  slug: string | null;
  image: string | null;
  image_variants: string[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  image_url?: string;
  image_variants?: string[];
  is_top?: boolean;
  sort_order?: number;
  brand?: Brand[];
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

//  "https://demo.app.taskcocommerce.com/api/v1/categories?is_top=true";

const DEFAULT_API_URL =
  "https://demo.app.taskcocommerce.com/api/v1/categories?is_top=true";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

export default function CategorySection(props: CategorySectionProps) {
  const [activeItem, setActiveItem] = useState<{
    category: Category;
    rect: DOMRect;
  } | null>(null);

  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isLoading, error } = useSWR<ApiResponse>(
    props.apiUrl || DEFAULT_API_URL,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const categories = data?.data || [];

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, item: Category) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    const rect = e.currentTarget.getBoundingClientRect();

    setActiveItem({
      category: item,
      rect,
    });
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 200);
  };

  if (isLoading) {
    return null;
  }

  if (error) {
    console.error("Category API Error:", error);
    return null;
  }

  if (!categories.length) {
    return null;
  }

  const halfLength = Math.ceil(categories.length / 2);

  const row1Categories = categories.slice(0, halfLength);
  const row2Categories = categories.slice(halfLength);

  const row1Loop = [...row1Categories,  ...row1Categories, ...row1Categories,];
  const row2Loop = [...row2Categories,  ...row2Categories,...row1Categories,];

  return (
    <section className="py-5 sm:py-5 md:py-8 lg:py-10 container mx-auto px-4 md:px-16 bg-background overflow-hidden">
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

      {/* Section Title */}

      <div className="container mx-auto px-4 md:px-8 mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-text-primary text-center">
          {props.sectionTitle || data?.title || "Featured Categories"}
        </h2>

       
      </div>

      {/* Category Marquee */}

      <div className="marquee-container flex flex-col">
        {/* ROW 1 */}

        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee-left flex">
            {row1Loop.map((item, index) => {
              const imgSrc = item.image || item.image_url || "/placeholder.png";

              return (
                <div key={`r1-${item.id}-${index}`}
                 onMouseEnter={(e) => handleMouseEnter(e, item)} 
                 onMouseLeave={handleMouseLeave}
                  className="flex-shrink-0">
                  <Link href={`/category/${item.slug}`}>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-ring/20 border-r border-t flex items-center justify-center transition-transform duration-300 hover:scale-105">
                      <img src={imgSrc} alt={item.name} className="max-h-full max-w-full object-contain p-1 pointer-events-none" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2 */}

        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee-right flex">
            {row2Loop.map((item, index) => {
              const imgSrc = item.image || item.image_url || "/placeholder.png";

              return (
                <div key={`r2-${item.id}-${index}`}
                 onMouseEnter={(e) => handleMouseEnter(e, item)}
                  onMouseLeave={handleMouseLeave}
                   className="flex-shrink-0">
                  <Link href={`/category/${item.slug}`}>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-y border-r border-ring/20 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                      <img src={imgSrc} alt={item.name} className="max-h-full max-w-full object-contain pointer-events-none" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hover Popup */}

      {activeItem && (
        <div
          onMouseEnter={() => {
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
            }
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
          <div className="bg-background rounded-xl p-4 shadow-xl border border-ring/10 min-w-[180px] max-w-[340px]">
            {/* Category Name */}

            <Link href={`/category/${activeItem.category.slug}`} className="block text-sm font-bold text-ring hover:text-primary transition-colors text-center mb-3">
              {activeItem.category.name}
            </Link>

            {/* Brands */}

            {activeItem.category.brand && activeItem.category.brand.length > 0 ? (
              <div className="border-t border-ring/10 pt-3">
                <div className="grid grid-cols-2 gap-2">
                  {activeItem.category.brand.map((brand) => {
                    const brandImage = brand.image || null;

                    return (
                      <Link key={brand.id}
                       href={brand.slug ? `/brand/${brand.slug}` : `/brand/${brand.id}`}
                        className="flex items-center gap-2 rounded-lg p-2 hover:bg-ring/5 transition-colors min-w-0">
                        {/* Brand Logo */}

                        <div className="w-10 h-10 shrink-0 rounded-md border border-ring/10 flex items-center justify-center overflow-hidden bg-background">
                          {brandImage ? (
                            <img src={brandImage}
                             alt={brand.name} 
                             className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-sm font-bold text-muted-foreground">
                              {brand.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>

                        {/* Brand Name */}

                        <span className="text-xs sm:text-sm font-medium text-ring line-clamp-1">
                          {brand.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="border-t border-ring/10 pt-3 text-center">
                <span className="text-xs text-muted-foreground">
                  No brands available
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}