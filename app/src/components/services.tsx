import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { TbTruckReturn } from "react-icons/tb";

function Services() {
  return (
    <section className="bg-secondary text-white py-6">
      <div className="mx-auto px-6 md:px-20">

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 py-4 border-b-4 border-black">

          {/* Item */}
          <div className="flex items-center gap-4 border-r border-gray-600 pr-6">
            <span className="text-5xl text-white hover:text-primary transition duration-300">
              <MdOutlineLocalShipping />
            </span>

            <div>
              <h6 className="text-lg font-semibold">Free Shipping</h6>
              <p className="text-sm text-gray-300">
                For all orders over $100
              </p>
            </div>
          </div>

          {/* Item */}
          <div className="flex items-center gap-4 border-r border-gray-600 pr-6">
            <span className="text-5xl text-white hover:text-primary transition duration-300">
              <TbTruckReturn />
            </span>

            <div>
              <h6 className="text-lg font-semibold">30 Days Returns</h6>
              <p className="text-sm text-gray-300">
                For an Exchange Product
              </p>
            </div>
          </div>

          {/* Item */}
          <div className="flex items-center gap-4 border-r border-gray-600 pr-6">
            <span className="text-5xl text-white hover:text-primary transition duration-300">
              <GiWallet />
            </span>

            <div>
              <h6 className="text-lg font-semibold">Secure Payment</h6>
              <p className="text-sm text-gray-300">
                Payment Cards Accepted
              </p>
            </div>
          </div>

          {/* Item */}
          <div className="flex items-center gap-4">
            <span className="text-5xl text-white hover:text-primary transition duration-300">
              <FaHeadphonesSimple />
            </span>

            <div>
              <h6 className="text-lg font-semibold">24/7 Support</h6>
              <p className="text-sm text-gray-300">
                Contact us anytime
              </p>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Slider */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide cursor-grab">
          <div className="flex gap-4 min-w-max py-4 border-b-4 border-black">

            {/* Item */}
            <div className="flex items-center gap-4 min-w-[280px] bg-[#252525] p-4 rounded-xl">
              <span className="text-5xl text-white hover:text-primary transition duration-300">
                <MdOutlineLocalShipping />
              </span>

              <div>
                <h6 className="text-lg font-semibold">Free Shipping</h6>
                <p className="text-sm text-gray-300">
                  For all orders over $100
                </p>
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4 min-w-[280px] bg-[#252525] p-4 rounded-xl">
              <span className="text-5xl text-white hover:text-primary transition duration-300">
                <TbTruckReturn />
              </span>

              <div>
                <h6 className="text-lg font-semibold">30 Days Returns</h6>
                <p className="text-sm text-gray-300">
                  For an Exchange Product
                </p>
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4 min-w-[280px] bg-[#252525] p-4 rounded-xl">
              <span className="text-5xl text-white hover:text-primary transition duration-300">
                <GiWallet />
              </span>

              <div>
                <h6 className="text-lg font-semibold">Secure Payment</h6>
                <p className="text-sm text-gray-300">
                  Payment Cards Accepted
                </p>
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4 min-w-[280px] bg-[#252525] p-4 rounded-xl">
              <span className="text-5xl text-white hover:text-primary transition duration-300">
                <FaHeadphonesSimple />
              </span>

              <div>
                <h6 className="text-lg font-semibold">24/7 Support</h6>
                <p className="text-sm text-gray-300">
                  Contact us anytime
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;