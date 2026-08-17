"use client";

import useSWR from "swr";
import { useState } from "react";
import DressandjumpsuitsTab from "./Productcard/Tabcard";

// SWR Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TrendingProductsTabs() {
  const { data, error, isLoading } = useSWR(
    "https://demo.app.taskcocommerce.com/api/v1/home-sections/",
    fetcher
  );

  // Filter only items containing product collections
  const productCollections =
    data?.data?.filter((section: any) => section.type === "product_collection") || [];

  const [activeTab, setActiveTab] = useState<number>(0);

  if (isLoading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center py-10">Failed to load products.</div>;
  if (!productCollections.length) return null;

  const activeCollection = productCollections[activeTab] || productCollections[0];

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-20">
        
        {/* TITLE SECTION */}
        <div className="text-center pb-8">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-800">
            Trending Products
          </h1>
          <div className="flex justify-center mt-3">
            <div className="h-[2px] w-16 bg-[#C2A38E]"></div>
          </div>
        </div>

        {/* DYNAMIC TAB NAVIGATION */}
        <div className="flex justify-center mb-8">
          <div className="flex w-full overflow-x-auto sm:overflow-visible justify-start sm:justify-center gap-6 sm:gap-12 p-0 border-b border-transparent">
            {productCollections.map((collection: any, idx: number) => (
              <button
                key={collection.uid || idx}
                onClick={() => setActiveTab(idx)}
                className={`whitespace-nowrap pb-2 pt-0 px-0 text-base transition-all bg-transparent ${
                  activeTab === idx
                    ? "font-semibold text-slate-800 border-b-2 border-slate-900"
                    : "font-medium text-slate-800 border-b-2 border-transparent hover:text-slate-900"
                }`}
              >
                {collection.name}
              </button>
            ))}
          </div>
        </div>

        {/* DYNAMIC PRODUCT GRID */}
        <DressandjumpsuitsTab 
          title={activeCollection?.name || "Products"} 
          products={activeCollection?.products || []} 
        />

      </div>
    </section>
  );
}