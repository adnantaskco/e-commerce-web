"use client";

import Sidebar from "./sidebar";
import ProductGrid from "./productgride";
import ProductCard1 from "../src/components/jacket";
import ALLCard from "./productgride";

export default function ShopLayout() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-10 py-6 container">

      {/* SIDEBAR */}
      <div className="lg:w-[260px]">
        <div className="sticky top-20">
          <Sidebar />
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="flex-1">
        <ALLCard/>
      </div>

    </div>
  );
}