export interface Specification {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string | number;
  attributes: Record<string, string>; // e.g., { color: "Black", storage: "128GB" } or { size: "XL" }
  price?: number;
  discount_price?: number;
  stock?: number;
  image?: string;
  sku?: string;
}

export interface Seller {
  id: string | number;
  name: string;
  logo?: string;
  rating?: number;
  response_rate?: number;
}

export interface DeliveryInfo {
  charge?: number;
  estimated_date?: string;
  cash_on_delivery?: boolean;
  return_policy?: string;
}

export interface Review {
  id: string | number;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  comment: string;
  images?: string[];
  verified?: boolean;
}

export interface Question {
  id: string | number;
  question: string;
  answer?: string;
  user_name: string;
  date: string;
  helpful_count?: number;
}

export interface Product {
  id: string | number;
  name: string;
  slug?: string;
  brand?: string;
  sku?: string;
  description?: string;
  images: string[];
  price: number;
  discount_price?: number;
  currency?: string;
  stock: number;
  rating?: number;
  review_count?: number;
  sold_count?: number;
  variants?: ProductVariant[];
  specifications?: Specification[];
  seller?: Seller;
  delivery?: DeliveryInfo;
  reviews?: Review[];
  questions?: Question[];
}