"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/app/src/components/context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { PaymentButton } from "@/components/ui/payment";
import { CheckboxBasic } from "@/components/ui/checkbox2";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [delivery, setDelivery] = useState(2);

  // Toggle single select
  const toggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // Select all
  const selectAll = () => {
    setSelectedItems(
      selectedItems.length === cartItems.length
        ? []
        : cartItems.map((i) => i.id)
    );
  };

  // SELECTED ITEMS ONLY
  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item.id)
  );



  // TOTAL SELECTED QUANTITY
  const selectedItemsCount = selectedCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // SELECTED SUBTOTAL PRICE
  const subtotal = selectedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal + delivery;

  return (
    <section className="w-full min-h-screen flex justify-center bg-gray-50 py-10">
      <div className="container mx-auto px-4 sm:px-10 lg:px-20">

        {/* TITLE */}
        <h1 className="text-2xl flex justify-center py-10 font-semibold mb-6">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-lg border">
            <p className="text-gray-500 text-xl">Cart is empty</p>
            <a href="/home" className="text-blue-500 font-semibold"> Please Click me for Happy Shopping</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-4">

              {/* SELECT ALL */}
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={
                    selectedItems.length === cartItems.length &&
                    cartItems.length > 0
                  }
                  onChange={selectAll}
                />
                <span>Select All</span>
              </div>

              {/* CART ITEMS */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg border"
                >
                  {/* CHECKBOX */}
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />

                  {/* IMAGE */}
                  <div className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <h2 className="text-sm font-medium">
                      {item.name}
                    </h2>
                    <p className="text-xs text-gray-500">
                      ${item.price}
                    </p>
                    <p className="text-xs font-semibold text-green-600">
                      Total: $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="p-1 border rounded"
                    >
                      <FaMinus size={10} />
                    </button>

                    <span className="w-6 text-center text-sm">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="p-1 border rounded"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="bg-white p-5 rounded-lg border h-fit sticky top-5">

              <h2 className="font-semibold mb-4">
                Order Summary
              </h2>

             

              {/* SELECTED ITEMS (QUANTITY) */}
              <div className="flex justify-between text-sm mb-2">
                <span>Selected Items</span>
                <span>{selectedItemsCount}</span>
              </div>

              {/* SELECTED TOTAL PRICE */}
              <div className="flex justify-between text-sm mb-2">
                <span>Items Total Price</span>
                <span className="text-green-600 font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* DELIVERY */}
              <div className="mb-3">
                <label className="text-xs text-gray-500">
                  Delivery
                </label>

                <select
                  className="w-full border p-2 rounded mt-1 text-sm"
                  onChange={(e) =>
                    setDelivery(Number(e.target.value))
                  }
                >
                  <option value={2}>Inside Dhaka - $2</option>
                  <option value={5}>Outside Dhaka - $5</option>
                </select>
              </div>

              {/* FINAL TOTAL */}
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span className="text-green-600">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="py-2">
                <CheckboxBasic />
              </div>

              <div className="py-2.5">

                
                <PaymentButton />

                <button
                  onClick={clearCart}
                  className="w-full mt-2 bg-black text-white py-1 rounded-lg hover:bg-gray-800"
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