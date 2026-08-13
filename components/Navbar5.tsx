"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useSWR from "swr";
import { 
  FaBars, 
  FaChevronLeft, 
  FaChevronRight, 
  FaShopify 
} from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { 
  FiHome, 
  FiShoppingCart, 
  FiShoppingBag, 
  FiTruck, 
  FiMail, 
  FiX, 
  FiUser,
  FiInfo,
  FiMessageCircle
} from "react-icons/fi";

import fetcher from "@/lib/navfatcher";
import MenuItem from "./MenuItem";
import { useCart } from "@/app/src/components/context/CartContext";
import { CategoryResponse } from "@/app/types/category";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UseLogo } from "./ui/logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { logo } = UseLogo();

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
            <Skeleton className="h-10 w-24 rounded-full shrink-0" />
            <div className="hidden lg:flex flex-1 items-center justify-center gap-6 px-10 overflow-hidden">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
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
      <nav className="sticky top-0 z-50 bg-background border-b shadow-sm">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-center text-destructive">
          Failed to load categories
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-ring/10 shadow-sm">
        <div className="container mx-auto px-1 md:px-16">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <img
                src={logo || null}
                alt="Logo"
                width={90}
                height={40}
                className=""
              />
            </Link>

            {/* Categories Horizontal Scroll (Desktop View) */}
            <div className="hidden lg:flex flex-1 items-center relative min-w-0 overflow-visible">
              {canScrollLeft && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleScroll("left")}
                  className="absolute left-0 z-20 h-3 w-3"
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

              {canScrollRight && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleScroll("right")}
                  className="absolute right-0 z-20 h-3 w-3"
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
                className="rounded-full hover:bg-ring/5 transition-all duration-300"
              >
                <Link href="/products">
                  <FaShopify className="text-3xl" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full hover:bg-ring/10 transition-all duration-300"
              >
                <Link href="/login">
                  <MdAccountCircle className="text-3xl" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative rounded-full hover:ring/10 transition-all duration-300"
              >
                <Link href="/cart">
                  <TiShoppingCart className="text-3xl" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-text-secondary text-sm font-semibold flex items-center justify-center">
                    {totalItems}
                  </span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                className="lg:hidden rounded-full hover:bg-ring/10 transition-all duration-300"
              >
                <FaBars className="text-xl" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Sidebar */}
      {open && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/5 lg:hidden transition-opacity"
            onClick={() => setOpen(false)}
          />

          {/* Drawer Body: 85% width */}
          <div
            className={`fixed top-0 left-0 z-50 h-screen w-[85%] max-w-xs bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
                <img
                  src={logo || "/logo.png"}
                  alt="Logo"
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-ring/50 hover:text-ring0 rounded-full hover:bg-gray-100 transition"
                aria-label="Close menu"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
              {/* Main Navigation Links */}
              <nav className="space-y-1 px-3">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-ring hover:text-primary transition-colors"
                >
                  <FiHome className="text-xl text-primary" />
                  <span>Home</span>
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  <FiShoppingCart className="text-xl text-primary" />
                  <span>Cart</span>
                </Link>

                <Link
                  href="/flash-sales"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  <FiShoppingBag className="text-xl text-primary" />
                  <span>Flash Sales</span>
                </Link>

                <Link
                  href="/special-offers"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  <FiShoppingCart className="text-xl text-primary" />
                  <span>Special Offers</span>
                </Link>

                <Link
                  href="/track-order"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  <FiTruck className="text-xl text-primary" />
                  <span>Track Order</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  <FiMail className="text-xl text-primary" />
                  <span>Contact Us</span>
                </Link>
              </nav>

              {/* Menu Section Header */}
              <div className="mt-4 border-t border-gray-100 pt-4 px-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  MENU
                </span>
              </div>

              {/* Dynamic Categories */}
              <div className="mt-2">
                {data?.data.map((category) => (
                  <MenuItem
                    key={category.id}
                    item={category}
                    mobile
                    onSelect={() => setOpen(false)}
                  />
                ))}
              </div>

              {/* MORE LINKS Section */}
              <div className="mt-4 border-t border-gray-100 pt-4 px-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  MORE LINKS
                </span>
                <nav className="mt-3 space-y-1">
                  <Link
                    href="/terms-and-conditions"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3.5 py-2.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    <FiInfo className="text-lg text-sky-400" />
                    <span>Terms & Conditions</span>
                  </Link>

                  <Link
                    href="/privacy-policy"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3.5 py-2.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    <FiInfo className="text-lg text-primary" />
                    <span>Privacy Policy</span>
                  </Link>

                  <Link
                    href="/delivery-info"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3.5 py-2.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    <FiInfo className="text-lg text-primary" />
                    <span>Delivery</span>
                  </Link>

                  <a
                    href="https://wa.me/8801939000500"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3.5 py-2.5 text-sm font-medium text-gray-700 hover:text-emerald-500 transition-colors"
                  >
                    <FiMessageCircle className="text-lg text-emerald-500" />
                    <span>WhatsApp</span>
                  </a>
                </nav>
              </div>
            </div>

            {/* Bottom Action Area: Sign In / Register Button */}
            <div className="p-4 border-t border-gray-100 bg-background">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-3 bg-primary hover:bg-primary/50 text-white font-semibold text-base rounded-xl transition-colors shadow-sm"
              >
                <FiUser className="text-xl" />
                <span>Sign In / Register</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}