"use client";

import React from "react";
import Link from "next/link";
import {
  FaMagnifyingGlass,
  FaLocationDot,
  FaCartShopping,
  FaUser,
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaHouse,
  FaWhatsapp,
} from "react-icons/fa6";

export default function TermsAndConditionsPage() {
  const categories = [
    "Building Materials",
    "Furniture",
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Fitness",
    "Books & Media",
    "Food & Beverages",
  ];

  return (
    <div className="min-h-screen bg-background text-ring  relative flex flex-col justify-between">


      {/* 3. BREADCRUMB & PAGE HEADER */}
      <main className="container mx-auto px-4 md:px-16 py-10 w-full space-y-4 flex-1">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-1 text-xs text-ring font-semibold uppercase tracking-wider">
            <FaHouse className="text-sm" />
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <span className="text-primary">TERMS & CONDITIONS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Terms & Conditions
          </h1>

          {/* Accent bar */}
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-2" />
        </div>

        {/* 4. TERMS AND CONDITIONS CONTENT */}
        <div className="space-y-6 text-sm leading-relaxed text-ring">
          
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-text-primary">Introduction</h2>
            <p>
              Welcome to your ecommerce website (&quot;Website&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). By accessing or using our website, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully before using our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-text-primary">Eligibility</h2>
            <p>By using this website, you confirm that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You are at least 18 years old, or</li>
              <li>You are using the website under the supervision of a parent or legal guardian.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-text-primary">Account Registration</h2>
            <ul className="list-disc pl-5 space-y-1 text-ring">
              <li>Users may need to create an account to place orders.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>We reserve the right to suspend or terminate accounts found involved in fraudulent or abusive activities.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-text-primary">Products & Pricing</h2>
            <ul className="list-disc pl-5 space-y-1 text-ring">
              <li>All products displayed on the website are subject to availability.</li>
              <li>We reserve the right to modify product prices, descriptions, or discontinue products at any time without prior notice.</li>
              <li>We try to ensure all pricing information is accurate, but errors may occur. In such cases, we reserve the right to cancel affected orders.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-text-primary">Orders & Payments</h2>
            <ul className="list-disc pl-5 space-y-1 text-ring">
              <li>Once an order is placed, you will receive an order confirmation.</li>
              <li>We reserve the right to refuse or cancel any order for reasons including product unavailability, payment issues, or suspicious activity.</li>
              <li>Payments must be completed using approved payment methods available on the website.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-text-primary">Shipping & Delivery</h2>
            <ul className="list-disc pl-5 space-y-1 text-ring">
              <li>Delivery times are estimates and may vary depending on location and courier services.</li>
              <li>We are not responsible for delays caused by external courier providers or unforeseen circumstances.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">Returns & Refunds</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Customers may request returns or refunds according to our Return Policy.</li>
              <li>Returned items must be unused and in original packaging.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-text-pri">Governing Law</h2>
            <p>
              These Terms & Conditions shall be governed by and interpreted according to the laws of Bangladesh.
            </p>
          </section>

        </div>
      </main>

  

    

      {/* 6. FOOTER SECTION */}

    </div>
  );
}