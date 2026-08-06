"use client";

import Image from "next/image";

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

export default function DiscountBanners({
  banners = [],
}: DiscountBannersProps) {

  if (!banners.length) return null;


  return (
    <section className="py-6 bg-background">

      <div className="container mx-auto px-4 md:px-10 lg:px-20">

        <div className="flex flex-col md:flex-row gap-6">

          {banners.map((banner)=>(
            
            <div
              key={banner.uid}
              className="
                flex-1
                overflow-hidden
                rounded-2xl
                relative
                h-52
                md:h-72
                lg:h-80
                shadow-sm
                group
              "
            >

              <img
                src={
                  // banner.media_variants?.large ||
                  banner.media_url
                }
                alt={
                  banner.position ||
                  "Promotion Banner"
                }
                
                sizes="(max-width:768px) 100vw, 50vw"
                className="
                  object-cover
                  rounded-2xl
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}