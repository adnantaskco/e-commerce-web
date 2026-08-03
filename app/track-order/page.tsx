"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  FaClock, 
  FaBox, 
  FaTruck, 
  FaCheckCircle, 
  FaFileDownload, 
  FaRegListAlt, 
  FaMapMarkerAlt,
  FaSpinner,
  FaThumbsUp,
  FaShoppingBag
} from "react-icons/fa";

// Data Types
interface OrderItem {
  id: string;
  name: string;
  qty: number;
  sku: string;
  price: number;
  image: string;
}

interface OrderData {
  orderId: string;
  status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Completed";
  statusTimestamp: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  totalPaid: number;
  amountDue: number;
  paymentStatus: "UNPAID" | "PAID";
  paymentMethod: string;
  customerName: string;
  shippingAddress: string;
  phoneNumber: string;
  deliveryProvider: string;
}

const TIMELINE_STEPS = [
  { key: "Pending", label: "Pending", icon: FaClock },
  { key: "Confirmed", label: "Confirmed", icon: FaThumbsUp },
  { key: "Processing", label: "Processing", icon: FaBox },
  { key: "Shipped", label: "Shipped", icon: FaTruck },
  { key: "Delivered", label: "Delivered", icon: FaShoppingBag },
  { key: "Completed", label: "Completed", icon: FaCheckCircle },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number") || searchParams.get("order_id");

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderNumber) {
      setLoading(false);
      setError("No order number provided in URL.");
      return;
    }

    async function fetchOrderDetails() {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders/track?order_number=${orderNumber}`);
        
        if (!res.ok) {
          throw new Error("Failed to load order details.");
        }
        const data = await res.json();
        setOrder(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-emerald-600 text-4xl" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-6">{error || "Please check your order ID and try again."}</p>
        <Link href="/" className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium">
          Return to Shop
        </Link>
      </div>
    );
  }

  const currentStepIndex = TIMELINE_STEPS.findIndex(s => s.key === order.status);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold tracking-widest uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Order Tracking
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Track Your Order</h1>
            <p className="text-xs text-gray-400 mt-1">Real-time updates on your shipment progress</p>
            <p className="text-xl font-bold text-gray-800 mt-3">#{order.orderId}</p>
          </div>

          <a
            href={`/api/invoice/${order.orderId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition"
          >
            <FaFileDownload className="text-gray-500" /> Download Invoice
          </a>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Side: Timeline & Products */}
          <div className="lg:col-span-2 space-y-6">

            {/* Order Timeline Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 border-b pb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FaClock />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Order Timeline</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Step by step progress</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center relative">
                {TIMELINE_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isCompleted
                            ? "bg-emerald-700 text-white shadow-md shadow-emerald-100"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Icon className="text-lg" />
                      </div>

                      <span className={`text-xs font-semibold mt-3 ${isCompleted ? "text-emerald-700" : "text-gray-400"}`}>
                        {step.label}
                      </span>

                      {isCurrent && order.statusTimestamp && (
                        <span className="text-[10px] text-gray-400 mt-0.5">
                          {order.statusTimestamp}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Product Items Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <FaBox />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Products</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Items in your order</p>
                  </div>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                  {order.items.length} Item(s)
                </span>
              </div>

              {/* Product List */}
              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                          QTY: {item.qty} &nbsp;|&nbsp; SKU: {item.sku}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{item.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">{item.price.toFixed(2)} / unit</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Summary & Shipping Details */}
          <div className="space-y-6">

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 border-b pb-4 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FaRegListAlt />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Order Summary</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-gray-900">+{order.deliveryFee.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>GRAND TOTAL</span>
                  <span className="text-emerald-700">{order.grandTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-600 pt-2">
                  <span>Total Paid</span>
                  <span>{order.totalPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-red-500 font-medium">
                  <span>Amount Due</span>
                  <span>{order.amountDue.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Status Banner */}
              <div className="mt-6 pt-4 border-t">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Payment Status
                </p>
                <div
                  className={`p-2.5 rounded-lg text-center text-xs font-bold tracking-widest ${
                    order.paymentStatus === "PAID"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {order.paymentStatus}
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 border-b pb-4 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FaMapMarkerAlt />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Shipping Details</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <p className="font-bold uppercase tracking-wider text-gray-400 mb-1">Customer</p>
                  <p className="font-semibold text-gray-800 text-sm">{order.customerName}</p>
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-gray-400 mb-1">Shipping Address</p>
                  <p className="text-gray-700 leading-relaxed">{order.shippingAddress}</p>
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-gray-400 mb-1">Phone Number</p>
                  <p className="text-gray-700 font-medium">{order.phoneNumber}</p>
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-gray-400 mb-1">Delivery Provider</p>
                  <p className="text-emerald-700 font-bold uppercase">{order.deliveryProvider}</p>
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-gray-400 mb-1">Payment Method</p>
                  <p className="text-gray-700 font-medium">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <FaSpinner className="animate-spin text-emerald-600 text-4xl" />
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}