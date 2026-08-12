"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { fetcher } from "@/lib/helpfetcher";
import { 
  FaChevronDown, 
  FaHeadset, 
  FaEnvelope, 
  FaPhone, 
  FaWhatsapp,
  FaLocationDot, 
  FaPaperPlane,
  FaCircleCheck,
  FaSpinner,
  FaTruckFast,
  FaStore,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaCreditCard,
  FaMoneyBill1Wave,
  FaLink,
  FaTags
} from "react-icons/fa6";

// Helper to sanitize external social link URLs
const formatSocialUrl = (link: string) => {
  if (!link) return "#";
  return link.startsWith("http://") || link.startsWith("https://") 
    ? link 
    : `https://${link}`;
};

// Social Icon Mapper
const getSocialIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "facebook":
      return <FaFacebook />;
    case "instagram":
      return <FaInstagram />;
    case "tiktok":
      return <FaTiktok />;
    case "youtube":
      return <FaYoutube />;
    default:
      return <FaLink />;
  }
};

// Types mapped to API payload
interface SocialIcon {
  name: string;
  link: string;
}

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

interface QuickLinkItem {
  name: string;
  slug: string;
}

interface SettingsData {
  settings_version?: string;
  store_name?: string;
  logo?: string;
  favicon?: string;
  footer_description?: string;
  social_icons?: SocialIcon[];
  address?: string;
  contact_number?: string;
  whatsapp_number?: string;
  footer_email?: string;
  copy_right_text?: string;
  default_courier?: string;
  business_mode?: string;
  currency?: string | null;
  primary_color?: string;
  secondary_color?: string;
  pay_now_enabled?: boolean;
  cod_enabled?: boolean;
  featured_categories?: CategoryItem[];
  quick_links?: QuickLinkItem[];
  seo?: {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
  };
}

interface SettingsResponse {
  data?: SettingsData;
  settings?: SettingsData;
  faqs?: FAQItem[];
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

interface HelpResponse {
  faqs?: FAQItem[];
  data?: FAQItem[];
}

export default function NeedHelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 1. Fetch Dynamic Settings Data
  const { 
    data: settingsRes, 
    error: settingsError, 
    isLoading: isSettingsLoading 
  } = useSWR<SettingsResponse>(
    "https://demo.app.taskcocommerce.com/api/v1/ecommerce-settings",
    fetcher
  );

  // 2. Fetch FAQs Data (Corrected URL endpoint to /help-center)
  const { 
    data: helpRes, 
    error: helpError, 
    isLoading: isHelpLoading 
  } = useSWR<HelpResponse>(
    "https://demo.app.taskcocommerce.com/api/v1/help-center",
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 2) return;
        setTimeout(() => revalidate({ retryCount }), 2000);
      }
    }
  );

  // Extract data with fallback options depending on response shape
  const settings = settingsRes?.data || settingsRes?.settings || (settingsRes as unknown as SettingsData);
  
  // Fallback default FAQs if API returns empty
  const defaultFaqs: FAQItem[] = [
    {
      id: 1,
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive an email containing a tracking number and a direct link to track your package.",
      category: "Orders",
    },
    {
      id: 2,
      question: "What is your return & exchange policy?",
      answer: "We offer a 30-day hassle-free return policy. Items must be unworn, unwashed, and in original packaging with tags attached.",
      category: "Returns",
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, mobile payments, and Cash on Delivery.",
      category: "Payments",
    },
    {
      id: 4,
      question: "How long does shipping take?",
      answer: "Standard domestic shipping takes 3–5 business days. Express shipping takes 1–2 business days.",
      category: "Shipping",
    },
  ];

  const faqs = helpRes?.faqs || helpRes?.data || settingsRes?.faqs || defaultFaqs;

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("https://demo.app.taskcocommerce.com/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ["All", "Orders", "Shipping", "Returns", "Payments"];

  const filteredFaqs = faqs.filter(
    (faq) => selectedCategory === "All" || faq.category === selectedCategory
  );

  const primaryColor = settings?.primary_color || "#008060";

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto space-y-10 w-full">
        
        {/* HERO / BRAND HEADER SECTION */}
        <div className="text-center space-y-4">
          {/* Dynamic Brand Logo / Fallback Title */}
          {isSettingsLoading ? (
            <div className="h-12 w-48 bg-gray-200 animate-pulse rounded-md mx-auto" />
          ) : settings?.logo ? (
            <div className="flex justify-center mb-2">
              {/* Using standard img element to avoid hostname un-configured errors in Next Image */}
              <img 
                src={settings.logo} 
                alt={settings.store_name || "Store Logo"} 
                className="h-12 w-auto object-contain max-w-[200px]"
              />
            </div>
          ) : (
            <h2 className="text-2xl font-bold tracking-tight text-gray-800">
              {settings?.store_name || settings?.seo?.meta_title || "Help Center"}
            </h2>
          )}

          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
          >
            <FaHeadset /> Customer Support Center
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            How can we help you today?
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            {settings?.footer_description || settings?.seo?.meta_description || "We are here to help you with any questions or concerns."}
          </p>

          {/* DYNAMIC METADATA BADGES */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {settings?.default_courier && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium shadow-sm capitalize">
                <FaTruckFast style={{ color: primaryColor }} /> Delivery: {settings.default_courier}
              </span>
            )}
            {settings?.business_mode && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium shadow-sm capitalize">
                <FaStore style={{ color: primaryColor }} /> Mode: {settings.business_mode}
              </span>
            )}
            {settings?.currency && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium shadow-sm uppercase">
                Currency: {settings.currency}
              </span>
            )}
            {settings?.pay_now_enabled && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium shadow-sm">
                <FaCreditCard className="text-blue-500" /> Online Payment Supported
              </span>
            )}
            {settings?.cod_enabled && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium shadow-sm">
                <FaMoneyBill1Wave className="text-green-500" /> Cash on Delivery Available
              </span>
            )}
          </div>
        </div>

        {/* DYNAMIC CONTACT INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Phone */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-3">
            <div 
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              <FaPhone />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-semibold text-gray-900 text-base">Call Us</h3>
              {isSettingsLoading ? (
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mt-2" />
              ) : (
                <a 
                  href={`tel:${settings?.contact_number}`} 
                  className="font-medium text-xs sm:text-sm mt-1 block truncate hover:underline"
                  style={{ color: primaryColor }}
                >
                  {settings?.contact_number || "Contact support"}
                </a>
              )}
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center shrink-0 text-lg">
              <FaWhatsapp />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-semibold text-gray-900 text-base">WhatsApp</h3>
              {isSettingsLoading ? (
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mt-2" />
              ) : (
                <a 
                  href={`https://wa.me/${settings?.whatsapp_number?.replace(/[^0-9]/g, "")}`} 
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 font-medium text-xs sm:text-sm mt-1 block truncate hover:underline"
                >
                  {settings?.whatsapp_number || "Chat with us"}
                </a>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-3">
            <div 
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              <FaEnvelope />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-semibold text-gray-900 text-base">Email Us</h3>
              {isSettingsLoading ? (
                <div className="h-4 w-28 bg-gray-200 animate-pulse rounded mt-2" />
              ) : (
                <a 
                  href={`mailto:${settings?.footer_email}`} 
                  className="font-medium text-xs sm:text-sm mt-1 block truncate hover:underline"
                  style={{ color: primaryColor }}
                >
                  {settings?.footer_email || "Send an email"}
                </a>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-3">
            <div 
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              <FaLocationDot />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-semibold text-gray-900 text-base">Address</h3>
              {isSettingsLoading ? (
                <div className="h-4 w-28 bg-gray-200 animate-pulse rounded mt-2" />
              ) : (
                <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                  {settings?.address || "Visit our office"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* FEATURED CATEGORIES & QUICK LINKS STRIP */}
        {((settings?.featured_categories && settings.featured_categories.length > 0) || 
          (settings?.quick_links && settings.quick_links.length > 0)) && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured Categories */}
            {settings?.featured_categories && settings.featured_categories.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FaTags style={{ color: primaryColor }} /> Popular Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {settings.featured_categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            {settings?.quick_links && settings.quick_links.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FaLink style={{ color: primaryColor }} /> Quick Navigation
                </h4>
                <div className="flex flex-wrap gap-2">
                  {settings.quick_links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={`/${link.slug}`}
                      className="px-3 py-1 border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-medium rounded-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MAIN SECTION: FAQS & CONTACT FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ ACCORDION SECTION */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-sm mt-1">Quick answers to your most pressing questions</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    backgroundColor: selectedCategory === cat ? primaryColor : undefined,
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            {isHelpLoading ? (
              <div className="flex items-center justify-center py-12 text-gray-400">
                <FaSpinner className="animate-spin text-2xl" />
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <FaChevronDown
                        className={`text-xs text-gray-400 transition-transform duration-300 ${
                          openFaq === faq.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === faq.id && (
                      <div className="px-5 pb-4 pt-1 text-sm text-gray-600 bg-gray-50/50 border-t border-gray-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUPPORT TICKET / CONTACT FORM */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              <p className="text-gray-500 text-sm mt-1">Can&apos;t find what you need? We&apos;re here to help.</p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center space-y-3">
                <FaCircleCheck className="text-4xl text-green-500 mx-auto" />
                <h3 className="font-bold text-lg">Message Sent!</h3>
                <p className="text-sm text-green-700">
                  Thank you for reaching out. A support representative will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-green-800 underline hover:text-green-900"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleFormChange}
                    placeholder="Order Inquiry, Return, etc."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Describe how we can help you..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: primaryColor }}
                  className="w-full py-3 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:opacity-90 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <>
                      <FaPaperPlane className="text-xs" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* DYNAMIC FOOTER WITH SOCIAL LINKS & COPYRIGHT */}
      <footer className="mt-16 border-t border-gray-200 pt-8 pb-4 text-center space-y-4">
        {/* Dynamic Social Media Links */}
        {settings?.social_icons && settings.social_icons.length > 0 && (
          <div className="flex items-center justify-center gap-4 text-lg text-gray-600">
            {settings.social_icons.map((item, index) => (
              <a
                key={index}
                href={formatSocialUrl(item.link)}
                target="_blank"
                rel="noreferrer"
                title={item.name}
                className="hover:text-primary transition-colors p-2 bg-white rounded-full border border-gray-200 shadow-sm"
              >
                {getSocialIcon(item.name)}
              </a>
            ))}
          </div>
        )}

        {/* Copyright notice */}
        <p className="text-gray-500 text-xs">
          {settings?.copy_right_text ? (
            `© ${settings.copy_right_text}`
          ) : (
            `© ${new Date().getFullYear()} All rights reserved.`
          )}
        </p>
      </footer>
    </div>
  );
}