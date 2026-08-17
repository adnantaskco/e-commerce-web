import { Metadata } from 'next';
import CheckoutPage from './checkout';



export const metadata: Metadata = {
  title: 'Check-out',
};

export default function FlashSalesPage() {
  return <CheckoutPage></CheckoutPage> ;
}