"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaTshirt,
  FaShoePrints,
  FaTags,
  FaFire,
  FaStar,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const categories = [
  { name: "Dress & Jumpsuits", href: "/dress", icon: FaTshirt },
  { name: "Jacket", href: "/jacket", icon: FaTags },
  { name: "Shoes", href: "/shoes", icon: FaShoePrints },
  { name: "Week Deal", href: "/week-deal", icon: FaFire },
  { name: "Featured Product", href: "/featured", icon: FaStar },
];

const brands = [
  { name: "Nike", href: "/brand/nike" },
  { name: "Adidas", href: "/brand/adidas" },
  { name: "Puma", href: "/brand/puma" },
  { name: "Zara", href: "/brand/zara" },
  { name: "H&M", href: "/brand/hm" },
  { name: "Levi's", href: "/brand/levis" },
];

export default function CategorySidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden p-2 text-2xl"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen md:h-auto
          w-72 bg-white shadow-lg md:shadow-none
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="border-b-2 border-black p-2 text-center md:pt-44 lg:pt-44 ">
          <h1 className="text-lg font-bold">Categories</h1>
        </div>

        {/* Categories */}
        <div className="p-3">
          <ul className="space-y-2 border rounded-2xl p-3">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;

              return (
                <li key={idx}>
                  <Link
                    href={cat.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Icon className="text-primary text-lg" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Brands */}
        <div className="px-3 pb-4">
          <h2 className="text-lg font-bold mb-3 border-b-2 flex justify-center border-black pb-2">
            Brands
          </h2>

          <ul className="space-y-2 border rounded-2xl p-3">
            {brands.map((brand, idx) => (
              <li key={idx}>
                <Link
                  href={brand.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {brand.name.charAt(0)}
                  </div>

                  <span>{brand.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}