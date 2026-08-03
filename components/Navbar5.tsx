"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { FaBars, FaChevronLeft, FaChevronRight, FaFile, FaShopify } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

import fetcher from "@/lib/navfatcher";
import MenuItem from "./MenuItem";
import { useCart } from "@/app/src/components/context/CartContext";
import { CategoryResponse } from "@/app/types/category";
import { GiShoppingCart } from "react-icons/gi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading } = useSWR<CategoryResponse>(
    "https://demo.app.taskcocommerce.com/api/v1/categories",
    fetcher
  );

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -250 : 250,

      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-center">
          Loading...
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
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Adnan_Safee.png"
                alt="Logo"
                width={90}
                height={40}
                className="rounded-full"
              />
            </Link>

            {/* Categories */}
            <div className="hidden lg:flex flex-1 items-center relative min-w-0 overflow-visible">
              <button
                onClick={() => handleScroll("left")}
                className="absolute left-0 z-20 h-4 w-4 rounded-full bg-white shadow hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaChevronLeft  className="h-3 w-3"/>
              </button>

              <div
                ref={scrollRef}
                className="mx-10 w-full overflow-x-auto scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <ul className="flex items-center gap-6 whitespace-nowrap py-2 h-full">
                {data?.data.map((category) => (
                  <MenuItem key={category.id} item={category} />
                ))}
              </ul>
              </div>

              <button
                onClick={() => handleScroll("right")}
                className="absolute right-0 z-20 h-4 w-4 rounded-full bg-white shadow hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaChevronRight className="h-3 w-3 " />
              </button>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 shrink-0">
             
              <Link href="/products" className="h-10 w-10 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
                <FaShopify className="text-2xl" />
              </Link>

              <Link
                href="/login"
                className="h-10 w-10 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              >
                <MdAccountCircle className="text-2xl" />
              </Link>

              <Link
                href="/cart"
                className="relative h-10 w-10 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              >
                <TiShoppingCart className="text-2xl" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-[11px] font-semibold flex items-center justify-center">
                  {totalItems}
                </span>
              </Link>

              <button
                onClick={() => setOpen(true)}
                className="lg:hidden h-10 w-10 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              >
                <FaBars className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {open && (
<>
  {/* Overlay */}
  <div
    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
    onClick={() => setOpen(false)}
  />

  {/* Sidebar */}
  <div
    className={`fixed top-0 left-0 z-50 h-screen w-80 bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
      open ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    {/* Header */}
    <div className="relative bg-gradient-to-r from-primary via-red-500 to-pink-500 p-6 text-white">
      {/* Close */}
      <button
        onClick={() => setOpen(false)}
        className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
      >
        ✕
      </button>

      {/* User */}
      <div className="flex items-center gap-4 mt-6">
        

        <div>
          <h2 className="text-xl font-bold">Welcome </h2>
          <p className="text-sm text-white/80">
            Explore thousands of products
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex justify-between rounded-2xl bg-white/15 p-3 backdrop-blur-md">
        <Link
          href="/products"
          className="flex flex-col items-center gap-1 hover:scale-105 transition"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-orange-500 shadow">
            <FaShopify className="text-2xl" />
          </div>
          <span className="text-xs">Products</span>
        </Link>

        <Link
          href="/login"
          className="flex flex-col items-center gap-1 hover:scale-105 transition"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-orange-500 shadow">
            <MdAccountCircle className="text-2xl" />
          </div>
          <span className="text-xs">Account</span>
        </Link>

        <Link
          href="/cart"
          className="relative flex flex-col items-center gap-1 hover:scale-105 transition"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow">
            <TiShoppingCart className="text-2xl" />
          </div>

          {/* Badge */}
          <span className="absolute right-3 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
            {totalItems}
          </span>

          <span className="text-xs">Cart</span>
        </Link>
      </div>
    </div>

    {/* Categories */}
    <div className="flex items-center justify-between border-b px-5 py-4">
      <h3 className="flex item-center justify-center gap-2 text-lg font-bold text-gray-800">
        <GiShoppingCart className=" text-2xl font-bold"/> Categories
      </h3>

     
    </div>

    {/* Category List */}
    <div className="h-[calc(100vh-270px)] overflow-y-auto custom-scrollbar">
      <ul className="space-y-1 p-3">
        {data?.data.map((category) => (
          <li
            key={category.id}
            className="overflow-hidden rounded-xl border border-gray-100 transition hover:border-orange-200 hover:bg-orange-50"
          >
            <MenuItem item={category} mobile />
          </li>
        ))}
      </ul>
    </div>

    {/* Footer */}
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