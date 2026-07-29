"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaEye,
} from "react-icons/fa";

import { useCart } from "@/app/src/components/context/CartContext";

type Product = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  sold_amount: number;
  review: number | null;
  retail_price: string;
  discount_price: string;
  has_discount: boolean;
  sale_price: string;
  stock_qty: number;
  in_stock: boolean;
  stock_availability: boolean;
  weight: number;
};

// SWR fetcher utility function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BabyDress = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const { addToCart } = useCart();

  // Dynamic API Fetching using SWR
  const { data, error, isLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/home-sections",
    fetcher
  );

type ProductCollection = {
  uid: string;
  name: string;
  type: "product_collection";
  slug: string;
  products: Product[];
};

const productCollection = data?.data?.find(
  (item: ProductCollection) => item.name === "Tech Pro Products"
);

const Babydressproducts = productCollection?.products ?? [];

  if (isLoading) {
    return (
      <div className="py-20 text-center text-lg font-semibold">
       <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGp4dHppaXczajhvamo5MmRoZjdueWk5ZTRzNHU3MHJwdjJidGZpZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kUTME7ABmhYg5J3psM/giphy.gif" alt="" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-lg font-semibold text-red-500">
        Failed to load products.
      </div>
    );
  }

  return (
    <section className="w-full px-2 sm:px-6 lg:px-10 py-6 bg-background">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        {Babydressproducts.map((item: Product) => (
          <div
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() =>
              setHovered(hovered === item.id ? null : item.id)
            }
            className="bg-background rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
          >
            {/* IMAGE */}
            <div className="relative bg-background h-[140px] sm:h-[280px] flex items-center justify-center p-2">

              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name}
                width={260}
                height={300}
                unoptimized
                className="object-contain max-h-full pointer-events-none"
              />

              {/* Discount Badge */}
              {item.has_discount && (
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded">
                  {item.discount_price}
                </div>
              )}

              {/* Action Buttons */}
              <div
                className={`absolute top-2 right-2 sm:top-5 sm:right-4 flex flex-col gap-2 transition-all duration-300 ${
                  hovered === item.id
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                <button className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-primary hover:text-white transition">
                  <FaHeart />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    addToCart({
                      id: item.id,
                      image: item.image || "/placeholder.png",
                      brand: "Taskco",
                      name: item.name,
                      price: Number(item.sale_price),
                    });
                  }}
                  className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-black hover:text-white transition"
                >
                  <FaShoppingCart />
                </button>

                <button className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition">
                  <FaEye />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <Link href={`/products/${item.slug}`}>
              <div className="p-2 sm:p-4">

                <p className="text-[11px] sm:text-sm text-gray-500">
                  Taskco
                </p>

                <h2 className="text-xs sm:text-base font-semibold truncate text-text-primary">
                  {item.name}
                </h2>

                {/* Rating */}
                <div className="flex gap-1 text-yellow-400 text-xs mt-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">

                  {item.has_discount && (
                    <span className="line-through text-gray-400 text-sm">
                      ৳{Number(item.retail_price).toFixed(0)}
                    </span>
                  )}

                  <span className="font-bold text-red-500 text-base">
                    ৳{Number(item.sale_price).toFixed(0)}
                  </span>

                </div>

                {/* Stock */}
                <div className="">
                  {item.in_stock ? (
                    <span className="text-green-600 text-xs font-medium">
                      In Stock ({item.stock_qty})
                    </span>
                  ) : (
                    <span className="text-red-500 text-xs font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BabyDress;