"use client"

import React, { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import {  FaBars, FaBoxOpen, FaClipboardList, FaFire, FaHeart, FaTags, FaXmark } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";


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
import { useCart } from "../app/src/components/context/CartContext";
import Link from "next/link";
import { FaHome, FaInfoCircle, FaPhoneAlt, FaShoppingCart, FaThLarge } from "react-icons/fa";

function Navbar2() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();


  return (
    <section className="sticky top-0 z-50 bg-white shadow-md p-2">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 py-3">
        <div className="flex justify-between items-center">

          {/* Logo */}
         <Link href="/home">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Adnan_Safee.png"
                alt="logo"
                width={100}
                height={50}
                className="rounded-full"
              />
            </div>
          </Link>

          {/* DESKTOP MENU (UNCHANGED) */}
          <div className="hidden md:flex items-center gap-4">
            <Link className="font-semibold text-sm" href="/products">Products</Link>

           

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

            <a href="/about" className="font-semibold text-sm">About</a>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5 ">

          <a href="#">
         <CiSearch  className="text-2xl"/>
                </a>

              <a href="/loginpage">
           <MdAccountCircle className="text-2xl"/>
            </a>

            <Link
                href="/cart"
                className="relative flex items-center gap-2 text-sm font-semibold"
              >
                <TiShoppingCart className="text-2xl" />

                <span className="absolute -top-2 -right-3 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </Link>


          
            

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

{/* Overlay */}
{open && (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40"
    onClick={() => setOpen(false)}
  />
)}

{/* Mobile Sidebar */}
<div
  className={`fixed top-0 right-0 h-screen w-72 bg-white z-50 shadow-2xl
  transition-transform duration-300 ease-in-out
  ${open ? "translate-x-0" : "translate-x-full"}`}
>
  {/* Header */}
  <div className="bg-primary text-white p-5">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-bold">Welcome </h2>
        <p className="text-sm text-orange-100">
          Sign in to access your account
        </p>
      </div>

      <button
        onClick={() => setOpen(false)}
        className="text-2xl hover:rotate-90 transition"
      >
        <FaXmark />
      </button>
    </div>
    <Link href="/signup">
    <button className="mt-4 w-full bg-white text-orange-500 py-2 rounded-lg font-semibold hover:bg-orange-100 transition">
      Sign In / Register
    </button></Link>
  </div>

  {/* Menu */}
  <div className="py-4">

    <Link href="/">
    <p
     
      className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition"
    >
      <FaHome className="text-orange-500" />
      Home
    </p></Link>
    <Link href="/products">
    <p
     
      className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition"
    >
      <FaBoxOpen className="text-orange-500" />
      Products
    </p></Link>
    <Link href="/products"></Link>
    <p
      
      className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition"
    >
      <FaThLarge className="text-orange-500" />
      Categories
    </p>
      <Link href="/products"></Link>
    <p
      
      className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition"
    >
      <FaTags className="text-orange-500" />
      Brands
    </p>
<Link href="/"></Link>
    <p
     
      className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition"
    >
      <FaFire className="text-red-500" />
      Flash Sale
    </p>

    <a
      href="/wishlist"
      className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition"
    >
      <FaHeart className="text-pink-500" />
      Wishlist
    </a>

    <a
      href="/cart"
      className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition"
    >
      <FaShoppingCart className="text-green-500" />
      Cart
    </a>

   

    <a
      href="/about"
      className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition"
    >
      <FaInfoCircle className="text-indigo-500" />
      About
    </a>

    <a
      href="/about"
      className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition"
    >
      <FaPhoneAlt className="text-teal-500" />
      Contact
    </a>
  </div>

  {/* Footer */}
  <div className="absolute bottom-0 w-full border-t p-4 text-center text-sm text-gray-500">
    <p>ShopSmart v1.0.0</p>
    <p className="mt-1">© 2026 All Rights Reserved.</p>
  </div>
</div>
    </section>
  );
}

export default Navbar2;