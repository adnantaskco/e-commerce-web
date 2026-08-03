"use client";

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useCart } from '@/app/src/components/context/CartContext';
import { FaChevronDown, FaChevronRight, FaSearch, FaRedo, FaShoppingCart, FaFilter, FaTimes } from 'react-icons/fa';
import { FaEye, FaHeart, FaStar } from 'react-icons/fa6';
import Image from 'next/image';

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
          className="flex items-center justify-between py-1.5 px-1 rounded hover:bg-gray-50 transition"
          style={{ paddingLeft: `${level * 12 + 4}px` }}
        >
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer hover:text-emerald-600 transition flex-1">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleCategory(category)}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="truncate">{category.name}</span>
          </label>

          {hasChildren && (
            <button
              type="button"
              onClick={() => toggleCategoryExpand(category.id)}
              className="p-1 text-gray-400 hover:text-emerald-600 focus:outline-none"
            >
              {isExpanded ? (
                <FaChevronDown className="w-3 h-3" />
              ) : (
                <FaChevronRight className="w-3 h-3" />
              )}
            </button>
          )}
        </div>

        {/* Child Dropdown */}
        {hasChildren && isExpanded && (
          <div className="space-y-1 border-l border-gray-100 ml-2">
            {category.children!.map((child) => (
              <CategoryTreeItem key={child.id} category={child} level={level + 1} />
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
      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
        <h2 className="text-base font-bold text-gray-900">Filters</h2>
        <button
          onClick={handleResetFilters}
          className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-medium transition"
        >
          <FaRedo className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Filter By Name */}
      <div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Filter By Name</h3>
          <FaChevronDown className="w-3 h-3 text-gray-400" />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search product name..."
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            className="w-full text-xs bg-gray-50 border border-gray-200 rounded px-3 py-2.5 pr-8 focus:outline-none focus:border-emerald-500"
          />
          <FaSearch className="absolute right-2.5 top-3 w-3 h-3 text-gray-400" />
        </div>
      </div>

      {/* 2. Category Filter */}
      <div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Filter By Category</h3>
          <FaChevronDown className="w-3 h-3 text-gray-400" />
        </div>

        {isCategoriesLoading ? (
          <div className="space-y-2 py-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-5 bg-gray-100 animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <div className="space-y-1 max-h-60 lg:max-h-72 overflow-y-auto pr-1">
            {categories.map((cat) => (
              <CategoryTreeItem key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </div>

      {/* 3. Brand Filter */}
      <div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Filter By Brand</h3>
          <FaChevronDown className="w-3 h-3 text-gray-400" />
        </div>

        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search brands..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full text-xs bg-gray-50 border border-gray-200 rounded px-3 py-2.5 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {filteredBrandList.map((brand) => {
            const isChecked = selectedBrands.includes(brand);
            return (
              <label key={brand} className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer hover:text-emerald-600 transition">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Price Range Filter */}
      <div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Price Range</h3>
          <FaChevronDown className="w-3 h-3 text-gray-400" />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(Number(e.target.value))}
            className="w-full text-xs border border-gray-200 rounded px-2 py-2 focus:outline-none focus:border-emerald-500"
            placeholder="0"
          />
          <span className="text-gray-400 text-xs">-</span>
          <input
            type="number"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(Number(e.target.value))}
            className="w-full text-xs border border-gray-200 rounded px-2 py-2 focus:outline-none focus:border-emerald-500"
            placeholder="250000"
          />
        </div>

        <p className="text-[11px] text-gray-500">
          Min: {minPriceInput.toFixed(2)} Max: {maxPriceInput.toFixed(2)}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-4 sm:py-6 px-3 sm:px-6 md:px-8 font-sans text-gray-800">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Page Title & Mobile Filter Trigger */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">All Products</h1>

          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-md text-xs font-medium shadow-sm hover:bg-emerald-700 transition"
          >
            <FaFilter className="w-3 h-3" />
            <span>Filter Products</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-8 items-start">
          
          {/* ================= DESKTOP SIDEBAR FILTERS ================= */}
          <aside className="hidden lg:block bg-white rounded-md border border-gray-200 p-5">
            <FilterSidebarContent />
          </aside>

          {/* ================= MOBILE SLIDE-OVER FILTER DRAWER ================= */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
                onClick={() => setIsMobileFilterOpen(false)}
              />

              <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                  <span className="font-bold text-sm text-gray-800">Filter Products</span>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1.5 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-200 transition"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                  <FilterSidebarContent />
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-emerald-600 text-white py-2.5 rounded-md text-xs font-semibold hover:bg-emerald-700 transition"
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
            <div className="bg-white rounded-md border border-gray-200 p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                
                {/* Sort dropdown */}
                <div className="flex items-center gap-2 text-xs flex-1 sm:flex-none">
                  <span className="text-gray-500 font-medium whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto border border-gray-200 rounded px-2 py-1.5 text-xs bg-white text-gray-700 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-az">Name: A to Z</option>
                  </select>
                </div>

                {/* Show items count selector */}
                <div className="flex items-center gap-2 text-xs flex-1 sm:flex-none">
                  <span className="text-gray-500 font-medium whitespace-nowrap">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="w-full sm:w-auto border border-gray-200 rounded px-2 py-1.5 text-xs bg-white text-gray-700 focus:outline-none focus:border-emerald-500"
                  >
                    <option value={20}>20 Products</option>
                    <option value={40}>40 Products</option>
                    <option value={60}>60 Products</option>
                  </select>
                </div>
              </div>

              <div className="text-xs text-gray-500 font-medium text-right sm:text-left">
                Showing {displayedProducts.length} of {processedProducts.length} results
              </div>
            </div>

            {/* Product Grid */}
            {isProductsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-md border border-gray-200 p-3 sm:p-4 space-y-3 animate-pulse">
                    <div className="h-32 sm:h-40 bg-gray-100 rounded" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-8 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="bg-white rounded-md border border-gray-200 p-8 sm:p-12 text-center">
                <p className="text-xs sm:text-sm text-gray-500 mb-3">No products found matching your filter criteria.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700 transition"
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
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col"
                  >
                    {/* IMAGE */}
                    <div className="relative bg-gray-50 h-[150px] sm:h-[220px] md:h-[250px] flex items-center justify-center p-2">
                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        width={260}
                        height={300}
                        unoptimized
                        className="object-contain max-h-full pointer-events-none"
                      />

                      {/* Discount Badge */}
                      {item.has_discount && (
                        <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] sm:text-xs font-bold px-1.5 py-0.5 rounded">
                          {item.discount_price}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div
                        className={`absolute top-2 right-2 flex flex-col gap-1.5 transition-all duration-300 ${
                          hovered === item.id
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      >
                        <button className="w-7 h-7 sm:w-9 sm:h-9 bg-white text-gray-700 rounded-full flex items-center justify-center shadow hover:bg-emerald-600 hover:text-white transition text-xs sm:text-sm">
                          <FaHeart />
                        </button>

                        <button
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
                          className="w-7 h-7 sm:w-9 sm:h-9 bg-white text-gray-700 rounded-full flex items-center justify-center shadow hover:bg-black hover:text-white transition text-xs sm:text-sm"
                        >
                          <FaShoppingCart />
                        </button>

                        <button className="w-7 h-7 sm:w-9 sm:h-9 bg-white text-gray-700 rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition text-xs sm:text-sm">
                          <FaEye />
                        </button>
                      </div>
                    </div>

                    {/* Product Details */}
                    <Link href={`/products/${item.slug}`} className="flex-1 flex flex-col justify-between">
                      <div className="p-2.5 sm:p-4 space-y-1">
                        <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                          Taskco
                        </p>

                        <h2 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2">
                          {item.name}
                        </h2>

                        {/* Rating */}
                        <div className="flex gap-0.5 text-yellow-400 text-[10px] sm:text-xs pt-1">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} />
                          ))}
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-1.5 pt-1">
                          {item.has_discount && (
                            <span className="line-through text-gray-400 text-xs">
                              ৳{Number(item.retail_price).toFixed(0)}
                            </span>
                          )}

                          <span className="font-bold text-red-500 text-xs sm:text-sm">
                            ৳{Number(item.sale_price).toFixed(0)}
                          </span>
                        </div>

                        {/* Stock */}
                        <div className="pt-0.5">
                          {item.in_stock ? (
                            <span className="text-emerald-600 text-[10px] sm:text-xs font-medium">
                              In Stock ({item.stock_qty})
                            </span>
                          ) : (
                            <span className="text-red-500 text-[10px] sm:text-xs font-medium">
                              Out of Stock
                            </span>
                          )}
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
      <AllProductsContent />
    </Suspense>
  );
}