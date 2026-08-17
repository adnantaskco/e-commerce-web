"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useSWR from "swr";
import { 
  FaBars, 
  FaChevronLeft, 
  FaChevronRight 
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
import { Mail, MapPin, Menu, MessageCircle, ShoppingBag, ShoppingCart } from "lucide-react";

import fetcher from "@/lib/navfatcher";
import MenuItem from "./MenuItem";
import { useCart } from "@/app/src/components/context/CartContext";
import { CategoryResponse } from "@/app/types/category";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UseLogo } from "./ui/logo";
import Navbar1 from "./navbar1";

export default function Navbar() {
  const [open, setOpen] = useState(false); // Mobile Drawer State
  const [isMoreOpen, setIsMoreOpen] = useState(false); // Dropdown State for "More"
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { logo } = UseLogo();

  const { totalItems } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Smooth hover handlers to prevent accidental closing
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMoreOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMoreOpen(false);
    }, 150); // Small delay to make navigation super smooth
  };

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-ring/30 shadow-sm">
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
    <main className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-ring/10">
      
      <nav className="bg-background/90 backdrop-blur-lg border-t border-ring/10 shadow-sm">
        <div className="container mx-auto px-1 md:px-16">
          <div className="h-16 flex items-center justify-between gap-4">
            
            {/* Logo Section */}
            <div className="shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src={logo || "/logo.png"}
                  alt="Logo"
                  className="h-9 md:h-11 w-auto max-w-30 md:max-w-40 "
                />
              </Link>
            </div>

            {/* Categories Horizontal Scroll (Desktop View) */}
            <div className="hidden lg:flex flex-1 items-center relative min-w-0">
              {canScrollLeft && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleScroll("left")}
                  className="absolute -left-2 top-1.5/2  z-20 h-5 w-5 rounded-full bg-background/90  "
                  aria-label="Scroll left"
                >
                  <FaChevronLeft className="h-2.5 w-2.5" />
                </Button>
              )}
              
              <div
                ref={scrollRef}
                className="w-full overflow-x-auto scrollbar-hide scroll-smooth px-8"
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
                  className="absolute -right-5 top-1.5/2  z-20 h-5 w-5 rounded-full bg-background/90 "
                  aria-label="Scroll right"
                >
                  <FaChevronRight className="h-2.5 w-2.5" />
                </Button>
              )}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1.5 shrink-0">
              
              {/* More Dropdown (Hover Enabled with Seamless Positioning) */}
              <div 
                className="relative hidden md:block py-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setIsMoreOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isMoreOpen 
                      ? "bg-primary/10 text-primary" 
                      : "text-ring hover:bg-ring/10 hover:text-primary"
                  }`}
                >
                  <Menu className="h-4 w-4 text-primary" />
                  <span>More</span>
                </button>

                {/* Dropdown Menu - Seamlessly Attached */}
                {isMoreOpen && (
                  <div className="absolute top-full right-0 z-[9999] pt-1 w-56">
                    <div className="overflow-hidden rounded-2xl border border-ring/10 bg-background p-1.5 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
                      <Link
                        href="/flash-sales"
                        onClick={() => setIsMoreOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ring hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <ShoppingBag className="h-4 w-4 text-primary" />
                        <span>Flash sales</span>
                      </Link>

                      <Link
                        href="/special-offers"
                        onClick={() => setIsMoreOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ring hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4 text-primary" />
                        <span>Special Offers</span>
                      </Link>

                      

                      <a
                        href="https://wa.me/8801812295539"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMoreOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ring hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 text-primary" />
                        <span>WhatsApp</span>
                      </a>

                      <Link
                        href="/contactus"
                        onClick={() => setIsMoreOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ring hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4 text-primary" />
                        <span>Contact Us</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Button */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full hover:bg-ring/10 transition-all duration-300"
              >
                <Link href="/login">
                  <MdAccountCircle className="text-2xl" />
                </Link>
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative rounded-full hover:bg-ring/10 transition-all duration-300"
              >
                <Link href="/cart">
                  <TiShoppingCart className="text-2xl" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-text-secondary text-xs font-semibold flex items-center justify-center">
                    {totalItems}
                  </span>
                </Link>
              </Button>

              {/* Mobile Drawer Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                className="lg:hidden rounded-full hover:bg-ring/10 transition-all duration-300"
              >
                <FaBars className="text-lg" />
              </Button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Sidebar */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-foreground/20 lg:hidden transition-opacity"
            onClick={() => setOpen(false)}
          />

          <div
            className={`fixed top-0 left-0 z-50 h-screen w-[85%] max-w-xs bg-background shadow-xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-ring/10">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
                <img
                  src={logo || "/logo.png"}
                  alt="Logo"
                  className="h-8 w-auto max-w-30 object-contain"
                />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-ring/50 hover:text-ring rounded-full hover:bg-ring/10 transition"
                aria-label="Close menu"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
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
                  className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-ring hover:text-primary transition-colors"
                >
                  <FiShoppingCart className="text-xl text-primary" />
                  <span>Cart</span>
                </Link>

                <Link
                  href="/flash-sales"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-ring hover:text-primary transition-colors"
                >
                  <FiShoppingBag className="text-xl text-primary" />
                  <span>Flash Sales</span>
                </Link>

                <Link
                  href="/special-offers"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-ring hover:text-primary transition-colors"
                >
                  <FiShoppingCart className="text-xl text-primary" />
                  <span>Special Offers</span>
                </Link>

                <Link
                  href="/track-order"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-ring hover:text-primary transition-colors"
                >
                  <FiTruck className="text-xl text-primary" />
                  <span>Track Order</span>
                </Link>

                <Link
                  href="/contactus"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-3 py-3 text-sm font-medium text-ring hover:text-primary transition-colors"
                >
                  <FiMail className="text-xl text-primary" />
                  <span>Contact Us</span>
                </Link>
              </nav>

              <div className="mt-4 border-t border-ring/10 pt-4 px-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-ring/50">
                  MENU
                </span>
              </div>

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

              <div className="mt-4 border-t border-ring/10 pt-4 px-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-ring/60">
                  MORE LINKS
                </span>
                <nav className="mt-3 space-y-1">
                  <Link
                    href="/terms-and-conditions"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3.5 py-2.5 text-sm font-medium text-ring hover:text-primary transition-colors"
                  >
                    <FiInfo className="text-lg text-primary" />
                    <span>Terms & Conditions</span>
                  </Link>

                  <Link
                    href="/privacy-policy"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3.5 py-2.5 text-sm font-medium text-ring hover:text-primary transition-colors"
                  >
                    <FiInfo className="text-lg text-primary" />
                    <span>Privacy Policy</span>
                  </Link>

                  <Link
                    href="/delivery-info"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3.5 py-2.5 text-sm font-medium text-ring hover:text-primary transition-colors"
                  >
                    <FiInfo className="text-lg text-primary" />
                    <span>Delivery</span>
                  </Link>

                  <a
                    href="https://wa.me/8801939000500"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3.5 py-2.5 text-sm font-medium text-ring hover:text-primary transition-colors"
                  >
                    <FiMessageCircle className="text-lg text-primary" />
                    <span>WhatsApp</span>
                  </a>
                </nav>
              </div>
            </div>

            <div className="p-4 border-t border-ring/10 bg-background">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-3 bg-primary hover:bg-primary/50 text-text-secondary font-semibold text-base rounded-xl transition-colors shadow-sm"
              >
                <FiUser className="text-xl" />
                <span>Sign In / Register</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}