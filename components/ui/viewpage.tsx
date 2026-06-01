"use client"


import { useState } from "react"
import Image from "next/image"
import {
   Clock,
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
} from "lucide-react"
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaXTwitter,
  FaTwitter,
} from "react-icons/fa6";


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaHeart, FaShoppingCart, FaStar ,FaEye} from "react-icons/fa";
import { Badge } from "@/components/ui/badge"



type Product = {
  id: number;
  image: string;
  brand: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  discount?: number;
  hasOffer: boolean;
};

const product1: Product[] = [
  {
    id: 1,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/1/21-home_default.jpg",
    brand: "EcoShop",
    name: "Classic Winter Wool Blazer Jacket",
    rating: 5,
    reviews: 12,
    price: 120,
    oldPrice: 150,
    discount: 20,
    hasOffer: true,
  },
  {
    id: 2,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/2/22-home_default.jpg",
    brand: "EcoShop",
    name: "Slim Fit Formal Black Blazer",
    rating: 4,
    reviews: 18,
    price: 95,
    oldPrice: 110,
    discount: 15,
    hasOffer: true,
  },
  {
    id: 3,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/3/23-home_default.jpg",
    brand: "EcoShop",
    name: "Premium Navy Blue Office Blazer",
    rating: 5,
    reviews: 22,
    price: 130,
    oldPrice: 145,
    discount: 10,
    hasOffer: true,
  },
  {
    id: 4,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/4/24-home_default.jpg",
    brand: "EcoShop",
    name: "Casual Street Style Jacket Blazer",
    rating: 4,
    reviews: 9,
    price: 75,
    hasOffer: false,
  },
  {
    id: 5,
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/5/25-home_default.jpg",
    brand: "EcoShop",
    name: "Men’s Formal Wedding Blazer",
    rating: 5,
    reviews: 30,
    price: 160,
    oldPrice: 180,
    discount: 12,
    hasOffer: true,
  },
 ]





const product = {
  id: 1,
  name: "Classic Winter Wool Blazer Jacket",
  image:
    "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/1/21-home_default.jpg",
  short_description:
    "The Classic Winter Wool Blazer Jacket is a stylish and warm winter essential made from premium wool-blend fabric. It offers excellent insulation while maintaining breathability and comfort. Designed with a modern slim fit, it delivers a sharp, elegant look for both formal and casual occasions. Perfect for office wear, events, and winter outings, it combines durability, comfort, and timeless fashion in one versatile piece.",
  price: {
    retail_price: 150,
    sale_price: 120,
    is_discounted: true,
  },
  stock: {
    in_stock: true,
  },
  category: "Jacket",
  brand: "EcoShop",
  sizes: ["S", "M", "L", "XL", "XXL"],

  
}

export default function ProductViewPage() {
  const [selectedSize, setSelectedSize] = useState("")

  const discount =
    product.price.retail_price - product.price.sale_price

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">

      {/* CONTAINER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* PRODUCT CARD */}
        <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl border">

          {/* IMAGE SECTION */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-gray-100 p-3 sm:p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-auto object-cover rounded-xl transition-transform duration-700 hover:scale-105"
              />
            </div>

            {product.price.is_discounted && (
              <Badge className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
                Save ${discount}
              </Badge>
            )}
          </div>

          {/* DETAILS SECTION */}
          <div className="flex flex-col justify-center space-y-5 lg:pr-6">

            <p className="text-xs sm:text-sm tracking-widest text-primary uppercase">
              {product.category}
            </p>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                (120 Reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-end gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-black">
                ${product.price.sale_price}
              </h2>

              <p className="text-lg sm:text-xl line-through text-gray-400">
                ${product.price.retail_price}
              </p>
            </div>

            {/* STOCK */}
            <div>
              {product.stock.in_stock ? (
                <span className="text-green-600 font-medium">
                  ● In Stock
                </span>
              ) : (
                <span className="text-red-500 font-medium">
                  ● Out of Stock
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-7 max-w-xl text-sm sm:text-base">
              {product.short_description}
            </p>

            {/* SIZE */}
            <div>
              <h4 className="font-semibold mb-3">Select Size</h4>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 sm:px-5 py-2 rounded-xl border text-sm transition ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {selectedSize && (
                <p className="text-sm text-gray-500 mt-2">
                  Selected:{" "}
                  <span className="font-semibold text-black">
                    {selectedSize}
                  </span>
                </p>
              )}
            </div>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border">
                <Truck className="text-black" />
                <div>
                  <h4 className="font-semibold text-sm">
                    Fast Delivery
                  </h4>
                  <p className="text-xs text-gray-500">
                    2–5 Days
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border">
                <ShieldCheck className="text-black" />
                <div>
                  <h4 className="font-semibold text-sm">
                    Authentic Product
                  </h4>
                  <p className="text-xs text-gray-500">
                    100% Verified
                  </p>
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="flex-1 rounded-2xl py-6 text-base bg-primary hover:bg-amber-800 cursor-pointer"
                disabled={!product.stock.in_stock || !selectedSize}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add To Cart
              </Button>

              <Button
                variant="outline"
                className="rounded-2xl px-6 py-6"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
             <div>
            <p className="flex items-center gap-5 text-xl py-5 font-semibold ">Share on:  <FaFacebookF/>
  <FaInstagram/>
  <FaPinterestP/>
  <FaYoutube/>
  <FaXTwitter/>
  <FaTwitter/> </p>

  <div className="space-y-4 mt-6">

  {/* Free Shipping */}
  <div className="flex gap-3 items-start p-4 rounded-xl bg-gray-50 border">
    <Truck className="text-black mt-1" size={20} />
    <p className="font-bold">
      Free Shipping & Returns :{" "}
      <span className="font-normal text-gray-600">
        Available on all orders over $99.
      </span>
    </p>
  </div>

  {/* Delivery */}
  <div className="flex gap-3 items-start p-4 rounded-xl bg-gray-50 border">
    <Clock className="text-black mt-1" size={20} />
    <p className="font-bold">
      Estimated Delivery :{" "}
      <span className="font-normal text-gray-600">
        Orders are typically dispatched within 24 hours.
      </span>
    </p>
  </div>

  {/* Security */}
  <div className="flex gap-3 items-start p-4 rounded-xl bg-gray-50 border">
    <ShieldCheck className="text-black mt-1" size={20} />
    <p className="font-bold">
      Security Policy :{" "}
      <span className="font-normal text-gray-600">
        Ensuring top-level security for your data and transactions.
      </span>
    </p>
  </div>

</div>
          </div>
          </div>
         
        </div>
      </section>

      {/* RELATED PRODUCTS */}
       <section className="w-full px-4 sm:px-6 lg:px-10 py-6 bg-white">

  {/* Title */}
  <div className="py-6">
    <h1 className="text-3xl sm:text-4xl font-semibold">
      Related Products
    </h1>
  </div>

  {/* SCROLL CONTAINER */}
  <div
    className="
      flex gap-6 overflow-x-auto pb-4
      scroll-smooth
      snap-x snap-mandatory

      sm:grid sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
    "
  >

    {product1.map((product) => (
      <div
        key={product.id}
        className="
          min-w-[260px] sm:min-w-0
          bg-white rounded-xl overflow-hidden
          border border-gray-100
          hover:shadow-xl
          transition-all duration-500
          hover:-translate-y-2
          group
          snap-start
        "
      >

        {/* IMAGE */}
        <div className="relative bg-gray-100 h-[280px] flex items-center justify-center">

          <Image
            src={product.image}
            alt={product.name}
            width={260}
            height={280}
            className="object-contain"
          />

          {product.discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md">
              {product.discount}%
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div
            className="
              absolute top-5 right-4 flex flex-col gap-3 z-10
              opacity-100
              md:opacity-0 md:translate-x-10
              md:group-hover:opacity-100
              md:group-hover:translate-x-0
              transition-all duration-300
            "
          >
            <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-500 hover:text-white">
              <FaHeart />
            </button>

            <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-black hover:text-white">
              <FaShoppingCart />
            </button>

            <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-primary hover:text-white">
              <FaEye />
            </button>
          </div>

        </div>

        {/* DETAILS */}
        <div className="p-4">

          <p className="text-sm text-gray-500">
            {product.brand}
          </p>

          <h2 className="text-base font-semibold text-gray-800 mt-1">
            {product.name}
          </h2>

          {/* RATING */}
          <div className="flex items-center gap-1 mt-2 text-yellow-400 text-sm">
            {[...Array(product.rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="text-gray-500 text-xs ml-1">
              ({product.reviews})
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-3 mt-3">
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${product.oldPrice}
              </span>
            )}

            <span className="text-red-500 font-bold text-lg">
              ${product.price}
            </span>
          </div>

        </div>
      </div>
    ))}
  </div>
</section>
    </div>
  )
}