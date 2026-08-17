"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/src/components/context/CartContext";
import { FaPlus, FaMinus, FaTrash, FaArrowLeft } from "react-icons/fa";
import { UseCurrency } from "@/components/ui/currency";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const { currency } = UseCurrency();

  const [delivery, setDelivery] = useState(100);
  const [isAccepted, setIsAccepted] = useState(false);

  // TOTAL QUANTITY
  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // SUBTOTAL
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal + delivery;

  return (
    <section className="w-full min-h-screen bg-background py-5 sm:py-8 lg:py-10">
      <div className="container mx-auto px-3 sm:px-5 lg:px-8 xl:px-12">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary">
              Shopping Cart
            </h1>

            <p className="text-xs sm:text-sm text-ring mt-1">
              {totalItemsCount}{" "}
              {totalItemsCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:underline w-fit"
          >
            <FaArrowLeft size={11} />
            Continue Shopping
          </Link>
        </div>

        {/* ================= EMPTY CART ================= */}
        {cartItems.length === 0 ? (
          <div className="bg-background p-8 sm:p-12 text-center rounded-xl border shadow-sm">
            <div className="text-5xl mb-4">🛒</div>

            <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
              Your cart is empty
            </h2>

            <p className="text-sm text-ring mt-2">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link
              href="/home"
              className="inline-flex mt-5 bg-primary text-text-secondary px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">

            {/* =====================================================
                LEFT SIDE - CART PRODUCTS
            ====================================================== */}
            <div className="lg:col-span-2">

              {/* ================= TABLE HEADER ================= */}
              <div className="hidden sm:grid grid-cols-12 items-center bg-muted/40 border rounded-t-xl px-4 py-3 text-[11px] lg:text-xs font-semibold uppercase tracking-wide text-ring">
                
                {/* PRODUCT */}
                <div className="col-span-6">
                  Product
                </div>

                {/* PRICE */}
                <div className="col-span-2 text-center">
                  Price
                </div>

                {/* QUANTITY */}
                <div className="col-span-2 text-center">
                  Quantity
                </div>

                {/* TOTAL */}
                <div className="col-span-2 text-right">
                  Total
                </div>
              </div>

              {/* ================= PRODUCTS ================= */}
              <div className="border-x sm:border-b rounded-t-xl sm:rounded-t-none sm:rounded-b-xl overflow-hidden">

                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`group relative grid grid-cols-12 items-center gap-x-2 sm:gap-x-3 p-3 sm:p-4 lg:p-5 transition hover:bg-ring/5 ${
                      index !== cartItems.length - 1
                        ? "border-b"
                        : ""
                    }`}
                  >

                    {/* =========================================
                        PRODUCT
                    ========================================== */}
                    <div className="col-span-12 sm:col-span-6 flex items-center gap-3 sm:gap-4 min-w-0">

                      {/* IMAGE */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 shrink-0 rounded-lg border bg-background overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* DETAILS */}
                      <div className="min-w-0 flex-1">

                        {/* MOBILE LABEL */}
                        <span className="sm:hidden block text-[10px] uppercase tracking-wide text-ring mb-1">
                          Product
                        </span>

                        {/* TITLE */}
                        <h3
                          title={item.name}
                          className="font-semibold text-text-primary text-xs sm:text-sm lg:text-base leading-snug line-clamp-2"
                        >
                          {item.name}
                        </h3>

                        {/* MOBILE PRICE */}
                        <div className="sm:hidden mt-1.5 text-xs text-ring">
                          {currency}{" "}
                          {item.price?.toLocaleString()}
                        </div>

                        {/* REMOVE */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2 inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-destructive hover:underline cursor-pointer"
                        >
                          <FaTrash size={10} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* =========================================
                        PRICE
                    ========================================== */}
                    <div className="hidden sm:block sm:col-span-2 text-center">

                      <span className="sm:hidden text-[10px] uppercase text-ring block">
                        Price
                      </span>

                      <span className="text-xs lg:text-sm text-text-primary font-medium">
                        {currency}{" "}
                        {item.price?.toLocaleString()}
                      </span>
                    </div>

                    {/* =========================================
                        QUANTITY
                    ========================================== */}
                    <div className="col-span-6 sm:col-span-2 flex justify-start sm:justify-center mt-3 sm:mt-0">

                      <div>
                        {/* MOBILE LABEL */}
                        <span className="sm:hidden block text-[10px] uppercase tracking-wide text-ring mb-1">
                          Quantity
                        </span>

                        {/* QUANTITY BOX */}
                        <div className="inline-flex items-center border rounded-lg overflow-hidden bg-background shadow-sm">

                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            aria-label={`Decrease ${item.name} quantity`}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-ring/10 active:scale-95 transition cursor-pointer"
                          >
                            <FaMinus size={9} />
                          </button>

                          <span className="min-w-8 sm:min-w-9 text-center text-xs sm:text-sm font-semibold text-text-primary">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            aria-label={`Increase ${item.name} quantity`}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-ring/10 active:scale-95 transition cursor-pointer"
                          >
                            <FaPlus size={9} />
                          </button>

                        </div>
                      </div>
                    </div>

                    {/* =========================================
                        TOTAL
                    ========================================== */}
                    <div className="col-span-6 sm:col-span-2 text-right mt-3 sm:mt-0">

                      <span className="sm:hidden block text-[10px] uppercase tracking-wide text-ring mb-1">
                        Total
                      </span>

                      <span className="text-xs sm:text-sm lg:text-base font-bold text-text-primary">
                        {currency}{" "}
                        {(
                          item.price * item.quantity
                        ).toLocaleString()}
                      </span>
                    </div>

                  </div>
                ))}

              </div>

              {/* ================= CART FOOTER ================= */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">

                <p className="text-xs text-ring">
                  Showing {cartItems.length}{" "}
                  {cartItems.length === 1 ? "product" : "products"}
                </p>

                <button
                  onClick={clearCart}
                  className="text-xs sm:text-sm text-destructive font-medium hover:underline cursor-pointer"
                >
                  Clear All Cart
                </button>

              </div>
            </div>

            {/* =====================================================
                RIGHT SIDE - ORDER SUMMARY
            ====================================================== */}
            <div className="lg:col-span-1">

              <div className="bg-background border rounded-xl shadow-sm p-4 sm:p-5 lg:sticky lg:top-5">

                {/* SUMMARY TITLE */}
                <h2 className="font-bold text-base sm:text-lg text-text-primary pb-4 border-b">
                  Order Summary
                </h2>

                {/* ITEMS */}
                <div className="flex justify-between text-xs sm:text-sm mt-4 mb-3">
                  <span className="text-ring">
                    Items
                  </span>

                  <span className="font-medium text-text-primary">
                    {totalItemsCount}
                  </span>
                </div>

                {/* SUBTOTAL */}
                <div className="flex justify-between text-xs sm:text-sm mb-3">
                  <span className="text-ring">
                    Subtotal
                  </span>

                  <span className="font-semibold text-text-primary">
                    {currency}{" "}
                    {subtotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                {/* DELIVERY */}
                <div className="mb-4">

                  <label className="text-xs text-ring font-medium block mb-1.5">
                    Delivery Location
                  </label>

                  <select
                    className="w-full border rounded-lg px-3 py-2.5 text-xs sm:text-sm bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    onChange={(e) =>
                      setDelivery(Number(e.target.value))
                    }
                    value={delivery}
                  >
                    <option value={100}>
                      Inside Dhaka — {currency} 100
                    </option>

                    <option value={150}>
                      Outside Dhaka — {currency} 150
                    </option>
                  </select>
                </div>

                {/* DELIVERY PRICE */}
                <div className="flex justify-between text-xs sm:text-sm mb-4">
                  <span className="text-ring">
                    Delivery Charge
                  </span>

                  <span className="font-medium text-text-primary">
                    {currency} {delivery.toLocaleString()}
                  </span>
                </div>

                {/* TOTAL */}
                <div className="border-t pt-4 flex items-center justify-between">

                  <span className="font-bold text-sm sm:text-base text-text-primary">
                    Total
                  </span>

                  <span className="font-bold text-base sm:text-lg text-green-600">
                    {currency}{" "}
                    {total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>

                </div>

                {/* TERMS */}
                <div className="py-4 flex items-start gap-2">

                  <input
                    type="checkbox"
                    id="terms"
                    checked={isAccepted}
                    onChange={(e) =>
                      setIsAccepted(e.target.checked)
                    }
                    className="w-4 h-4 mt-0.5 cursor-pointer accent-primary shrink-0"
                  />

                  <label
                    htmlFor="terms"
                    className="text-[11px] sm:text-xs text-text-primary cursor-pointer select-none leading-relaxed"
                  >
                    I accept the{" "}
                    <Link
                      href="/terms"
                      className="text-primary underline"
                    >
                      Terms & Conditions
                    </Link>
                  </label>

                </div>

                {/* BUTTONS */}
                <div className="space-y-2.5">

                  {isAccepted ? (
                    <Link
                      href="/checkout"
                      className="block w-full"
                    >
                      <button
                        className="w-full bg-primary text-text-secondary py-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition cursor-pointer text-xs sm:text-sm font-semibold"
                      >
                        Proceed to Checkout
                      </button>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg cursor-not-allowed text-xs sm:text-sm font-semibold"
                    >
                      Proceed to Checkout
                    </button>
                  )}

                  <Link
                    href="/home"
                    className="block w-full text-center border py-2.5 rounded-lg text-xs sm:text-sm font-medium text-text-primary hover:bg-ring/5 transition"
                  >
                    Continue Shopping
                  </Link>

                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}