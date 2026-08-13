"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/src/components/context/CartContext";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  Plus,
  Minus,
} from "lucide-react";
import { FaShoppingCart, FaEye, FaStar } from "react-icons/fa";

interface PriceObject {
  product_variant_id?: number;
  retail_price?: number;
  is_discounted?: boolean;
  sale_price?: number;
  type?: string;
  value?: number;
  wholesale_price?: number;
  is_special_price?: boolean;
  special_price?: number;
  is_bundle?: boolean;
  bundle_price?: number;
}

interface ProductItem {
  id: number;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  category: string;
  rating: number;
  description: string;
  price: number | PriceObject;
  currency: string;
  in_stock: boolean;
  images: string[];
  image?: string;
  has_discount?: boolean;
  discount_price?: string;
  retail_price?: number;
  sale_price?: number;
  stock_qty?: number;
  specifications?: Record<string, any> | Array<{ key: string; value: any }>;
  reviews?: Array<{
    id: number;
    author: string;
    rating: number;
    date: string;
    comment: string;
    quantity: number;
  }>;
}

export default function ProductDetailsPage({ params }: { params: any }) {
  const { addToCart } = useCart();

  const resolvedParams: any =
    params && typeof params.then === "function" ? use(params) : params;

  const routeParam =
    resolvedParams?.slug ||
    resolvedParams?.id ||
    (resolvedParams && typeof resolvedParams === "object"
      ? Object.values(resolvedParams)[0]
      : null);

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductItem[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("descriptions");
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!routeParam) return;

    const fetchProductData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://demo.app.taskcocommerce.com/api/v1/products/${routeParam}`
        );
        const data = await res.json();

        if (data?.data) {
          setProduct(data.data);
          setSelectedImage(data.data.images?.[0] || data.data.image || "");
          if (data.related) setRelatedProducts(data.related);
          if (data.suggestions) setSuggestedProducts(data.suggestions);
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [routeParam]);

  const getNumericPrice = (price: number | PriceObject | undefined): number => {
    if (typeof price === "number") return price;
    if (typeof price === "object" && price !== null) {
      return (
        price.sale_price ??
        price.special_price ??
        price.value ??
        price.retail_price ??
        0
      );
    }
    return 0;
  };

  const getParsedSpecifications = (): Array<{ key: string; value: string }> => {
    const rawSpecs = product?.specifications;

    if (!rawSpecs) return [];

    if (Array.isArray(rawSpecs)) {
      return rawSpecs.map((spec) => ({
        key: spec.key || spec.name || "Spec",
        value: String(spec.value ?? ""),
      }));
    }

    if (typeof rawSpecs === "object") {
      return Object.entries(rawSpecs).map(([key, value]) => ({
        key,
        value: typeof value === "object" ? JSON.stringify(value) : String(value),
      }));
    }

    return [];
  };

  if (!routeParam || (!loading && !product)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-xl font-bold text-ring">Product Not Found</h2>
        <p className="text-ring/50 mt-1">No matching product found.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-gray-600">Loading Product...</p>
      </div>
    );
  }

  const currentPrice = getNumericPrice(product?.price);
  const formattedSpecs = getParsedSpecifications();

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, price: currentPrice, quantity } as any);
  };

  return (
    <div className="min-h-screen bg-white py-6 text-gray-800 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        {/* Breadcrumb Header */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <span>&gt;</span>
          <Link href="/products" className="hover:text-teal-600">Products</Link>
          <span>&gt;</span>
          <span className="text-gray-600">{product?.name}</span>
        </nav>

        {/* Top Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gallery Area */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="w-full aspect-[4/3] bg-gray-50 border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-6">
              <img
                src={selectedImage || product?.images?.[0] || product?.image}
                alt={product?.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {product?.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 border rounded-md overflow-hidden p-1 bg-gray-50 transition ${
                      selectedImage === img ? "border-teal-600 border-2" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-4 flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
              {product?.name}
            </h1>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-amber-400 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product?.rating || 4.5) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-500">
                {product?.rating || 4.5}
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              {product?.description}
            </p>

            <div className="text-3xl font-black text-teal-700 mb-6 tracking-tight">
              {currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>

            {/* Counter and Action Buttons */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-md bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    className="px-3 py-2 text-gray-500 hover:bg-gray-100"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-4 text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("inc")}
                    className="px-3 py-2 text-gray-500 hover:bg-gray-100"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-md text-xs tracking-wide transition flex items-center justify-center gap-2"
                >
                  Add to Cart
                </button>

                <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-6 rounded-md text-xs tracking-wide transition">
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-md text-xs transition flex items-center justify-center gap-2">
                  <Link href="whatsapp://call?phone=8801812295539" className="flex items-center gap-2">
                    <MessageCircle size={14} /> Order on WhatsApp
                  </Link>
                </button>
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-4 rounded-md text-xs transition flex items-center justify-center gap-2">
                  <Link className="flex items-center gap-2" href="tel:+8801812295539">
                    <PhoneCall size={14} /> Call for Order
                  </Link>
                </button>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100 text-center text-[11px] text-gray-600">
              <div className="p-2 bg-gray-50/50 rounded-md flex flex-col items-center">
                <Truck size={16} className="text-teal-600 mb-1" />
                <span className="font-bold text-gray-800">Fast Delivery</span>
                <span className="text-[10px] text-gray-400">Standard delivery</span>
              </div>
              <div className="p-2 bg-gray-50/50 rounded-md flex flex-col items-center">
                <RotateCcw size={16} className="text-amber-500 mb-1" />
                <span className="font-bold text-gray-800">Cash on delivery</span>
                <span className="text-[10px] text-gray-400">Available</span>
              </div>
              <div className="p-2 bg-gray-50/50 rounded-md flex flex-col items-center">
                <ShieldCheck size={16} className="text-teal-600 mb-1" />
                <span className="font-bold text-gray-800">Payment</span>
                <span className="text-[10px] text-gray-400">100% protected</span>
              </div>
            </div>

            {/* Product Meta Info */}
            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <div><span className="font-bold text-gray-700">SKU:</span> {product?.sku || "WBH-001"}</div>
              <div><span className="font-bold text-gray-700">Category:</span> {product?.category || "Electronics"}</div>
              <div><span className="font-bold text-gray-700">Brand:</span> {product?.brand || "TechPro"}</div>
            </div>
          </div>

          {/* Right Sidebar: Selected Items Summary + Suggestions */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-gray-50/80 p-4 rounded-md border border-gray-100 text-xs text-gray-600">
              <h3 className="font-semibold text-gray-500 text-[11px] mb-3">
                Selected Items ({quantity} pcs)
              </h3>
              
              <div className="flex gap-3 pb-3 border-b border-gray-200/60">
                <img
                  src={selectedImage || product?.images?.[0] || product?.image}
                  alt=""
                  className="w-10 h-10 object-contain bg-white rounded border p-1"
                />
                <div className="flex-1">
                  <div className="font-bold text-gray-800 truncate">{product?.name}</div>
                  <div className="text-gray-400 text-[11px]">
                    {currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })} × {quantity} = {(currentPrice * quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="py-2 border-b border-gray-200/60 space-y-1">
                <div className="flex justify-between text-gray-500">
                  <span>Per Item</span>
                  <span>{currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 text-xs pt-1">
                  <span>Product price</span>
                  <span>{(currentPrice * quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {suggestedProducts.length > 0 && (
              <div className="bg-gray-50/80 p-4 rounded-md border border-gray-100">
                <h3 className="text-xs font-bold text-gray-700 mb-3">Suggestions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {suggestedProducts.map((item) => {
                    const suggPrice = getNumericPrice(item.price);
                    const itemImage = item.image || item.images?.[0] || "/placeholder.png";

                    return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHovered(item.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setHovered(hovered === item.id ? null : item.id)}
                      className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-auto bg-background rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative flex flex-col"
                    >
                      {/* IMAGE AREA WITH OVERLAID ACTION BUTTONS */}
                      <div className="relative bg-background h-full w-full flex items-center justify-center p-2 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain pointer-events-none transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Discount Badge */}
                        {item.has_discount && (
                          <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-text-primary text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">
                            {item.discount_price}
                          </div>
                        )}

                        {/* Overlaid Action Bar */}
                        <div
                          className={`absolute inset-x-0 bottom-0 p-1.5 sm:p-2 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 z-20 ${
                            hovered === item.id
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                          }`}
                        >
                          {/* Add to Cart Button */}
                          <button
                            type="button"
                            title="Add to Cart"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart({
                                id: item.id,
                                image: item.image || "/placeholder.png",
                                brand: "Taskco",
                                name: item.name,
                                price: Number(item.sale_price),
                              });
                            }}
                            className="flex-1 bg-foreground/80 hover:bg-foreground text-text-secondary text-[11px] sm:text-xs font-medium py-1.5 px-2 rounded flex items-center justify-center gap-1 shadow hover:shadow-md active:scale-95 transition-all"
                          >
                            <FaShoppingCart className="text-[10px] sm:text-xs" />
                            <span className="hidden sm:inline">Add to Cart</span>
                          </button>

                          {/* Quick View Button */}
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            title="Quick View"
                            className="w-7 h-7 sm:w-8 sm:h-8 bg-background text-ring hover:bg-blue-600 hover:text-text-secondary rounded flex items-center justify-center shadow hover:shadow-md active:scale-95 transition-all shrink-0"
                          >
                            <FaEye className="text-[10px] sm:text-xs" />
                          </Link>
                        </div>
                      </div>

                      {/* DETAILS AREA */}
                      <Link href={`/products/${item.slug}`} className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] sm:text-xs text-ring">Taskco</p>

                          <h2 className="text-xs sm:text-sm font-semibold truncate text-text-primary">
                            {item.name}
                          </h2>

                          {/* Rating */}
                          <div className="flex gap-0.5 text-yellow-400 text-[10px] sm:text-xs mt-1">
                            {[...Array(5)].map((_, index) => (
                              <FaStar key={index} />
                            ))}
                          </div>
                        </div>

                        <div className="mt-2">
                          {/* Price */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {item.has_discount && (
                              <span className="line-through text-ring/70 text-[10px] sm:text-xs">
                                {currency} {Number(item.retail_price).toFixed(0)}
                              </span>
                            )}

                            <span className="font-bold text-destructive text-xs sm:text-sm">
                              {currency} {Number(item.sale_price).toFixed(0)}
                            </span>
                          </div>

                          {/* Stock Status */}
                          <div className="mt-0.5">
                            {item.in_stock ? (
                              <span className="text-green-600 text-[10px] sm:text-xs font-medium">
                                In Stock ({item.stock_qty})
                              </span>
                            ) : (
                              <span className="text-destructive text-[10px] sm:text-xs font-medium">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Panel */}
        <div className="mt-12">
          <div className="flex gap-8 border-b border-gray-200 text-xs font-bold">
            {["descriptions", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 capitalize transition ${
                  activeTab === tab
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-6 text-xs text-gray-500 leading-relaxed">
            {activeTab === "descriptions" && <p>{product?.description}</p>}

            {activeTab === "specifications" && (
              <table className="w-full text-left max-w-lg border-collapse">
                <tbody>
                  {formattedSpecs.length > 0 ? (
                    formattedSpecs.map((spec, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-2 font-bold text-gray-700 capitalize w-1/3">{spec.key}</td>
                        <td className="py-2 text-gray-500">{spec.value}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-2 text-gray-400">No specifications available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-3">
                {product?.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="border-b border-gray-100 pb-2">
                      <div className="flex justify-between font-bold text-gray-700">
                        <span>{rev.author}</span>
                        <span className="text-gray-400">{rev.date}</span>
                      </div>
                      <p className="mt-1">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 border-t border-gray-100 pt-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Related Products</h2>
            <div className="flex overflow-x-auto no-scrollbar scroll-smooth gap-3 pb-2 md:pb-0 md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-4">
              {relatedProducts.slice(0, 6).map((item) => {
                const relPrice = getNumericPrice(item.price);
                const itemImage = item.image || item.images?.[0] || "/placeholder.png";

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setHovered(hovered === item.id ? null : item.id)}
                    className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-auto bg-background rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative flex flex-col"
                  >
                    {/* IMAGE AREA WITH OVERLAID ACTION BUTTONS */}
                    <div className="relative bg-background h-44 w-full flex items-center justify-center p-2 overflow-hidden">
                      <img
                        src={itemImage}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain pointer-events-none transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Discount Badge */}
                      {item.has_discount && (
                        <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-text-primary text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">
                          {item.discount_price}
                        </div>
                      )}

                      {/* Overlaid Action Bar */}
                      <div
                        className={`absolute inset-x-0 bottom-0 p-1.5 sm:p-2 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 z-20 ${
                          hovered === item.id
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                        }`}
                      >
                        {/* Add to Cart Button */}
                        <button
                          type="button"
                          title="Add to Cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: item.id,
                              image: itemImage,
                              brand: item.brand || "Taskco",
                              name: item.name,
                              price: relPrice,
                            } as any);
                          }}
                          className="flex-1 bg-foreground/80 hover:bg-foreground text-text-secondary text-[11px] sm:text-xs font-medium py-1.5 px-2 rounded flex items-center justify-center gap-1 shadow hover:shadow-md active:scale-95 transition-all"
                        >
                          <FaShoppingCart className="text-[10px] sm:text-xs" />
                          <span className="hidden sm:inline">Add to Cart</span>
                        </button>

                        {/* Quick View Button */}
                        <Link
                          href={`/products/${item.slug || item.id}`}
                          onClick={(e) => e.stopPropagation()}
                          title="Quick View"
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-background text-ring hover:bg-blue-600 hover:text-text-secondary rounded flex items-center justify-center shadow hover:shadow-md active:scale-95 transition-all shrink-0"
                        >
                          <FaEye className="text-[10px] sm:text-xs" />
                        </Link>
                      </div>
                    </div>

                    {/* DETAILS AREA */}
                    <Link
                      href={`/products/${item.slug || item.id}`}
                      className="p-2 sm:p-3 flex-1 flex flex-col justify-between"
                    >
                      <div>
                        <p className="text-[10px] sm:text-xs text-ring">
                          {item.brand || "Taskco"}
                        </p>

                        <h2 className="text-xs sm:text-sm font-semibold truncate text-text-primary">
                          {item.name}
                        </h2>

                        {/* Rating */}
                        <div className="flex gap-0.5 text-yellow-400 text-[10px] sm:text-xs mt-1">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} />
                          ))}
                        </div>
                      </div>

                      <div className="mt-2">
                        {/* Price */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {item.has_discount && item.retail_price && (
                            <span className="line-through text-ring/70 text-[10px] sm:text-xs">
                              {product?.currency || "BDT"} {Number(item.retail_price).toFixed(0)}
                            </span>
                          )}

                          <span className="font-bold text-destructive text-xs sm:text-sm">
                            {product?.currency || "BDT"} {relPrice.toFixed(0)}
                          </span>
                        </div>

                        {/* Stock Status */}
                        <div className="mt-0.5">
                          {item.in_stock !== false ? (
                            <span className="text-green-600 text-[10px] sm:text-xs font-medium">
                              In Stock {item.stock_qty ? `(${item.stock_qty})` : ""}
                            </span>
                          ) : (
                            <span className="text-destructive text-[10px] sm:text-xs font-medium">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}