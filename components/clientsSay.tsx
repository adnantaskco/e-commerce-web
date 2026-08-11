"use client";


import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Penelope Astrid",
    role: "Web Designer",
    image: "https://i.pravatar.cc/150?img=32",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: 2,
    name: "John Deo",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=12",
    description:
      "A wonderful shopping experience with premium quality products. Everything arrived on time and exceeded my expectations. Highly recommended.",
  },
  {
    id: 3,
    name: "Sophia Loren",
    role: "Fashion Blogger",
    image: "https://i.pravatar.cc/150?img=25",
    description:
      "Their fashion collection is trendy and stylish. The quality is excellent and customer service is outstanding. I absolutely love shopping here.",
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden md:py-20 py-8  lg:py-28">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10-900 to-primery/15" />

      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/20 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 lg:px-20 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}
          <div className="group relative">

            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-3xl" />

           <div className="relative overflow-hidden rounded-[20px] md:rounded-[30px] shadow-2xl">
  <img
    src="https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/testimonial-img.jpg"
    alt="testimonial"
    width={800}
    height={700}
    className="w-full h-[250px] sm:h-[320px]  md:h-[400px] lg:h-[500px]  object-cover  transition-all duration-700  group-hover:scale-110
    "
  />
</div>

          </div>

          {/* Right Content */}
          <div>

            <span className="uppercase tracking-[5px] text-primary font-semibold">
              Testimonials
            </span>

            <h2 className=" text-3xl md:text-5xl lg:text-5xl font-bold sm:font-semibold mt-4 leading-tight">
              What Our Clients
              <span className="text-primary"> Say About Us</span>
            </h2>

            <div className="w-28 h-1 bg-primary mt-6 rounded-full" />

            {/* Testimonial Card */}
            <div
              className="
                relative
                mt-10
                p-8 lg:p-10
                rounded-[30px]
                bg-background/10
                backdrop-blur-xl
                border
                border-background/20
                shadow-2xl
              "
            >

              <FaQuoteLeft
                className="
                  absolute
                  top-6
                  right-6
                  text-[80px]
                  text-primary/20
                "
              />

              <p className="text-ring text-lg leading-9 relative z-10">
                {testimonials[current].description}
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-8">

                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="
                    w-16
                    h-16
                    rounded-full
                    border-2
                    border-primary
                    object-cover
                  "
                />

                <div>
                  <h3 className="text-2xl text-text-primary font-bold ">
                    {testimonials[current].name}
                  </h3>

                  <p className="text-primary">
                    {testimonials[current].role}
                  </p>
                </div>

              </div>

            </div>

            {/* Dots */}
            <div className="flex gap-4 mt-8">

              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`
                    transition-all duration-500 rounded-full

                    ${
                      current === index
                        ? "w-12 h-3 bg-primary"
                        : "w-3 h-3 bg-background/40 hover:bg-background"
                    }
                  `}
                />
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;