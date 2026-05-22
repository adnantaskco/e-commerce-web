"use client";

import Image from "next/image";
import React from "react";

const brands = [
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/1.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/2.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/3.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/4.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/5.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/6.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/7.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/1.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/2.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/3.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/4.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/5.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/6.jpg",
  "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/m/7.jpg",
];

function BrandLogo() {
  return (
    <section className="py-10 overflow-hidden">
      <div className="mx-auto overflow-x-auto no-scrollbar">
        
        <div className="flex gap-10 w-max items-center cursor-grab px-4">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex justify-center items-center gap-5"
            >
              <img
                src={brand}
                alt={`brand-${index}`}
               
                className="object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BrandLogo;