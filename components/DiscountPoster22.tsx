"use client";

import useSWR from "swr";
import Link from "next/link";

type Banner = {
  uid: string;
  position?: string;
  promotion_type?: string;
  media_url: string;
  media_variants?: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
};

interface DiscountBannersProps {
  banners?: Banner[];
}

// SWR Fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DiscountBanners22({ banners: passedBanners }: DiscountBannersProps) {
  // Fetch home sections dynamically if props aren't explicitly provided
  const { data, error, isLoading } = useSWR(
    !passedBanners ? "https://demo.app.taskcocommerce.com/api/v1/home-sections/" : null,
    fetcher
  );

  // Extract promotion_banner list from API payload or use passed props
  const bannerSection = data?.data?.find((section: any) => section.type === "promotion_banner");
  const bannersToDisplay: Banner[] = passedBanners || bannerSection?.banners || [];

  if (isLoading && !passedBanners) {
    return (
      <section className="bg-background py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 rounded-xl md:rounded-2xl bg-slate-200 animate-pulse" />
            <div className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 rounded-xl md:rounded-2xl bg-slate-200 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !bannersToDisplay.length) return null;

  return (
    <section className="bg-background py-4 sm:py-6">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:gap-5 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
          {bannersToDisplay.map((banner) => (
            <div
              key={banner.uid}
              className="group relative h-40 w-[85vw] shrink-0 overflow-hidden rounded-xl shadow-sm sm:h-48 sm:w-[70vw] md:h-56 md:w-auto md:shrink md:rounded-2xl lg:h-64 xl:h-72"
            >
              <img
                src={banner.media_variants?.large || banner.media_url}
                alt={banner.position || "Promotion Banner"}
                className="h-full w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 md:rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}