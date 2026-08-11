"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { FaBars, FaChevronLeft, FaChevronRight, FaShopify } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";

import fetcher from "@/lib/navfatcher";
import MenuItem from "./MenuItem";
import { useCart } from "@/app/src/components/context/CartContext";
import { CategoryResponse } from "@/app/types/category";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogo } from "./ui/logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { Logo } = useLogo();
  

  const { totalItems } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading } = useSWR<CategoryResponse>(
    "https://demo.app.taskcocommerce.com/api/v1/categories",
    fetcher
  );

  const checkScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScroll();

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [data, checkScroll]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  // Skeleton Loader for Navbar Loading State
  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-1 md:px-16">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Logo Skeleton */}
            <Skeleton className="h-10 w-24 rounded-full shrink-0" />

            {/* Categories Skeleton (Desktop) */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-6 px-10 overflow-hidden">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>

            {/* Right Icons Skeleton */}
            <div className="flex items-center gap-2 shrink-0">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full lg:hidden" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (error) {
    return (
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-center text-red-500">
          Failed to load categories
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-1 md:px-16">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <img
                src={Logo}
                alt="Logo"
                width={90}
                height={40}
                className="rounded-full"
              />
            </Link>

            {/* Categories Horizontal Scroll with Dynamic Buttons */}
            <div className="hidden lg:flex flex-1 items-center relative min-w-0 overflow-visible">
              {/* Left Scroll Button */}
              {canScrollLeft && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleScroll("left")}
                  className="absolute left-0 z-20 h-7 w-7 rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white"
                  aria-label="Scroll left"
                >
                  <FaChevronLeft className="h-3 w-3" />
                </Button>
              )}

              <div
                ref={scrollRef}
                className={`w-full overflow-x-auto scrollbar-hide scroll-smooth ${
                  canScrollLeft ? "ml-9" : "ml-0"
                } ${canScrollRight ? "mr-9" : "mr-0"}`}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <ul className="flex items-center gap-6 whitespace-nowrap py-2 h-full">
                  {data?.data.map((category) => (
                    <MenuItem key={category.id} item={category} />
                  ))}
                </ul>
              </div>

              {/* Right Scroll Button */}
              {canScrollRight && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleScroll("right")}
                  className="absolute right-0 z-20 h-7 w-7 rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white"
                  aria-label="Scroll right"
                >
                  <FaChevronRight className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <Link href="/products">
                  <FaShopify className="text-2xl" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <Link href="/login">
                  <MdAccountCircle className="text-2xl" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <Link href="/cart">
                  <TiShoppingCart className="text-2xl" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-[11px] font-semibold flex items-center justify-center">
                    {totalItems}
                  </span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                className="lg:hidden rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <FaBars className="text-xl" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />

          <div
            className={`fixed top-0 left-0 z-50 h-screen w-80 bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="relative bg-gradient-to-r from-primary via-red-500 to-pink-500 p-6 text-white">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 transition flex items-center justify-center"
              >
                ✕
              </Button>

              <div className="flex items-center gap-4 mt-6">
                <div>
                  <h2 className="text-xl font-bold">Welcome</h2>
                  <p className="text-sm text-white/80">
                    Explore thousands of products
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-between rounded-2xl bg-white/15 p-3 backdrop-blur-md">
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-1 hover:scale-105 transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-orange-500 shadow">
                    <FaShopify className="text-2xl" />
                  </div>
                  <span className="text-xs">Products</span>
                </Link>

                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-1 hover:scale-105 transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-orange-500 shadow">
                    <MdAccountCircle className="text-2xl" />
                  </div>
                  <span className="text-xs">Account</span>
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="relative flex flex-col items-center gap-1 hover:scale-105 transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow">
                    <TiShoppingCart className="text-2xl" />
                  </div>

                  <span className="absolute right-3 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>

                  <span className="text-xs">Cart</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-gray-800">
                <GiShoppingCart className="text-2xl font-bold" /> Categories
              </h3>
            </div>

            <div className="h-[calc(100vh-270px)] overflow-y-auto custom-scrollbar">
              <ul className="space-y-1 p-3">
                {data?.data.map((category) => (
                  <li
                    key={category.id}
                    className="overflow-hidden rounded-xl border border-gray-100 transition hover:border-orange-200 hover:bg-orange-50"
                  >
                    <MenuItem
                      item={category}
                      mobile
                      onSelect={() => setOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute bottom-0 w-full border-t bg-gray-50 p-4">
              <p className="text-center text-xs text-gray-500">
                ❤️ Happy Shopping
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}