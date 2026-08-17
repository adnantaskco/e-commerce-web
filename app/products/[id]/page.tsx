"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/src/components/context/CartContext";
import { UseCurrency } from "@/components/ui/currency";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  Plus,
  Minus,
  Sparkles,
  CheckCircle2,
  Share2,
  Heart,
  ChevronRight,
  PhoneCallIcon,
  LetterText,
} from "lucide-react";
import { FaShoppingCart, FaEye, FaStar } from "react-icons/fa";
import { TbMassage } from "react-icons/tb";
import { MdOutlineMessage } from "react-icons/md";

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
  in_stock: boolean | number | string;
  images: string[];
  image?: string;
  sizes?: string[];
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
  const { currency: currencySymbol } = UseCurrency();

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
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("descriptions");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

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
          if (data.data.sizes && data.data.sizes.length > 0) {
            setSelectedSize(data.data.sizes[0]);
          }
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

  const checkInStock = (item: ProductItem | null | undefined): boolean => {
    if (!item) return false;
    if (typeof item.stock_qty === "number") return item.stock_qty > 0;
    if (typeof item.in_stock === "boolean") return item.in_stock;
    if (typeof item.in_stock === "number") return item.in_stock > 0;
    if (typeof item.in_stock === "string") {
      const lower = item.in_stock.toLowerCase().trim();
      return lower === "true" || lower === "1" || lower === "in_stock" || lower === "in stock";
    }
    return true;
  };

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

  const getRetailPrice = (productObj: ProductItem | null): number => {
    if (!productObj) return 0;
    if (typeof productObj.price === "object" && productObj.price !== null) {
      return productObj.price.retail_price ?? getNumericPrice(productObj.price);
    }
    return productObj.retail_price ?? getNumericPrice(productObj?.price);
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <Sparkles size={32} className="sm:w-9 sm:h-9" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Product Not Found</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm">
          We couldn't locate the item you were looking for. It may have been removed or updated.
        </p>
        <Link
          href="/"
          className="mt-6 px-5 py-2.5 sm:px-6 text-xs sm:text-sm bg-emerald-600 text-white rounded-xl font-medium shadow-md hover:bg-emerald-700 transition-all"
        >
          Return Home
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] px-4">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          <Sparkles className="absolute text-emerald-600 animate-pulse" size={18} />
        </div>
        <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-4 tracking-wide">
          Crafting Product View...
        </p>
      </div>
    );
  }

  const currentPrice = getNumericPrice(product?.price);
  const retailPrice = getRetailPrice(product);
  const hasDiscount = product?.has_discount || retailPrice > currentPrice;
  const discountPercent =
    hasDiscount && retailPrice > 0
      ? Math.round(((retailPrice - currentPrice) / retailPrice) * 100)
      : 0;

  const formattedSpecs = getParsedSpecifications();
  const isInStock = checkInStock(product);
  const isOutOfStock = !isInStock;

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;
    addToCart({
      ...product,
      price: currentPrice,
      quantity,
      selectedSize,
    } as any);
  };

  return (
    <div className="min-h-screen bg-ring/5 py-4 sm:py-6 lg:py-8 text-text-primary  pb-28 lg:pb-12">
      <div className="container mx-auto px-3 sm:px-6 lg:px-16 ">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs font-medium text-ring mb-4 sm:mb-6 overflow-x-auto no-scrollbar py-1">
          <Link href="/" className="hover:text-secondary transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight size={12} className="text-ring shrink-0" />
          <Link href="/products" className="hover:text-secondary transition-colors shrink-0">
            Products
          </Link>
          <ChevronRight size={12} className="text-ring shrink-0" />
          <span className="text-primary font-semibold truncate max-w-36 sm:max-w-xs md:max-w-none">
            {product?.name}
          </span>
        </nav>

        {/* Main Product Display Card */}
        <div className="bg-background rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-start">
          
          {/* Gallery Column (Static on mobile, sticky on large screens) */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4 lg:sticky lg:top-6">
            <div className="relative w-full aspect-square bg-background border border-background rounded-xl sm:rounded-2xl overflow-hidden group flex items-center justify-center shadow-inner">
              <img
                src={selectedImage || product?.images?.[0] || product?.image}
                alt={product?.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5 sm:gap-2 z-10">
                {discountPercent > 0 && (
                  <span className="bg-primary text-text-secondary text-sm sm:text-xs font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md backdrop-blur-md">
                    -{discountPercent}% OFF
                  </span>
                )}
                {isInStock ? (
                  <span className="bg-secondary/90 backdrop-blur-md text-text-secondary text-sm sm:text-md font-semibold px-2 sm:px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <CheckCircle2 size={12} /> In Stock
                  </span>
                ) : (
                  <span className="bg-primary backdrop-blur-md text-text-secondary text-sm sm:text-md font-semibold px-2 sm:px-2.5 py-0.5 rounded-full shadow-sm">
                    Out of Stock
                  </span>
                )}
              </div>

           
            </div>

            {/* Image Thumbnails */}
            {product?.images && product.images.length > 1 && (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden bg-background border-2 transition-all flex-shrink-0 ${
                      selectedImage === img
                        ? "border-secondary ring-2 ring-ring/20 scale-95"
                        : "border-background opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Column */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary mb-1.5">
              <span>{product?.brand || "Premium"}</span>
              <span>•</span>
              <span className="text-ring">{product?.category || "General"}</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-ring leading-snug tracking-tight mb-2 sm:mb-3">
              {product?.name}
            </h1>

            {/* Rating Bar */}
            <div className="flex items-center gap-2.5 mb-4 bg-background w-fit px-3 py-1 rounded-full border ">
              <div className="flex text-primary text-xs sm:text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product?.rating || 4.5) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-xs font-bold text-ring">
                {product?.rating || 4.5}
              </span>
              <span className="text-ring/50">|</span>
              <span className="text-xs text-ring font-medium">
                {product?.reviews?.length || 12} Reviews
              </span>
            </div>

            {/* Pricing Box */}
            <div className="flex items-baseline gap-2.5 sm:gap-3 mb-5 bg-primary p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-100/60">
              <span className="text-2xl sm:text-3xl font-black text-text-secondary tracking-tight">
                {currencySymbol} {currentPrice.toLocaleString("en-US", { minimumFractionDigits: 0 })}
              </span>
              {hasDiscount && (
                <span className="text-xs sm:text-sm font-semibold text-ring line-through">
                  {currencySymbol} {retailPrice.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-ring mb-5 leading-relaxed line-clamp-3">
              {product?.description}
            </p>

            {/* Size Selector */}
            {product?.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-xs font-bold text-ring">
                  <span>Select Size: <span className="text-secondary uppercase">{selectedSize}</span></span>
                  <button className="text-xs text-ring hover:text-secondary transition-colors font-medium underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={isOutOfStock}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[40px] sm:min-w-[44px] h-9 sm:h-10 px-2.5 sm:px-3 text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl border transition-all duration-200 flex items-center justify-center ${
                          isSelected
                            ? "border-secondary bg-background text-secondary shadow-sm"
                            : "border-background/90 bg-background text-ring "
                        } ${
                          isOutOfStock ? "opacity-50 cursor-not-allowed border-background" : "active:scale-95"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-ring">Quantity:</span>
                <div className={`flex items-center border rounded-lg sm:rounded-xl bg-background overflow-hidden shadow-inner ${isOutOfStock ? "opacity-50 pointer-events-none" : ""}`}>
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    disabled={isOutOfStock}
                    className="p-2 sm:p-2.5 text-ring hover:bg-ring/5 transition active:scale-95 disabled:cursor-not-allowed"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-xs font-extrabold text-ring">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("inc")}
                    disabled={isOutOfStock}
                    className="p-2 sm:p-2.5 text-ring hover:bg-ring/5 transition active:scale-95 disabled:cursor-not-allowed"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm tracking-wide transition flex items-center justify-center gap-2 ${
                    isOutOfStock
                      ? "bg-ring/5 text-ring cursor-not-allowed"
                      : "bg-primary hover:bg-primary/70 text-white   active:scale-[0.98]"
                  }`}
                >
                  <FaShoppingCart size={13} /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>

                <button
                  disabled={isOutOfStock}
                  className={`font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm tracking-wide transition ${
                    isOutOfStock
                      ? "bg-background text-ring cursor-not-allowed shadow-none"
                      : "bg-secondary hover:bg-secondary/80 text-text-secondary  active:scale-[0.98]"
                  }`}
                >
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                <a
                  href="https://api.whatsapp.com/send/?phone=8801812295539&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-600 hover:text-white hover:shadow-md active:translate-y-0 sm:px-5 sm:py-3 sm:text-sm"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-background text-secondary shadow-sm transition-colors duration-200 group-hover:bg-secondary group-hover:text-text-secondary">
                    <MdOutlineMessage className="text-text-primary" size={15}  />
                  </span>

                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:+8801812295539"
                  className="bg-background hover:bg-ring/10 text-ring font-bold py-2 sm:py-2.5 px-3 rounded-xl text-xs border  transition flex items-center justify-center gap-2"
                >
                  <PhoneCall size={15} className="text-ring" /> Call Order
                </a>
              </div>
            </div>

            {/* Delivery Highlights */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-3 px-2 bg-background/80 rounded-xl sm:rounded-2xl border  text-center text-sm sm:text-md text-ring mb-4">
              <div className="p-1 flex flex-col items-center">
                <Truck size={16} className="text-primary mb-1 sm:w-4 sm:h-4" />
                <span className="font-bold text-text-primary">Fast Delivery</span>
                <span className="text-sm sm:text-md text-ring">Standard Express</span>
              </div>
              <div className="p-1 flex flex-col items-center border-x border-slate-200/60">
                <RotateCcw size={16} className="text-primary mb-1 sm:w-4 sm:h-4" />
                <span className="font-bold text-text-primary">Cash on Delivery</span>
                <span className="text-sm sm:text-md text-ring">Nationwide</span>
              </div>
              <div className="p-1 flex flex-col items-center">
                <ShieldCheck size={16} className="text-primary text-bold mb-1 sm:w-4 sm:h-4" />
                <span className="font-bold text-text-primary">100% Original</span>
                <span className="text-sm sm:text-md] text-ring">Verified Quality</span>
              </div>
            </div>

            {/* Specifications Meta */}
            <div className="text-xs text-ring space-y-1.5 pt-2 border-t ">
              <div className="flex justify-between">
                <span className="font-semibold text-text-primary">SKU:</span>
                <span className="font-mono text-ring">{product?.sku || "YMP-005"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-ring">Stock Availability:</span>
                <span className={isInStock ? "text-emerald-600 font-bold" : "text-destructive font-bold"}>
                  {isInStock ? `Available (${product?.stock_qty ?? "In Stock"})` : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Card & Recommended Items */}
          <div className="md:col-span-2 lg:col-span-3 space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-background-50 to-primary/30 p-4 sm:p-5 rounded-xl sm:rounded-2xl border  text-xs text-ring">
              <h3 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider mb-3">
                Order Summary ({quantity} Pcs)
              </h3>
              
              <div className="flex gap-3 pb-3 border-b border-ring">
                <img
                  src={selectedImage || product?.images?.[0] || product?.image}
                  alt=""
                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover bg-background rounded-lg sm:rounded-xl border shadow-sm"
                />
                <div className="flex-1 overflow-hidden">
                  <div className=" text-md font-bold text-text-primary truncate">{product?.name}</div>
                  <div className="text-text-primary font-bold mt-0.5">
                    {currencySymbol} {currentPrice.toLocaleString()} × {quantity}
                  </div>
                </div>
              </div>

              <div className="py-3 border-b  space-y-1.5">
                <div className="flex justify-between text-ring">
                  <span>Unit Price</span>
                  <span>{currencySymbol} {currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-extrabold text-text-primary text-sm pt-1">
                  <span>Total Amount</span>
                  <span className="text-primary">{currencySymbol} {(currentPrice * quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="pt-3 text-[10px] sm:text-[11px] text-ring flex items-center gap-1.5 font-medium">
                <ShieldCheck size={14} className="text-ring shrink-0" /> Safe & Secure Checkout Guaranteed
              </div>
            </div>

            {/* Suggested Recommendations */}
            {suggestedProducts.length > 0 && (
              <div className="bg-background p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border b shadow-sm">
                <h3 className="text-xs font-extrabold text-text-primary uppercase tracking-wider mb-3">
                  Recommended For You
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5">
                  {suggestedProducts.slice(0, 3).map((item) => {
                    const suggPrice = getNumericPrice(item.price);
                    const itemImage = item.image || item.images?.[0] || "/placeholder.png";

                    return (
                      <Link
                        key={item.id}
                        href={`/products/${item.slug}`}
                        className="flex items-center gap-3 p-1.5 sm:p-2 rounded-xl  transition border border-transparent  group"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-background rounded-lg border flex-shrink-0 overflow-hidden flex items-center justify-center">
                          <img src={itemImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-text-ring truncate  transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-xs font-extrabold text-primary">
                            {currencySymbol} {suggPrice.toLocaleString()}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Tab Navigation Area */}
        <div className="mt-8 sm:mt-10 bg-background rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border ">
          <div className="flex gap-4 sm:gap-8 border-b text-xs sm:text-sm font-bold overflow-x-auto no-scrollbar">
            {["descriptions", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 capitalize transition relative shrink-0 ${
                  activeTab === tab
                    ? "text-primary"
                    : "text-ring hover:text-primary"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="py-4 sm:py-6 text-xs sm:text-sm text-ring leading-relaxed">
            {activeTab === "descriptions" && (
              <div className="prose prose-slate max-w-none">
                <p className="text-text-primary leading-relaxed">{product?.description}</p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="max-w-2xl">
                {formattedSpecs.length > 0 ? (
                  <div className="divide-y divide-background border-t border-b ">
                    {formattedSpecs.map((spec, i) => (
                      <div key={i} className="py-2.5 sm:py-3 flex justify-between gap-4">
                        <span className="font-bold text-text-primary capitalize w-1/3 text-xs sm:text-sm">{spec.key}</span>
                        <span className="text-ring w-2/3 text-xs sm:text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-ring italic">No detailed specifications available for this product.</p>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-3 sm:space-y-4 max-w-2xl">
                {product?.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-3.5 sm:p-4 bg-ring/50 rounded-xl sm:rounded-2xl border ">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-text-primary text-xs sm:text-sm">{rev.author}</span>
                        <span className="text-[10px] sm:text-[11px] text-ring/60">{rev.date}</span>
                      </div>
                      <div className="flex text-primary text-xs mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-ring">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-ring/80 italic">No customer reviews written yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Related Products
              </h2>
              <Link href="/products" className="text-xs font-bold text-primary hover:underline">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {relatedProducts.slice(0, 6).map((item) => {
                const relPrice = getNumericPrice(item.price);
                const itemImage = item.image || item.images?.[0] || "/placeholder.png";
                const relOutOfStock = !checkInStock(item);

                return (
                  <div
                    key={item.id}
                    className="bg-background rounded-xl sm:rounded-2xl overflow-hidden border   transition-all duration-300 hover:-translate-y-1 group flex flex-col"
                  >
                    <div className="relative bg-background h-32 sm:h-40 w-full overflow-hidden flex items-center justify-center">
                      <img
                        src={itemImage}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-sm sm:text-md font-semibold text-primary uppercase">
                          {item.brand || "Taskco"}
                        </span>
                        <Link href={`/products/${item.slug || item.id}`}>
                          <h3 className="text-xs font-bold text-text-primary line-clamp-1 hover:text-primary transition-colors mt-0.5">
                            {item.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="mt-2.5 sm:mt-3 flex items-center justify-between">
                        <span className="font-extrabold text-xs sm:text-sm text-text-primary">
                          {currencySymbol} {relPrice.toLocaleString()}
                        </span>
                        <button
                          disabled={relOutOfStock}
                          onClick={() => addToCart({ ...item, price: relPrice, quantity: 1 } as any)}
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center transition-colors ${
                            relOutOfStock
                              ? "bg-background text-text-secondary cursor-not-allowed"
                              : "bg-ring/5 text-primary hover:bg-primary/80 hover:text-text-secondary"
                          }`}
                        >
                          <FaShoppingCart size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Sticky Bottom Bar for Mobile Viewports */}
      <div className="fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur-md border-t  p-2.5 sm:p-3 lg:hidden z-50 flex items-center gap-3 shadow-2xl">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-ring font-semibold truncate">{product?.name}</div>
          <div className="text-sm font-black text-primary">
            {currencySymbol} {(currentPrice * quantity).toLocaleString()}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs flex items-center gap-2 shrink-0 transition ${
            isOutOfStock
              ? "bg-background text-ring cursor-not-allowed shadow-none"
              : "bg-primary hover:bg-primary/90 text-text-secondary active:scale-95 shadow-md shadow-emerald-600/20"
          }`}
        >
          <FaShoppingCart size={12} /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}