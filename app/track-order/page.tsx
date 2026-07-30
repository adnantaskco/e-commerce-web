'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/trackfetcher';
import { CiSearch } from 'react-icons/ci';

interface OrderDetails {
  orderId: string;
  status: string;
  estimatedDelivery: string;
  items: Array<{ name: string; quantity: number; price: number }>;
}

export default function TrackOrder() {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data conditionally only when searchQuery is set
  const { data, error, isLoading } = useSWR<OrderDetails>(
    searchQuery ? `/api/orders/${searchQuery}` : null,
    fetcher
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      setSearchQuery(orderIdInput.trim());
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-teal-500 inline-block animate-pulse"></span>
          Live Order Tracking
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">Track Your Order</h1>
        <p className="text-sm text-gray-500">Real-time updates on your shipment progress</p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="flex justify-center  gap-3 mb-8">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <CiSearch/>
          </span>
          <input
            type="text"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            placeholder="Enter your Order ID"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
        >
          Search
        </button>
      </form>

      {/* Dynamic Tracking Results */}
      {isLoading && (
        <div className="p-6 text-center text-gray-500">
          Loading order details...
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          Failed to load order. Please check your Order ID and try again.
        </div>
      )}

      {data && (
        <div className="p-6 border border-gray-100 rounded-lg bg-gray-50 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-bold text-gray-800">{data.orderId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-semibold rounded-full">
                {data.status}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Estimated Delivery</p>
            <p className="font-semibold text-gray-700">{data.estimatedDelivery}</p>
          </div>
        </div>
      )}
    </div>
  );
}