// app/flash-sales/page.tsx
import { Metadata } from 'next';

import OffersPage from './FlashSalesClient';

export const metadata: Metadata = {
  title: 'Flash-Offers',
};

export default function FlashSalesPage() {
  return <OffersPage></OffersPage> ;
}