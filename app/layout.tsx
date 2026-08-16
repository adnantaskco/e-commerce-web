import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CartProvider } from "./src/components/context/CartContext";

import Navbar1 from "../components/navbar1";
import Navbar from "@/components/Navbar5";
import Footer from "../components/footer";
import FooterBottom from "@/components/footer2";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ===============================
// Cleaned API Types
// ===============================

export type SettingsData = {
  settings_version?: string;
  store_name?: string;
  logo?: string;
  favicon?: string;
  footer_description?: string;
};

type SettingsResponse = {
  data?: SettingsData;
} & SettingsData;

// ===============================
// Fetch Settings
// ===============================

async function getSettings(): Promise<SettingsData> {
  const url = "https://demo.app.taskcocommerce.com/api/v1/ecommerce-settings";

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `[Settings API Error] HTTP ${response.status}: ${response.statusText}`
      );
      return {};
    }

    const rawData: SettingsResponse = await response.json();
    return rawData?.data ?? rawData ?? {};
  } catch (error) {
    console.error("[Settings API Catch Error]:", error);
    return {};
  }
}

// ===============================
// Dynamic Metadata
// ===============================

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSettings();

  const storeName = data?.store_name?.trim() || "Demo Store";
  const metaDescription =
    data?.footer_description?.trim() || "Welcome to our store!";
  const favicon = data?.favicon?.trim() || "/favicon.png";

  return {
    title: {
      default: storeName,
      template: `%s | ${storeName}`,
    },
    description: metaDescription,
    icons: {
      icon: favicon,
    },
    openGraph: {
      title: storeName,
      description: metaDescription,
      siteName: storeName,
      type: "website",
    },
  };
}

// ===============================
// Root Layout
// ===============================

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
            {/* <Navbar1 /> */}
            <Navbar />

            {children}
          </CartProvider>
        </Providers>

        <Footer />
        <FooterBottom />
      </body>
    </html>
  );
}