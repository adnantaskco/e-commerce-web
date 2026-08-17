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

type BannerResponse = {
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
    return <div className="h-[300px] md:h-[450px] flex items-center justify-center">Loading...</div>;
  }

  if (error || !data) {
    return <div className="h-[300px] md:h-[450px] flex items-center justify-center text-red-500">Failed to load banner</div>;
  }

  const DiscountImages = [data.banners.home_top_right, data.banners.home_middle_one, data.banners.home_middle_two];

  return (
    <section className="py-4 md:py-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
          {DiscountImages.map((banner) => (
            <div key={banner.uid} className="relative shrink-0 w-[85vw] sm:w-auto h-[220px] sm:h-[280px] lg:h-[360px] flex items-center rounded-2xl overflow-hidden group bg-muted" style={{ backgroundImage: `url(${banner.media_url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          ))}
        </div>
      </div>
    </section>
  );
}