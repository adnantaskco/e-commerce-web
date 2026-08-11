// "use client";

// import React, { useState, use, useEffect } from "react";
// import Link from "next/link";
// import { useCart } from "@/app/src/components/context/CartContext";
// import {
//   Truck,
//   RotateCcw,
//   ShieldCheck,
//   PhoneCall,
//   MessageCircle,
//   Share2,
//   Star,
//   Plus,
//   Minus,
// } from "lucide-react";

// interface ProductSpecification {
//   key: string;
//   value: string;
// }

// interface PriceObject {
//   product_variant_id?: number;
//   retail_price?: number;
//   is_discounted?: boolean;
//   sale_price?: number;
//   type?: string;
//   value?: number;
//   wholesale_price?: number;
//   is_special_price?: boolean;
//   special_price?: number;
//   is_bundle?: boolean;
//   bundle_price?: number;
// }

// interface ProductItem {
//   id: number;
//   name: string;
//   slug: string;
//   sku: string;
//   brand: string;
//   category: string;
//   rating: number;
//   description: string;
//   price: number | PriceObject;
//   currency: string;
//   in_stock: boolean;
//   images: string[];
//   specifications?: ProductSpecification[];
//   reviews?: Array<{
//     id: number;
//     author: string;
//     rating: number;
//     date: string;
//     comment: string;
//   }>;
// }

// export default function ProductDetailsPage({ params }: { params: any }) {
//   const { addToCart } = useCart();

//   // Safely unwrap route parameters
//   const resolvedParams: any =
//     params && typeof params.then === "function" ? use(params) : params;

//   const routeParam =
//     resolvedParams?.slug ||
//     resolvedParams?.id ||
//     (resolvedParams && typeof resolvedParams === "object"
//       ? Object.values(resolvedParams)[0]
//       : null);

//   const [product, setProduct] = useState<ProductItem | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<ProductItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedImage, setSelectedImage] = useState<string>("");
//   const [quantity, setQuantity] = useState<number>(1);
//   const [activeTab, setActiveTab] = useState<string>("descriptions");

//   useEffect(() => {
//     if (!routeParam) return;

//     const fetchProductData = async () => {
//       try {
//         setLoading(true);
//         // Replace endpoint with your single-product detail API endpoint
//         const res = await fetch(
//           `https://demo.app.taskcocommerce.com/api/v1/products/${routeParam}`
//         );
//         const data = await res.json();

//         if (data?.data) {
//           setProduct(data.data);
//           setSelectedImage(data.data.images?.[0] || "");
//           if (data.related) {
//             setRelatedProducts(data.related);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch product details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [routeParam]);

//   if (!routeParam) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
//         <h2 className="text-xl font-bold text-gray-800">Product Not Found</h2>
//         <p className="text-gray-500 mt-1">Missing product identifier.</p>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[50vh]">
//         <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
//         <p className="text-sm font-semibold text-gray-600">Loading Product...</p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
//         <h2 className="text-xl font-bold text-gray-800">Product Not Found</h2>
//         <p className="text-gray-500 mt-1">
//           No product matching "{routeParam}".
//         </p>
//       </div>
//     );
//   }

//   // Helper function to resolve price to a valid number
//   const getNumericPrice = (price: number | PriceObject | undefined): number => {
//     if (typeof price === "number") return price;
//     if (typeof price === "object" && price !== null) {
//       return (
//         price.sale_price ??
//         price.special_price ??
//         price.value ??
//         price.retail_price ??
//         0
//       );
//     }
//     return 0;
//   };

//   const currentPrice = getNumericPrice(product.price);

//   const handleQuantityChange = (type: "inc" | "dec") => {
//     if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
//     if (type === "inc") setQuantity(quantity + 1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 text-gray-800 font-sans">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Breadcrumbs */}
//         <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
//           <Link href="/" className="hover:text-emerald-600">Home</Link>
//           <span>&gt;</span>
//           <Link href="/products" className="hover:text-emerald-600">Products</Link>
//           <span>&gt;</span>
//           <span className="text-gray-800 font-medium">{product.name}</span>
//         </nav>

//         {/* Main Product Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          
//           {/* Left: Product Images (5 Cols) */}
//           <div className="lg:col-span-5 flex flex-col gap-4">
//             <div className="aspect-square bg-gray-50 border rounded-lg overflow-hidden flex items-center justify-center p-4">
//               <img
//                 src={selectedImage || product.images?.[0]}
//                 alt={product.name}
//                 className="max-h-full max-w-full object-contain"
//               />
//             </div>
            
//             {/* Gallery Thumbnails */}
//             {product.images && product.images.length > 1 && (
//               <div className="flex gap-3 overflow-x-auto">
//                 {product.images.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(img)}
//                     className={`w-16 h-16 border rounded-lg overflow-hidden p-1 bg-gray-50 transition ${
//                       selectedImage === img ? "border-emerald-600 ring-1 ring-emerald-600" : "border-gray-200"
//                     }`}
//                   >
//                     <img src={img} alt="" className="w-full h-full object-contain" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Middle: Product Details (4 Cols) */}
//           <div className="lg:col-span-4 flex flex-col">
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
//             {/* Rating */}
//             <div className="flex items-center gap-2 mb-3">
//               <div className="flex text-amber-400">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star
//                     key={i}
//                     size={16}
//                     fill={i < Math.floor(product.rating || 5) ? "currentColor" : "none"}
//                     className={i < Math.floor(product.rating || 5) ? "" : "text-gray-300"}
//                   />
//                 ))}
//               </div>
//               <span className="text-xs font-semibold text-gray-600">{product.rating || 5.0}</span>
//             </div>

//             <p className="text-xs text-gray-500 mb-4 leading-relaxed">{product.description}</p>

//             {/* Price display */}
//             <div className="text-2xl font-black text-emerald-600 mb-6">
//               {product.currency || "৳"} {currentPrice.toLocaleString()}
//             </div>

//             {/* Actions & Quantity */}
//             <div className="space-y-3 mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                   <button
//                     onClick={() => handleQuantityChange("dec")}
//                     className="p-2 hover:bg-gray-100 text-gray-600"
//                   >
//                     <Minus size={14} />
//                   </button>
//                   <span className="px-4 text-sm font-semibold">{quantity}</span>
//                   <button
//                     onClick={() => handleQuantityChange("inc")}
//                     className="p-2 hover:bg-gray-100 text-gray-600"
//                   >
//                     <Plus size={14} />
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => addToCart({ ...product, price: currentPrice, quantity })}
//                   className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>

//               <div className="grid grid-cols-2 gap-2">
//                 <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition">
//                   Buy Now
//                 </button>
//                 <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition">
//                   <MessageCircle size={16} /> WhatsApp
//                 </button>
//               </div>

//               <button className="w-full bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 font-semibold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition">
//                 <PhoneCall size={16} /> Call for Order
//               </button>
//             </div>

//             {/* Guarantees */}
//             <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center text-[11px] text-gray-600">
//               <div className="p-2 bg-gray-50 rounded-lg flex flex-col items-center">
//                 <Truck size={18} className="text-emerald-600 mb-1" />
//                 <span className="font-semibold">Fast Delivery</span>
//               </div>
//               <div className="p-2 bg-gray-50 rounded-lg flex flex-col items-center">
//                 <RotateCcw size={18} className="text-emerald-600 mb-1" />
//                 <span className="font-semibold">Cash on Delivery</span>
//               </div>
//               <div className="p-2 bg-gray-50 rounded-lg flex flex-col items-center">
//                 <ShieldCheck size={18} className="text-emerald-600 mb-1" />
//                 <span className="font-semibold">100% Protected</span>
//               </div>
//             </div>

//             {/* Metadata */}
//             <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
//               <div><span className="font-semibold text-gray-700">SKU:</span> {product.sku || "N/A"}</div>
//               <div><span className="font-semibold text-gray-700">Category:</span> {product.category}</div>
//               <div><span className="font-semibold text-gray-700">Brand:</span> {product.brand}</div>
//             </div>
//           </div>

//           {/* Right: Order Summary Sidebar (3 Cols) */}
//           <div className="lg:col-span-3 bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-between">
//             <div>
//               <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
//                 Selected Items ({quantity} pcs)
//               </h3>
              
//               <div className="flex gap-3 pb-3 border-b border-gray-200">
//                 <img src={selectedImage || product.images?.[0]} alt="" className="w-12 h-12 object-contain bg-white rounded border p-1" />
//                 <div className="text-xs">
//                   <div className="font-semibold text-gray-800 line-clamp-1">{product.name}</div>
//                   <div className="text-gray-500">{currentPrice.toLocaleString()} × {quantity} = {(currentPrice * quantity).toLocaleString()}</div>
//                 </div>
//               </div>

//               <div className="py-3 border-b border-gray-200 space-y-1.5 text-xs">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Per Item</span>
//                   <span>{product.currency || "৳"} {currentPrice.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-gray-900 text-sm pt-1">
//                   <span>Product Price</span>
//                   <span>{product.currency || "৳"} {(currentPrice * quantity).toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Share action */}
//             <div className="pt-4 border-t border-gray-200">
//               <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-xs font-semibold text-gray-600 hover:bg-white transition">
//                 <Share2 size={14} /> Share Product
//               </button>
//             </div>
//           </div>

//         </div>

//         {/* Tabs: Description / Specifications / Reviews */}
//         <div className="mt-10 bg-white rounded-xl border border-gray-100 p-6">
//           <div className="flex gap-6 border-b border-gray-200 pb-3">
//             {["descriptions", "specifications", "reviews"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`text-sm font-bold uppercase tracking-wider transition ${
//                   activeTab === tab
//                     ? "text-emerald-600 border-b-2 border-emerald-600 pb-3 -mb-3.5"
//                     : "text-gray-400 hover:text-gray-700"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="pt-6 text-sm text-gray-600">
//             {activeTab === "descriptions" && (
//               <p className="leading-relaxed">{product.description}</p>
//             )}

//             {activeTab === "specifications" && (
//               <table className="w-full text-left border-collapse">
//                 <tbody>
//                   {product.specifications?.map((spec, i) => (
//                     <tr key={i} className="border-b border-gray-100">
//                       <td className="py-2.5 font-semibold text-gray-700 w-1/3">{spec.key}</td>
//                       <td className="py-2.5 text-gray-600">{spec.value}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}

//             {activeTab === "reviews" && (
//               <div className="space-y-4">
//                 {product.reviews?.map((rev) => (
//                   <div key={rev.id} className="border-b border-gray-100 pb-3">
//                     <div className="flex justify-between text-xs font-bold text-gray-800">
//                       <span>{rev.author}</span>
//                       <span className="text-gray-400">{rev.date}</span>
//                     </div>
//                     <p className="text-xs text-gray-600 mt-1">{rev.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Related Products Section */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-lg font-bold text-gray-900 mb-6">Related Products</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//               {relatedProducts.map((item) => {
//                 const itemPrice = getNumericPrice(item.price);
//                 return (
//                   <Link
//                     key={item.id}
//                     href={`/products/${item.slug || item.id}`}
//                     className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition flex flex-col justify-between"
//                   >
//                     <div className="aspect-square bg-gray-50 rounded-lg p-2 mb-3 flex items-center justify-center">
//                       <img src={item.images?.[0]} alt="" className="max-h-full max-w-full object-contain" />
//                     </div>
//                     <div>
//                       <h3 className="text-xs font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
//                       <div className="text-sm font-bold text-emerald-600 mt-1">
//                         {item.currency || "৳"} {itemPrice.toLocaleString()}
//                       </div>
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }