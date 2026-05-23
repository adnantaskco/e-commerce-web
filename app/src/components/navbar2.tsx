import Image from "next/image";
import React, { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart, FaBars, FaXmark } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FcManager } from "react-icons/fc";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

function Navbar2() {
  const [open, setOpen] = useState(false);

  return (
    <section className="sticky top-0 z-50 bg-white shadow-md p-2">
      <div className=" mx-auto px-4 py-3">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Adnan_Safee.png"
              alt="logo"
              width={100}
              height={50}
              className="rounded-full"
            />
          </div>

          {/* DESKTOP MENU (UNCHANGED) */}
          <div className="hidden md:flex items-center gap-4">
            <a className="font-semibold" href="#">Home</a>

            {/* Shop */}
            
        <NavigationMenu>
  <NavigationMenuList>
    {/* Shop Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4 min-w-[260px] grid gap-2">
              <NavigationMenuLink className="hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                Men’s Fashion
              </NavigationMenuLink>
              <NavigationMenuLink className="hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                Women’s Collection
              </NavigationMenuLink>
              <NavigationMenuLink className="hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                Kids Wear
              </NavigationMenuLink>
              <NavigationMenuLink className="hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                Winter Collection
              </NavigationMenuLink>
              <NavigationMenuLink className="hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                New Arrivals
              </NavigationMenuLink>
              <NavigationMenuLink className="hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                Best Sellers
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

    {/* Cloth Showroom Menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Cloth Showroom</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 min-w-64 grid gap-2">
                <NavigationMenuLink className="hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                  Casual Shirts Showroom
                </NavigationMenuLink>
                <NavigationMenuLink className="hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                  Luxury Panjabi Gallery
                </NavigationMenuLink>
                <NavigationMenuLink className="hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                  Saree & Boutique Corner
                </NavigationMenuLink>
                <NavigationMenuLink className="hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                  Denim & Jeans Zone
                </NavigationMenuLink>
                <NavigationMenuLink className="hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                  Hoodie & Jacket Studio
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

            {/* Products */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex gap-2">Catagories <span  className="bg-primary px-2 rounded-md" > Sale</span></NavigationMenuTrigger>
                  <NavigationMenuContent className="p-3 min-w- flex flex-col gap-2">
                    <NavigationMenuLink>Classic Cotton Shirt</NavigationMenuLink>
                    <NavigationMenuLink>Premium Denim Jeans</NavigationMenuLink>
                    <NavigationMenuLink>Silk Kurti Collection</NavigationMenuLink>
                    <NavigationMenuLink>Winter Wool Sweater</NavigationMenuLink>
                    <NavigationMenuLink>Oversized Hoodie</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Brand */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Brand</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-3 min-w-50 flex flex-col gap-2">
                    <NavigationMenuLink>Zara Style</NavigationMenuLink>
                    <NavigationMenuLink>H&M Fashion</NavigationMenuLink>
                    <NavigationMenuLink>Levi’s Denim</NavigationMenuLink>
                    <NavigationMenuLink>Uniqlo Basics</NavigationMenuLink>
                    <NavigationMenuLink>Nike Apparel</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Hot List */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Hot List</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-3 min-w-50 flex flex-col gap-2">
                    <NavigationMenuLink>🔥 Trending Hoodies</NavigationMenuLink>
                    <NavigationMenuLink>🔥 Best Selling Jeans</NavigationMenuLink>
                    <NavigationMenuLink>🔥 New Arrival Shirts</NavigationMenuLink>
                    <NavigationMenuLink>🔥 Summer Collection</NavigationMenuLink>
                    <NavigationMenuLink>🔥 Discount Deals</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <a href="#" className="font-semibold">About</a>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5 text-xl cursor-pointer">

            <span><CiSearch/></span>

           <span><FcManager/></span>

           <p className="flex items-center gap-2 text-sm font-semibold">
            
            {/* Cart Icon */}
            <span className="relative text-2xl">
              <TiShoppingCart />

              {/* Cart Count */}
              <span className="absolute -top-2 -right-3 bg-primary text-[10px] w-5 h-5 rounded-full flex items-center justify-center gap-2">
                0
              </span>
            </span>
              <span className="hidden md:block">  My Cart</span>
            
          </p>

            

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setOpen(true)}
            >
              <FaBars />
            </button>
          </div>

        </div>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* RIGHT SIDEBAR (MOBILE) */}
      <div
        className={`
          fixed top-0 right-0 h-full w-48 bg-white z-50 shadow-lg
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)} className="text-2xl">
            <FaXmark />
          </button>
        </div>

        {/* SIMPLE MOBILE LINKS (dropdown unchanged on desktop only) */}
        <div className="flex flex-col gap-4 px-6 font-medium">
          <a href="#">Products</a>
          <a href="#">Brand</a>
          <a href="#">Hot List</a>
          <a href="#">About</a>
        </div>
      </div>
    </section>
  );
}

export default Navbar2;