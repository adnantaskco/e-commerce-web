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
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/1/21-home_default.jpg",
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
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/2/22-home_default.jpg",
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
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/3/23-home_default.jpg",
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
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/4/24-home_default.jpg",
    brand: "EcoShop",
    name: "Casual Street Style Jacket Blazer",
    rating: 4,
    reviews: 9,
    price: 75,
    hasOffer: false,
  },
  {
    id: 5,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/5/25-home_default.jpg",
    brand: "EcoShop",
    name: "Men’s Formal Wedding Blazer",
    rating: 5,
    reviews: 30,
    price: 160,
    oldPrice: 180,
    discount: 12,
    hasOffer: true,
  },
  {
    id: 6,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/6/26-home_default.jpg",
    brand: "EcoShop",
    name: "Slim Fit Grey Business Blazer",
    rating: 4,
    reviews: 14,
    price: 105,
    hasOffer: false,
  },
  {
    id: 7,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/7/27-home_default.jpg",
    brand: "EcoShop",
    name: "Luxury Double Button Blazer Jacket",
    rating: 5,
    reviews: 25,
    price: 140,
    oldPrice: 160,
    discount: 13,
    hasOffer: true,
  },
  {
    id: 8,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/8/28-home_default.jpg",
    brand: "EcoShop",
    name: "Casual Denim Blazer Jacket Style",
    rating: 4,
    reviews: 11,
    price: 85,
    hasOffer: false,
  },
  {
    id: 9,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/9/29-home_default.jpg",
    brand: "EcoShop",
    name: "Winter Thick Warm Blazer Coat",
    rating: 5,
    reviews: 19,
    price: 150,
    oldPrice: 175,
    discount: 14,
    hasOffer: true,
  },
  {
    id: 10,
    image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/0/30-home_default.jpg",
    brand: "EcoShop",
    name: "Modern Casual Slim Fit Blazer Jacket",
    rating: 4,
    reviews: 8,
    price: 90,
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