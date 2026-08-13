"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import useSWR from "swr";
import {
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaShopify,
} from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";

import fetcher from "@/lib/navfatcher";
import { useCart } from "@/app/src/components/context/CartContext";
import { Category, CategoryResponse } from "@/app/types/category";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UseLogo } from "./ui/logo";

/* -------------------------------------------------------------------------- */
/*         DESKTOP: Hover Dropdown Item with Floating React Portal             */
/* -------------------------------------------------------------------------- */
function DesktopNavItem({ item }: { item: Category }) {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLLIElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // Position the dropdown right below the hovered item
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setHovered(true);
  };

  return (
    <li
      ref={triggerRef}
      className="relative list-none group py-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/category/${item.slug}`}
        className="flex items-center gap-1.5 text-sm font-medium text-text-primary hover:text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-primary/5"
      >
        <span>{item.name}</span>
        {hasChildren && (
          <FaChevronDown
            className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${
              hovered ? "rotate-180 text-primary" : ""
            }`}
          />
        )}
      </Link>

      {/* Floating Child Dropdown via Portal (Avoids overflow clipping entirely) */}
      {hasChildren &&
        hovered &&
        isMounted &&
        createPortal(
          <div
            className="fixed z-[9999] pt-1"
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="bg-background border border-ring/10 rounded-xl shadow-2xl p-2 min-w-[200px] flex flex-col gap-1 backdrop-blur-md">
              {item.children?.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/category/${sub.slug}`}
                  className="text-sm font-medium text-text-primary hover:text-primary hover:bg-primary/10 transition-colors px-3 py-2 rounded-lg block"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>,
          document.body
        )}
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*             MOBILE: Collapsible Accordion Menu                             */
/* -------------------------------------------------------------------------- */
function MobileMenuItem({
  item,
  onSelect,
}: {
  item: Category;
  onSelect: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="w-full text-text-primary">
      <div className="flex items-center justify-between p-3 transition hover:bg-primary/10 rounded-xl">
        <Link
          href={`/category/${item.slug}`}
          onClick={onSelect}
          className="flex-1 font-medium text-sm text-text-primary hover:text-primary transition-colors"
        >
          {item.name}
        </Link>

        {hasChildren && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
            className="p-1.5 rounded-md hover:bg-primary/20 text-ring/70 transition-transform duration-200"
            aria-label="Toggle Subcategories"
          >
            <FaChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                isOpen ? "rotate-180 text-primary" : ""
              }`}
            />
          </button>
        )}
      </div>

      {hasChildren && (
        <div
          className={`grid transition-all duration-300 ease-in-out pl-4 pr-2 ${
            isOpen ? "grid-rows-[1fr] opacity-100 py-1" : "grid-rows-[0fr] opacity-0 py-0"
          }`}
        >
          <div className="overflow-hidden space-y-1 border-l-2 border-primary/20 pl-2">
            {item.children?.map((sub) => (
              <MobileMenuItem key={sub.id} item={sub} onSelect={onSelect} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN NAVBAR                                  */
/* -------------------------------------------------------------------------- */
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
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
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
                src={logo || "/placeholder.png"}
                alt="Logo"
                width={90}
                height={40}
                className="rounded-full object-contain"
              />
            </Link>

            {/* Desktop Horizontal Scroll Bar */}
            <div className="hidden lg:flex flex-1 items-center relative min-w-0">
              {canScrollLeft && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleScroll("left")}
                  className="absolute left-0 z-20 h-7 w-7 rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-text-secondary"
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
                <ul className="flex items-center gap-4 whitespace-nowrap py-2 h-full">
                  {data?.data.map((category) => (
                    <DesktopNavItem key={category.id} item={category} />
                  ))}
                </ul>
              </div>

              {canScrollRight && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleScroll("right")}
                  className="absolute right-0 z-20 h-7 w-7 rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-text-secondary"
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
                className="relative rounded-full hover:bg-ring/10 transition-all duration-300"
              >
                <Link href="/cart">
                  <TiShoppingCart className="text-3xl" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-text-secondary text-xs font-semibold flex items-center justify-center">
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

      {/* Mobile Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />

          <div
            className={`fixed top-0 left-0 z-50 h-screen w-80 bg-background shadow-2xl transition-transform duration-300 lg:hidden ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="relative bg-gradient-to-r from-primary via-primary to-primary/70 p-6 text-text-primary">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 h-10 w-10 rounded-full bg-background/20 text-text-primary hover:bg-white/30 transition flex items-center justify-center"
              >
                ✕
              </Button>

              <div className="flex items-center gap-4 mt-6">
                <div>
                  <h2 className="text-xl font-bold">Welcome</h2>
                  <p className="text-sm text-text-secondary">
                    Explore thousands of products
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-between rounded-2xl bg-background/15 p-3 backdrop-blur-md">
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-1 hover:scale-105 transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary">
                    <FaShopify className="text-2xl" />
                  </div>
                  <span className="text-xs">Products</span>
                </Link>

                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-1 hover:scale-105 transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow">
                    <MdAccountCircle className="text-2xl" />
                  </div>
                  <span className="text-xs">Account</span>
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="relative flex flex-col items-center gap-1 hover:scale-105 transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary shadow">
                    <TiShoppingCart className="text-2xl" />
                  </div>

                  <span className="absolute right-3 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                    {totalItems}
                  </span>

                  <span className="text-xs">Cart</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-ring">
                <GiShoppingCart className="text-2xl font-bold" /> Categories
              </h3>
            </div>

            <div className="h-[calc(100vh-270px)] overflow-y-auto custom-scrollbar p-3">
              <ul className="space-y-1">
                {data?.data.map((category) => (
                  <li
                    key={category.id}
                    className="overflow-hidden rounded-xl border border-ring/10 transition hover:border-primary/40 hover:bg-primary/5"
                  >
                    <MobileMenuItem
                      item={category}
                      onSelect={() => setOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute bottom-0 w-full border-t bg-ring/10 p-4">
              <p className="text-center text-xs text-text-primary">
                ❤️ Happy Shopping
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}