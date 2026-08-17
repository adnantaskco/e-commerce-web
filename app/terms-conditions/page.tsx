import { Metadata } from 'next';
import TermsAndConditionsPage from './conditions';



export const metadata: Metadata = {
  title: 'Terms and Conditions',
};

export default function FlashSalesPage() {
  return <TermsAndConditionsPage></TermsAndConditionsPage> ;
}