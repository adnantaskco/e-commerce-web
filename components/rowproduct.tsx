"use client";

import React from "react";
import useSWR from "swr";

import ProductSlider from "@/components/Productcard/Rawdealcard";
import DiscountBanners2 from "./DiscountPoster2";
import DiscountBanners22 from "./DiscountPoster22";

const API_URL =
  "https://demo.app.taskcocommerce.com/api/v1/offer-with-products";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch offers");
    }
    return res.json();
  });

type Product = {
  id: number;
  name: string;
  image?: string;
  retail_price: number;
  discount_price?: number;
  slug?: string;
  [key: string]: any;
};

type Offer = {
  uid: string;
  slug: string;
  name: string;
  products: Product[];
};

type OfferResponse = {
  data: Offer[];
};

export default function RawSpcialOffersPage() {
  const {
    data,
    error,
    isLoading,
  } = useSWR<OfferResponse>(API_URL, fetcher);

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-destructive font-medium">
        Failed to load offers. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-16 py-6 space-y-8 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-8 bg-muted rounded w-48" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <div
                  key={j}
                  className="h-64 bg-muted rounded-lg"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const activeOffers =
    data?.data?.filter(
      (offer) => offer.products && offer.products.length > 0
    ) ?? [];

  if (activeOffers.length === 0) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
        No special offers available right now.
      </div>
    );
  }

return (
  <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-16 ">

    {activeOffers.map((section, index) => (
      <React.Fragment key={section.uid}>

        {/* Offer Section */}
        <ProductSlider
          title={section.name}
          products={section.products}
        />

        {/* Banner after every Offer */}
        {index % 2 === 0 ? (
          <DiscountBanners22 />
        ) : (
          <DiscountBanners2 />
        )}

      </React.Fragment>
    ))}

  </div>
);
}