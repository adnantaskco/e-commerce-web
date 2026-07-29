"use client";

import React, { useRef, useEffect, useState } from "react";
import useSWR from "swr";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// API Item Interface
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
      // Pause auto-sliding if modal is open
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

        {/* Slider */}
        <div
          ref={sliderRef}
          onMouseEnter={() => intervalRef.current && clearInterval(intervalRef.current)}
          onMouseLeave={startAutoSlide}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {isLoading && (
            <div className="w-full text-center py-10 text-primary">
              Loading articles...
            </div>
          )}

          {error && (
            <div className="w-full text-center py-10 text-red-500">
              Failed to load articles.
            </div>
          )}

          {gallery.map((item) => (
            <div key={item.slug} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-start">
              <div className="rounded-2xl overflow-hidden bg-background/5 border border-background/10 shadow-xl hover:-translate-y-2 transition">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-[320px] object-cover transition duration-700 hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <span className="absolute top-4 left-4 bg-primary text-xs px-3 py-1 rounded-full text-text-secondary">
                    {item.created_by || "Article"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-sm text-primary">
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  <h3 className="font-bold text-lg text-text-primary mt-2 line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-ring line-clamp-2 text-md mt-1">
                    {item.short_description}
                  </p>

                  <button
                    onClick={() => setSelectedArticle(item)}
                    className="mt-4 text-primary font-semibold hover:underline"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-background border border-background/20 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
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
            <div className="p-6 overflow-y-auto">
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
              <h5>Artical Created BY  {selectedArticle.created_by || "Unknown"}</h5>

              <p className="text-text-primary mt-4 leading-relaxed text-base">
                {selectedArticle.short_description}
              </p>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}