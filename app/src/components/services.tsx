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
    <section className="bg-secondary text-white py-6">
      <div className="mx-auto px-6 md:px-20">

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 py-4 border-b-4 border-black">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 px-6 ${
                index !== services.length - 1
                  ? "border-r border-gray-600"
                  : ""
              }`}
            >
              <span className="text-5xl hover:text-primary transition duration-300">
                {service.icon}
              </span>

              <div>
                <h6 className="text-lg font-semibold">
                  {service.title}
                </h6>
                <p className="text-sm text-gray-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet */}
        <div className="lg:hidden overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max py-4 border-b-4 border-black">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-4 min-w-[280px] bg-secondary p-4 rounded-xl"
              >
                <span className="text-5xl hover:text-primary transition duration-300">
                  {service.icon}
                </span>

                <div>
                  <h6 className="text-lg font-semibold">
                    {service.title}
                  </h6>
                  <p className="text-sm text-gray-300">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;