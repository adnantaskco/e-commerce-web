'use client';

import { DeliveryInfo, Seller } from '@/type/product';
import { Truck, RotateCcw, ShieldCheck, Store, Star, MessageSquare } from 'lucide-react';

interface Props {
  delivery?: DeliveryInfo;
  seller?: Seller;
  currency?: string;
}

export default function DeliveryAndSeller({ delivery, seller, currency = '৳' }: Props) {
  return (
    <div className="space-y-6">
      {/* Delivery Box */}
      {delivery && (
        <div className="p-4 rounded-xl border bg-gray-50/50 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Delivery Options</h3>

          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="flex justify-between items-center w-full">
                <span className="font-medium text-gray-800">Standard Delivery</span>
                <span className="font-semibold">{delivery.charge !== undefined ? `${currency}${delivery.charge}` : 'Free'}</span>
              </div>
              {delivery.estimated_date && (
                <p className="text-xs text-gray-500 mt-0.5">Est: {delivery.estimated_date}</p>
              )}
            </div>
          </div>

          {delivery.cash_on_delivery !== undefined && (
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{delivery.cash_on_delivery ? 'Cash on Delivery Available' : 'Prepayment Required'}</span>
            </div>
          )}

          {delivery.return_policy && (
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <RotateCcw className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{delivery.return_policy}</span>
            </div>
          )}
        </div>
      )}

      {/* Seller Box (Renders conditionally if seller data exists) */}
      {seller && (
        <div className="p-4 rounded-xl border bg-white space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sold By</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
              {seller.logo ? <img src={seller.logo} alt={seller.name} className="w-full h-full rounded-full object-cover" /> : seller.name[0]}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{seller.name}</h4>
              {seller.rating && (
                <div className="flex items-center gap-1 text-xs text-amber-500 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-medium text-gray-700">{seller.rating} Rating</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs py-2 bg-gray-50 rounded-lg">
            {seller.response_rate && (
              <div>
                <span className="text-gray-400 block">Response Rate</span>
                <span className="font-semibold text-gray-800">{seller.response_rate}%</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button className="flex-1 py-2 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-1.5 text-gray-700">
              <MessageSquare className="w-3.5 h-3.5" /> Chat
            </button>
            <button className="flex-1 py-2 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-1.5 text-gray-800">
              <Store className="w-3.5 h-3.5" /> Visit Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
}