"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaShopify } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";

import { useCart } from "@/app/src/components/context/CartContext";
import { Button } from "@/components/ui/button";
import { UseLogo } from "./logo";
import CategoryNav from "../Navbar5";

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const { logo } = UseLogo();
  const { totalItems } = useCart();

  return (
    <main className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-ring/10 shadow-sm">
      <section>
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

            {/* Action Buttons */}
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
      </section>

      {/* Category Component with Mobile Drawer */}
      <CategoryNav open={open} setOpen={setOpen} logo={logo} />
    </main>
  );
}