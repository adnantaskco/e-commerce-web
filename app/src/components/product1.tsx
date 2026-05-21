"use client";

import Image from "next/image";
import React from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

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

const products: Product[] = [
  {
    id: 1,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/5/15-home_default.jpg",
    brand: "EcoShop",
    name: "Benetton Regular Fit Round Neck Sweatshirt",
    rating: 5,
    reviews: 5,
    price: 47.5,
    oldPrice: 50,
    discount: 5,
    hasOffer: true,
  },
  {
    id: 2,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/6/16-home_default.jpg",
    brand: "EcoShop",
    name: "Casual Premium Cotton Hoodie",
    rating: 5,
    reviews: 8,
    price: 65,
    hasOffer: false,
  },
  {
    id: 3,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/7/17-home_default.jpg",
    brand: "EcoShop",
    name: "Slim Fit Denim Jacket",
    rating: 4,
    reviews: 12,
    price: 80,
    hasOffer: true,
    discount: 10,
    oldPrice: 90,
  },
  {
    id: 4,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/8/18-home_default.jpg",
    brand: "EcoShop",
    name: "Classic White Shirt",
    rating: 5,
    reviews: 20,
    price: 35,
    hasOffer: false,
  },
  {
    id: 5,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/9/19-home_default.jpg",
    brand: "EcoShop",
    name: "Summer T-Shirt Premium",
    rating: 4,
    reviews: 7,
    price: 25,
    hasOffer: true,
    discount: 15,
    oldPrice: 30,
  },
  {
    id: 6,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/0/20-home_default.jpg",
    brand: "EcoShop",
    name: "Casual Black Hoodie",
    rating: 5,
    reviews: 10,
    price: 55,
    hasOffer: false,
  },
  {
    id: 7,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/1/21-home_default.jpg",
    brand: "EcoShop",
    name: "Stylish Winter Coat",
    rating: 5,
    reviews: 14,
    price: 120,
    hasOffer: true,
    discount: 20,
    oldPrice: 150,
  },
  {
    id: 8,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/2/22-home_default.jpg",
    brand: "EcoShop",
    name: "Sport Jacket",
    rating: 4,
    reviews: 9,
    price: 70,
    hasOffer: false,
  },
  {
    id: 9,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/3/23-home_default.jpg",
    brand: "EcoShop",
    name: "Premium Hoodie Grey",
    rating: 5,
    reviews: 18,
    price: 60,
    hasOffer: true,
    discount: 12,
    oldPrice: 68,
  },
  {
    id: 10,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/4/24-home_default.jpg",
    brand: "EcoShop",
    name: "Casual Streetwear Tee",
    rating: 4,
    reviews: 11,
    price: 28,
    hasOffer: false,
  },
];

const ProductCard1 = () => {
  return (
    <section className="py-5 px-4">

      {/* X-axis Scroll Container */}
      <div className="mx-auto flex gap-8 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth">

        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white overflow-hidden rounded-2xl p-5 border-2 relative min-w-[280px]"
          >

            {/* Image Section */}
            <div className="relative bg-[#f5f5f5] overflow-hidden">

              {/* Discount */}
              {product.hasOffer && (
                <span className="absolute top-4 left-4 z-20 bg-red-500 text-white px-3 py-1 text-sm font-semibold">
                  -{product.discount}%
                </span>
              )}

              {/* Hover Icons */}
              <div className="absolute top-15 -right-15 group-hover:right-4 transition-all duration-500 z-20 flex flex-col gap-3">

                <button className="w-12 h-12 bg-white shadow-md flex items-center justify-center rounded-md hover:bg-black hover:text-white transition">
                  <FaHeart />
                </button>

                <button className="w-12 h-12 bg-white shadow-md flex items-center justify-center rounded-md hover:bg-black hover:text-white transition">
                  <FaShoppingCart />
                </button>
              </div>

              {/* Product Image */}
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="pt-5 space-y-0">

              <p className="text-gray-500 text-lg">{product.brand}</p>

              <h2 className="text-xl font-medium text-secondary hover:text-red-500 transition cursor-pointer">
                {product.name}
              </h2>

              <div className="flex items-center gap-2">
                <div className="flex items-center text-yellow-400 gap-1">
                  {[...Array(product.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <span className="text-lg text-gray-600">
                  ({product.reviews})
                </span>
              </div>

              <div className="flex items-center gap-3">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-md">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}

                <span className="text-red-400 font-semibold text-xl">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCard1;