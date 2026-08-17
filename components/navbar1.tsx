"use client";

import React from "react";
import "flag-icons/css/flag-icons.min.css";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface Navbar1Props {
  isLoading?: boolean;
}

function Navbar1({ isLoading = false }: Navbar1Props) {

const router = useRouter();

  const handleNavigation = (value: string) => {
    if (value) {
      router.push(value);
    }
  };

  // Skeleton Loading State
  if (isLoading) {
    return (
      <section className="bg-foreground py-3 w-full overflow-hidden">
        <div className="container mx-auto px-4 md:px-20 lg:px-20">
          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
            {/* Left Side */}
            <div className="hidden md:block">
              <Skeleton className="h-4 w-80 bg-gray-700/50" />
            </div>

            {/* Right Side */}
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
    <section className="relative bg-foreground text-text-secondary py-3 w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-20 lg:px-20">
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          
          {/* ================= LEFT SIDE ================= */}
          <div className="hidden md:block text-left truncate">
            <p className="text-text-secondary">
              Tell a friend about Styleway Fashion & get 30% off your next
              order.
            </p>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-1 sm:gap-2 whitespace-nowrap">

            {/* Need Help */}
            <a
              href="/help"
              className="border-r border-ring pr-2 sm:px-3 hover:text-primary transition-colors"
            >
              Need Help?
            </a>

            {/* Track Order */}
            <a
              href="/track-order"
              className="border-r border-ring pr-2 sm:px-3 hover:text-primary transition-colors"
            >
              Track Order
            </a>

            {/* ================= LANGUAGE ================= */}
            <Select
              defaultValue="en"
              onValueChange={(value) => {
                console.log("Language:", value);
              }}
            >
              <SelectTrigger
                className="
                  h-8
                  w-auto
                  min-w-[95px]
                  border-0
                  bg-transparent
                  px-1
                  sm:px-2
                  text-text-secondary
                  shadow-none
                  focus:ring-0
                  focus:ring-offset-0
                  hover:text-primary
                  transition-colors
                "
              >
                <SelectValue placeholder="Language" />
              </SelectTrigger>

              <SelectContent className="bg-background border-border">
                <SelectItem
                  value="en"
                  className="cursor-pointer transition-colors hover:text-primary focus:bg-primary focus:text-primary "
                >
                  English
                </SelectItem>

                <SelectItem
                  value="fr"
                  className="cursor-pointer transition-colors hover:text-primary focus:bg-primary focus:text-primary "
                >
                  Français
                </SelectItem>

                <SelectItem
                  value="es"
                  className="cursor-pointer transition-colors hover:text-primary focus:bg-primary focus:text-primary "
                >
                  Español
                </SelectItem>

                <SelectItem
                  value="de"
                  className="cursor-pointer transition-colors hover:text-primary focus:bg-primary focus:text-primary "
                >
                  Deutsch
                </SelectItem>

                <SelectItem
                  value="it"
                  className="cursor-pointer transition-colors hover:text-primary focus:bg-primary focus:text-primary "
                >
                  Italiano
                </SelectItem>

                <SelectItem
                  value="pl"
                  className="cursor-pointer transition-colors hover:text-primary focus:bg-primary focus:text-primary "
                >
                  Polski
                </SelectItem>
              </SelectContent>
            </Select>

            {/* ================= CURRENCY ================= */}
<div className="hidden md:block">
      <Select onValueChange={handleNavigation}>
        <SelectTrigger
          className="
            h-8
            w-auto
            min-w-[80px]
            border-0
            bg-transparent
            px-1
            sm:px-2
            text-text-secondary
            shadow-none
            focus:ring-0
            focus:ring-offset-0
            hover:text-primary
            transition-colors
          "
        >
          <SelectValue placeholder="Select Home" />
        </SelectTrigger>

        <SelectContent className="bg-background border-border">
          <SelectItem
            value="/home"
            className="cursor-pointer transition-colors hover:text-primary focus:bg-primary focus:text-primary"
          >
            Home 1
          </SelectItem>

          <SelectItem
            value="/Home2"
            className="cursor-pointer transition-colors hover:text-primary focus:bg-primary focus:text-primary"
          >
            Home 2
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar1;