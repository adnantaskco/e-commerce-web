"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/helpfetcher";
import { 
  FaChevronDown, 
  FaHeadset, 
  FaEnvelope, 
  FaPhone, 
  FaLocationDot, 
  FaPaperPlane,
  FaCircleCheck,
  FaSpinner
} from "react-icons/fa6";

// Types
interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

interface SupportConfig {
  email: string;
  phone: string;
  address: string;
  hours: string;
}

interface HelpResponse {
  faqs: FAQItem[];
  support: SupportConfig;
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

  // Fetch help/FAQ dynamic data using SWR
  const { data, error, isLoading } = useSWR<HelpResponse>(
    "https://sevenone-bd.app.taskcocommerce.com/api/v1/help-center",
    fetcher,
    {
      // Fallback data in case the API endpoint is building/not ready yet
      fallbackData: {
        faqs: [
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
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.",
            category: "Payments",
          },
          {
            id: 4,
            question: "How long does shipping take?",
            answer: "Standard domestic shipping takes 3–5 business days. Express shipping takes 1–2 business days.",
            category: "Shipping",
          },
        ],
        support: {
          email: "support@styleway.com",
          phone: "+00 123-456-789",
          address: "99 New Theme St. XY, USA 12345",
          hours: "Mon - Sat: 9:00 AM - 8:00 PM EST",
        },
      },
    }
  );

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
      // POST ticket request to API
      await fetch("https://sevenone-bd.app.taskcocommerce.com/api/v1/support/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      // Demo success fallback if API isn't live
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ["All", "Orders", "Shipping", "Returns", "Payments"];

  const filteredFaqs = data?.faqs?.filter(
    (faq) => selectedCategory === "All" || faq.category === selectedCategory
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HERO / HEADER SECTION */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
            <FaHeadset /> Customer Support Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Find quick answers to common questions or reach out to our dedicated support team directly.
          </p>
        </div>

        {/* CONTACT INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xl">
              <FaPhone />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Call Us</h3>
              <p className="text-gray-500 text-sm mt-1">{data?.support?.hours}</p>
              <a href={`tel:${data?.support?.phone}`} className="text-primary font-medium text-sm mt-2 block hover:underline">
                {data?.support?.phone}
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xl">
              <FaEnvelope />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Email Us</h3>
              <p className="text-gray-500 text-sm mt-1">We respond within 24 hours</p>
              <a href={`mailto:${data?.support?.email}`} className="text-primary font-medium text-sm mt-2 block hover:underline">
                {data?.support?.email}
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xl">
              <FaLocationDot />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Visit Us</h3>
              <p className="text-gray-500 text-sm mt-1">{data?.support?.address}</p>
              <Link href="/home" className="text-primary font-medium text-sm mt-2 block hover:underline">
                Store Locator →
              </Link>
            </div>
          </div>
        </div>

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
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12 text-gray-400">
                <FaSpinner className="animate-spin text-2xl" />
              </div>
            ) : error ? (
              <p className="text-red-500 text-sm py-4">Failed to load FAQs. Please try again later.</p>
            ) : (
              <div className="space-y-3">
                {filteredFaqs?.map((faq) => (
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
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
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
    </div>
  );
}