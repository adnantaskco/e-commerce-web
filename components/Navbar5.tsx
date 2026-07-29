"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { FaBars, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

import fetcher from "@/lib/navfatcher";
import MenuItem from "./MenuItem";
import { useCart } from "@/app/src/components/context/CartContext";
import { CategoryResponse } from "@/app/types/category";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading } = useSWR<CategoryResponse>(
    "https://sevenone-bd.app.taskcocommerce.com/api/v1/categories",
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
                className="absolute left-0 z-20 h-9 w-9 rounded-full bg-white shadow hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaChevronLeft />
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
                className="absolute right-0 z-20 h-9 w-9 rounded-full bg-white shadow hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 shrink-0">
              <button className="h-10 w-10 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
                <CiSearch className="text-2xl" />
              </button>

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
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          />

          <div className="fixed top-0 left-0 z-50 h-screen w-72 bg-white shadow-xl lg:hidden">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-lg font-bold">Categories</h2>

              <button
                onClick={() => setOpen(false)}
                className="h-9 w-9 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-70px)]">
              <ul className="flex flex-col">
                {data?.data.map((category) => (
                  <li key={category.id} className="border-b border-gray-100">
                    <MenuItem item={category} mobile />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}