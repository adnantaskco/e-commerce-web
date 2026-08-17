"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Link from "next/link";

// SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ChildCategory {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  is_top: boolean;
  children?: ChildCategory[];
}

export default function ShopByCategory() {
  const { data, error, isLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/categories",
    fetcher
  );

  // State to track which child category image is currently being hovered
  const [hoveredChildImage, setHoveredChildImage] = useState<{
    categoryId: number;
    image: string;
  } | null>(null);

  const categories: Category[] = data?.data || [];

  return (
    <section
      className="relative w-full py-16 bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/036/214/523/small/ai-generated-empty-supermarket-cart-on-blue-background-ready-for-shopping-generated-by-ai-free-photo.jpg')",
      }}
    >
      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-ring/10" />

      <div className="relative container mx-auto px-4 z-10">
        {/* SECTION TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            Shop By Category
          </h2>
          <div className="flex justify-center mt-3">
            <div className="h-[2px] w-14 bg-[#C2A38E]"></div>
          </div>
        </div>

        {/* SKELETON / ERROR / MARQUEE TICKER */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center animate-pulse">
                <div className="w-full h-44 bg-slate-200/60 rounded-md shadow-md" />
                <div className="mt-4 h-4 w-2/3 bg-slate-200/60 rounded" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-white">Failed to load categories.</div>
        ) : (
          /* MARQUEE CONTAINER WRAPPER */
          <div className="relative w-full overflow-hidden marquee-wrapper">
            <div className="flex w-max gap-6 animate-marquee">
              {/* Duplicate array for continuous loop */}
              {[...categories, ...categories].map((category, idx) => {
                const activeChildImage =
                  hoveredChildImage?.categoryId === category.id
                    ? hoveredChildImage.image
                    : null;

                return (
                  <div
                    key={`${category.id}-${idx}`}
                    className="w-44 flex-shrink-0 flex flex-col items-center"
                  >
                    {/* LINK WRAPPED AROUND EQUAL-SIZE IMAGE CONTAINER */}
                    <Link
                      href={`/category/${category.slug}`}
                      className="w-44 h-44 bg-white rounded-md p-4 flex items-center justify-center shadow-md transition-transform duration-300 hover:-translate-y-1 relative block overflow-hidden"
                    >
                      {/* SHOW CHILD IMAGE ON HOVER IF AVAILABLE, OTHERWISE PARENT IMAGE */}
                      {activeChildImage || category.image ? (
                        <img
                          src={activeChildImage || category.image!}
                          alt={category.name}
                          className="w-full h-full object-contain transition-all duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-medium text-xs rounded">
                          No Image
                        </div>
                      )}
                    </Link>

                    {/* LINK WRAPPED AROUND CATEGORY TITLE & CHILD COUNT */}
                    <Link
                      href={`/category/${category.slug}`}
                      className="mt-3 text-center font-semibold text-white text-sm tracking-wide hover:text-[#C2A38E] transition-colors line-clamp-1 block"
                    >
                      {category.name}
                      {category.children && category.children.length > 0 && (
                        <span className="ml-1 text-xs text-[#C2A38E]">
                          ({category.children.length})
                        </span>
                      )}
                    </Link>

                    {/* CHILD CATEGORIES LINKS */}
                    {category.children && category.children.length > 0 && (
                      <div className="mt-1 flex flex-wrap justify-center gap-1 max-w-[176px]">
                        {category.children.map((child) => (
                          <Link
                            key={child.id}
                            href={`/category/${child.slug}`}
                            onMouseEnter={() => {
                              if (child.image) {
                                setHoveredChildImage({
                                  categoryId: category.id,
                                  image: child.image,
                                });
                              }
                            }}
                            onMouseLeave={() => setHoveredChildImage(null)}
                            className="text-[11px] bg-black/50 text-gray-200 px-2 py-0.5 rounded-full line-clamp-1 hover:bg-[#C2A38E] hover:text-white transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* TAILWIND & CUSTOM STYLES */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
        }
        /* PAUSE ANIMATION WHEN HOVERING ANYWHERE INSIDE THE MARQUEE WRAPPER */
        .marquee-wrapper:hover .animate-marquee {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}