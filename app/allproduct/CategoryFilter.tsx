"use client";

import React, { useState } from "react";

const categories = [
  "T-Shirts",
  "Shirts",
  "Hoodies",
  "Jackets",
  "Jeans",
  "Shoes",
];

function CategoryFilter() {
  const [active, setActive] = useState<string>("");

  return (
    <div className="p-2 bg-white rounded-xl border shadow-sm">
      
      {/* TITLE */}
      <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
        Categories
      </h3>

      {/* LIST */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => setActive(cat)}
            className={`
              px-3 py-2 rounded-lg cursor-pointer text-sm
              transition-all border
              ${
                active === cat
                  ? "bg-primary text-white border-primary"
                  : "text-black hover:bg-gray-50 hover:border-gray-300"
              }
            `}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;