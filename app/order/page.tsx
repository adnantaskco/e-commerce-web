"use client";

import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { 
  FaArrowLeft, 
  FaBox, 
  FaClock, 
  FaCheckCircle, 
  FaTruck, 
  FaRegCheckCircle, 
  FaEye, 
  FaDownload,
  FaSpinner,
  FaExclamationTriangle,
  FaInbox
} from "react-icons/fa";
import { useCart } from "../src/components/context/CartContext";

// Interfaces
interface Order {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  status: "Pending" | "Processed" | "Shipped" | "Delivered" | "Completed";
  itemsCount: number;
  paymentStatus: "Paid" | "Unpaid";
  total: number;
}

// SWR Fetcher
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  return res.json();
};

export default function MyOrdersPage() {
   
  const { data: orders = [], error, isLoading, mutate } = useSWR<Order[]>(
    "/api/orders",
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 15000, //
    }
  );

  // ডায়নামিক ফিল্টারিং ও কাউন্ট (ডাটা না থাকলে বা লোডিং চলাকালীন ০ দেখাবে)
  const totalCount = orders.length;
  const processedCount = orders.filter((o) => o.status === "Processed").length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
  const shippedCount = orders.filter((o) => o.status === "Shipped").length;
  const completedCount = orders.filter((o) => o.status === "Completed").length;

  // Status Badge Styling Helper
  const getStatusBadgeClass = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
      case "Completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Shipped":
      case "Processed":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Pending":
      default:
        return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
            <FaArrowLeft className="text-lg" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        </div>

        {/* Order Metrics Bar - লোডিং বা খালি থাকলেও '0' কাউন্ট দেখাবে */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* All Orders */}
          <div className="bg-white p-4 rounded-xl border border-emerald-500 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">All Orders</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{isLoading ? "..." : totalCount}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FaBox />
            </div>
          </div>

          {/* Processed */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Processed</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{isLoading ? "..." : processedCount}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
              <FaBox />
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Pending</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{isLoading ? "..." : pendingCount}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
              <FaClock />
            </div>
          </div>

          {/* Delivered */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Delivered</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{isLoading ? "..." : deliveredCount}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
              <FaCheckCircle />
            </div>
          </div>

          {/* Shipped */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Shipped</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{isLoading ? "..." : shippedCount}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
              <FaTruck />
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Completed</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{isLoading ? "..." : completedCount}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
              <FaRegCheckCircle />
            </div>
          </div>
        </div>

        {/* Order History Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Order History</h2>
            <p className="text-xs text-gray-400">
              {isLoading ? "Loading..." : `${totalCount} orders found`}
            </p>
          </div>

          {/* 1. Loading State */}
          {isLoading ? (
            <div className="py-16 text-center text-emerald-600 flex flex-col items-center justify-center gap-2">
              <FaSpinner className="animate-spin text-3xl" />
              <p className="text-xs text-gray-400 font-medium mt-2">Loading orders...</p>
            </div>
          ) : error ? (
            /* 2. Error State */
            <div className="py-12 text-center text-gray-500">
              <FaExclamationTriangle className="text-amber-500 text-3xl mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-800">Failed to load orders</p>
              <button
                onClick={() => mutate()}
                className="mt-3 text-xs text-emerald-600 hover:underline font-medium cursor-pointer"
              >
                Try refreshing
              </button>
            </div>
          ) : orders.length === 0 ? (
            /* 3. Empty State (কোনো অর্ডার না থাকলে) */
            <div className="py-16 text-center">
              <FaInbox className="text-gray-300 text-5xl mx-auto mb-3" />
              <h3 className="text-base font-semibold text-gray-800">No orders placed yet</h3>
              <p className="text-xs text-gray-400 mt-1 mb-4">
                Looks like you haven&apos;t placed any orders with us yet.
              </p>
              <Link
                href="/shop"
                className="inline-block text-xs bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition shadow-sm"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            /* 4. Table View (অর্ডার থাকলে) */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="pb-3 pl-2">Order ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Order Status</th>
                    <th className="pb-3 text-center">Items</th>
                    <th className="pb-3">Payment Status</th>
                    <th className="pb-3 text-right pr-4">Total</th>
                    <th className="pb-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <FaBox />
                          </div>
                          <div>
                            <Link
                              href={`/track-order?order_number=${order.orderNumber}`}
                              className="font-bold text-gray-900 hover:text-emerald-600 transition"
                            >
                              {order.orderNumber}
                            </Link>
                            <p className="text-[10px] text-gray-400 mt-0.5">ID: {order.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4">
                        <p className="font-semibold text-gray-800">{order.date}</p>
                        <p className="text-[10px] text-gray-400">{order.time}</p>
                      </td>

                      <td className="py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-medium border ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>

                      <td className="py-4 text-center font-medium text-gray-700">
                        {order.itemsCount}
                      </td>

                      <td className="py-4 font-medium">
                        <span className={order.paymentStatus === "Paid" ? "text-emerald-600 font-semibold" : "text-amber-600"}>
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="py-4 text-right pr-4 font-bold text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>

                      <td className="py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/track-order?order_number=${order.orderNumber}`}
                            title="Track Order"
                            className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-600 transition"
                          >
                            <FaEye className="text-sm" />
                          </Link>

                          <a
                            href={`/api/invoice/${order.orderNumber}`}
                            title="Download Invoice"
                            className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-600 transition"
                          >
                            <FaDownload className="text-xs" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer Pagination */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Showing {orders.length} orders</span>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-300 cursor-not-allowed"
              >
                Previous
              </button>
              <button
                disabled
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-300 cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}