import React, { useState } from 'react';
import useSWR from 'swr';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// API Data Interfaces
interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  is_top?: boolean;
  sort_order?: number;
  children?: Category[];
}

interface ApiResponse {
  data: Category[];
}

const API_URL = 'https://demo.app.taskcocommerce.com/api/v1/categories';
const FALLBACK_IMAGE = 'https://via.placeholder.com/150?text=No+Image';

const fetcher = async (url: string): Promise<ApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default function CategorySection2() {
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});

  // Embla Carousel Hook set to slide 2 columns at a time
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 2,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(API_URL, fetcher, {
    revalidateOnFocus: false,
  });

  const toggleSubcategories = (id: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-5 w-24 bg-gray-200 rounded-md animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-100 rounded-xl mb-3" />
              <div className="h-4 w-28 bg-gray-100 rounded mb-2" />
              <div className="h-3 w-16 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-100 rounded-2xl text-center">
        <p className="text-red-600 font-medium text-sm mb-4">Unable to load categories right now.</p>
        <button
          onClick={() => mutate()}
          className="px-5 py-2.5 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-700 transition-all shadow-sm active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  const categories = data?.data || [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">Explore</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Shop by Category
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
            {categories.length} Categories
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={scrollPrev}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={scrollNext}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Carousel Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 sm:gap-6">
          {categories.map((category) => {
            const hasChildren = Boolean(category.children && category.children.length > 0);
            const isExpanded = Boolean(expandedCategories[category.id]);

            return (
              <div
                key={category.id}
                className="flex-[0_0_calc(50%-8px)] sm:flex-[0_0_calc(50%-12px)] min-w-0"
              >
                <div className="group relative bg-white rounded-2xl border border-gray-100 p-4 flex flex-col justify-between h-full hover:shadow-xl hover:shadow-gray-200/50 hover:border-blue-100 transition-all duration-300">
                  {category.is_top && (
                    <span className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Top
                    </span>
                  )}

                  <div>
                    <a href={`/category/${category.slug}`} className="block">
                      <div className="w-full aspect-square rounded-xl bg-gradient-to-b from-gray-50 to-gray-100/50 mb-3 flex items-center justify-center overflow-hidden relative">
                        <img
                          src={category.image || FALLBACK_IMAGE}
                          alt={category.name}
                          className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300 ease-out"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
                      </div>

                      <h3 className="font-semibold text-gray-800 text-center text-sm sm:text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                        {category.name}
                      </h3>
                    </a>
                  </div>

                  {hasChildren && category.children && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => toggleSubcategories(category.id)}
                        className="w-full text-xs font-semibold text-gray-600 hover:text-blue-600 flex items-center justify-between px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-blue-50/50 transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span>Subcategories</span>
                          <span className="bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                            {category.children.length}
                          </span>
                        </span>
                        <svg
                          className={`w-3.5 h-3.5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div className="mt-2 p-2 bg-gray-50/80 rounded-xl border border-gray-100 animate-fadeIn">
                          <ul className="space-y-1 max-h-36 overflow-y-auto pr-1 text-xs text-gray-600 custom-scrollbar">
                            {category.children.map((sub) => (
                              <li key={sub.id}>
                                <a
                                  href={`/category/${sub.slug}`}
                                  className="block px-2 py-1 rounded-md hover:bg-white hover:text-blue-600 hover:shadow-xs transition-all truncate"
                                >
                                  {sub.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}