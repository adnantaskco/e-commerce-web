import Image from "next/image";
import React from "react";
import Link from "next/link";
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
    <footer className="bg-secondary text-white md:py-20">
      {/* TOP SECTION */}
      <div className="container mx-auto px-4 md:px-10 lg:px-20">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* STORE INFO */}
          <div>
            <h2 className="text-xl font-bold mb-3">
              Store Information
            </h2>

            <div className="w-16 h-[2px] bg-primary mb-4"></div>

            <p className="text-sm sm:text-base leading-7 text-gray-200">
              Styleway_Default <br />
              99 New Theme St. XY, USA 12345,
              Beside the Sun point land. <br />
              United States
            </p>

            <p className="mt-5 text-sm sm:text-base">
              Call us:{" "}
              <span className="font-medium">
                +00 123-456-789
              </span>
            </p>

            <p className="mt-3 text-sm sm:text-base break-all">
              Email us: admin@example.com
            </p>
          </div>

          {/* FIND PRODUCT */}
          <div className="md:pl-16">
            <h2 className="text-xl  font-bold mb-3">
              Find Product
            </h2>

            <div className="w-16 h-[2px] bg-primary mb-4"></div>

            <ul className="space-y-3 text-sm sm:text-base text-gray-200">
              <li className="hover:text-primary cursor-pointer transition">
                Prices drop
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                New products
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Best sellers
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Sitemap
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Stores
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Shorts
              </li>
            </ul>
          </div>

          {/* ACCOUNT */}
          <div className="">
            <h2 className="text-xl font-bold mb-3">
              Your Account
            </h2>

            <div className="w-16 h-[2px] bg-primary mb-4"></div>

            <ul className="space-y-3 text-sm sm:text-base text-gray-200">
              <li className="hover:text-primary cursor-pointer transition">
                Order Tracking
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Sign in
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Create account
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Discount
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Wishlist
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Credit Slip
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="md:pl-16">
            <h2 className="text-xl  font-bold mb-3">
              Our Company
            </h2>

            <div className="w-16 h-[2px] bg-primary mb-4"></div>

            <ul className="space-y-3 text-sm sm:text-base text-gray-200">
              <li className="hover:text-primary cursor-pointer transition">
                Delivery
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Legal Notice
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Terms and conditions
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Secure Payment
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Contact Us
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                About Us
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h2 className="text-xl font-bold mb-3">
              Subscribe To Newsletter
            </h2>

            <div className="w-16 h-[2px] bg-primary mb-4"></div>

            <p className="text-sm sm:text-base leading-7 text-gray-200 mb-5">
              Subscribe to our latest newsletter to get news
              about special discounts.
            </p>

            {/* INPUT */}
            <div className="flex items-center bg-white rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 text-black outline-none text-sm"
              />

              <button className="px-4 text-gray-700 text-2xl hover:text-primary transition">
                <IoSendOutline />
              </button>
            </div>

            {/* CHECKBOX */}
            <div className="flex items-start gap-3 mt-5">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 sm:w-5 sm:h-5"
              />

              <p className="text-xs sm:text-sm leading-6 text-gray-200">
                I agree to the terms and conditions and
                the privacy policy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-gray-700 ">
        <div className="container mx-auto pcontainer px-4 md:px-10 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-3 py-5">
            {socialIcons.map((Icon, index) => (
              <div
                key={index}
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-lg cursor-pointer hover:bg-primary hover:text-white transition duration-300"
              >
                <Icon />
              </div>
            ))}
          </div>

          {/* COPYRIGHT */}
          <p className="text-sm sm:text-base text-center text-gray-200">
            Copyright © Styleway. All Rights Reserved.
          </p>

          {/* PAYMENT */}
          <div className="flex items-center justify-center">
            <Image
              src="https://azseller.s3.amazonaws.com/5fde132ca9cc36749c65b7c4/a27fc7f4-9b6b-42e9-8b11-97b0e819b95d/4ffa292d-1d26-4a29-a3e2-224a73033f77.jpg"
              alt="payment"
              width={120}
              height={80}
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* SCROLL TOP BUTTON */}
    
    </footer>
  );
};

export default Footer;