"use client";

import React, { useState, use } from 'react';
import { totalProducts } from '@/lib/totalproducts';
import Link from 'next/link';
import { useCart } from '@/app/src/components/context/CartContext';
import { Clock, ShieldCheck, Truck } from 'lucide-react';

import { 
  FaFacebookF, 
  FaInstagram, 
  FaPinterestP, 
  FaTwitter, 
  FaXTwitter, 
  FaYoutube,
  FaHeart,
 
  FaEye,
  FaStar 
} from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';

// 1. Define clean TypeScript shape definitions at the root level
interface ProductItem {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  size?: string[];
  rating?: number;
  reviews?: number;
  hasOffer?: boolean;
  description?: string;
}

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { addToCart } = useCart();
  
  // 2. Unwrap async dynamic path parameters safely
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  // 3. Setup client side UI interaction states
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('details');
  const [hoveredCardId, setHoveredCardId] = useState<string | number | null>(null);

  // 4. Find matching item object reference safely
  const product = Array.isArray(totalProducts)
    ? totalProducts.find(p => p.id.toString() === id.toString())
    : totalProducts[id as any];

  // 5. Early validation checkpoint fallback
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center font-sans">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Product Not Found</h2>
        <p className="text-gray-500 mt-2">Sorry, we couldn't find a product matching ID "{id}".</p>
      </div>
    );
  }

  // 6. Destructure layout parameters cleanly with default matching values
  const {
    id: currentId,
    name = 'Premium Everyday Product',
    brand = 'Styleway',
    price = 0,
    oldPrice = 0,
    image = '',
    size = ['M', 'L', 'XL'],
    rating = 4,
    reviews = 0,
    hasOffer = false,
  } = product;

  // 7. Process matching related array collections safely
  let relatedProducts: ProductItem[] = [];
  if (Array.isArray(totalProducts)) {
    const catalog = totalProducts as ProductItem[];
    
    relatedProducts = catalog.filter(
      (p) => p.brand === brand && p.id.toString() !== currentId.toString()
    );
    
    // Fallback if no products match this brand
    if (relatedProducts.length === 0) {
      relatedProducts = catalog.filter((p) => p.id.toString() !== currentId.toString());
    }
    relatedProducts = relatedProducts.slice(0, 4);
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white">
      {/* Main Container Wrapper */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Image Container */}
          <div className="md:sticky md:top-24 self-start bg-gray-50 rounded-2xl aspect-[4/5] sm:aspect-square flex items-center justify-center border border-gray-100 overflow-hidden group">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
              />
            ) : (
              <span className="text-gray-400 text-sm font-medium">[ No Image Rendered ]</span>
            )}

            {hasOffer && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-[11px] font-black tracking-widest px-3 py-1.5 rounded-md shadow-sm uppercase">
                Special Offer
              </span>
            )}
          </div>

          {/* Right Column: Meta Info Area */}
          <div className="flex flex-col pt-2">
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">{brand}</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight leading-tight mb-3">{name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-amber-400 text-sm tracking-tighter">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx}>{idx < rating ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="text-xs font-bold text-gray-400">({reviews} Reviews)</span>
              <span className="text-gray-200">|</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">In Stock</span>
              </div>
            </div>
            
            {/* Discount Pricing Layout */}
            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl font-black text-gray-950 tracking-tight">
                ${price}
              </span>

              {oldPrice > price && (
                <span className="text-lg font-medium text-gray-400 line-through">
                  ${oldPrice}
                </span>
              )}

              {oldPrice > price && (
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md">
                  {Math.round(((oldPrice - price) / oldPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <hr className="border-gray-100 my-2" />

            {/* Size Variant Selector Buttons */}
            {size && size.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold text-gray-900 tracking-wider uppercase">Select Size</h3>
                  <span className="text-xs font-semibold text-gray-400 underline cursor-pointer hover:text-black">Size Guide</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {size.map((sz) => (
                    <button 
                      key={sz} 
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[48px] h-12 border text-xs font-bold rounded-lg transition-all duration-150 flex items-center justify-center px-4 ${
                        selectedSize === sz 
                          ? 'border-black bg-black text-white shadow-sm' 
                          : 'border-gray-200 text-gray-800 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Cart Trigger Button */}
            <div className="mt-8">
              <button
                onClick={() =>
                  addToCart({
                    id: currentId,
                    image,
                    brand,
                    name,
                    price,
                  })
                }
                className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 px-6 rounded-xl shadow-md tracking-widest uppercase text-xs transition-all duration-150 active:scale-[0.99]"
              >
                Add To Cart
              </button>
            </div>

            {/* Dual Quick Badges Features Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <Truck className="text-black shrink-0" size={22} />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">Fast Delivery</h4>
                  <p className="text-xs text-gray-500">2–5 Days</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <ShieldCheck className="text-black shrink-0" size={22} />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">Authentic Product</h4>
                  <p className="text-xs text-gray-500">100% Verified</p>
                </div>
              </div>
            </div>

            {/* Omni-Channel Social Share Deck Layout */}
            <div className="mt-4">
              <div className="flex items-center gap-4 text-sm font-bold text-gray-900 py-4">
                <span>Share on:</span>
                <div className="flex items-center gap-4 text-gray-600 cursor-pointer">
                  <FaFacebookF className="hover:text-blue-600 transition-colors" />
                  <FaInstagram className="hover:text-pink-600 transition-colors" />
                  <FaPinterestP className="hover:text-red-600 transition-colors" />
                  <FaYoutube className="hover:text-red-700 transition-colors" />
                  <FaXTwitter className="hover:text-black transition-colors" />
                  <FaTwitter className="hover:text-blue-400 transition-colors" />
                </div>
              </div>
  
              {/* Trust Policy Stacked Cards Column */}
              <div className="space-y-2 mt-2">
                <div className="flex gap-3 items-start p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <Truck className="text-black mt-0.5 shrink-0" size={18} />
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    Free Shipping & Returns :{" "}
                    <span className="font-normal text-gray-600">Available on all orders over $99.</span>
                  </p>
                </div>
  
                <div className="flex gap-3 items-start p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <Clock className="text-black mt-0.5 shrink-0" size={18} />
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    Estimated Delivery :{" "}
                    <span className="font-normal text-gray-600">Orders are typically dispatched within 24 hours.</span>
                  </p>
                </div>
  
                <div className="flex gap-3 items-start p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <ShieldCheck className="text-black mt-0.5 shrink-0" size={18} />
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    Security Policy :{" "}
                    <span className="font-normal text-gray-600">Ensuring top-level security for your data and transactions.</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- Dynamic Content Nav Tabs --- */}
        <div className="mt-16 border-b border-gray-100">
          <div className="flex gap-8 overflow-x-auto scrollbar-none">
            {['details', 'specification', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs font-bold uppercase tracking-widest border-b-2 whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Panels Content */}
        <div className="py-8 min-h-[180px] text-sm sm:text-base text-gray-600 leading-relaxed">
          {activeTab === 'details' && (
            <div className="max-w-4xl">
              <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                Experience the perfect combination of quality, comfort, and modern style with this premium product. Expertly crafted using high-quality materials, it is designed to provide long-lasting durability, a comfortable fit, and an attractive appearance for everyday use.
              </p>
            </div>
          )}

          {activeTab === 'specification' && (
            <div className="max-w-xl border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <tbody>
                  <tr className="border-b border-gray-100"><td className="p-3.5 font-bold text-gray-900 w-1/3 bg-gray-50">Brand</td><td className="p-3.5 text-gray-700">{brand}</td></tr>
                  <tr className="border-b border-gray-100"><td className="p-3.5 font-bold text-gray-900 bg-gray-50">Material</td><td className="p-3.5 text-gray-700">Premium Cotton Blend</td></tr>
                  <tr className="border-b border-gray-100"><td className="p-3.5 font-bold text-gray-900 bg-gray-50">Fit</td><td className="p-3.5 text-gray-700">Regular Fit</td></tr>
                  <tr className="border-b border-gray-100"><td className="p-3.5 font-bold text-gray-900 bg-gray-50">Season</td><td className="p-3.5 text-gray-700">All Season</td></tr>
                  <tr><td className="p-3.5 font-bold text-gray-900 bg-gray-50">Care Instructions</td><td className="p-3.5 text-gray-700">Machine Wash</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="border border-gray-100 rounded-xl p-6 bg-gray-50/50 flex items-center gap-5">
                <div>
                  <h3 className="text-4xl font-black text-gray-950">{rating}.0</h3>
                  <div className="flex text-amber-400 text-sm mt-0.5">{"★".repeat(rating)}</div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-950">Based on {reviews} Customer Reviews</p>
                </div>
              </div>

              <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl px-5 bg-white">
                <div className="py-5">
                  <div className="flex justify-between text-xs font-bold mb-1"><span className="text-gray-950">John Smith</span><span className="text-gray-400">2 days ago</span></div>
                  <div className="text-amber-400 text-xs mb-1">★★★★★</div>
                  <p className="font-bold text-sm text-gray-900 mb-1">Excellent Quality</p>
                  <p className="text-xs sm:text-sm text-gray-600">The material feels premium and looks exactly like the pictures.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- Related Products Showcase Grid --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-gray-100 pt-14">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black uppercase tracking-wider text-gray-950">You May Also Like</h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-black cursor-pointer">View All</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <div 
                  key={item.id}
                  onMouseEnter={() => setHoveredCardId(item.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
                >
                  {/* IMAGE BOX */}
                  <div className="relative bg-gray-100 h-[140px] sm:h-[280px] flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      draggable={false}
                      className="object-contain max-h-full pointer-events-none"
                    />

                    {/* DISCOUNT BADGE */}
                    {item.discount && (
                      <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-red-500 text-white text-[9px] sm:text-xs font-bold px-1.5 sm:px-3 py-0.5 sm:py-1 rounded">
                        {item.discount}% OFF
                      </div>
                    )}

                    {/* ACTION BUTTONS */}
                    <div
                      className={`
                        absolute top-2 right-2 sm:top-5 sm:right-4 flex flex-col gap-2 z-10 transition-all duration-300
                        ${hoveredCardId === item.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}
                        group-hover:opacity-100 group-hover:translate-x-0
                      `}
                    >
                      <button className="w-8 h-8 text-xs bg-white text-gray-700 rounded-full flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition">
                        <FaHeart />
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart({
                          id: Number(currentId),
                          image,
                          brand,
                          name,
                          price,
                        });
                        }}
                        className="w-8 h-8 text-xs bg-white text-gray-700 rounded-full flex items-center justify-center shadow hover:bg-black hover:text-white transition"
                      >
                        <FaShoppingCart />
                      </button>

                      <button className="w-8 h-8 text-xs bg-white text-gray-700 rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition">
                        <FaEye />
                      </button>
                    </div>
                  </div>

                  {/* DETAILS/CONTENT BOX */}
                  <Link href={`/products/${item.id}`}>
                    <div className="p-2 sm:p-4">
                      <p className="text-[11px] sm:text-sm text-gray-500 truncate">{item.brand}</p>
                      <h2 className="text-xs sm:text-base whitespace-nowrap overflow-hidden text-ellipsis font-semibold mt-0.5 text-gray-900 group-hover:text-black">
                        {item.name}
                      </h2>

                      <div className="flex gap-0.5 text-yellow-400 text-[10px] sm:text-sm mt-1">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5">
                        {item.oldPrice && (
                          <span className="line-through text-gray-400 text-[11px] sm:text-sm">
                            ${item.oldPrice}
                          </span>
                        )}
                        <span className="text-red-500 font-bold text-xs sm:text-base">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}