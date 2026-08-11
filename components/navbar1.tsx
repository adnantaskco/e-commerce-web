"use client";
import React from "react";
import "flag-icons/css/flag-icons.min.css";
import { Skeleton } from "@/components/ui/skeleton";

interface Navbar1Props {
  isLoading?: boolean;
}

function Navbar1({ isLoading = false }: Navbar1Props) {
  // Skeleton Loading State
  if (isLoading) {
    return (
      <section className="bg-foreground py-3 w-full overflow-hidden">
        <div className="container mx-auto px-4 md:px-20 lg:px-20">
          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
            {/* Left Side: Offer Banner Skeleton */}
            <div className="hidden md:block">
              <Skeleton className="h-4 w-80 bg-gray-700/50" />
            </div>

            {/* Right Side: Quick Links & Dropdowns Skeleton */}
            <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 sm:gap-4">
              <Skeleton className="h-4 w-20 bg-gray-700/50" />
              <Skeleton className="h-4 w-20 bg-gray-700/50" />
              <Skeleton className="h-4 w-16 bg-gray-700/50" />
              <Skeleton className="h-4 w-14 hidden md:block bg-gray-700/50" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-foreground text-text-secondary py-3 w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-20 lg:px-20">
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          
          {/* Left Side: Offer Banner */}
          <div className="hidden md:block text-left truncate">
            <p className="text-text-secondary">
              Tell a friend about Styleway Fashion & get 30% off your next order.
            </p>
          </div>

          {/* Right Side: Quick Links & Dropdowns */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-1 sm:gap-2 whitespace-nowrap">
            <a
              href="/help"
              className="border-r border-ring pr-2 sm:px-3 hover:text-primary transition"
            >
              Need Help?
            </a>

            <a
              href="/track-order"
              className="border-r border-ring pr-2 sm:px-3 hover:text-primary transition"
            >
              Track Order
            </a>

            {/* Language */}
            <select
              onChange={(e) => console.log(e.target.value)}
              className=" bg-foreground text-text-secondary outline-none sm:text-sm text-xl cursor-pointer px-1 sm:px-2"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="pl">Polski</option>
            </select>

            {/* Currency */}
            <select
              onChange={(e) => console.log(e.target.value)}
              className=" hidden md:flex bg-foreground text-text-secondary outline-none sm:text-sm text-xl cursor-pointer px-1 sm:px-2"
              defaultValue="usd"
            >
              <option value="usd">$ USD</option>
              <option value="eur">€ EUR</option>
            </select>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Navbar1;