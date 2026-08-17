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
    <section className="bg-foreground py-2 border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-20">
        
        <div className="flex gap-6 overflow-x-auto lg:overflow-visible no-scrollbar">

          {services.map((service, index) => (
            <div
              key={index}
              className="
                group
                flex items-center gap-4
                min-w-[260px] sm:min-w-0 sm:flex-1
                md:px-5 md:py-4
                rounded-2xl

                bg-white/5
                backdrop-blur-xl
                border border-white/10

                shadow-lg
                hover:shadow-primary/20
                hover:-translate-y-1

                transition-all duration-300
              "
            >
              {/* Icon bubble */}
              <div
                className="
                  flex items-center justify-center
                  w-12 h-12
                  rounded-full
                  bg-primary/15
                  text-primary
                  text-2xl
                  group-hover:scale-110
                  transition
                "
              >
                {service.icon}
              </div>

              {/* Text */}
              <div className="leading-tight">
                <h6 className="text-white font-semibold text-base group-hover:text-primary transition">
                  {service.title}
                </h6>

                <p className="hidden  sm:block text-sm text-gray-300">
                  {service.description}
                </p>
              </div>

              {/* glow line effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-primary/10 to-transparent" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;