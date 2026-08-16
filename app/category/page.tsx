"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { useCart } from '@/app/src/components/context/CartContext';
import { FaHeart, FaEye, FaStar, FaMagnifyingGlass, FaSliders, FaXmark } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';

// 1. Updated interface including potential category string from API
interface ProductItem {
  id: number;
  name: string;
  has_variants: boolean;
  slug: string;
  image: string | null;
  sold_amount: number;
  review: number | null;
  retail_price: string;
  discount_price: string;
  has_discount: boolean;
  sale_price: string;
  stock_qty: number;
  in_stock: boolean;
  stock_availability: boolean;
  weight: number;
  category?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ProductsContent() {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract initial parameters from URL query string
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || null;
  const urlMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;

  // Component UI State Systems
  const [searchQuery, setSearchQuery] = useState<string>(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(urlCategory);
  const [priceRange, setPriceRange] = useState<number>(urlMaxPrice || 50000);
  const [hovered, setHovered] = useState<number | null>(null);

  // Dynamic API Endpoint Construction
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    
    const queryString = params.toString();
    return `https://demo.app.taskcocommerce.com/api/v1/products/${queryString ? `?${queryString}` : ''}`;
  }, [selectedCategory, searchQuery]);

  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  // Safely capture payload array matching backend pattern
  const products: ProductItem[] = data?.data || (Array.isArray(data) ? data : []);

  // Extract Data Dimensions & Dynamic Categories
  const { categoriesList, minPrice, maxPrice } = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return { categoriesList: [], minPrice: 0, maxPrice: 50000 };
    }

    const categories = new Set<string>();
    let highestPrice = 0;
    let lowestPrice = Infinity;

    products.forEach((p) => {
      const currentPrice = Number(p.sale_price) || 0;
      if (currentPrice > highestPrice) highestPrice = currentPrice;
      if (currentPrice < lowestPrice) lowestPrice = currentPrice;

      // Primary: Use backend category field if available
      if (p.category) {
        categories.add(p.category);
      } else {
        // Fallback: Multi-domain Keyword Classification
        const nameLower = p.name ? p.name.toLowerCase() : '';
        if (nameLower.includes('watch') || nameLower.includes('headphone') || nameLower.includes('laptop') || nameLower.includes('phone')) {
          categories.add('Electronics');
        } else if (nameLower.includes('hoodie') || nameLower.includes('hudi')) {
          categories.add('Hoodies');
        } else if (nameLower.includes('jacket') || nameLower.includes('coat')) {
          categories.add('Jackets');
        } else if (nameLower.includes('shirt') || nameLower.includes('tee')) {
          categories.add('T-Shirts & Shirts');
        } else if (nameLower.includes('pants') || nameLower.includes('jeans')) {
          categories.add('Pants & Trousers');
        } else {
          categories.add('General Essentials');
        }
      }
    });

    return {
      categoriesList: Array.from(categories).sort(),
      minPrice: lowestPrice === Infinity ? 0 : Math.floor(lowestPrice),
      maxPrice: highestPrice === 0 ? 50000 : Math.ceil(highestPrice),
    };
  }, [products]);

  // Adjust current price range ceiling when data updates
  useEffect(() => {
    if (maxPrice && !urlMaxPrice) {
      setPriceRange(maxPrice);
    }
  }, [maxPrice, urlMaxPrice]);

  // Sync state back into URL Search Params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (priceRange !== maxPrice) params.set('maxPrice', priceRange.toString());

    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [searchQuery, selectedCategory, priceRange, maxPrice, router]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setPriceRange(maxPrice);
  };

  // Local Client Filtering Engine
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.filter((product) => {
      const productName = product.name || '';
      const productPrice = Number(product.sale_price) || 0;

      if (searchQuery.trim() !== '' && !apiUrl.includes('search=')) {
        if (!productName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      }

      if (productPrice > priceRange) return false;

      return true;
    });
  }, [products, searchQuery, priceRange, apiUrl]);

  if (isLoading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center min-h-[60vh] text-center font-sans">
        <div className="w-10 h-10 border-4 border-foreground border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-black text-ring uppercase tracking-widest animate-pulse">Loading Products Collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-40 flex flex-col items-center justify-center min-h-[60vh] text-center font-sans">
        <p className="text-sm font-black text-destructive uppercase tracking-widest">Failed to load items collection.</p>
      </div>
    );
  }

  const FilterControls = () => (
    <>
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-black uppercase tracking-wider text-ring">Filters</h2>
        {(selectedCategory || priceRange < maxPrice || searchQuery !== '') && (
          <button 
            onClick={resetFilters} 
            className="text-xs text-destructive font-bold hover:underline transition-all"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="bg-background rounded-xl p-5 border border-ring/10 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-wider text-ring mb-3">Categories</h3>
        <div className="flex flex-col gap-1">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-foreground text-text-secondary shadow-sm'
                  : 'text-ring hover:bg-ring/10 hover:text-ring'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-background rounded-xl p-5 border border-ring/10 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-ring">Max Price</h3>
          <span className="text-sm font-black text-text-primary">${priceRange}</span>
        </div>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1.5 bg-ring/10 rounded-lg appearance-none cursor-pointer accent-text-primary"
        />
        <div className="flex justify-between text-[10px] font-bold text-ring mt-2">
          <span>Min: ${minPrice}</span>
          <span>Max: ${maxPrice}</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-ring/1 font-sans text-ring selection:bg-foreground selection:text-text-secondary">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <aside className="hidden lg:block w-full lg:w-64 shrink-0 space-y-6 lg:sticky lg:top-28 z-20">
            <FilterControls />
          </aside>

          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-foreground z-50 lg:hidden backdrop-blur-sm transition-opacity duration-300">
              <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-ring/10 p-6 shadow-2xl overflow-y-auto space-y-6 flex flex-col animate-slide-in">
                <div className="flex justify-end items-center border-b border-ring/10 pb-3">
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full bg-background border border-ring/10 text-ring shadow-sm"
                  >
                    <FaXmark className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-6 flex-1">
                  <FilterControls />
                </div>
              </div>
            </div>
          )}

          <main className="flex-1 w-full space-y-4 sm:space-y-6">
            <div className="bg-background p-4 rounded-xl border border-ring/10 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex items-center gap-3 w-full sm:max-w-xs">
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center justify-center p-2.5 rounded-lg border border-ring/10 bg-gray-50 hover:bg-ring/10 active:scale-95 transition-all"
                  title="Open Filters"
                >
                  <FaSliders className="w-4 h-4 text-ring" />
                </button>

                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-ring">
                    <FaMagnifyingGlass className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-ring/10 border border-ring/15 rounded-lg focus:outline-none focus:border-foreground focus:bg-background transition-all text-ring placeholder-ring/30"
                  />
                </div>
              </div>
              <p className="text-xs font-black text-ring uppercase tracking-widest shrink-0 self-start sm:self-center">
                Showing {filteredProducts.length} items
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-background rounded-2xl border border-ring/10 p-10 sm:p-16 text-center shadow-sm">
                <h3 className="text-base sm:text-lg font-black text-ring tracking-tight">No Products Match Your Criteria</h3>
                <p className="text-xs sm:text-sm text-ring mt-2 max-w-sm mx-auto">
                  Try adjusting your search keywords or resetting option parameters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="bg-background rounded-xl overflow-hidden border border-ring/10 hover:shadow-xl transition-all duration-500 sm:hover:-translate-y-2 group flex flex-col justify-between"
                  >
                    <div className="relative bg-ring/5 h-[140px] sm:h-[280px] flex items-center justify-center p-2">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          width={260}
                          height={300}
                          draggable={false}
                          className="object-contain max-h-full pointer-events-none"
                        />
                      ) : (
                        <div className="text-[10px] text-ring/30 font-bold uppercase tracking-widest">[ No Image ]</div>
                      )}

                      {item.has_discount && item.discount_price && (
                        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-primary text-text-secondary text-[9px] sm:text-xs font-medium sm:font-bold px-1.5 sm:px-3 py-0.5 sm:py-1 rounded">
                          {item.discount_price}
                        </div>
                      )}

                      <div
                        className={`
                          absolute top-2 right-2 sm:top-5 sm:right-4 flex flex-col gap-2 z-10 transition-all duration-300
                          ${hovered === item.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3 sm:opacity-0 sm:translate-x-5"}
                          group-hover:opacity-100 group-hover:translate-x-0
                        `}
                      >
                        <button className="w-8 h-8 sm:w-5 sm:h-5 md:w-10 md:h-10 text-xs md:text-base bg-background rounded-full flex items-center justify-center shadow hover:bg-primary hover:text-text-primary transition">
                          <FaHeart />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: item.id,
                              image: item.image || '',
                              brand: 'Store',
                              name: item.name,
                              price: Number(item.sale_price),
                            });
                          }}
                          disabled={!item.in_stock}
                          className={`w-8 h-8 md:w-10 sm:w-5 sm:h-5 md:h-10 text-xs md:text-base bg-background rounded-full flex items-center justify-center shadow hover:bg-foreground hover:text-text-secondary active:scale-96 transition ${!item.in_stock ? 'opacity-40 cursor-not-allowed' : ''}`}
                          title={item.in_stock ? 'Add to Cart' : 'Out of Stock'}
                        >
                          <FaShoppingCart />
                        </button>

                        <button className="w-8 h-8 sm:w-5 sm:h-5 md:w-10 md:h-10 text-xs md:text-base bg-background rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition">
                          <FaEye />
                        </button>
                      </div>
                    </div>
                    
                    <Link href={`/products/${item.slug}`} className="flex-1 flex flex-col justify-between">
                      <div className="p-2.5 sm:p-4 space-y-0.5 sm:space-y-1">
                        <p className="text-[10px] sm:text-sm text-ring/60 truncate tracking-tight">
                          {item.in_stock ? 'In Stock' : 'Out of Stock'}
                        </p>
                        <h2 className="text-xs sm:text-base font-bold text-ring line-clamp-2 sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis group-hover:text-text-primary leading-tight sm:leading-normal">
                          {item.name}
                        </h2>
                        
                        <div className="flex gap-0.5 text-yellow-400 text-[9px] sm:text-sm">
                          {[...Array(item.review ? Math.round(item.review) : 5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5">
                          {item.has_discount && Number(item.retail_price) > Number(item.sale_price) && (
                            <span className="line-through text-ring text-[10px] sm:text-sm">${item.retail_price}</span>
                          )}
                          <span className="text-destructive font-black text-xs sm:text-base">${item.sale_price}</span>
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

export default function AllProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-ring-50/40">
        <p className="text-xs font-bold text-ring uppercase tracking-widest animate-pulse">Loading collection...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}