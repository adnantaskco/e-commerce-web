"use client";

import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { IoSendOutline } from "react-icons/io5";

// SWR Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Footer = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch footer data dynamically using SWR
  const { data: footerData, error, isLoading } = useSWR("https://demo.app.taskcocommerce.com/api/v1/ecommerce-pages/footer", fetcher);

  const socialIconsMap: Record<string, React.ElementType> = {
    facebook: FaFacebookF,
    twitter: FaXTwitter,
    instagram: FaInstagram,
    pinterest: FaPinterestP,
    youtube: FaYoutube,
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setEmail("");
      alert("Subscribed successfully!");
    } catch (err) {
      console.error("Failed to subscribe", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <footer className="bg-foreground py-20 text-center text-background">Loading footer...</footer>;
  }

  if (error || !footerData) {
    return <footer className="bg-foreground py-20 text-center text-background">Failed to load footer data.</footer>;
  }

  return (
    <footer className="relative text-background bg-gradient-to-br from-foreground via-ring to-foreground overflow-hidden">
      {/* GLOW BACKGROUND EFFECT */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
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
              {footerData.storeInfo?.address}
            </p>

            <p className="mt-4 text-sm text-text-secondary">
              Call: <span className="text-text-secondary font-semibold">{footerData.storeInfo?.phone}</span>
            </p>

            <p className="mt-2 text-sm text-text-secondary">
              Email: {footerData.storeInfo?.email}
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="md:pl-10">
            <h2 className="text-xl text-text-secondary font-bold mb-4">Quick Links</h2>
            <div className="w-14 h-[2px] bg-primary mb-4"></div>

            <ul className="space-y-3 text-text-secondary">
              {footerData.quickLinks?.map((item: { label: string; href: string }, i: number) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="hover:text-primary cursor-pointer transition hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* MY ACCOUNT */}
          <div>
            <h2 className="text-xl font-bold mb-4">My Account</h2>
            <div className="w-14 h-[2px] bg-primary mb-4"></div>

            <ul className="space-y-3 text-text-secondary">
              {footerData.accountLinks?.map((item: { label: string; href: string }, i: number) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="hover:text-primary cursor-pointer transition hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </a>
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

            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex items-center bg-foreground/10 border border-background/20 rounded-lg overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 bg-transparent outline-none text-sm text-text-secondary placeholder-ring"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !agreed}
                  className="px-4 text-xl hover:text-primary transition disabled:opacity-50"
                >
                  <IoSendOutline />
                </button>
              </div>

              <label className="flex items-start gap-2 mt-4 text-xs text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1"
                />
                I agree to terms & privacy policy
              </label>
            </form>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-background/10">
        <div className="mx-auto px-6 md:px-12 lg:px-24 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* SOCIAL */}
          <div className="flex gap-3">
            {footerData.socials?.map((social: { name: string; url: string }, i: number) => {
              const IconComponent = socialIconsMap[social.name.toLowerCase()] || FaFacebookF;
              return (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center hover:text-primary hover:scale-110 transition"
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>

          {/* COPYRIGHT */}
          <p className="text-text-secondary text-sm text-center">
            {footerData.copyrightText || `© ${new Date().getFullYear()} Styleway. All Rights Reserved.`}
          </p>

          {/* PAYMENT */}
          {footerData.paymentImageUrl && (
            <Image
              src={footerData.paymentImageUrl}
              alt="payment methods"
              width={140}
              height={40}
              className="h-8 w-auto opacity-80"
            />
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;