

import Image from "next/image";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { IoSendOutline } from "react-icons/io5";

const Footer = () => {
const socialIcons = [
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
];

  return (
    <footer className="bg-[#1E1E1E] text-white">
      {/* TOP SECTION */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* STORE INFO */}
        <div>
          <h2 className="text-xl font-bold mb-3">Store Information</h2>

          <div className="w-16 h-[2px] bg-primary- mb-3"></div>

          <p className="text-md leading-tight">
            Styleway_Default <br />
            99 New Theme St. XY, USA 12345, Beside the Sun point
            land. <br />
            United States
          </p>

          <p className="mt-6 text-md">
            Call us: <span className="font-medium">+00 123-456-789</span>
          </p>

          <p className="mt-4 text-md">
            Email us: admin@example.com
          </p>
        </div>

        {/* FIND PRODUCT */}
        <div className="pl-28">
          <h2 className="text-xl font-bold mb-3">Find Product</h2>

          <div className="w-16 h-[2px] bg-[#E38B75] mb-6"></div>

          <ul className="space-y-2 text-md">
            <li>Prices drop</li>
            <li>New products</li>
            <li>Best sellers</li>
            <li>Sitemap</li>
            <li>Stores</li>
            <li>Shorts</li>
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <h2 className="text-xl font-bold mb-3">Your Account</h2>

          <div className="w-16 h-[2px] bg-primary mb-6"></div>

          <ul className="space-y-2 text-md ">
            <li>Order Tracking</li>
            <li>Sign in</li>
            <li>Create account</li>
            <li>Discount</li>
            <li>Wishlist</li>
            <li>Credit Slip</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h2 className="text-xl font-bold mb-3">Our Company</h2>

          <div className="w-16 h-[2px] bg-primary mb-6"></div>

          <ul className="space-y-2 text-md">
            <li>Delivery</li>
            <li>Legal Notice</li>
            <li>Terms and conditions</li>
            <li>Secure Payment</li>
            <li>Contact Us</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h2 className="text-xl font-bold mb-3">
            Subscribe To Newsletter
          </h2>

          <div className="w-16 h-[2px] bg-primary mb-6"></div>

          <p className="text-md leading-tight mb-6">
            Subscribe to our latest newsletter to get news
            about special discounts.
          </p>

          {/* INPUT */}
          <div className="flex items-center bg-white overflow-hidden">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3 py-2 text-black outline-none"
            />

            <button className="px-5 text-gray-700 text-2xl">
              <IoSendOutline />
            </button>
          </div>

          {/* CHECKBOX */}
          <div className="flex items-start gap-3 mt-5">
            <input type="checkbox" className="mt-1 w-5 h-5" />

            <p className="text-md leading-8">
              I agree to the terms and conditions and the
              privacy policy
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* SOCIAL ICONS */}
         <div className="flex items-center gap-4">
            {socialIcons.map((Icon, index) => (
                <div
                key={index}
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xl cursor-pointer hover:bg-primary hover:text-white transition"
                >
                <Icon />
                </div>
            ))}
            </div>

          {/* COPYRIGHT */}
          <p className="text-md text-center">
            Copyright © Styleway. All Rights Reserved.
          </p>

          {/* PAYMENT */}
          <div className="flex items-center gap-3">
           <Image
            src="https://azseller.s3.amazonaws.com/5fde132ca9cc36749c65b7c4/a27fc7f4-9b6b-42e9-8b11-97b0e819b95d/4ffa292d-1d26-4a29-a3e2-224a73033f77.jpg"
            alt="payment"
            width={120}
            height={80}
            className="h-8 w-auto"
            />
          </div>
        </div>
      </div>

      {/* SCROLL TOP BUTTON */}
      <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primery text-white text-2xl shadow-lg hover:scale-105 transition">
        ↑
      </button>
    </footer>
  );
};

export default Footer;