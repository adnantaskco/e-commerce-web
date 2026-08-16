"use client";

import React, { useRef, useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface BlogItem {
  slug: string;
  title: string;
  media_url: string;
  created_at: string;
  short_description: string;
  created_by: string | null;
}

interface ApiResponse {
  data: BlogItem[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GallerySlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // State to manage modal open/close and selected article
  const [selectedArticle, setSelectedArticle] = useState<BlogItem | null>(null);

  // Fetch API data dynamically via SWR
  const { data, error, isLoading } = useSWR<ApiResponse>(
    "https://demo.app.taskcocommerce.com/api/v1/blogs",
    fetcher
  );

  const gallery = data?.data || [];

  // Calculates exact page scroll amount based on container width and gaps
  const getStep = () => {
    const container = sliderRef.current;
    if (!container) return 300;

    const isMobile = window.innerWidth < 768;
    const gap = isMobile ? 12 : 24; // gap-3 (12px) on mobile, gap-6 (24px) on md/lg

    return container.clientWidth + gap;
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
      if (selectedArticle) return;

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
    if (gallery.length > 0 && !selectedArticle) {
      startAutoSlide();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gallery, selectedArticle]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedArticle]);

  return (
    <section className="relative overflow-hidden py-4 lg:py-10 bg-foreground/5">
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
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-background border shadow-md hover:bg-primary hover:text-text-secondary hover:shadow-xl transition-all duration-300"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-6 lg:left-auto lg:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-background border shadow-md hover:bg-primary hover:text-text-secondary hover:shadow-xl transition-all duration-300"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          onMouseEnter={() => intervalRef.current && clearInterval(intervalRef.current)}
          onMouseLeave={startAutoSlide}
          className="flex gap-3 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {isLoading && (
            <div className="w-full text-center py-10 text-primary">
              Loading articles...
            </div>
          )}

          {error && (
            <div className="w-full text-center py-10 text-destructive">
              Failed to load articles.
            </div>
          )}

          {gallery.map((item) => (
            <div
              key={item.slug}
              /* 
                Mobile (<768px): 2 cards per view -> calc(50% - 6px) [1 gap of 12px]
                Tablet (768px-1023px): 3 cards per view -> calc(33.333% - 16px) [2 gaps of 24px]
                Desktop (>=1024px): 4 cards per view -> calc(25% - 18px) [3 gaps of 24px]
              */
              className="flex-shrink-0 w-[calc(50%-6px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] snap-start"
            >
              <div className="rounded-2xl overflow-hidden bg-background/5 border border-background/10 shadow-xl hover:-translate-y-2 transition h-full flex flex-col justify-between">
                <div>
                  {/* Image & Quick View trigger */}
                  <div
                    className="relative overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedArticle(item)}
                  >
                    <img
                      src={item.media_url}
                      alt={item.title}
                      className="w-full h-[160px] sm:h-[240px] object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                    <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-primary text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-text-secondary">
                      {item.created_by || "Article"}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 sm:p-4">
                    <p className="text-[10px] sm:text-xs text-primary">
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>

                    <Link href={`/blogs/${item.slug}`}>
                      <h3 className="font-bold text-xs sm:text-base text-text-primary mt-1 sm:mt-2 line-clamp-1 hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="text-ring line-clamp-2 text-xs sm:text-sm mt-1">
                      {item.short_description}
                    </p>
                  </div>
                </div>

                {/* Footer Action Link */}
                <div className="p-3 sm:p-4 pt-0 flex flex-wrap gap-1 justify-between items-center">
                  <Link
                    href={`/blogs/${item.slug}`}
                    className="text-primary font-semibold hover:underline text-xs sm:text-sm"
                  >
                    Read More →
                  </Link>

                  <button
                    onClick={() => setSelectedArticle(item)}
                    className="text-[10px] sm:text-xs text-text-primary/60 hover:text-primary transition"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-background border border-background/20 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-foreground/50 text-white flex items-center justify-center hover:bg-foreground/70 transition"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 md:h-80 w-full flex-shrink-0">
              <img
                src={selectedArticle.media_url}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-primary text-xs px-3 py-1 rounded-full text-text-secondary">
                {selectedArticle.created_by || "Article"}
              </span>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-sm text-primary font-medium">
                {new Date(selectedArticle.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <h2 className="text-2xl font-bold text-text-primary mt-2">
                {selectedArticle.title}
              </h2>
              <h5 className="text-sm text-text-primary/70 mt-1">
                Article Created By: {selectedArticle.created_by || "Unknown"}
              </h5>

              <p className="text-text-primary mt-4 leading-relaxed text-base">
                {selectedArticle.short_description}
              </p>

              <div className="mt-6">
                <Link
                  href={`/blogs/${selectedArticle.slug}`}
                  className="inline-block bg-primary text-text-secondary px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition"
                  onClick={() => setSelectedArticle(null)}
                >
                  View Full Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}