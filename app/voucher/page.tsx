// app/voucher/page.jsx
"use client";

import { useCart } from "../src/components/context/CartContext"; // Check your project path
import Link from "next/link";
import { FaDownload, FaCheckCircle, FaShippingFast } from "react-icons/fa";

export interface lastOrder {
  invoiceNo: string;
  orderId?: string; // 
  id?: string;      // 
  orderDate: string;
  grandTotal: number;
 
}

export default function VoucherPage() {
  const { lastOrder } = useCart();

  // [Native Browser Print] - Downloads/prints only the Invoice container
  const handleDownloadPDF = () => {
    window.print();
  };

  // If user visits /voucher directly with no active order
  if (!lastOrder) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-5 text-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">No recent order found!</h2>
        <p className="text-gray-500 mb-6">Please place an order to view the invoice.</p>
        <Link href="/" className="bg-primary text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition">
          Return to Home
        </Link>
      </div>
    );
  }

  // Extract order/invoice number safely for the tracking URL query param
 const orderNumber = lastOrder.invoiceNo || (lastOrder as any).orderId || "";
  return (
    <>
      {/* 💥 CSS to isolate and print ONLY the invoice container on a single page 💥 */}
      <style jsx global>{`
        @media print {
          /* Force single page layout */
          @page {
            size: auto;
            margin: 0;
          }

          html, body {
            height: 100%;
            overflow: hidden !important;
          }

          /* Hide everything else on the page */
          body * {
            visibility: hidden !important;
          }
          
          /* Show only invoice container and child elements */
          #invoice-container, #invoice-container * {
            visibility: visible !important;
          }

          /* Fit container neatly on one page */
          #invoice-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-height: 100vh !important;
            padding: 24px !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Compact table row padding during print */
          #invoice-container table td,
          #invoice-container table th {
            padding-top: 4px !important;
            padding-bottom: 4px !important;
          }

          /* Reduce vertical spacing for print layout */
          #invoice-container .py-6 {
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }

          #invoice-container .mt-10 {
            margin-top: 16px !important;
          }
        }
      `}</style>

      <div className="bg-gray-100 min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Success Header Message  */}
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-200">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-gray-800">Thank You For Your Order!</h1>
            <p className="text-gray-500 text-sm mt-1">A confirmation voucher has been generated for your order.</p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {/* Download Button */}
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition cursor-pointer text-sm"
              >
                <FaDownload /> Download / Save PDF
              </button>

              {/* 🚀 NEW: Track Product Button */}
              <Link
                href={`/track-order?order_number=${orderNumber}`}
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-medium transition text-sm"
              >
                <FaShippingFast /> Track Product
              </Link>

              {/* Continue Shopping Button */}
              <Link
                href="/"
                className="border border-gray-300 px-5 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Printable Invoice Container */}
          <div 
            id="invoice-container" 
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-gray-800"
          >
            {/* Invoice Top Header */}
            <div className="flex justify-between items-start border-b border-gray-200 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary">INVOICE</h2>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  Invoice No: <span className="text-gray-800">{lastOrder.invoiceNo}</span>
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  Date: <span className="text-gray-800">{lastOrder.orderDate}</span>
                </p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg">Adnan's Fashion</h3>
                <p className="text-xs text-gray-500">Dhaka, Bangladesh</p>
                <p className="text-xs text-gray-500">support@styleway.com</p>
              </div>
            </div>

            {/* Customer & Payment Info */}
            <div className="grid grid-cols-2 gap-6 py-6 border-b border-gray-200 text-sm">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Billed To:</h4>
                <p className="font-bold">{lastOrder.customer?.fullName}</p>
                <p className="text-gray-600">{lastOrder.customer?.address}</p>
                <p className="text-gray-600">
                  {lastOrder.customer?.thana && `${lastOrder.customer.thana}, `}
                  {lastOrder.customer?.district}
                </p>
                <p className="text-gray-600">Phone: {lastOrder.customer?.phone}</p>
              </div>
              <div className="text-right">
                <h4 className="font-semibold text-gray-700 mb-2">Payment Method:</h4>
                <p className="font-bold uppercase text-primary">{lastOrder.paymentMethod}</p>
                {lastOrder.notes && (
                  <div className="mt-3">
                    <h4 className="font-semibold text-gray-700">Notes:</h4>
                    <p className="text-gray-600 italic">{lastOrder.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="py-6 border-b border-gray-200">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-medium pb-2">
                    <th className="py-2">Item Description</th>
                    <th className="text-center py-2">Qty</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {lastOrder.items?.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 font-medium">{item.name}</td>
                      <td className="text-center py-3">{item.quantity}</td>
                      <td className="text-right py-3">${item.price?.toLocaleString()}</td>
                      <td className="text-right py-3 font-medium">
                        ${(item.price * item.quantity)?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Price Calculations */}
            <div className="pt-6 flex justify-end">
              <div className="w-full sm:w-1/2 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${lastOrder.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge:</span>
                  <span>${lastOrder.deliveryCharge}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-lg text-gray-800">
                  <span>Total Amount:</span>
                  <span className="text-primary">${lastOrder.grandTotal?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-10 border-t border-gray-100 pt-4 text-center text-xs text-gray-400">
              Thank you for shopping with Adnan's Fashion! If you have any questions, please contact our support.
            </div>

          </div>
        </div>
      </div>
    </>
  );
}