"use client";

import Sidebar from "./sidebar";
import ALLCard from "./productgride";
import FilterBar from "./fitternav"

export default function ShopLayout() {
  return (

//     <div className="container mx-auto px-4 sm:px-6 md:px-20 py-6">
//   <div className="flex items-center justify-between mb-6 sticky top-0 z-50">
//     <FilterBar />
//   </div>

//   <ALLCard />
// </div>
    

    <div className="container mx-auto px-4 sm:px-6  py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="lg:sticky lg:top-20">
            <Sidebar />
          </div>
        </aside>

      {/* Products */}
      <main className="flex-1 min-w-0">
        <ALLCard />
      </main>

      </div>
    </div>
  );
}