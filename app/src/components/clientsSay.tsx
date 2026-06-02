"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Penelope Astrid",
    role: "Web Designer",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: 2,
    name: "John Deo",
    role: "UI/UX Designer",
    description:
      "A wonderful shopping experience with premium quality products. Everything arrived on time and looked amazing.",
  },
  {
    id: 3,
    name: "Sophia Loren",
    role: "Fashion Blogger",
    description:
      "Their fashion collection is trendy and stylish. I loved the overall quality and customer support.",
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto py-16 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Left Image */}
        <div className="w-full">
          <Image
            src="https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/testimonial-img.jpg"
            alt="Fashion"
            width={700}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Carousel */}
        <div className="space-y-6 transition-all duration-500">

          {/* Title */}
          <div>
            <h2 className="text-4xl md:text-6xl font-semibold text-secondary">
              What Our Client Say:
            </h2>

            <div className="w-32 h-[2px] bg-primary mt-5"></div>
          </div>

          {/* Quote */}
          <FaQuoteLeft className="text-7xl text-primary" />

          {/* Dynamic Content */}
          <p className="text-gray-500 leading-10 text-lg">
            {testimonials[current].description}
          </p>

          {/* Client Info */}
          <div>
            <h3 className="text-3xl font-semibold text-primary">
              {testimonials[current].name}
            </h3>

            <p className="text-gray-500 text-2xl mt-2">
              {testimonials[current].role}
            </p>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-3 pt-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-[#d78b7d]"
                    : "bg-black"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;