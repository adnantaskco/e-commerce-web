// "use client"

// import * as React from "react"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import ProductCard1 from "./Productcard/Dresscard"
// import Sheos from "./Productcard/Babydresscard"
// import Jackets from "./Productcard/jacketcard"

// export default function TrendingProductsTabs() {
//   return (
//     <section className="w-full mx-auto  ">
//         <div className="container mx-auto px- md:px-20">
//              {/* TITLE */}
//          <div className="text-center md:py-10 py-4">
//            <span className="uppercase tracking-[5px] text-primary font-semibold">
//             Treanding
//           </span>
//             <h1 className="text-3xl md:text-5xl font-bold sm:font-semibold mt-4">Trending Products</h1>
//             <div className="flex justify-center mt-6">
//                 <div className="border-t-4  border-primary w-60"></div>
//             </div>
//             </div>

     

//       {/* TABS WRAPPER */}
//       <Tabs defaultValue="dresses" className="w-full">

//         {/* TAB LIST (RESPONSIVE) */}
//         <div className="flex justify-center">
//           <TabsList
//            variant="line"
//           className="flex w-full overflow-x-auto sm:overflow-visible justify-start sm:justify-center gap-3 sm:gap-6 px-2 sm:px-2"
//           >
//             <TabsTrigger
//               value="dresses"
//               className="text-sm sm:text-base data-[state=active]:text-primary "
//             >
//               Dresses & Jumpsuits
//             </TabsTrigger>

//             <TabsTrigger
//               value="jackets"
//               className="text-sm sm:text-base data-[state=active]:text-primary "
//             >
//               Jackets & Blazers
//             </TabsTrigger>

//             <TabsTrigger
//               value="babydresss"
//               className="text-sm sm:text-base data-[state=active]:text-primary "
//             >
//               Baby Dress
//             </TabsTrigger>
//           </TabsList>
//         </div>

//         {/* CONTENT */}
//         <TabsContent value="dresses" className="mt-6">
//           <ProductCard1 />
//         </TabsContent>

//         <TabsContent value="jackets" className="mt-6">
//           <Jackets />
//         </TabsContent>

//         <TabsContent value="babydress" className="mt-6">
//           <Sheos />
//         </TabsContent>

//       </Tabs>
//         </div>
     
//     </section>
//   )
// }