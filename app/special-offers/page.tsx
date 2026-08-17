// app/flash-sales/page.tsx
import { Metadata } from 'next';

import SpcialOffersPage from './SpcialOffersPage';

export const metadata: Metadata = {
  title: 'Spcial Offer',
};

export default function FlashSalesPage() {
  return <SpcialOffersPage/> ;
}