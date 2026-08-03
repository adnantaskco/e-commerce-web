"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
};

// [নতুন] Order Data Type Definition
export type OrderDetails = {
  invoiceNo: string;
  orderDate: string;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    district: string;
    thana: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: string;
  notes?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  // [নতুন] TypeScript Types for Order state
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // [নতুন] Order state
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // [নতুন] LocalStorage থেকে আগের সেভ করা order লোড করার ব্যবস্থা (অপশনাল কিন্তু নিরাপদ)
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setLastOrder(JSON.parse(savedOrder));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // [নতুন] Save lastOrder to localStorage
  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem("lastOrder", JSON.stringify(lastOrder));
    }
  }, [lastOrder]);

  // Add to cart
  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev;
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove item
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Increase quantity
  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total items
  const totalItems = cartItems.length;

  // Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
        // [নতুন] Exporting order states
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}