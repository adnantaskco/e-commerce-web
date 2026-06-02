"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function MegaDropdown1() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#f33b3b] text-white px-6 py-3 rounded-md font-medium"
      >
        Categories

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mega Menu */}
      {open && (
        <div className="absolute left-0 top-16 w-screen bg-[#f5f5f5] shadow-2xl z-50 border-t">
          <div className="max-w-[1400px] mx-auto px-10 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
              
              {/* Column 1 */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-black">
                  Product Types
                </h3>

                <ul className="space-y-4 text-gray-600 text-lg">
                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Simple Product
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Grouped Product
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Variable Product
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Sale Product
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Upsell Products
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Cross Sell Product
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-black">
                  Prestashop Pages
                </h3>

                <ul className="space-y-4 text-gray-600 text-lg">
                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Checkout Page
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Category Page
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Shopping Cart
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    My account
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Shop Ajax Filter
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Our Stores
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-black">
                  Product Features
                </h3>

                <ul className="space-y-4 text-gray-600 text-lg">
                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Progress Bar
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Product Brand
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Countdown Timer
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Custom Tabs
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Product Gallery
                  </li>

                  <li className="hover:text-[#f33b3b] cursor-pointer transition">
                    Stock Label
                  </li>
                </ul>
              </div>

              {/* Banner 1 */}
              <div className="relative h-[280px] rounded-xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                  alt="Shoes"
                  
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold">
                    SPECIAL OFFER
                  </span>

                  <h2 className="text-3xl font-bold mt-5 leading-snug text-black">
                    Discount Up To <br /> 20% Off
                  </h2>

                  <p className="mt-4 text-lg text-black">Top deals</p>

                  <h3 className="text-3xl font-bold text-black">$50</h3>
                </div>
              </div>

              {/* Banner 2 */}
              <div className="relative h-[280px] rounded-xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Girl"
                  
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold">
                    SPECIAL SALE
                  </span>

                  <h2 className="text-3xl font-bold mt-5 text-black">
                    Up To 30% Off
                  </h2>

                  <p className="mt-4 text-2xl text-black">
                    New Arrivals
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}