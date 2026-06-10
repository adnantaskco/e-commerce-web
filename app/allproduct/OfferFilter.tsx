"use client";

import React, { useState } from "react";

const offers = ["Sale Items", "New Arrival", "Best Seller"];

export default function OfferFilter() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOffer = (offer: string) => {
    if (selected.includes(offer)) {
      setSelected(selected.filter((item) => item !== offer));
    } else {
      setSelected([...selected, offer]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-semibold mb-4">Offers</h3>

      <div className="space-y-3">
        {offers.map((offer) => (
          <label
            key={offer}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(offer)}
              onChange={() => toggleOffer(offer)}
              className="accent-primary"
            />

            <span className="text-sm">{offer}</span>
          </label>
        ))}
      </div>
    </div>
  );
}