"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/app/src/components/context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { PaymentButton } from "@/components/ui/payment";
import Link from "next/link";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const [delivery, setDelivery] = useState(100);
  
  // 1. Terms and Conditions State
  const [isAccepted, setIsAccepted] = useState(false);

  // TOTAL QUANTITY OF ALL ITEMS IN CART
  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // SUBTOTAL PRICE OF ALL ITEMS IN CART
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal + delivery;

  return (
    <section className="w-full min-h-screen flex justify-center bg-background py-10">
      <div className="container mx-auto px-4 sm:px-10 lg:px-24">

        {/* HEADER */}
        <div className="p-5 border-b">
          <h2 className="text-lg text-text-primary font-semibold">Cart Items</h2>
          <p className="text-sm text-text-primary text-ring">
            {totalItemsCount} items in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-background p-10 text-center rounded-lg border">
            <p className="text-ring text-xl">Cart is empty</p>
            <Link href="/home" className="text-blue-500 font-semibold mt-2 inline-block">
              Please Click me for Happy Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-4 p-4">
              {/* CART ITEMS */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 items-center px-5 py-5 border-b hover:bg-ring-20 transition"
                >
                  {/* PRODUCT */}
                  <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />

                    <div>
                      <h3 className="font-medium text-text-primary text-sm md:text-base">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive text-sm mt-1 flex items-center gap-1 cursor-pointer"
                      >
                        <FaTrash size={12} /> Remove
                      </button>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="hidden md:block col-span-2 text-center text-ring">
                    {item.price.toLocaleString()}
                  </div>

                  {/* QTY */}
                  <div className="col-span-6 md:col-span-2 flex justify-start md:justify-center mt-3 md:mt-0">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1 hover:bg-ring/50 active:scale-95 transition"
                      >
                        <FaMinus size={12} />
                      </button>

                      <span className="px-4 text-text-primary text-sm">{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 hover:bg-ring/50 active:scale-95 transition"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="col-span-6 md:col-span-2 text-right text-text-primary font-semibold mt-3 md:mt-0">
                    {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="bg-background p-5 rounded-lg border h-fit sticky top-5">
              <h2 className="font-semibold mb-4">Order Summary</h2>

              {/* TOTAL ITEMS (QUANTITY) */}
              <div className="flex justify-between text-text-primary text-sm mb-2">
                <span>Selected Items</span>
                <span>{totalItemsCount} Items</span>
              </div>

              {/* TOTAL PRICE */}
              <div className="flex justify-between text-text-primary text-sm mb-2">
                <span>Items Total Price</span>
                <span className="text-green-600 font-medium">
                  {subtotal.toFixed(2)}
                </span>
              </div>

              {/* DELIVERY */}
              <div className="mb-3">
                <label className="text-xs text-ring">Delivery</label>
                <select
                  className="w-full border p-2 rounded mt-1 text-sm"
                  onChange={(e) => setDelivery(Number(e.target.value))}
                  value={delivery}
                >
                  <option value={100}>Inside Dhaka - 100</option>
                  <option value={150}>Outside Dhaka - 150</option>
                </select>
              </div>

              {/* FINAL TOTAL */}
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span className="text-green-600">{total.toFixed(2)}</span>
              </div>

              {/* 2. Checkbox input for accepting terms */}
              <div className="py-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isAccepted}
                  onChange={(e) => setIsAccepted(e.target.checked)}
                  className="w-4 h-4 cursor-pointer accent-primary"
                />
                <label htmlFor="terms" className="text-xs text-text-primary cursor-pointer">
                  I accept the{" "}
                  <Link href="/terms" className="text-blue-500 underline">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              <div className="py-2.5">
                {/* 3. Checkout Button Conditional Rendering / Disabled State */}
                {isAccepted ? (
                  <Link href="/checkout">
                    <button className="w-full mt-2 bg-primary text-text-secondary py-2 rounded-lg hover:bg-ring transition cursor-pointer">
                      Checkout
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full mt-2 bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed"
                    title="Please accept terms and conditions to proceed"
                  >
                    Checkout
                  </button>
                )}

                <button
                  onClick={clearCart}
                  className="w-full mt-2 bg-foreground text-text-secondary py-2 rounded-lg hover:bg-ring transition cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}