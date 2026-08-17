"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/helpfetcher";
import NeedHelpSkeleton from "@/components/ui/skeletonhelppage"; 
import { 
  FaEnvelope, 
  FaPhone, 
  FaClock,
  FaLocationDot, 
  FaPaperPlane,
  FaCircleCheck,
  FaSpinner
} from "react-icons/fa6";

interface SettingsData {
  store_name?: string;
  logo?: string;
  footer_description?: string;
  address?: string;
  contact_number?: string;
  footer_email?: string;
  working_hours?: string;
  primary_color?: string;
}

interface SettingsResponse {
  data?: SettingsData;
  settings?: SettingsData;
}

export default function ContactUsPage() {
  // Form State matching the reference image layout & fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch Settings Data
  const { 
    data: settingsRes, 
    isLoading: isSettingsLoading 
  } = useSWR<SettingsResponse>(
    "https://demo.app.taskcocommerce.com/api/v1/ecommerce-settings",
    fetcher
  );

  if (isSettingsLoading) {
    return <NeedHelpSkeleton />;
  }

  const settings = settingsRes?.data || settingsRes?.settings || (settingsRes as unknown as SettingsData);
  const primaryColor = settings?.primary_color || "#008a55"; // Matching green accent

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
      setFormData({ name: "", email: "", phone: "", inquiryType: "", message: "" });
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP SECTION HEADER */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#008a55] uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-[#008a55]" />
            WE&apos;RE HERE TO HELP
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Contact Us
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl">
            Have questions or ready to place an order? Reach out to our team and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: GET IN TOUCH INFO & QUICK TIP */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Get in Touch</h2>
                <p className="text-gray-500 text-xs mt-1">
                  Our support team is available during working hours to assist you with any questions.
                </p>
              </div>

              <div className="space-y-5 text-sm">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#008a55]/10 text-[#008a55] flex items-center justify-center shrink-0">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                      EMAIL ADDRESS
                    </span>
                    <a 
                      href={`mailto:${settings?.footer_email || "info@shopery.com"}`} 
                      className="font-medium text-gray-800 hover:text-[#008a55] transition-colors text-sm"
                    >
                      {settings?.footer_email || "info@shopery.com"}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#008a55]/10 text-[#008a55] flex items-center justify-center shrink-0">
                    <FaPhone className="text-sm" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                      PHONE NUMBER
                    </span>
                    <a 
                      href={`tel:${settings?.contact_number || "+1 (555) 123-4567"}`} 
                      className="font-medium text-gray-800 hover:text-[#008a55] transition-colors text-sm"
                    >
                      {settings?.contact_number || "+1 (555) 123-4567"}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#008a55]/10 text-[#008a55] flex items-center justify-center shrink-0">
                    <FaClock className="text-sm" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                      WORKING HOURS
                    </span>
                    <p className="font-medium text-gray-800 text-sm">
                      {settings?.working_hours || "Sun – Thu: 10:00 AM – 06:00 PM"}
                    </p>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#008a55]/10 text-[#008a55] flex items-center justify-center shrink-0">
                    <FaLocationDot className="text-sm" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                      OFFICE ADDRESS
                    </span>
                    <p className="font-medium text-gray-800 text-sm">
                      {settings?.address || "123 Grocery Street, Food City, FC 12345"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tip Box */}
            <div className="bg-[#f0f9f5] p-5 rounded-xl border border-[#d2efe2]">
              <span className="block text-[11px] font-bold tracking-wider text-[#008a55] uppercase mb-1">
                QUICK TIP
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">
                For order issues, please include your order number in the message so we can assist you faster.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: SEND US A MESSAGE FORM */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Send us a Message</h2>
              <p className="text-gray-500 text-xs mt-1">
                Fill in the form below and we&apos;ll respond within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center space-y-3">
                <FaCircleCheck className="text-4xl text-green-500 mx-auto" />
                <h3 className="font-bold text-lg">Message Sent!</h3>
                <p className="text-xs text-green-700">
                  Thank you for reaching out. We will respond to your message within 24 hours.
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      FULL NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#008a55] text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      EMAIL ADDRESS <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#008a55] text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      PHONE NUMBER
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="01XXX-XXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#008a55] text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      INQUIRY TYPE <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#008a55] text-gray-700 bg-white"
                    >
                      <option value="" disabled>Select inquiry type</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Issue">Order Issue</option>
                      <option value="Return & Refund">Return & Refund</option>
                      <option value="Shipping & Delivery">Shipping & Delivery</option>
                      <option value="Payment Support">Payment Support</option>
                      <option value="General Support">General Support</option>
                      <option value="Wholesale / Bulk Order">Wholesale / Bulk Order</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    MESSAGE <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#008a55] text-gray-700 placeholder-gray-400 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: primaryColor }}
                  className="w-full py-3 text-white font-medium text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:opacity-95 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <FaSpinner className="animate-spin text-sm" />
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
    </div>
  );
}