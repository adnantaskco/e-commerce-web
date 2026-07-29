'use client';

import React, { use, useState, useMemo } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ChevronUp, 
  ChevronDown,
  Search, 
  Loader2,
  Filter
} from 'lucide-react';
import { FaHeart, FaShoppingCart, FaEye, FaStar } from 'react-icons/fa';

interface Product {
  id: number | string;
  name: string;
  slug: string;
  category?: string;
  image?: string;
  sale_price: number | string;
  retail_price?: number | string;
  has_discount?: boolean;
  discount_price?: string;
  in_stock?: boolean;
  stock_qty?: number;
  created_at?: string;
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
});

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);

  // Filter States
  const [sort, setSort] = useState('default');
  const [limit, setLimit] = useState('20');
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('250000');
  const [hovered, setHovered] = useState<number | string | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Fetch all products for this category
  const { data: rawProducts, error, isLoading } = useSWR<Product[]>(
    slug ? `/api/products?category=${slug}` : null,
    fetcher
  );

  // ACTIVE FILTER LOGIC
  const filteredProducts = useMemo(() => {
    if (!rawProducts) return [];

    let result = [...rawProducts];

    // 1. Filter by Price Range
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    result = result.filter((p) => {
      const price = Number(p.sale_price);
      return price >= min && price <= max;
    });

    // 2. Apply Sorting
    if (sort === 'low-high') {
      result.sort((a, b) => Number(a.sale_price) - Number(b.sale_price));
    } else if (sort === 'high-low') {
      result.sort((a, b) => Number(b.sale_price) - Number(a.sale_price));
    }

    // 3. Apply Limit
    return result.slice(0, parseInt(limit, 10));
  }, [rawProducts, minPrice, maxPrice, sort, limit]);

  const categoryTitle = slug ? slug.replace(/-/g, ' ') : 'Category';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-6">
        
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Title and Back Button */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 flex items-center justify-between sm:justify-start gap-3 shadow-sm">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.history.back()}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 capitalize truncate">
                {categoryTitle}
              </h1>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="lg:hidden flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200"
            >
              <Filter className="w-3.5 h-3.5" />
              Filters
            </button>
          </div>

          {/* Active Sort & Limit Controls */}
          <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center justify-between sm:justify-end gap-2 shadow-sm">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border border-gray-200 text-gray-600 text-xs sm:text-sm rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer w-1/2 sm:w-auto"
            >
              <option value="default">Default Sort</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>

            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="bg-transparent border border-gray-200 text-gray-600 text-xs sm:text-sm rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer w-1/2 sm:w-auto"
            >
              <option value="20">20 Items</option>
              <option value="40">40 Items</option>
              <option value="60">60 Items</option>
            </select>
          </div>
        </div>

        {/* Main Grid & Active Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6 items-start">
          
          {/* Sidebar Filter (Collapsible on Mobile) */}
          <aside className={`lg:col-span-1 bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm space-y-4 ${
            showMobileFilter ? 'block' : 'hidden lg:block'
          }`}>
            <div 
              className="flex items-center justify-between cursor-pointer select-none"
              onClick={() => setShowMobileFilter(!showMobileFilter)}
            >
              <h2 className="text-sm font-semibold text-gray-800">Price Range</h2>
              <ChevronUp className="w-4 h-4 text-gray-500 hidden lg:block" />
              <ChevronDown className="w-4 h-4 text-gray-500 lg:hidden" />
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-center text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Min"
                />
                <span className="text-gray-400 font-medium">-</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-center text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Max"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-400 font-medium">
                <span>Min: 0.00</span>
                <span>Max: 250,000.00</span>
              </div>
            </div>
          </aside>

          {/* Product Cards Grid */}
          <main className="lg:col-span-3">
            {isLoading && (
              <div className="bg-white border border-gray-200 rounded-lg min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center p-6 text-center shadow-sm">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-2" />
                <p className="text-xs sm:text-sm text-gray-500">Loading products...</p>
              </div>
            )}

            {error && !isLoading && (
              <div className="bg-white border border-red-200 rounded-lg min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center p-6 text-center shadow-sm">
                <p className="text-red-500 font-medium text-sm sm:text-base mb-1">Failed to load products</p>
                <p className="text-xs text-gray-400">Please check your backend connection.</p>
              </div>
            )}

            {!isLoading && !error && filteredProducts.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center p-6 text-center shadow-sm">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1">No products found</h3>
                <p className="text-xs sm:text-sm text-gray-400">Try adjusting your price range filter</p>
              </div>
            )}

            {!isLoading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="bg-white rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
                  >
                    <div className="relative bg-gray-50 h-[150px] sm:h-[240px] flex items-center justify-center p-2">
                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        width={260}
                        height={300}
                        unoptimized
                        className="object-contain max-h-full pointer-events-none"
                      />

                      {item.has_discount && (
                        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-red-500 text-white text-[9px] sm:text-xs font-bold px-1.5 py-0.5 rounded">
                          {item.discount_price}
                        </div>
                      )}

                      {/* Floating Action Buttons */}
                      <div
                        className={`absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 transition-all duration-300 ${
                          hovered === item.id
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 sm:group-hover:opacity-100 translate-x-2 sm:group-hover:translate-x-0"
                        }`}
                      >
                        <button className="w-7 h-7 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow hover:bg-emerald-500 hover:text-white text-xs sm:text-sm transition">
                          <FaHeart />
                        </button>
                        <button className="w-7 h-7 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow hover:bg-black hover:text-white text-xs sm:text-sm transition">
                          <FaShoppingCart />
                        </button>
                        <button className="w-7 h-7 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white text-xs sm:text-sm transition">
                          <FaEye />
                        </button>
                      </div>
                    </div>

                    <Link href={`/products/${item.slug}`}>
                      <div className="p-2.5 sm:p-4">
                        <p className="text-[10px] sm:text-xs text-gray-400 font-medium">Taskco</p>
                        <h2 className="text-xs sm:text-sm font-semibold truncate text-gray-800 mt-0.5">
                          {item.name}
                        </h2>
                        <div className="flex gap-0.5 text-yellow-400 text-[10px] sm:text-xs mt-1">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} />
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {item.has_discount && (
                            <span className="line-through text-gray-400 text-xs">
                              ৳{Number(item.retail_price).toFixed(0)}
                            </span>
                          )}
                          <span className="font-bold text-red-500 text-xs sm:text-sm">
                            ৳{Number(item.sale_price).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}