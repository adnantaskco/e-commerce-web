"use client";

import React, { useState, use, useEffect } from 'react';
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

// Fully typed interface for Product API object
interface ProductItem {
  id: number;
  name: string;
  has_variants: boolean;
  slug: string;
  image: string | null;
  sold_amount: number;
  review: number | null;
  retail_price: string;
  discount_price: string;
  has_discount: boolean;
  sale_price: string;
  stock_qty: number;
  in_stock: boolean;
  stock_availability: boolean;
  weight: number;
}

export default function ProductDetailsPage({ params }: { params: any }) {
  const { addToCart } = useCart();
  
  // 1. SAFELY UNWRAP PARAMS (Compatible with Next.js 14 & Next.js 15 Promises)
  const resolvedParams: any = 
    params && typeof params.then === 'function' ? use(params) : params;

  // 2. UNIVERSAL KEY EXTRACTION (Works regardless of folder name: [slug], [id], etc.)
  const routeParam = 
    resolvedParams?.slug || 
    resolvedParams?.id || 
    (resolvedParams && typeof resolvedParams === 'object' 
      ? Object.values(resolvedParams)[0] 
      : null);

  // Dynamic API State Management
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Client side UI interaction states
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('details');
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  // Dynamic API Fetching Implementation
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://demo.app.taskcocommerce.com/api/v1/home-sections"
        );
        const data = await res.json();
        
        // Flatten nested array responses if home-sections returns structured section lists
        let rawItems: ProductItem[] = [];
        if (Array.isArray(data?.data)) {
          rawItems = data.data.flatMap((section: any) => 
            Array.isArray(section.products) ? section.products : section
          );
        } else if (Array.isArray(data)) {
          rawItems = data;
        }

        setProducts(rawItems);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Safeguard: Check if route parameter exists
  if (!routeParam) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center font-sans">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Product Not Found</h2>
        <p className="text-gray-500 mt-2">Missing product identifier.</p>
      </div>
    );
  }

  // Loading indicator state
  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center min-h-[60vh] text-center font-sans">
        <div className="w-10 h-10 border-4 border-foreground border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-black text-ring uppercase tracking-widest animate-pulse">Loading Product Details...</p>
      </div>
    );
  }

  // Sanitize route search parameter
  const searchStr = decodeURIComponent(String(routeParam)).trim().toLowerCase();

  // Find matching item from products state by slug or id
  const product = products.find(
    (p) => 
      (p.slug && p.slug.toString().trim().toLowerCase() === searchStr) || 
      (p.id && p.id.toString() === searchStr)
  );

  // Fallback for non-matching search target
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center font-sans">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Product Not Found</h2>
        <p className="text-gray-500 mt-2">Sorry, we couldn't find a product matching "{searchStr}".</p>
      </div>
    );
  }

  // Fallback structures for UI display
  const mockSizes = ['M', 'L', 'XL'];
  const fallbackBrand = 'Apparel';
  const itemRating = product.review ? Math.round(product.review) : 5;

  // Filter related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-ring900 selection:bg-foregrounng selection:text-text-secondary">
      {/* Main Container Wrapper */}
      <main className="container mx-auto px-4 py-8 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Image Container */}
          <div className="md:sticky md:top-24 self-start bg-ring/10 rounded-2xl aspect-[4/5] sm:aspect-square flex items-center justify-center border border-gray-100 overflow-hidden group p-4">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 pointer-events-none" 
              />
            ) : (
              <span className="text-ring text-sm font-medium">[ No Image Rendered ]</span>
            )}
          </div>

          {/* Right Column: Meta Info Area */}
          <div className="flex flex-col pt-2">
            <span className="text-xs font-bold text-ring tracking-widest uppercase mb-2">{fallbackBrand}</span>
            <h1 className="text-5xl sm:text-3xl font-bold text-text-primary tracking-tight leading-tight mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-amber-400 text-sm tracking-tighter">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx}>{idx < itemRating ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="text-xs font-bold text-ring">({product.sold_amount || 0} Sold)</span>
              <span className="text-ring/50">|</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${product.in_stock ? 'bg-text-green animate-pulse' : 'bg-destructive'}`}></span>
                <span className={`text-xs font-bold uppercase tracking-wider ${product.in_stock ? 'text-text-green' : 'text-destructive'}`}>
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="pb-4">
              <h2 className="text-xl font-bold text-text-primary mb-2">Description</h2>
              <p className="text-sm text-ring leading-6">
                Premium-quality clothing made from soft, breathable fabric for all-day comfort. Stylish, durable, and perfect for casual, work, travel, and everyday wear.
              </p>
            </div>
            
            {/* Discount Pricing Layout */}
            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl font-black text-destructive tracking-tight">
                ${product.sale_price}
              </span>

              {product.has_discount && Number(product.retail_price) > Number(product.sale_price) && (
                <span className="text-lg font-medium text-ring line-through">
                  ${product.retail_price}
                </span>
              )}

              {product.has_discount && product.discount_price && (
                <span className="bg-bacground text-destructive text-xs font-bold px-2 py-1 rounded-md">
                  {product.discount_price} OFF
                </span>
              )}
            </div>

            <hr className="border-ring/10 my-2" />

            {/* Size Variant Selector Buttons */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-ring tracking-wider uppercase">Select Size</h3>
                <span className="text-xs font-semibold text-ring/50 underline cursor-pointer hover:text-text-primary">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {mockSizes.map((sz) => (
                  <button 
                    key={sz} 
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[48px] h-12 border text-xs font-bold rounded-lg transition-all duration-150 flex items-center justify-center px-4 ${
                      selectedSize === sz 
                        ? 'border-foreground bg-foreground text-text-secondary shadow-sm' 
                        : 'border-ring/50 text-ring hover:border-ring/50 bg-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Trigger Action Button */}
            <div className="mt-8">
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    image: product.image || '',
                    brand: fallbackBrand,
                    name: product.name,
                    price: Number(product.sale_price),
                  })
                }
                disabled={!product.in_stock}
                className={`w-full font-bold py-4 px-6 rounded-xl shadow-md tracking-widest uppercase text-xs transition-all duration-150 active:scale-[0.99] ${
                  product.in_stock 
                    ? 'bg-primary hover:bg-ring text-text-secondary cursor-pointer' 
                    : 'bg-ring/20 text-ring/40 cursor-not-allowed shadow-none'
                }`}
              >
                {product.in_stock ? 'Add To Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Social Share & Policies Stack */}
            <div className="mt-4">
              <div className="flex items-center gap-4 text-md font-bold text-ring py-4">
                <span>Share on:</span>
                <div className="flex items-center gap-4 text-ring cursor-pointer">
                  <FaFacebookF className="hover:text-blue-600 transition-colors" />
                  <FaInstagram className="hover:text-pink-600 transition-colors" />
                  <FaPinterestP className="hover:text-destructive transition-colors" />
                  <FaYoutube className="hover:text-destructive transition-colors" />
                  <FaXTwitter className="hover:text-text-primary transition-colors" />
                  <FaTwitter className="hover:text-blue-400 transition-colors" />
                </div>
              </div>
  
              <div className="space-y-2 mt-2">
                <div className="flex gap-3 items-start p-4 rounded-xl bg-ring/10 border border-ring/10">
                  <Truck className="text-text-primary mt-0.5 shrink-0" size={18} />
                  <p className="text-xs sm:text-sm font-bold text-ring">
                    Free Shipping & Returns :{" "}
                    <span className="font-normal text-ring">Available on all orders over $99.</span>
                  </p>
                </div>
  
                <div className="flex gap-3 items-start p-4 rounded-xl bg-ring/10 border border-ring/15">
                  <Clock className="text-text-primary mt-0.5 shrink-0" size={18} />
                  <p className="text-xs sm:text-sm font-bold text-ring">
                    Estimated Delivery :{" "}
                    <span className="font-normal text-ring">Orders are typically dispatched within 24 hours.</span>
                  </p>
                </div>
  
                <div className="flex gap-3 items-start p-4 rounded-xl bg-ring/10 border border-ring/15">
                  <ShieldCheck className="text-text-primary mt-0.5 shrink-0" size={18} />
                  <p className="text-xs sm:text-sm font-bold text-ring">
                    Security Policy :{" "}
                    <span className="font-normal text-ring">Ensuring top-level security for your data and transactions.</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Nav Tabs */}
        <div className="mt-16 border-b border-ring/10">
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
        <div className="py-8 min-h-[180px] text-sm sm:text-base text-ring leading-relaxed">
          {activeTab === 'details' && (
           <div className="pb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Product Description</h2>
            <p className="text-ring leading-7 mb-4">
              Upgrade your wardrobe with this stylish and comfortable clothing piece,
              designed for everyday wear and every occasion. Crafted from premium-quality
              fabric, it offers a soft feel, excellent breathability, and long-lasting durability.
            </p>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Features</h3>
            <ul className="list-disc list-inside text-ring space-y-2 mb-6">
              <li>Premium-quality fabric for superior comfort</li>
              <li>Soft, breathable, and lightweight material</li>
              <li>Durable stitching for long-lasting wear</li>
              <li>Comfortable fit for all-day use</li>
              <li>Weight specification context: {product.weight}g</li>
            </ul>
          </div>
          )}

          {activeTab === 'specification' && (
           <div className="mt-6 overflow-hidden rounded-xl border border-ring bg-background">
            <div className="border-b bg-ring/10 px-5 py-3">
              <h2 className="text-lg font-semibold text-text-primary">Product Specifications</h2>
            </div>
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="border-b border-ring/10">
                  <td className="w-1/3 px-5 py-3 font-medium text-text-primary">Brand</td>
                  <td className="px-5 py-3 text-ring">{fallbackBrand}</td>
                </tr>
                <tr className="border-b border-ring/10">
                  <td className="bg-ring/1 px-5 py-3 font-medium text-text-primary">Product Variant Matrix</td>
                  <td className="px-5 py-3 text-ring">{product.has_variants ? "Yes (Multiple Sizes Available)" : "No (Standard Sizing)"}</td>
                </tr>
                <tr className="border-b border-ring/10">
                  <td className="bg-ring/1 px-5 py-3 font-medium text-text-primary">Package Weight</td>
                  <td className="px-5 py-3 text-ring">{product.weight} grams</td>
                </tr>
                <tr className="border-b border-ring/10">
                  <td className="bg-ring/1 px-5 py-3 font-medium text-text-primary">Country of Origin</td>
                  <td className="px-5 py-3 text-ring">Bangladesh</td>
                </tr>
              </tbody>
            </table>
          </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="border border-ring/10 rounded-xl p-6 bg-ring/10 flex items-center gap-5">
                <div>
                  <h3 className="text-4xl font-black text-ring">{itemRating}.0</h3>
                  <div className="flex text-amber-400 text-sm mt-0.5">{"★".repeat(itemRating)}</div>
                </div>
                <div>
                  <p className="text-sm font-bold text-ring">Based on verified customer orders tracking matrix</p>
                </div>
              </div>

              <div className="divide-y divide-ring/10 border border-ring/10 rounded-xl px-5 bg-background">
                <div className="py-5">
                  <div className="flex justify-between text-xs font-bold mb-1"><span className="text-ring">John Smith</span><span className="text-ring">2 days ago</span></div>
                  <div className="text-amber-400 text-xs mb-1">★★★★★</div>
                  <p className="font-bold text-sm text-ring mb-1">Excellent Quality</p>
                  <p className="text-xs sm:text-sm text-ring">The material feels premium and looks exactly like the pictures.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Showcase Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-ring/10 pt-14">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black uppercase tracking-wider text-ring">You May Also Like</h2>
              <span className="text-xs font-bold text-ring uppercase tracking-widest hover:text-text-primary cursor-pointer">View All</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <div 
                  key={item.id}
                  onMouseEnter={() => setHoveredCardId(item.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="bg-background rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group flex flex-col justify-between"
                >
                  <div className="relative bg-ring/5 h-[140px] sm:h-[280px] flex items-center justify-center p-2">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        width={260}
                        height={300}
                        draggable={false}
                        className="object-contain max-h-full pointer-events-none"
                      />
                    ) : (
                      <div className="text-[10px] text-ring/30 font-bold uppercase tracking-widest">[ No Image ]</div>
                    )}

                    {item.has_discount && item.discount_price && (
                      <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-primary text-text-secondary text-[9px] sm:text-xs font-medium sm:font-bold px-1.5 sm:px-3 py-0.5 sm:py-1 rounded">
                        {item.discount_price}
                      </div>
                    )}

                    <div
                      className={`
                        absolute top-2 right-2 sm:top-5 sm:right-4 flex flex-col gap-2 z-10 transition-all duration-300
                        ${hoveredCardId === item.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3 sm:opacity-0 sm:translate-x-5"}
                        group-hover:opacity-100 group-hover:translate-x-0
                      `}
                    >
                      <button className="w-8 h-8 sm:w-5 sm:h-5 md:w-10 md:h-10 text-xs md:text-base bg-background rounded-full flex items-center justify-center shadow hover:bg-primary hover:text-text-primary transition">
                        <FaHeart />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: item.id,
                            image: item.image || '',
                            brand: fallbackBrand,
                            name: item.name,
                            price: Number(item.sale_price),
                          });
                        }}
                        disabled={!item.in_stock}
                        className={`w-8 h-8 md:w-10 sm:w-5 sm:h-5 md:h-10 text-xs md:text-base bg-background rounded-full flex items-center justify-center shadow hover:bg-foreground hover:text-text-secondary active:scale-96 transition ${!item.in_stock ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        <FaShoppingCart />
                      </button>

                      <button className="w-8 h-8 sm:w-5 sm:h-5 md:w-10 md:h-10 text-xs md:text-base bg-background rounded-full flex items-center justify-center shadow hover:bg-blue-500 hover:text-white transition">
                        <FaEye />
                      </button>
                    </div>
                  </div>

                  <Link href={`/products/${item.slug || item.id}`} className="flex-1 flex flex-col justify-between">
                    <div className="p-2 sm:p-4">
                      <p className="text-[11px] sm:text-sm text-ring truncate">{fallbackBrand}</p>
                      <h2 className="text-xs sm:text-base whitespace-nowrap overflow-hidden text-ellipsis font-semibold mt-0.5 text-ring group-hover:text-text-primary">
                        {item.name}
                      </h2>

                      <div className="flex gap-0.5 text-yellow-400 text-[10px] sm:text-sm mt-1">
                        {Array.from({ length: item.review ? Math.round(item.review) : 5 }).map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5">
                        {item.has_discount && Number(item.retail_price) > Number(item.sale_price) && (
                          <span className="line-through text-ring/50 text-[11px] sm:text-sm">
                            ${item.retail_price}
                          </span>
                        )}
                        <span className="text-destructive font-bold text-xs sm:text-base">
                          ${item.sale_price}
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