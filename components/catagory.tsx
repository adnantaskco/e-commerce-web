import React, { useState } from 'react';
import useSWR from 'swr';

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

const API_URL = 'https://sevenone-bd.app.taskcocommerce.com/api/v1/categories';
const FALLBACK_IMAGE = 'https://via.placeholder.com/150?text=No+Image';

// Typed fetcher function
const fetcher = async (url: string): Promise<ApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default function CategorySection2() {
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});

  // SWR hook with generic types
  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(API_URL, fetcher, {
    revalidateOnFocus: false,
  });

  const toggleSubcategories = (id: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-medium mb-3">Failed to load categories.</p>
        <button
          onClick={() => mutate()}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const categories = data?.data || [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Shop by Category
        </h2>
        <span className="text-sm font-medium text-gray-500">
          {categories.length} Categories
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {categories.map((category) => {
          const hasChildren = Boolean(category.children && category.children.length > 0);
          const isExpanded = Boolean(expandedCategories[category.id]);

          return (
            <div
              key={category.id}
              className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="w-full aspect-square rounded-lg bg-gray-50 mb-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={category.image || FALLBACK_IMAGE}
                    alt={category.name}
                    className="w-20 h-20 object-contain group-hover:scale-105 transition-transform duration-200"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />
                </div>

                <h3 className="font-semibold text-gray-800 text-center text-sm sm:text-base line-clamp-1">
                  {category.name}
                </h3>
              </div>

              {hasChildren && category.children && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => toggleSubcategories(category.id)}
                    className="w-full text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 focus:outline-none"
                  >
                    <span>{isExpanded ? 'Hide' : 'Subcategories'}</span>
                    <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full text-[10px]">
                      {category.children.length}
                    </span>
                  </button>

                  {isExpanded && (
                    <ul className="mt-2 space-y-1 divide-y divide-gray-50 max-h-36 overflow-y-auto text-xs">
                      {category.children.map((sub) => (
                        <li key={sub.id} className="pt-1">
                          <a
                            href={`/category/${sub.slug}`}
                            className="text-gray-600 hover:text-blue-600 block truncate"
                          >
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}