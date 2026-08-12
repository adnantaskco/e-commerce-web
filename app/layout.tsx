import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from "./src/components/context/CartContext";
import Navbar1 from "../components/navbar1";

import Footer from "../components/footer";
import Navbar from "@/components/Navbar5";
import Providers from "@/components/Providers";
import FooterBottom from "@/components/footer2";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adnan's Collection",
  description: "",
   icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
       <Providers>
        <CartProvider>
           <Navbar1></Navbar1>
           <Navbar></Navbar>

 
        {children}
        </CartProvider>
        </Providers>
        <Footer></Footer>
        <FooterBottom></FooterBottom>
        </body>
    </html>
  );
}
