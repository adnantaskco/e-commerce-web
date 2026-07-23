"use client";

import React from "react";
import useSWR from "swr";

import DisCountBannerfetcher from "@/lib/Dicountbanner1";

type Banner = {
  uid: string;
  position: string;
  promotion_type: string;
  media_url: string;
};

type Section = {
  name: string;
  type: string;
  banners?: Banner[];
};

type ApiResponse = {
  data: Section[];
};

export default function DiscountBanners() {
  const { data, error, isLoading } = useSWR<ApiResponse>(
    "https://demo.app.taskcocommerce.com/api/v1/home-sections",
    DisCountBannerfetcher
  );

  if (isLoading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-80 rounded-2xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load banners.
      </div>
    );
  }

  const promotionBanner = data?.data.find(
    (item) => item.type === "promotion_banner"
  );

  return (
<section className="py-4 md:py-10">
  <div className="container mx-auto px-4 sm:px-6 lg:px-20">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
      {promotionBanner?.banners?.map((banner) => (
        <div
          key={banner.uid}
          className="relative overflow-hidden rounded-2xl"
        >
          <img
            src={banner.media_url}
            alt={banner.position}
            className="w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  </div>
</section>
  );
}