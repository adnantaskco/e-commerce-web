"use client";

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useCart } from '@/app/src/components/context/CartContext';
import { FaChevronDown, FaChevronRight, FaSearch, FaRedo, FaShoppingCart, FaFilter, FaTimes } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { UseCurrency } from '@/components/ui/currency';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

// Product & Category Interfaces
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
  brand_name?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  } | string;
}

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  image?: string | null;
  children?: CategoryItem[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function AllProductsContent() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const { addToCart } = useCart();
  const { currency } = UseCurrency();

  // SWR API Calls
  const { data: productsData, isLoading: isProductsLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/products",
    fetcher
  );

  const { data: categoriesData, isLoading: isCategoriesLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/categories",
    fetcher
  );

  const products: ProductItem[] = productsData?.data || productsData || [];
  const categories: CategoryItem[] = categoriesData?.data || categoriesData || [];

  // Local UI Filter States
  const [nameSearch, setNameSearch] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState<string>('');
  const [minPriceInput, setMinPriceInput] = useState<number>(0);
  const [maxPriceInput, setMaxPriceInput] = useState<number>(250000);
  const [sortBy, setSortBy] = useState<string>('default');
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  // Filter Reset Function
  const handleResetFilters = () => {
    setNameSearch('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setBrandSearch('');
    setMinPriceInput(0);
    setMaxPriceInput(250000);
    setSortBy('default');
    setItemsPerPage(20);
  };

  // Extract Brands Dynamically
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand_name) brandsSet.add(p.brand_name);
    });
    if (brandsSet.size === 0) {
      return ["Rfl", "Readmore", "Freshbite", "Glowup", "Autoparts Plus", "Officemax", "Techpro", "Stylehub", "Homecomfort", "Fitgear"];
    }
    return Array.from(brandsSet);
  }, [products]);

  const filteredBrandList = useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    return availableBrands.filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase()));
  }, [availableBrands, brandSearch]);

  // Toggle Category Accordion Dropdown
  const toggleCategoryExpand = (id: number) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Collect all child slugs recursively
  const getAllCategorySlugs = (category: CategoryItem): string[] => {
    let slugs = [category.slug || category.name];
    if (category.children && category.children.length > 0) {
      category.children.forEach((child) => {
        slugs = slugs.concat(getAllCategorySlugs(child));
      });
    }
    return slugs;
  };

  // Toggle Checkbox Handlers with Parent & Child handling
  const toggleCategory = (category: CategoryItem) => {
    const allSlugs = getAllCategorySlugs(category);
    const identifier = category.slug || category.name;
    const isCurrentlySelected = selectedCategories.includes(identifier);

    if (isCurrentlySelected) {
      setSelectedCategories((prev) => prev.filter((c) => !allSlugs.includes(c)));
    } else {
      setSelectedCategories((prev) => Array.from(new Set([...prev, ...allSlugs])));
    }
  };

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
  };

  // Comprehensive Filtering & Sorting Logic
  const processedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    let result = products.filter((p) => {
      const price = Number(p.sale_price) || 0;

      // 1. Search by Name Filter
      if (nameSearch.trim() !== '') {
        const query = nameSearch.toLowerCase();
        if (!p.name || !p.name.toLowerCase().includes(query)) return false;
      }

      // 2. Price Range Filter
      if (price < minPriceInput || price > maxPriceInput) return false;

      // 3. Category Filter
      if (selectedCategories.length > 0) {
        const catObj = typeof p.category === 'object' ? p.category : null;
        const catStr = typeof p.category === 'string' ? p.category : '';
        
        const matchesCat = selectedCategories.some((selected) => 
          catObj?.slug === selected ||
          catObj?.name?.toLowerCase() === selected.toLowerCase() ||
          catStr.toLowerCase() === selected.toLowerCase() ||
          p.name.toLowerCase().includes(selected.toLowerCase())
        );

        if (!matchesCat) return false;
      }

      // 4. Brand Filter
      if (selectedBrands.length > 0) {
        if (!p.brand_name || !selectedBrands.includes(p.brand_name)) return false;
      }

      return true;
    });

    // Sort Results
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => Number(a.sale_price) - Number(b.sale_price));
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => Number(b.sale_price) - Number(a.sale_price));
    } else if (sortBy === 'name-az') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, nameSearch, selectedCategories, selectedBrands, minPriceInput, maxPriceInput, sortBy]);

  const displayedProducts = useMemo(() => {
    return processedProducts.slice(0, itemsPerPage);
  }, [processedProducts, itemsPerPage]);

  // Nested Category Item Component
  const CategoryTreeItem = ({ category, level = 0 }: { category: CategoryItem; level?: number }) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.includes(category.id);
    const identifier = category.slug || category.name;
    const isChecked = selectedCategories.includes(identifier);

    return (
      <div className="space-y-1">
        <div 
          className="flex items-center justify-between py-1.5 px-1 rounded hover:bg-background transition"
          style={{ paddingLeft: `${level * 12 + 4}px` }}
        >
          <label className="flex items-center gap-2 text-xs font-medium text-ring cursor-pointer hover:text-secoundary transition flex-1">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleCategory(category)}
              className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary/90"
            />
            <span className="truncate">{category.name}</span>
          </label>

          {hasChildren && (
            <button
              type="button"
              onClick={() => toggleCategoryExpand(category.id)}
              className="p-1 text-gray-400 hover:text-primary focus:outline-none"
            >
              {isExpanded ? (
                <FaChevronDown className="w-3 h-3"/>
              ) : (
                <FaChevronRight className="w-3 h-3"/>
              )}
            </button>
          )}
        </div>

        {/* Child Dropdown */}
        {hasChildren && isExpanded && (
          <div className="space-y-1 border-l ml-2">
            {category.children!.map((child) => (
              <CategoryTreeItem category={child} key={child.id} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Reusable Sidebar Content
  const FilterSidebarContent = () => (
    <div className="space-y-6">
      {/* Header & Reset Button */}
      <div className="flex justify-between items-center pb-3 border-b ">
        <h2 className="text-base font-bold text-ring">Filters</h2>
        <button
          onClick={handleResetFilters}
          className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition"
        >
          <FaRedo className="w-3 h-3"/>
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Filter By Name */}
      <div>
        <div className="flex justify-between items-center pb-2 border-b  mb-3">
          <h3 className="text-sm font-semibold text-text-primary">Filter By Name</h3>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search product name..."
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            className="w-full text-xs bg-background border rounded px-3 py-2.5 pr-8 focus:outline-none focus:border-priimary"
          />
          <FaSearch className="absolute right-2.5 top-3 w-3 h-3 text-ring"/>
        </div>
      </div>

      {/* 2. Category Filter */}
      <div>
        <div className="flex justify-between items-center pb-2 border-b  mb-3">
          <h3 className="text-sm font-semibold text-ring">Filter By Category</h3>
        </div>

        {isCategoriesLoading ? (
          <div className="space-y-2 py-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-5 bg-background animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <div className="space-y-1 max-h-60 lg:max-h-72 overflow-y-auto pr-1">
            {categories.map((cat) => (
              <CategoryTreeItem category={cat} key={cat.id} />
            ))}
          </div>
        )}
      </div>

      {/* 3. Brand Filter */}
      <div>
        <div className="flex justify-between items-center pb-2 border-b  mb-3">
          <h3 className="text-sm font-semibold text-ring">Filter By Brand</h3>
        </div>

        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search brands..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full text-xs bg-background border rounded px-3 py-2.5 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {filteredBrandList.map((brand) => {
            const isChecked = selectedBrands.includes(brand);
            return (
              <label key={brand} className="flex items-center gap-2 text-xs font-medium text-ring cursor-pointer hover:text-primary transition">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary/80"
                />
                <span>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Price Range Filter */}
      <div>
        <div className="flex justify-between items-center pb-2 border-b  mb-3">
          <h3 className="text-sm font-semibold text-ring">Price Range</h3>
          <FaChevronDown className="w-3 h-3 text-ring/60"/>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(Number(e.target.value))}
            className="w-full text-xs border rounded px-2 py-2 focus:outline-none focus:border-primary"
            placeholder="0"
          />
          <span className="text-ring/60 text-xs">-</span>
          <input
            type="number"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(Number(e.target.value))}
            className="w-full text-xs border rounded px-2 py-2 focus:outline-none focus:border-primary"
            placeholder="250000"
          />
        </div>

        <p className="text-[11px] text-ring">
          Min: {minPriceInput.toFixed(2)} Max: {maxPriceInput.toFixed(2)}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen py-4 sm:py-6 px-3 sm:px-6 md:px-8 font-sans text-text-primary">
      <div className="max-w-350 mx-auto">
        
        {/* Page Title & Mobile Filter Trigger */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-ring">All Products</h1>

          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-primary text-text-secondary px-3 py-2 rounded-md text-xs font-medium shadow-sm hover:bg-primary/50 transition"
          >
            <FaFilter className="w-3 h-3"/>
            <span>Filter Products</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-8 items-start">
          
          {/* ================= DESKTOP SIDEBAR FILTERS ================= */}
          <aside className="hidden lg:block bg-background rounded-md border p-5">
            <FilterSidebarContent/>
          </aside>

          {/* ================= MOBILE SLIDE-OVER FILTER DRAWER ================= */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div 
                className="fixed inset-0 bg-foreground/40 backdrop-blur-xs transition-opacity"
                onClick={() => setIsMobileFilterOpen(false)}
              />

              <div className="relative ml-auto w-full max-w-xs bg-background h-full shadow-2xl flex flex-col z-10 overflow-hidden">
                <div className="p-4 border-b  flex justify-between items-center bg-background">
                  <span className="font-bold text-sm text-gray-800">Filter Products</span>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1.5 text-ring hover:text-ring/80 rounded-full hover:bg-ring/5 transition"
                  >
                    <FaTimes className="w-4 h-4"/>
                  </button>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                  <FilterSidebarContent/>
                </div>

                <div className="p-4 border-t  bg-background">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-primary text-text-text-secondary py-2.5 rounded-md text-xs font-semibold hover:bg-primary/50 transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= MAIN CONTENT AREA ================= */}
          <main className="lg:col-span-3 space-y-4">
            
            {/* Top Toolbar */}
            <div className="bg-background rounded-md border  p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                
                {/* Sort dropdown */}
                <div className="flex items-center gap-2 text-xs flex-1 sm:flex-none">
                  <span className="text-gray-500 font-medium whitespace-nowrap">Sort by:</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto h-9 text-xs justify-between gap-2 border-gray-200 bg-white font-normal text-gray-700 hover:bg-gray-50 focus:border-emerald-500"
                      >
                        <span>
                          {sortBy === 'price-low'
                            ? 'Price: Low to High'
                            : sortBy === 'price-high'
                            ? 'Price: High to Low'
                            : sortBy === 'name-az'
                            ? 'Name: A to Z'
                            : 'Default'}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-44 bg-white border">
                      <DropdownMenuRadioGroup value={sortBy} onValueChange={(val) => setSortBy(val)}>
                        <DropdownMenuRadioItem className="cursor-pointer text-xs" value="default">
                          Default
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className="cursor-pointer text-xs" value="price-low">
                          Price: Low to High
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className="cursor-pointer text-xs" value="price-high">
                          Price: High to Low
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className="cursor-pointer text-xs" value="name-az">
                          Name: A to Z
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Show items count selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-1/2 sm:w-auto text-xs sm:text-sm font-normal text-ring flex items-center justify-between gap-2 h-9" size="sm" variant="outline">
                      <span>{itemsPerPage} Items</span>
                      <ChevronDown className="w-4 h-4 opacity-50"/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32 bg-background border">
                    <DropdownMenuRadioGroup value={String(itemsPerPage)} onValueChange={(val) => setItemsPerPage(Number(val))}>
                      <DropdownMenuRadioItem className="cursor-pointer text-xs sm:text-sm" value="20">
                        20 Items
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem className="cursor-pointer text-xs sm:text-sm" value="40">
                        40 Items
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem className="cursor-pointer text-xs sm:text-sm" value="60">
                        60 Items
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="text-xs text-gray-500 font-medium text-right sm:text-left">
                Showing {displayedProducts.length} of {processedProducts.length} results
              </div>
            </div>

            {/* Product Grid */}
            {isProductsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-background rounded-md border  p-3 sm:p-4 space-y-3 animate-pulse">
                    <div className="h-32 sm:h-40 bg-ring/5 rounded" />
                    <div className="h-4 bg-ring/5 rounded w-3/4" />
                    <div className="h-4 bg-ring/5 rounded w-1/2" />
                    <div className="h-8 bg-ring/5 rounded" />
                  </div>
                ))}
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="bg-background rounded-md border  p-8 sm:p-12 text-center">
                <p className="text-xs sm:text-sm text-ring mb-3">No products found matching your filter criteria.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-primary text-text-secondary rounded text-xs font-medium hover:bg-primary/50 transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {displayedProducts.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setHovered(hovered === item.id ? null : item.id)}
                  className="w-full bg-background rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative flex flex-col"
                >
                  {/* IMAGE AREA WITH OVERLAID ACTION BUTTONS */}
                  <div className="relative bg-background aspect-square w-full flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain pointer-events-none transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Discount Badge */}
                    {item.has_discount && (
                      <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-text-secondary text-sm sm:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">
                        {item.discount_price}
                      </div>
                    )}

                    {/* Overlaid Action Bar */}
                    <div
                      className={`absolute inset-x-0 bottom-0 p-1.5 sm:p-2 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 z-20 ${
                        hovered === item.id
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                      }`}
                    >
                      {/* Add to Cart Button */}
                      <button
                        type="button"
                        disabled={!item.in_stock || item.stock_qty <= 0}
                        title="Add to Cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: item.id,
                            image: item.image || "/placeholder.png",
                            brand: "Taskco",
                            name: item.name,
                            price: Number(item.sale_price),
                          });
                        }}
                        className="flex-1 bg-foreground/80 hover:bg-foreground text-text-secondary text-[11px] sm:text-xs font-medium py-1.5 px-2 rounded flex items-center justify-center gap-1 shadow hover:shadow-md active:scale-95 transition-all"
                      >
                        <FaShoppingCart className="text-[10px] sm:text-xs"/>
                        {!item.in_stock || item.stock_qty <= 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>

                  {/* DETAILS AREA */}
                  <Link className="p-2 sm:p-3 flex-1 flex flex-col justify-between" href={`/products/${item.slug}`}>
                    <div>
                      <h2 className="text-xs sm:text-sm font-semibold truncate text-text-primary">
                        {item.name}
                      </h2>

                      {/* Rating */}
                      <div className="flex gap-0.5 text-yellow-400 text-[10px] sm:text-xs mt-1">
                        {[...Array(5)].map((_, index) => (
                          <FaStar key={index}/>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2">
                      {/* Price */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.has_discount && (
                          <span className="line-through text-ring/70 text-[10px] sm:text-xs">
                            {currency} {Number(item.retail_price).toFixed(0)}
                          </span>
                        )}

                        <span className="font-bold text-destructive text-xs sm:text-sm">
                          {currency} {Number(item.sale_price).toFixed(0)}
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

export default function AllProductsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs">Loading collection...</div>}>
      <AllProductsContent/>
    </Suspense>
  );
}