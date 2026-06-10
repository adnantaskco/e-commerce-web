"use client";

import React from "react";

const brands = ["Nike", "Adidas", "Zara", "H&M", "Levi's"];

function BrandFilter() {
  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm">
      
      {/* TITLE */}
      <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
        Brands
      </h3>

      {/* LIST */}
      <div className="space-y-2">
        {brands.map((brand) => (
          <label
            key={brand}
            className="
              flex items-center justify-between
              px-3 py-2
              rounded-lg
              border
              cursor-pointer
              transition-all
              hover:border-primary
              hover:bg-gray-50
            "
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4"
              />
              <span className="text-sm text-gray-700">
                {brand}
              </span>
            </div>

           
           
          </label>
        ))}
      </div>
    </div>
  );
}

export default BrandFilter;