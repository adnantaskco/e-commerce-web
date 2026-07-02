"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { totalProducts } from '@/lib/totalproducts';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/app/src/components/context/CartContext';
import { FaHeart, FaEye, FaStar, FaMagnifyingGlass, FaSliders, FaXmark } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';

interface ProductItem {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  rating?: number;
  description?: string;
}

function ProductsContent() {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mobile Filter Drawer Toggle State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract initial parameters from URL query string
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || null;
  const urlBrands = searchParams.get('brands') ? searchParams.get('brands')!.split(',') : [];
  const urlMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;

  // 1. Component UI State Systems
  const [searchQuery, setSearchQuery] = useState<string>(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(urlCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(urlBrands);
  const [priceRange, setPriceRange] = useState<number>(urlMaxPrice || 180);
  const [hovered, setHovered] = useState<number | null>(null);

  // 2. Extract Data Dimensions Dynamically from totalProducts
  const { categoriesList, brandsList, minPrice, maxPrice } = useMemo(() => {
    if (!Array.isArray(totalProducts)) {
      return { categoriesList: [], brandsList: [], minPrice: 0, maxPrice: 200 };
    }

    const brands = new Set<string>();
    const categories = new Set<string>();
    let highestPrice = 0;
    let lowestPrice = Infinity;

    totalProducts.forEach((p) => {
      if (p.brand) brands.add(p.brand);
      if (p.price > highestPrice) highestPrice = p.price;
      if (p.price < lowestPrice) lowestPrice = p.price;

      const nameLower = p.name.toLowerCase();
      if (nameLower.includes('hoodie') || nameLower.includes('hudi')) categories.add('Hoodies');
      else if (nameLower.includes('jacket') || nameLower.includes('coat') || nameLower.includes('blazer')) categories.add('Jackets');
      else if (nameLower.includes('t-shirt') || nameLower.includes('tee')) categories.add('T-Shirts');
      else if (nameLower.includes('shirt')) categories.add('Shirts');
      else if (nameLower.includes('dress') || nameLower.includes('frock') || nameLower.includes('romper') || nameLower.includes('sleepsuit')) categories.add('Dresses & Outfits');
      else if (nameLower.includes('top')) categories.add('Tops');
      else categories.add('Casual Essentials');
    });

    return {
      categoriesList: Array.from(categories).sort(),
      brandsList: Array.from(brands).sort(),
      minPrice: lowestPrice === Infinity ? 0 : Math.floor(lowestPrice),
      maxPrice: highestPrice === 0 ? 200 : Math.ceil(highestPrice),
    };
  }, []);

  // Initialize filter slider roof dynamically if URL parameter isn't present
  useEffect(() => {
    if (maxPrice && !urlMaxPrice) {
      setPriceRange(maxPrice);
    }
  }, [maxPrice, urlMaxPrice]);

  // 3. Sync State back into URL Router Search Params Matrix
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedBrands.length > 0) params.set('brands', selectedBrands.join(','));
    if (priceRange !== maxPrice) params.set('maxPrice', priceRange.toString());

    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, maxPrice, router]);

  // 4. Filter Actions & Selection Rules
  const handleBrandCheckboxChange = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedBrands([]);
    setPriceRange(maxPrice);
  };

  // 5. Filter Processing Engine
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(totalProducts)) return [];

    return (totalProducts as ProductItem[]).filter((product) => {
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand) return false;
      }

      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      if (product.price > priceRange) {
        return false;
      }
      
      if (selectedCategory) {
        const nameLower = product.name.toLowerCase();
        let currentItemCategory = 'Casual Essentials';

        if (nameLower.includes('hoodie') || nameLower.includes('hudi')) currentItemCategory = 'Hoodies';
        else if (nameLower.includes('jacket') || nameLower.includes('coat') || nameLower.includes('blazer')) currentItemCategory = 'Jackets';
        else if (nameLower.includes('t-shirt') || nameLower.includes('tee')) currentItemCategory = 'T-Shirts';
        else if (nameLower.includes('shirt')) currentItemCategory = 'Shirts';
        else if (nameLower.includes('dress') || nameLower.includes('frock') || nameLower.includes('romper') || nameLower.includes('sleepsuit')) currentItemCategory = 'Dresses & Outfits';
        else if (nameLower.includes('top')) currentItemCategory = 'Tops';

        if (currentItemCategory !== selectedCategory) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedBrands, priceRange]);

  // Shared Filters Layout Component to reduce repetition between desktop sidebar and mobile drawer
  const FilterControls = () => (
    <>
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-black uppercase tracking-wider text-ring">Filters</h2>
        {(selectedCategory || selectedBrands.length > 0 || priceRange < maxPrice || searchQuery !== '') && (
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

      {/* Brands */}
      <div className="bg-background rounded-xl p-5 border border-ring/10 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-wider text-ring mb-3">Brands</h3>
        <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
          {brandsList.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandCheckboxChange(brand)}
                className="w-4 h-4 rounded border-ring/10 text-black focus:ring-foreground accent-text-primary cursor-pointer"
              />
              <span className="text-xs font-bold text-ring group-hover:text-text-primary transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-ring/1 font-sans text-ring selection:bg-foreground selection:text-text-secondary">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ================= DESKTOP SIDEBAR (HIDDEN ON MOBILE) ================= */}
          <aside className="hidden lg:block w-full lg:w-64 shrink-0 space-y-6 lg:sticky lg:top-28 z-20">
            <FilterControls />
          </aside>

          {/* ================= MOBILE FILTER DRAWER (OVERLAY BACKDROP) ================= */}
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

          {/* ================= MAIN DISPLAY GRID ================= */}
          <main className="flex-1 w-full space-y-4 sm:space-y-6">
            
            {/* SEARCH AND FEEDBACK HEADER BLOCK */}
            <div className="bg-background p-4 rounded-xl border border-ring/10 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex items-center gap-3 w-full sm:max-w-xs">
                {/* Mobile Drawer Trigger Button */}
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
                    placeholder="Search products or brands..."
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
                    onMouseEnter={() => setHovered(Number(item.id))}
                    onMouseLeave={() => setHovered(null)}
                    className="bg-background rounded-xl overflow-hidden border border-ring/10 hover:shadow-xl transition-all duration-500 sm:hover:-translate-y-2 group flex flex-col justify-between"
                  >
                  <div className="relative bg-ring/5 h-[140px] sm:h-[280px] flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={260}
                      height={300}
                      draggable={false}
                      className="object-contain max-h-full pointer-events-none"
                    />

          {/* DISCOUNT BADGE */}
          {item.discount && (
            <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-primary text-text-secondary text-[9px] sm:text-xs font-medium sm:font-bold px-1.5 sm:px-3 py-0.5 sm:py-1 rounded">
              {item.discount}%
            </div>
          )}

          {/* ACTION BUTTONS */}
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
                e.stopPropagation(); // Prevents click handler triggers on the parent card wrapper
                addToCart({
                  id: Number(item.id),
                  image: item.image,
                  brand: item.brand,
                  name: item.name,
                  price: item.price,
                });
              }}
              className="w-8 h-8 md:w-10 sm:w-5 sm:h-5 md:h-10 text-xs md:text-base bg-background rounded-full flex items-center justify-center shadow hover:bg-foreground hover:text-text-secondary active:scale-96 transition"
            >
              <FaShoppingCart />
            </button>

            <button className="w-8 h-8 sm:w-5 sm:h-5 md:w-10 md:h-10 text-xs md:text-base bg-background rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition">
              <FaEye />
            </button>
          </div>
                   </div>
                    
                    <Link href={`/products/${item.id}`} className="flex-1 flex flex-col justify-between">
                      <div className="p-2.5 sm:p-4 space-y-0.5 sm:space-y-1">
                        <p className="text-[10px] sm:text-sm text-ring truncate tracking-tight">{item.brand}</p>
                        <h2 className="text-xs sm:text-base font-bold text-ring line-clamp-2 sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis group-hover:text-text-primary leading-tight sm:leading-normal">
                          {item.name}
                        </h2>
                        <div className="flex gap-0.5 text-yellow-400 text-[9px] sm:text-sm">
                          {[...Array(item.rating || 5)].map((_, i) => <FaStar key={i} />)}
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5">
                          {item.oldPrice && item.oldPrice > item.price && (
                            <span className="line-through text-ring text-[10px] sm:text-sm">${item.oldPrice}</span>
                          )}
                          <span className="text-destructive font-black text-xs sm:text-base">${item.price}</span>
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