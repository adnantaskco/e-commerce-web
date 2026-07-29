"use client";

import React from "react";
import useSWR from "swr";
import fetcher from "@/lib/disc2fatcher";

type ImageItem = {
  uid: string;
  status: number;
  promotion_type: string;
  media_url: string;
};

type BannerResponse= {

banners: {
  home_top_right: ImageItem;
  home_middle_one: ImageItem;
  home_middle_two: ImageItem;

};

};


export default function DiscountBanners2() {
 const { data, error, isLoading } = useSWR<BannerResponse>(
    "https://demo.app.taskcocommerce.com/api/v1/promotion-banners?page_name=home&theme_id=1",
    fetcher
  );

  if (isLoading) {
    return (
      <div className="h-[450px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-[450px] flex items-center justify-center text-red-500">
        Failed to load banner
      </div>
    );
  }

  // 3 banners
  const DiscountImages = [
    
    data.banners.home_top_right,
    data.banners.home_middle_one,
    data.banners.home_middle_two,
  ];

  return (
    <section className="py-4 md:py-10 bg-background">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DiscountImages?.map((banner) => (
            <div
              key={banner.uid}
              className="relative min-h-70 sm:min-h-80 lg:min-h-90 flex items-center rounded-2xl overflow-hidden group"
              style={{
                backgroundImage: `url(${banner.media_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300"></div>

              {/* Content */}
              {/* <div className="relative z-10 p-5 sm:p-7">
                <p className="text-xs sm:text-sm md:text-base bg-primary text-white w-fit px-4 py-2 rounded-full font-semibold uppercase tracking-wider">
                  {banner.discount}
                </p>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-black font-bold mt-3 leading-tight">
                  {banner.title}
                </h2>

                <p className="text-xl sm:text-2xl lg:text-3xl text-black mt-1">
                  {banner.subtitle}
                </p>

                <button className="mt-5 underline font-semibold hover:translate-x-1 transition duration-300">
                  Shop Now
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}