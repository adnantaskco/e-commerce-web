"use client"
import React from "react";
import "flag-icons/css/flag-icons.min.css";
import { FaTractor } from "react-icons/fa6";

function Navbar1() {
  return (
    <section className="bg-foreground text-text-secondary py-2 w-full overflow-hidden ">
      <div className="container mx-auto px-6 md:px-20 lg:px-20">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-3 text-sm">

          {/* Left Side */}
          <div className="text-center lg:text-left">
            <p className="text-sm text-text-secondary sm:font-sm font-md">
              Tell a friend about Styleway Fashion & get 30% off your next
              order.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-wrap items-center justify-center gap-2 hidden md:block">

            <a
              href="/help"
              className="border-r border-ring px-3 text-sm font-md hover:text-primary transition"
            >
              Need Help?
            </a>

            <a
              href="/track-order"
              className=" border-r border-ring px-3 text-sm font-md hover:text-primary transition"
            >
              Track Order
            </a>

            {/* Language */}
            <select
              onChange={(e) => console.log(e.target.value)}
              className="bg-foreground text-text-secondary outline-none cursor-pointer text-sm font-md px-2"
              defaultValue="en"
            >
              <option value="en"> English</option>
              <option value="fr"> Français</option>
              <option value="es"> Español</option>
              <option value="de"> Deutsch</option>
              <option value="it"> Italiano</option>
              <option value="pl"> Polski</option>
            </select>

            {/* Currency */}
            <select
              onChange={(e) => console.log(e.target.value)}
              className="bg-foreground text-text-secondary outline-none text-sm  font-md cursor-pointer px-2"
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