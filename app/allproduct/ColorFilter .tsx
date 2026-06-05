"use client";

import React, { useState } from "react";

const colors = ["black", "white", "red", "blue", "green", "yellow"];

function ColorFilter() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm">
      
      {/* TITLE */}
      <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
        Colors
      </h3>

      {/* COLORS */}
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelected(color)}
            className={`
              relative w-7 h-7 rounded-full border transition-all
              hover:scale-110
              ${
                selected === color
                  ? "ring-2 ring-black scale-110"
                  : "border-gray-300"
              }
            `}
            style={{ backgroundColor: color }}
          >
            {/* SELECTED DOT */}
            {selected === color && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorFilter;