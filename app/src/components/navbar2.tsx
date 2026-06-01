"use client"
import Image from "next/image";
import React, { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart, FaBars, FaXmark } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FcManager } from "react-icons/fc";
import { MdAccountCircle } from "react-icons/md";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import MegaDropdown from "./shop";
import MegaDropdown1 from "./shop";
import { useCart } from "./context/CartContext";

function Navbar2() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();


  return (
    <section className="sticky top-0 z-50 bg-white shadow-md p-2">
      <div className=" mx-auto px-4 py-3">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <link  href="/home" /><div className="flex items-center gap-2">
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
            <a className="font-semibold text-sm" href="/home">Home</a>

           

            {/* Shop */}
            
        <NavigationMenu>
  <NavigationMenuList>
    {/* Shop Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
            <NavigationMenuContent className="px-4 min-w-[260px] grid ">
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
              <NavigationMenuContent className="px-4 min-w-[260px] grid ">
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
                  <NavigationMenuTrigger className="flex gap-2">Catagories </NavigationMenuTrigger>
                  <NavigationMenuContent className="px-4 min-w-[260px] flex flex-col">
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
                  <NavigationMenuContent className=" px-4 min-w-[260px] flex flex-col ">
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
                  <NavigationMenuContent className="px-4 min-w-[260px] flex flex-col ">
                    <NavigationMenuLink> Trending Hoodies</NavigationMenuLink>
                    <NavigationMenuLink> Best Selling Jeans</NavigationMenuLink>
                    <NavigationMenuLink> New Arrival Shirts</NavigationMenuLink>
                    <NavigationMenuLink> Summer Collection</NavigationMenuLink>
                    <NavigationMenuLink> Discount Deals</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <a href="#" className="font-semibold">About</a>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5 text-xl">

          <a href="">
         <CiSearch />
                </a>

              <a href="/loginpage">
           <MdAccountCircle/>
            </a>

             <a
             href="/cart"
              className="relative flex items-center gap-2 text-sm font-semibold"
  >
              <TiShoppingCart className="text-2xl" />

            <span className="absolute -top-2 -right-3 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
          </span>
  </a>

          
            

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