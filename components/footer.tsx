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
    <footer className="relative text-background bg-gradient-to-br from-foreground via-ring to-foreground overflow-hidden">

      {/* GLOW BACKGROUND EFFECT */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary blur-[120px]" />
      </div>

      <div className="relative container mx-auto px-6 md:px-12 lg:px-24 py-20">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* STORE INFO */}
          <div>
            <h2 className="text-xl text-text-secondary font-bold mb-4">Store Information</h2>
            <div className="w-14 h-[2px] bg-primary mb-4"></div>

            <p className="text-text-secondary leading-7 text-sm">
              99 New Theme St. XY, USA 12345, <br /> Beside the Sun point land.
            </p>

            <p className="mt-4 text-sm text-text-secondary">
              Call: <span className="text-text-secondary font-semibold">+00 123-456-789</span>
            </p>

            <p className="mt-2 text-sm text-text-secondary">
              Email: admin@example.com
            </p>
          </div>

          {/* LINKS */}
          <div className="md:pl-10">
            <h2 className="text-xl text-text-secondary font-bold mb-4 ">Quick Links</h2>
            <div className="w-14 h-[2px] bg-primary mb-4"></div>

            <ul className="space-y-3 text-text-secondary">
              {["Prices Drop", "New Products", "Best Sellers", "Stores", "Sitemap"].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-primary cursor-pointer transition hover:translate-x-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <h2 className="text-xl  font-bold mb-4">My Account</h2>
            <div className="w-14 h-[2px] bg-primary mb-4"></div>

            <ul className="space-y-3 text-text-secondary">
              {["Order Tracking", "Sign In", "Create Account", "Wishlist", "Discount"].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-primary cursor-pointer transition hover:translate-x-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER (GLASS CARD) */}
          <div className="bg-foreground/5 backdrop-blur-xl border border-background/10 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <div className="w-14 h-[2px] bg-primary mb-4"></div>

            <p className="text-text-secondary text-sm mb-4 leading-6">
              Get updates, discounts and special offers.
            </p>

            <div className="flex items-center bg-foreground/10 border border-background/20 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-transparent outline-none text-sm text-text-secondary placeholder-ring"
              />
              <button className="px-4 text-xl hover:text-primary transition">
                <IoSendOutline />
              </button>
            </div>

            <label className="flex items-start gap-2 mt-4 text-xs text-text-secondary">
              <input type="checkbox" className="mt-1" />
              I agree to terms & privacy policy
            </label>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-background/10">
        <div className="mx-auto px-6 md:px-12 lg:px-24 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* SOCIAL */}
          <div className="flex gap-3">
            {socialIcons.map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center hover:primery hover:scale-110 transition"
              >
                <Icon />
              </div>
            ))}
          </div>

          {/* COPYRIGHT */}
          <p className="text-text-secondary text-sm text-center">
            © 2026 Styleway. All Rights Reserved.
          </p>

          {/* PAYMENT */}
          <Image
            src="https://azseller.s3.amazonaws.com/5fde132ca9cc36749c65b7c4/a27fc7f4-9b6b-42e9-8b11-97b0e819b95d/4ffa292d-1d26-4a29-a3e2-224a73033f77.jpg"
            alt="payment"
            width={140}
            height={40}
            className="h-8 w-auto opacity-80"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;