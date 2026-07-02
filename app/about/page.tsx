"use client";

import Image from "next/image";
import { FaShippingFast, FaLock, FaTags, FaHeadset } from "react-icons/fa";

export default function AboutPage() {
  return (
    <section className="bg-ring/10 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* TEXT */}
          <div>
            <h1 className="text-2xl text-text-primary sm:text-4xl md:text-5xl font-bold mb-4">
              About Our Store
            </h1>
            
            <p className="text-ring leading-relaxed mb-4">
              We are a modern fashion e-commerce platform dedicated to bringing you
              the latest trends in clothing, shoes, and accessories. Our mission is
              to provide high-quality products at affordable prices with a smooth
              shopping experience.
            </p>

            <p className="text-ring leading-relaxed">
              From daily wear to premium fashion brands, we carefully select every
              product to ensure style, comfort, and quality.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://img.magnific.com/free-photo/empty-boutique-shopping-centre_482257-78792.jpg?semt=ais_hybrid&w=740&q=80"
              alt="About Us"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16">

          <div className="bg-background p-6 rounded-xl shadow hover:shadow-md transition text-center">
            <FaShippingFast className="text-3xl text-primary mx-auto mb-3" />
            <h3 className="font-semibold">Fast Delivery</h3>
            <p className="text-sm text-ring mt-2">
              Quick delivery inside & outside Dhaka
            </p>
          </div>

          <div className="bg-background p-6 rounded-xl shadow hover:shadow-md transition text-center">
            <FaLock className="text-3xl text-primary mx-auto mb-3" />
            <h3 className="font-semibold">Secure Payment</h3>
            <p className="text-sm text-ring mt-2">
              100% secure checkout system
            </p>
          </div>

          <div className="bg-background p-6 rounded-xl shadow hover:shadow-md transition text-center">
            <FaTags className="text-3xl text-primary mx-auto mb-3" />
            <h3 className="font-semibold">Best Prices</h3>
            <p className="text-sm text-ring mt-2">
              Affordable prices for everyone
            </p>
          </div>

          <div className="bg-background p-6 rounded-xl shadow hover:shadow-md transition text-center">
            <FaHeadset className="text-3xl text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-text-primary">24/7 Support</h3>
            <p className="text-sm text-ring mt-2">
              Always here to help you
            </p>
          </div>

        </div>

        {/* MISSION SECTION */}
        <div className="mt-20 bg-background p-10 rounded-xl shadow">
          <h2 className="text-2xl  text-text-primary font-bold mb-4 text-center">
            Our Mission
          </h2>

          <p className="text-ring text-center max-w-3xl mx-auto">
            Our mission is to make fashion accessible for everyone in Bangladesh.
            We aim to deliver premium quality products with the best customer
            experience, fast delivery, and trusted service.
          </p>
        </div>

      </div>
    </section>
  );
}