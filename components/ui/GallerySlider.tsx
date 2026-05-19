import Image from "next/image";
import React, { useRef } from "react";

function GallerySlider() {
  const gallery = [
    {
      id: 1,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-01.jpg",
      disception:
        "How to Write a Blog Post Your Readers Will Love in 5 Steps",
    },
    {
      id: 2,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-06.jpg",
      disception:
        "9 Content Marketing Trends and Ideas to Increase Traffic",
    },
    {
      id: 3,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-05.jpg",
      disception:
        "The Ultimate Guide to Marketing Strategies to Improve Sales",
    },
    {
      id: 4,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-04.jpg",
      disception:
        "50 Best Sales Questions to Determine Your Customer's Need",
    },
    {
      id: 5,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/blog-02.jpg",
      disception:
        "6 Simple Ways to Boost Your Ecommerce Conversion Rate",
    },
  ];

  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = 320;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 bg-[#1E1E1E] relative">
      <div className="container mx-auto px-6 md:px-20">

        {/* Title */}
        <h2 className="text-white text-2xl font-bold mb-6 underline decoration-[#E38B75]">
          Latest Blogs
        </h2>

        {/* Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full z-10"
        >
          ❮
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full z-10"
        >
          ❯
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {gallery.map((item) => (
            <div
              key={item.id}
              className="min-w-[280px] bg-[#2A2A2A] rounded-xl overflow-hidden shadow-lg flex-shrink-0"
            >
              <img
                src={item.image}
                alt="blog"
                className="h-[180px] w-full object-cover"
              />

              <div className="p-4">
                <p className="text-white text-sm font-medium line-clamp-3">
                  {item.disception}
                </p>

                <button className="mt-3 text-[#E38B75] hover:underline text-sm">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default GallerySlider;