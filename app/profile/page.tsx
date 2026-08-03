"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { 
  FaUser, 
  FaBoxOpen, 
  FaHeart, 
  FaMapMarkerAlt, 
  FaLock, 
  FaBell, 
  FaTicketAlt, 
  FaSignOutAlt, 
  FaCamera,
  FaSpinner
} from "react-icons/fa";
import MyOrdersPage from "../order/page";

interface OrderItem {
  id: string;
  invoiceNo: string;
  orderDate: string;
  grandTotal: number;
  status: string;
}

export default function ProfilePage() {
  
  const { data: session, update: updateSession } = useSession();

  // Active Tab State
  const [activeTab, setActiveTab] = useState<string>("profile");

  // Profile Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "Male",
    dob: "",
  });

  // Dynamic States for API Data
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Sync Form Data with Session
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        fullName: session.user?.name || "",
        email: session.user?.email || "",
      }));
    }
  }, [session]);

  // Fetch Orders dynamically when "My Orders" tab is active
  useEffect(() => {
    if (activeTab === "orders" && session?.user) {
      async function fetchOrders() {
        try {
          setLoadingOrders(true);
          const res = await fetch("/api/orders");
          if (res.ok) {
            const data = await res.json();
            setOrders(data);
          }
        } catch (err) {
          console.error("Failed to load orders", err);
        } finally {
          setLoadingOrders(false);
        }
      }
      fetchOrders();
    }
  }, [activeTab, session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Profile Changes to Backend API
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage(null);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile.");

      // Refresh Session with new user name
      await updateSession({ name: formData.fullName });
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Something went wrong!" });
    } finally {
      setIsUpdating(false);
    }
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: FaUser },
    { id: "orders", label: "My Orders", icon: FaBoxOpen },
    { id: "wishlist", label: "Wishlist", icon: FaHeart },
    { id: "address", label: "Address Book", icon: FaMapMarkerAlt },
    { id: "security", label: "Security", icon: FaLock },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "coupons", label: "Coupons", icon: FaTicketAlt },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-3 sm:px-6 lg:px-10 font-sans">
      <div className="container mx-auto px-4 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* ================= LEFT SIDEBAR (Desktop Side Navigation & Mobile Horizontal Tabs) ================= */}
        <div className="md:col-span-4 lg:col-span-3 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <div className="mb-4 sm:mb-6 hidden md:block">
            <h2 className="text-xl font-bold text-gray-900">My Account</h2>
            <p className="text-xs text-gray-400 mt-0.5">Manage your account details</p>
          </div>

          {/* Desktop & Mobile Responsive Menu */}
          <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-2 pb-2 md:pb-0 scrollbar-none">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMessage(null);
                  }}
                  className={`flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-md shadow-emerald-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="text-sm sm:text-base" />
                  {item.label}
                </button>
              );
            })}

            {/* Logout Button (Desktop View) */}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="hidden md:flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer mt-4"
            >
              <FaSignOutAlt className="text-base" />
              Logout
            </button>
          </nav>
        </div>

        {/* ================= RIGHT MAIN CONTENT ================= */}
        <div className="md:col-span-8 lg:col-span-9 space-y-4 sm:space-y-6">

          {/* User Header Banner */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5">
            <div className="relative w-20 h-20 rounded-full border-2 border-emerald-500 overflow-hidden bg-emerald-50 flex items-center justify-center text-emerald-700 text-2xl font-bold shrink-0">
              {session?.user?.image ? (
                <Image src={session.user.image} alt="User Profile" fill className="object-cover" />
              ) : (
                formData.fullName ? formData.fullName.charAt(0).toUpperCase() : "U"
              )}
              <button className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] py-0.5 text-center flex justify-center items-center gap-1 cursor-pointer">
                <FaCamera size={10} /> Edit
              </button>
            </div>

            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {session?.user?.name || formData.fullName || "User Name"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">{session?.user?.email || formData.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                  Verified Customer
                </span>
                {/* Mobile Logout Option */}
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="md:hidden text-xs text-red-600 font-semibold px-2.5 py-1 hover:underline flex items-center gap-1"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Alert Notification */}
          {message && (
            <div
              className={`p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm font-medium border ${
                message.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* DYNAMIC TAB CONTENT */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">

            {/* TAB 1: MY PROFILE */}
            {activeTab === "profile" && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-3">Personal Information</h3>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="017XXXXXXXX"
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full md:w-1/2 border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-lg transition mt-4 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isUpdating && <FaSpinner className="animate-spin" />}
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: MY ORDERS */}
            {activeTab === "orders" && (
              <div className="-mx-2 sm:mx-0">
                <MyOrdersPage />
              </div>
            )}

            {/* TAB 3: WISHLIST */}
            {activeTab === "wishlist" && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-3">Wishlist</h3>
                <p className="text-xs sm:text-sm text-gray-500">No items saved in your wishlist.</p>
              </div>
            )}

            {/* TAB 4: ADDRESS BOOK */}
            {activeTab === "address" && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-3">Address Book</h3>
                <div className="border border-dashed border-gray-200 p-6 rounded-xl text-center">
                  <p className="text-xs sm:text-sm text-gray-600">No saved address found.</p>
                  <button className="text-xs text-emerald-700 font-bold mt-2 hover:underline cursor-pointer">
                    + Add New Address
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: SECURITY */}
            {activeTab === "security" && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-3">Security Settings</h3>
                <form className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Current Password</label>
                    <input type="password" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">New Password</label>
                    <input type="password" className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <button type="button" className="w-full sm:w-auto bg-emerald-700 text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-lg cursor-pointer">
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {/* TAB 6: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-3">Notification Preferences</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-700" />
                  <span className="text-xs sm:text-sm text-gray-700">Receive order status & promotional emails</span>
                </label>
              </div>
            )}

            {/* TAB 7: COUPONS */}
            {activeTab === "coupons" && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-3">My Vouchers & Coupons</h3>
                <p className="text-xs sm:text-sm text-gray-500">You currently have no active coupons.</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}