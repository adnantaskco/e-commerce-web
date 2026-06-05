"use client";

import React, { useState } from "react";

const offers = ["Sale Items", "New Arrival", "Best Seller"];

function OfferFilter() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOffer = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm">
      
      {/* TITLE */}
      <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
        Offers
      </h3>

      {/* OPTIONS */}
      <div className="space-y-2">
        {offers.map((offer) => (
          <label
            key={offer}
            className={`
              flex items-center justify-between
              px-3 py-2 rounded-lg border cursor-pointer
              transition-all
              hover:bg-gray-50 hover:border-black
              ${
                selected.includes(offer)
                  ? "bg-black text-white border-black"
                  : "text-gray-600"
              }
            `}
            onClick={() => toggleOffer(offer)}
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(offer)}
                onChange={() => toggleOffer(offer)}
                className="accent-black"
              />
              <span className="text-sm">{offer}</span>
            </div>

            {/* small badge */}
            <span className="text-xs opacity-70">+</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default OfferFilter;