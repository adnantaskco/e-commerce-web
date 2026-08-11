// "use client";

// import useSWR from "swr";

// import HeroSection from "@/components/heroSection";
// import Dressandjumpsuits from "@/components/Productcard/Dresscard";
// import ProductSlider from "@/components/Productcard/dealcard";
// import DiscountBanners from "@/components/DiscountPoster";

// import CategorySection from "@/components/scrollsection";
// import TestimonialSection from "@/components/clientsSay";
// import GallerySlider from "@/components/ui/GallerySlider";
// import BrandLogo from "@/components/BrandLogo";
// import { Skeleton } from "@/components/ui/skeleton";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export default function Home1() {
//   const { data, error, isLoading } = useSWR(
//     "https://demo.app.taskcocommerce.com/api/v1/home-sections",
//     fetcher
//   );

//   // Full Home Page Skeleton Loader
//   if (isLoading) {
//     return (
//       <div className="space-y-12 py-4">
//         {/* 1. Hero Banner Skeleton */}
//         <div className="container mx-auto px-4 md:px-16">
//           <Skeleton className="w-full h-[220px] sm:h-[320px] md:h-[450px] rounded-2xl" />
//         </div>

//         {/* 2. Category Section Skeleton */}
//         <div className="container mx-auto px-4 md:px-16">
//           <div className="flex justify-center mb-6">
//             <Skeleton className="h-8 w-48 rounded-lg" />
//           </div>
//           <div className="flex gap-4 overflow-hidden py-2">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="flex-shrink-0 w-[42%] sm:w-[28%] md:w-[20%] lg:w-[14%] bg-white rounded-2xl p-3 border border-gray-100 flex flex-col items-center gap-2"
//               >
//                 <Skeleton className="w-full h-28 md:h-32 rounded-full" />
//                 <Skeleton className="h-4 w-3/4 rounded-md" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 3. Product Grid Skeleton */}
//         <div className="container mx-auto px-4 md:px-16">
//           <div className="flex justify-between items-center mb-6">
//             <Skeleton className="h-8 w-40 rounded-lg" />
//             <Skeleton className="h-5 w-20 rounded-md" />
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {Array.from({ length: 10 }).map((_, i) => (
//               <div key={i} className="bg-white rounded-2xl p-3 border border-gray-100 space-y-3">
//                 <Skeleton className="w-full h-44 rounded-xl" />
//                 <Skeleton className="h-4 w-5/6 rounded-md" />
//                 <Skeleton className="h-4 w-1/2 rounded-md" />
//                 <Skeleton className="h-8 w-full rounded-lg" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 4. Promotion Banner Skeleton */}
//         <div className="container mx-auto px-4 md:px-16">
//           <Skeleton className="w-full h-40 md:h-60 rounded-2xl" />
//         </div>

//         {/* 5. Brand Logos Skeleton */}
//         <div className="container mx-auto px-4 md:px-16">
//           <div className="flex justify-between items-center gap-4 overflow-hidden">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <Skeleton key={i} className="h-16 w-32 rounded-xl shrink-0" />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) return <div className="text-center py-20 text-red-500 font-medium">Failed to load content.</div>;

//   const sections = data?.data ?? [];

//   return (
//     <>
//       <HeroSection />
//       <CategorySection />

//       {sections.map((section: any) => {
//         switch (section.type) {
//           case "product_collection":
//             if (section.design_style === "grid") {
//               return (
//                 <Dressandjumpsuits
//                   key={section.uid}
//                   title={section.name}
//                   products={section.products}
//                 />
//               );
//             }

//             if (section.design_style === "row") {
//               return (
//                 <ProductSlider
//                   key={section.uid}
//                   title={section.name}
//                   products={section.products}
//                 />
//               );
//             }

//             return null;

//           case "brand":
//             return (
//               <BrandLogo
//                 key={section.uid || section.name}
//                 brands={section.brands}
//               />
//             );

//           case "promotion_banner":
//             return (
//               <DiscountBanners
//                 key={section.uid || section.name}
//                 banners={section.banners || []}
//               />
//             );

//           default:
//             return null;
//         }
//       })}

//       <TestimonialSection />
//       <GallerySlider />
//     </>
//   );
// }
