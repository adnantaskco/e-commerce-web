"use client"
import React from "react";
import "flag-icons/css/flag-icons.min.css";

function Navbar1() {
  return (
    <section className="bg-secondary text-white py-4 w-full overflow-hidden ">
      <div className="container mx-auto px-4 md:px-10 lg:px-20">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-3 text-sm">

          {/* Left Side */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-md">
              Tell a friend about Styleway Fashion & get 30% off your next
              order.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-wrap items-center justify-center gap-2 hidden md:block">

            <a
              href="#"
              className="border-r border-gray-700 pr-3 text-sm font-md hover:text-primary transition"
            >
              Need Help?
            </a>

            <a
              href="#"
              className="border-r border-gray-700 pr-3 text-sm font-md hover:text-primary transition"
            >
              Track Order
            </a>

            {/* Language */}
            <select
              onChange={(e) => console.log(e.target.value)}
              className="bg-black text-white outline-none cursor-pointer text-sm font-md px-2"
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
              className="bg-black text-white outline-none text-sm font-md cursor-pointer px-2"
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