"use client";

import Timer1 from "@/components/ui/timer";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaEye,
} from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Product = {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
  discount: number;
  hasOffer: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "Floral Pointelle Smoocked Crop Top",
    brand: "StyleHub",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/41-large_default/floral-pointelle-smocked-crop-top-in-whitecap.jpg",
    price: 27,
    oldPrice: 30,
    rating: 4,
    discount: -10,
    hasOffer: false,
  },
  {
    id: 2,
    name: "textured Top With Cuffed Sleeves",
    brand: "FashionEra",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/140-medium_default/textured-top-with-cuffed-sleeves.jpg",
    price: 18,
    oldPrice: 22,
    rating: 5,
    discount: -15,
    hasOffer: true,
  },
  {
    id: 3,
    name: "Peach Coloured Ruched Tie-Front Crop",
    brand: "UrbanWear",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/122-medium_default/peach-coloured-ruched-tie-front-crop-top.jpg",
    price: 35,
    oldPrice: 40,
    rating: 4,
    discount: -12,
    hasOffer: false,
  },
  {
    id: 4,
    name: "Women Pink Cotton Long Sleeve Crop Top",
    brand: "TrendLine",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/52-medium_default/women-pink-cotton-long-sleeve-crop-top.jpg",
    price: 45,
    oldPrice: 55,
    rating: 5,
    discount: -20,
    hasOffer: true,
  },
  {
    id: 5,
    name: "DressBary Women's Printed Ploy Crop Top",
    brand: "ModernFit",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/132-large_default/dressberry-women-s-printed-poly-crop-top.jpg",
    price: 60,
    oldPrice: 75,
    rating: 4,
    discount: -18,
    hasOffer: true,
  },
  {
    id: 6,
    name: "long Sleeve Neck Top",
    brand: "EliteStyle",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/56-medium_default/womens-self-design-long-sleeve-neck-top.jpg",
    price: 50,
    oldPrice: 65,
    rating: 5,
    discount: -25,
    hasOffer: true,
  },
  {
    id: 7,
    name: "Summer Shirt",
    brand: "CoolWear",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/4/7/47-home_default.jpg",
    price: 80,
    oldPrice: 95,
    rating: 4,
    discount: -15,
    hasOffer: true,
  },
  {
    id: 8,
    name: "Woman's Jacket",
    brand: "StyleNova",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/4/9/49-home_default.jpg",
    price: 120,
    oldPrice: 150,
    rating: 5,
    discount: -30,
    hasOffer: false,
  },
  {
    id: 9,
    name: "Woman's Jacket",
    brand: "WinterEdge",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/5/1/51-home_default.jpg",
    price: 90,
    oldPrice: 110,
    rating: 4,
    discount: -22,
    hasOffer: true,
  },
  {
    id: 10,
    name: "Women's Dress",
    brand: "ChicStyle",
    image:
      "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/5/3/53-home_default.jpg",
    price: 70,
    oldPrice: 85,
    rating: 5,
    discount: -17,
    hasOffer: true,
  },
];

export default function FeatureProduct() {
  const [hovered, setHovered] = useState<number | null>(null);

  // TRUE = Timer Show
  // FALSE = Timer Hide
  const [showTimer, setShowTimer] = useState(true);

  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = sliderRef.current;

    if (!container) return;

    const scrollAmount = 350;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto w-full px-4 sm:px-6 lg:px-10 py-16 bg-white relative overflow-hidden">
      {/* TITLE */}
      <div className="text-center mb-10">
        

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
          Feature Products
        </h1>

        <div className="flex justify-center mt-5">
          <div className="w-28 h-[3px] bg-primary rounded-full"></div>
        </div>
      </div>

      
     

      {/* LEFT BUTTON */}
      <button
        onClick={() => scroll("left")}
        className="
          absolute left-2 top-1/2 -translate-y-1/2 z-20
          w-12 h-12 rounded-full bg-white shadow-xl
          flex items-center justify-center
          hover:bg-primary hover:text-white
          duration-300
        "
      >
        <ChevronLeft size={24} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => scroll("right")}
        className="
          absolute right-2 top-1/2 -translate-y-1/2 z-20
          w-12 h-12 rounded-full bg-white shadow-xl
          flex items-center justify-center
          hover:bg-primary hover:text-white
          duration-300
        "
      >
        <ChevronRight size={24} />
      </button>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="
          flex gap-6 overflow-x-auto scroll-smooth
          no-scrollbar pb-5
        "
      >
        {products.map((product) => {
          const isHover = hovered === product.id;

          return (
            <div
              key={product.id}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              className="
                min-w-60
                sm:min-w-70
                lg:min-w-[300px]
                bg-white rounded-3xl overflow-hidden
                border border-gray-100
                hover:shadow-2xl
                transition-all duration-500
                hover:-translate-y-2
                flex-shrink-0
                group
              "
            >
              {/* IMAGE */}
              <div className="relative bg-white overflow-hidden">
                <div className="relative w-full h-[300px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="
                      object-cover
                      transition-transform duration-700
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* DISCOUNT */}
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  {product.discount}%
                </div>

                {/* TIMER */}
                {product.hasOffer && (
                  <div
                    className={`
                      absolute bottom-4 left-1/2 -translate-x-1/2
                      transition-all duration-300
                      ${
                        isHover
                          ? "opacity-0 translate-y-5"
                          : "opacity-100 translate-y-0"
                      }
                    `}
                  >
                    <div className="backdrop-blur-md px-4 py-2 rounded-full shadow-lg bg-white/70">
                      <Timer1 />
                    </div>
                  </div>
                )}

                {/* ICONS */}
                <div
                  className={`
                    absolute top-5 right-4 flex flex-col gap-3
                    transition-all duration-500
                    ${
                      isHover
                        ? "translate-x-0 opacity-100"
                        : "translate-x-14 opacity-0"
                    }
                  `}
                >
                  <button className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition duration-300">
                    <FaHeart />
                  </button>

                  <button className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition duration-300">
                    <FaShoppingCart />
                  </button>

                  <button className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition duration-300">
                    <FaEye />
                  </button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                {/* BRAND */}
                <p className="text-sm text-primary font-medium mb-2">
                  {product.brand}
                </p>

                {/* STARS */}
                <div className="flex items-center gap-1 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < product.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}

                  <span className="text-gray-500 text-xs ml-2">
                    ({product.rating}.0)
                  </span>
                </div>

                {/* NAME */}
                <h2 className="text-[16px] font-semibold mt-3 leading-7 text-gray-800 line-clamp-2 hover:text-primary transition duration-300 cursor-pointer min-h-[56px]">
                  {product.name}
                </h2>

                {/* PRICE */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-primary text-2xl font-bold">
                    ${product.price}
                  </span>

                  <span className="line-through text-gray-400 text-lg">
                    ${product.oldPrice}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}