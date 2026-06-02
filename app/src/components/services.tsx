"use client";

import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { TbTruckReturn } from "react-icons/tb";

const services = [
  {
    icon: <MdOutlineLocalShipping />,
    title: "Free Shipping",
    description: "For all orders over $100",
  },
  {
    icon: <TbTruckReturn />,
    title: "30 Days Returns",
    description: "For an Exchange Product",
  },
  {
    icon: <GiWallet />,
    title: "Secure Payment",
    description: "Payment Cards Accepted",
  },
  {
    icon: <FaHeadphonesSimple />,
    title: "24/7 Support",
    description: "Contact us anytime",
  },
];

function Services() {
  return (
    <div className=" mx-auto overflow-x-auto no-scrollbar bg-secondary">
  <div className="flex md:gap-20  md:py-4 border-b-4 md:px-20 border-black">

    {services.map((service, index) => (
      <div
        key={index}
        className="
          flex items-center gap-3
          min-w-[260px] sm:min-w-20
          bg-secondary p-3 sm:p-2
          rounded-xl
        "
      >
        <span className="text-4xl sm:text-2xl text-white shrink-0">
          {service.icon}
        </span>

        <div className="leading-tight">
          <h6 className="text-base sm:text-md text-white font-semibold">
            {service.title}
          </h6>
          <p className="text-xs sm:text-sm text-gray-300">
            {service.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}

export default Services;