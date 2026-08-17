'use client';

import React, { use, useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Loader2,
  PackageX,
  ChevronDown
} from 'lucide-react';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

// shadcn/ui Dropdown Imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useCart } from '@/app/src/components/context/CartContext';
import { UseCurrency } from '@/components/ui/currency';

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
  const [addingToCartId, setAddingToCartId] = useState<string | number | null>(null);
  const [cartedIds, setCartedIds] = useState<(string | number)[]>([]);
  const { addToCart } = useCart();
  const { currency } = UseCurrency();

  // Filter States
  const [sort, setSort] = useState('default');
  const [limit, setLimit] = useState('20');
  const [hovered, setHovered] = useState<number | string | null>(null);

  const categoryTitle = slug ? decodeURIComponent(slug).replace(/-/g, ' ') : 'Category';

  // Dynamic Browser Tab Bar Title Update
  useEffect(() => {
    if (categoryTitle) {
      document.title = `${categoryTitle.toUpperCase()} - Demo Store`;
    }
  }, [categoryTitle]);

  // Dynamic API Fetching targeting specific category slug
  const categoryApiUrl = useMemo(() => {
    if (!slug) return null;
    return `https://demo.app.taskcocommerce.com/api/v1/products/?category=${encodeURIComponent(slug)}`;
  }, [slug]);

  const { data: responseData, error, isLoading } = useSWR(categoryApiUrl, fetcher);

  // Normalize API Response
  const rawProducts: Product[] = useMemo(() => {
    if (!responseData) return [];
    return responseData.data || (Array.isArray(responseData) ? responseData : []);
  }, [responseData]);

  // Client-Side Active Filtering: Sort & Limit
  const filteredProducts = useMemo(() => {
    if (!rawProducts || rawProducts.length === 0) return [];

    const result = [...rawProducts];

    // Apply Sorting
    if (sort === 'low-high') {
      result.sort((a, b) => Number(a.sale_price) - Number(b.sale_price));
    } else if (sort === 'high-low') {
      result.sort((a, b) => Number(b.sale_price) - Number(a.sale_price));
    }

    // Apply Page Display Limit
    return result.slice(0, parseInt(limit, 10));
  }, [rawProducts, sort, limit]);

  // Helper Labels for Buttons
  const sortLabels: Record<string, string> = {
    'default': 'Default Sort',
    'low-high': 'Price: Low to High',
    'high-low': 'Price: High to Low',
  };

  return (
    <div className="min-h-screen bg-background text-ring ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-6">
        
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          
          {/* Title and Back Button */}
          <div className="bg-background border rounded-lg px-4 py-2.5 flex items-center justify-between sm:justify-start gap-3 shadow-sm">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.history.back()}
                className="p-1 hover:bg-background rounded-full transition-colors text-ring"
                title="Go Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-base sm:text-lg font-bold text-ring capitalize truncate">
                {categoryTitle}
              </h1>
            </div>
            <span className="text-xs font-semibold text-ring/60 bg-background px-2.5 py-1 rounded-full">
              {filteredProducts.length} Products
            </span>
          </div>

          {/* shadcn/ui Dropdown Sort & Display Limit Controls */}
          <div className="bg-background border rounded-lg p-1.5 sm:p-2 flex items-center justify-between sm:justify-end gap-2">
            
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-1/2 sm:w-auto text-xs sm:text-sm font-normal text-ring flex items-center justify-between gap-2 h-9"
                >
                  <span>{sortLabels[sort]}</span>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background border">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  <DropdownMenuRadioItem value="default" className="cursor-pointer text-xs sm:text-sm">
                    Default Sort
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="low-high" className="cursor-pointer text-xs sm:text-sm">
                    Price: Low to High
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="high-low" className="cursor-pointer text-xs sm:text-sm">
                    Price: High to Low
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Display Limit Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-1/2 sm:w-auto text-xs sm:text-sm font-normal text-ring flex items-center justify-between gap-2 h-9"
                >
                  <span>{limit} Items</span>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32 bg-background border">
                <DropdownMenuRadioGroup value={limit} onValueChange={setLimit}>
                  <DropdownMenuRadioItem value="20" className="cursor-pointer text-xs sm:text-sm">
                    20 Items
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="40" className="cursor-pointer text-xs sm:text-sm">
                    40 Items
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="60" className="cursor-pointer text-xs sm:text-sm">
                    60 Items
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>

        {/* Product Layout Grid */}
        <main className="w-full">
          {isLoading && (
            <div className="bg-background border rounded-lg min-h-[350px] flex flex-col items-center justify-center p-6 text-center">
              <Loader2 className="w-8 h-8 text-secondary animate-spin mb-2" />
              <p className="text-xs sm:text-sm text-ring">Loading {categoryTitle} products...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="bg-background border rounded-lg min-h-[350px] flex flex-col items-center justify-center p-6 text-center shadow-sm">
              <PackageX className="w-10 h-10 text-primary mb-2" />
              <p className="text-primary font-medium text-sm sm:text-base mb-1">Failed to load items</p>
              <p className="text-xs text-ring">Please check your network connection and try again.</p>
            </div>
          )}

          {!isLoading && !error && filteredProducts.length === 0 && (
            <div className="bg-background border rounded-lg min-h-[350px] flex flex-col items-center justify-center p-6 text-center shadow-sm">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-ring/10 text-ring/60 rounded-full flex items-center justify-center mb-3">
                <PackageX className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-ring mb-1">No products found in "{categoryTitle}"</h3>
              <p className="text-xs sm:text-sm text-ring max-w-sm">
                There are currently no items available under this category. Please check back later or explore other categories.
              </p>
            </div>
          )}

          {!isLoading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
              {filteredProducts.map((item) => {
                const isInStock = item.in_stock !== false && (item.stock_qty === undefined || item.stock_qty > 0);

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setHovered(hovered === item.id ? null : item.id)}
                    className="bg-background rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative flex flex-col"
                  >
                    {/* IMAGE AREA WITH OVERLAID ACTION BUTTONS */}
                    <div className="relative bg-background w-full flex items-center justify-center p-2 overflow-hidden h-40 sm:h-48">
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                      />

                      {/* Discount Badge */}
                      {item.has_discount && (
                        <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-text-secondary text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">
                          {item.discount_price}
                        </div>
                      )}

                      {/* Overlaid Action Bar */}
                      <div
                        className={`absolute inset-x-0 bottom-0 p-1.5 sm:p-2 flex items-center justify-center gap-1 sm:gap-1.5 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent transition-all duration-300 z-20 ${
                          hovered === item.id
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                        }`}
                      >
                        {/* Add to Cart Button */}
                        <button
                          type="button"
                          disabled={!isInStock || addingToCartId === item.id}
                          title={
                            !isInStock
                              ? "Out of stock"
                              : cartedIds.includes(item.id)
                                ? "Product added to cart"
                                : "Add to Cart"
                          }
                          onClick={async (e) => {
                            e.stopPropagation();

                            if (!isInStock || addingToCartId === item.id) return;

                            setAddingToCartId(item.id);

                            // Show loading state
                            await new Promise((resolve) => setTimeout(resolve, 500));

                            addToCart({
                              id: item.id,
                              image: item.image || "/placeholder.png",
                              brand: "Taskco",
                              name: item.name,
                              price: Number(item.sale_price),
                            });

                            // Show Carted state
                            setCartedIds((prev) =>
                              prev.includes(item.id) ? prev : [...prev, item.id]
                            );

                            setAddingToCartId(null);
                          }}
                          className="flex-1 bg-foreground/80 hover:bg-foreground text-text-secondary text-sm sm:text-xs font-medium py-1.5 px-1 sm:px-2 rounded flex items-center justify-center gap-1 shadow hover:shadow-md active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {addingToCartId === item.id ? (
                            <>
                              <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
                              <span className="truncate">Adding...</span>
                            </>
                          ) : !isInStock ? (
                            <>
                              <FaShoppingCart className="text-[10px] sm:text-xs shrink-0" />
                              <span className="truncate">Out of stock</span>
                            </>
                          ) : cartedIds.includes(item.id) ? (
                            <>
                              <span className="text-xs shrink-0">✓</span>
                              <span className="truncate">Carted</span>
                            </>
                          ) : (
                            <>
                              <FaShoppingCart className="text-[10px] sm:text-xs shrink-0" />
                              <span className="truncate">Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* DETAILS AREA */}
                    <Link href={`/products/${item.slug}`} className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="font-semibold text-text-primary text-sm sm:text-md md:text-base line-clamp-1 hover:text-primary transition">
                          {item.name}
                        </h2>

                        {/* Rating */}
                        <div className="flex gap-0.5 text-yellow-400 text-[9px] sm:text-xs mt-1">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} />
                          ))}
                        </div>
                      </div>

                      <div className="mt-2">
                        {/* Price */}
                        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                          {item.has_discount && (
                            <span className="line-through text-ring/70 text-sm sm:text-xs">
                              {currency} {Number(item.retail_price).toFixed(0)}
                            </span>
                          )}

                          <span className="font-bold text-destructive text-sm sm:text-md md:text-xl">
                            {currency} {Number(item.sale_price).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}