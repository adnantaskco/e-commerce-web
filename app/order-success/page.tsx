import Link from "next/link";
import { FaCheck, FaArrowRight, FaFileInvoiceDollar, FaShoppingCart } from "react-icons/fa";

interface OrderSuccessProps {
  orderId?: string;
}

export default function OrderSuccess({ orderId = "ORD-20260802-0055" }: OrderSuccessProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm max-w-xl w-full text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100/70 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheck className="text-emerald-600 text-xl" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Thank You for Your Order!
        </h1>

        {/* Subtitle / Order ID */}
        <p className="text-gray-500 text-sm md:text-base mb-8 max-w-sm mx-auto">
          Your order <span className="font-medium text-emerald-600">#{orderId}</span> has been placed successfully and is being processed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/track-order?order_id=${orderId}`}
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-5 py-2.5 rounded-full inline-flex items-center justify-center gap-2 text-sm transition-colors"
          >
            Track Order <FaArrowRight className="text-xs" />
          </Link>

          <Link
            href={`/api/invoice/${orderId}`}
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-5 py-2.5 rounded-full inline-flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <FaFileInvoiceDollar className="text-sm" /> Download Invoice
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-5 py-2.5 rounded-full inline-flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <FaShoppingCart className="text-sm" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}