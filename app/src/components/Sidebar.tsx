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

export default function CategorySidebar() {
  const [open, setOpen] = useState(false);

  return (
    <section className="hidden md:block">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-2 text-2xl"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 md:pb-10 h-full w-64 bg-white 
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-4 border-b font-bold text-lg md:pt-20 ">
         <h1 className="text-4xl font-semibold"> Categories</h1>
        </div>

        <ul className="p-3 space-y-2">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;

            return (
              <li key={idx}>
                <Link
                  href={cat.href}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="text-lg text-primary" />
                  <span>{cat.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </section>
  );
}