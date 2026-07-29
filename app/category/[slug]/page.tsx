'use client';

import React, { use, useState, useMemo } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ChevronUp, 
  Search, 
  ShoppingBag, 
  Phone,
  Loader2
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
      <div className="container mx-auto px-4 px-16 py-6">
        
        {/* Top Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="bg-white border border-gray-200 rounded-lg px-5 py-2.5 flex items-center gap-3 shadow-sm min-w-[200px]">
            <button 
              onClick={() => window.history.back()}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 capitalize">
              {categoryTitle}
            </h1>
          </div>

          {/* Active Sort & Limit Controls */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center justify-end gap-3 shadow-sm flex-grow md:flex-grow-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border border-gray-200 text-gray-600 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>

            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="bg-transparent border border-gray-200 text-gray-600 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="20">20 Products</option>
              <option value="40">40 Products</option>
              <option value="60">60 Products</option>
            </select>
          </div>
        </div>

        {/* Main Grid & Active Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6 items-start">
          
          {/* Active Sidebar Filter */}
          <aside className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between select-none">
              <h2 className="text-sm font-semibold text-gray-800">Price Range</h2>
              <ChevronUp className="w-4 h-4 text-gray-500" />
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-gray-400 font-medium">-</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>Min: 0.00</span>
                <span>Max: 250,000.00</span>
              </div>
            </div>
          </aside>

          {/* Product Cards */}
          <main className="lg:col-span-3">
            {isLoading && (
              <div className="bg-white border border-gray-200 rounded-lg min-h-[400px] flex flex-col items-center justify-center p-8 text-center shadow-sm">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-2" />
                <p className="text-sm text-gray-500">Loading products...</p>
              </div>
            )}

            {error && !isLoading && (
              <div className="bg-white border border-red-200 rounded-lg min-h-[400px] flex flex-col items-center justify-center p-8 text-center shadow-sm">
                <p className="text-red-500 font-medium mb-1">Failed to load products</p>
                <p className="text-xs text-gray-400">Please check your backend connection.</p>
              </div>
            )}

            {!isLoading && !error && filteredProducts.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg min-h-[400px] flex flex-col items-center justify-center p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-1">No products found</h3>
                <p className="text-sm text-gray-400">Try adjusting your price range filter</p>
              </div>
            )}

            {!isLoading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="bg-background rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
                  >
                    <div className="relative bg-background h-[140px] sm:h-[280px] flex items-center justify-center p-2">
                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        width={260}
                        height={300}
                        unoptimized
                        className="object-contain max-h-full pointer-events-none"
                      />

                      {item.has_discount && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded">
                          {item.discount_price}
                        </div>
                      )}

                      <div
                        className={`absolute top-2 right-2 sm:top-5 sm:right-4 flex flex-col gap-2 transition-all duration-300 ${
                          hovered === item.id
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      >
                        <button className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-primary hover:text-white transition">
                          <FaHeart />
                        </button>
                        <button className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-black hover:text-white transition">
                          <FaShoppingCart />
                        </button>
                        <button className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition">
                          <FaEye />
                        </button>
                      </div>
                    </div>

                    <Link href={`/products/${item.slug}`}>
                      <div className="p-2 sm:p-4">
                        <p className="text-[11px] sm:text-sm text-gray-500">Taskco</p>
                        <h2 className="text-xs sm:text-base font-semibold truncate text-text-primary">
                          {item.name}
                        </h2>
                        <div className="flex gap-1 text-yellow-400 text-xs mt-2">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {item.has_discount && (
                            <span className="line-through text-gray-400 text-sm">
                              ৳{Number(item.retail_price).toFixed(0)}
                            </span>
                          )}
                          <span className="font-bold text-red-500 text-base">
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