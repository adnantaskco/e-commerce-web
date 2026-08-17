import { Metadata } from 'next';


import DynamicContactUs from './contact';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function FlashSalesPage() {
  return <DynamicContactUs/> ;
}