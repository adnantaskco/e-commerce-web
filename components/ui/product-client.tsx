// "use client"


// import { useState } from "react"
// import Image from "next/image"
// import {
//    Clock,
//   Star,
//   ShoppingCart,
//   Heart,
//   Truck,
//   ShieldCheck,
// } from "lucide-react"
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaPinterestP,
//   FaYoutube,
//   FaXTwitter,
//   FaTwitter,
// } from "react-icons/fa6";


// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { FaHeart, FaShoppingCart, FaStar ,FaEye} from "react-icons/fa";
// import { Badge } from "@/components/ui/badge"
// import { useCart } from "@/app/src/components/context/CartContext";
// import { FullProducts } from "@/lib/data/products";
// import { Product } from "@/lib/data";




// type Product = {
//    id: number;
//   image: string;
//   brand: string;
//   name: string;
//   short_description: string;
//   category: string;
//   sizes: string[];

//   price: {
//     retail_price: number;
//     sale_price: number;
//     is_discounted: boolean;
//   };

//   stock: {
//     in_stock: boolean;
//   };
// };





// export default function ProductViewPage() {
//   const [selectedSize, setSelectedSize] = useState("")
//    const { addToCart } =useCart();

//   const discount =
//     FullProducts.price.retail_price - Product.price.sale_price

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">

//       {/* CONTAINER */}
//       <section className="container mx-auto px-6 md:px-10 lg:px-20 ">

//         {/* PRODUCT CARD */}
//         <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl border">

//           {/* IMAGE SECTION */}
//           <div className="sticky top-24 self-start ">
//             <div className="overflow-hidden rounded-2xl bg-gray-100 p-3 sm:p-4">
//               <Image
//                 src={Product.image}
//                 alt={Product.name}
//                 width={800}
//                 height={800}
//                 className="w-full h-auto object-cover rounded-xl transition-transform duration-700 hover:scale-105"
//               />
              
//             </div>

//             {Product.price.is_discounted && (
//               <Badge className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
//                 Save ${discount}
//               </Badge>
//             )}
//           </div>

//           {/* DETAILS SECTION */}
//           <div className="flex flex-col  space-y-5 lg:pr-6">

//             <p className="text-xs sm:text-sm tracking-widest text-primary uppercase">
//               {Product.category}
//             </p>

//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
//               {Product.name}
//             </h1>

//             {/* Rating */}
//             <div className="flex items-center gap-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={16}
//                   className="fill-yellow-400 text-yellow-400"
//                 />
//               ))}
//               <span className="text-sm text-gray-500 ml-2">
//                 (120 Reviews)
//               </span>
//             </div>

//             {/* PRICE */}
//             <div className="flex items-end gap-4">
//               <h2 className="text-3xl sm:text-4xl font-bold text-black">
//                 ${Product.price.sale_price}
//               </h2>

//               <p className="text-lg sm:text-xl line-through text-gray-400">
//                 ${Productproduct.price.retail_price}
//               </p>
//             </div>

//             {/* STOCK */}
//             <div>
//               {Product.stock.in_stock ? (
//                 <span className="text-green-600 font-medium">
//                   ● In Stock
//                 </span>
//               ) : (
//                 <span className="text-red-500 font-medium">
//                   ● Out of Stock
//                 </span>
//               )}
//             </div>

//             {/* DESCRIPTION */}
//             <p className="text-gray-600 leading-7 max-w-xl text-sm sm:text-base">
//               {Product.short_description}
//             </p>

//             {/* SIZE */}
//             <div>
//               <h4 className="font-semibold mb-3">Select Size</h4>

//               <div className="flex flex-wrap gap-3">
//                 {Product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-4 sm:px-5 py-2 rounded-xl border text-sm transition ${
//                       selectedSize === size
//                         ? "bg-black text-white border-black"
//                         : "bg-white text-gray-700 border-gray-300"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>

//               {selectedSize && (
//                 <p className="text-sm text-gray-500 mt-2">
//                   Selected:{" "}
//                   <span className="font-semibold text-black">
//                     {selectedSize}
//                   </span>
//                 </p>
//               )}
//             </div>

//             {/* FEATURES */}
//             <div className="grid sm:grid-cols-2 gap-4 pt-4">
//               <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border">
//                 <Truck className="text-black" />
//                 <div>
//                   <h4 className="font-semibold text-sm">
//                     Fast Delivery
//                   </h4>
//                   <p className="text-xs text-gray-500">
//                     2–5 Days
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border">
//                 <ShieldCheck className="text-black" />
//                 <div>
//                   <h4 className="font-semibold text-sm">
//                     Authentic Product
//                   </h4>
//                   <p className="text-xs text-gray-500">
//                     100% Verified
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* BUTTONS */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <Button
//                 className="flex-1 rounded-2xl py-6 text-base bg-primary hover:bg-amber-800 cursor-pointer"
//                 disabled={!Product.stock.in_stock || !selectedSize}
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" />
//                 Add To Cart
//               </Button>

//               <Button
//                 variant="outline"
//                 className="rounded-2xl px-6 py-6"
//               >
//                 <Heart className="h-5 w-5" />
//               </Button>
//             </div>
//              <div>
//             <p className="flex items-center gap-5 text-xl py-5 font-semibold ">Share on:  
//                   <FaFacebookF/>
//                   <FaInstagram/>
//                   <FaPinterestP/>
//                   <FaYoutube/>
//                   <FaXTwitter/>
//                   <FaTwitter/> </p>

//                 <div className="space-y-1 mt-6">

//               {/* Free Shipping */}
//               <div className="flex gap-3 items-start p-4 rounded-xl bg-gray-50 border">
//                 <Truck className="text-black mt-1" size={20} />
//                 <p className="font-bold">
//                   Free Shipping & Returns :{" "}
//                   <span className="font-normal text-gray-600">
//                     Available on all orders over $99.
//                   </span>
//                 </p>
//               </div>

//             {/* Delivery */}
//             <div className="flex gap-3 items-start p-4 rounded-xl bg-gray-50 border">
//               <Clock className="text-black mt-1" size={20} />
//               <p className="font-bold">
//                 Estimated Delivery :{" "}
//                 <span className="font-normal text-gray-600">
//                   Orders are typically dispatched within 24 hours.
//                 </span>
//               </p>
//             </div>

//             {/* Security */}
//             <div className="flex gap-3 items-start p-4 rounded-xl bg-gray-50 border">
//               <ShieldCheck className="text-black mt-1" size={20} />
//               <p className="font-bold">
//                 Security Policy :{" "}
//                 <span className="font-normal text-gray-600">
//                   Ensuring top-level security for your data and transactions.
//                 </span>
//               </p>
//             </div>

//           </div>
//           </div>
//           </div>
         
//         </div>
//       </section>

     
//     </div>
//   )
// }