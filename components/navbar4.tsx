"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const productTypes = [
  "Simple Product",
  "Grouped Product",
  "Variable Product",
  "Sale Product",
  "Upsell Products",
  "Cross Sell Product",
];

const prestashopPages = [
  "Checkout Page",
  "Category Page",
  "Shopping Cart",
  "My account",
  "Shop Ajax Filter",
  "Our Stores",
];

const productFeatures = [
  "Progress Bar",
  "Product Brand",
  "Countdown Timer",
  "Custom Tabs",
  "Product Gallery",
  "Stock Label",
];

export function Drop() {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList>

        {/* Mega Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-[#f33b3b] text-white hover:bg-[#e63232] hover:text-white">
            Categories
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="w-screen bg-[#f5f5f5]">
              <div className="max-w-[1400px] mx-auto px-10 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                  {/* Column 1 */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-black">
                      Product Types
                    </h3>

                    <ul className="space-y-4">
                      {productTypes.map((item) => (
                        <li
                          key={item}
                          className="text-gray-600 hover:text-[#f33b3b] cursor-pointer transition text-lg"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-black">
                      Prestashop Pages
                    </h3>

                    <ul className="space-y-4">
                      {prestashopPages.map((item) => (
                        <li
                          key={item}
                          className="text-gray-600 hover:text-[#f33b3b] cursor-pointer transition text-lg"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-black">
                      Product Features
                    </h3>

                    <ul className="space-y-4">
                      {productFeatures.map((item) => (
                        <li
                          key={item}
                          className="text-gray-600 hover:text-[#f33b3b] cursor-pointer transition text-lg"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Banner 1 */}
                  <div className="relative h-[280px] overflow-hidden rounded-xl group">
                    <Image
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                      alt="Shoes"
                      fill
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

                      <p className="mt-4 text-lg text-black">
                        Top deals
                      </p>

                      <h3 className="text-3xl font-bold text-black">
                        $50
                      </h3>
                    </div>
                  </div>

                  {/* Banner 2 */}
                  <div className="relative h-[280px] overflow-hidden rounded-xl group">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                      alt="Girl"
                      fill
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
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Docs */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle()}
          >
            <Link href="/docs">Docs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  );
}