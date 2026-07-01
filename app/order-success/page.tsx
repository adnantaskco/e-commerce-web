import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-background p-10 rounded-2xl shadow-lg text-center max-w-md">

        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-5" />

        <h1 className="text-3xl text-text-primary font-bold mb-3">
          Congratulations!
        </h1>

        <p className="text-ring mb-6">
          Your order has been placed successfully.
        </p>

        <Link
          href="/"
          className="bg-primary text-text-secondary px-6 py-3 rounded-lg inline-block"
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
}