import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollAmount = 320;

  const scroll = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 relative">
      <div className=" mx-auto px-4 sm:px-6 md:px-20">

        {/* TITLE */}
        <div className="text-center py-5">
          <h1 className="text-4xl sm:text-5xl font-bold">Gallery</h1>
          <p className="text-lg py-3 font-semibold">
            You Can Explore Ourself
          </p>
        </div>

       
        

          {/* LEFT BUTTON */}
          <button
            onClick={() => scroll("left")}
           className="
              absolute left-3 top-1/2 -translate-y-12  z-20
              w-12 h-12 rounded-full bg-white shadow-xl
              flex items-center justify-center
              hover:bg-black hover:text-white
              transition
            "
          >
            <ChevronLeft size={24} />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => scroll("right")}
            className="
              absolute right-2 top-1/2 -translate-y-12 z-20
              w-12 h-12 rounded-full bg-white shadow-xl
              flex items-center justify-center
              hover:bg-black hover:text-white
              transition
            "
          >
            <ChevronRight size={24} />
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="
              flex gap-6 overflow-x-auto scroll-smooth no-scrollbar
              px-10
            "
          >
            {gallery.map((item) => (
              <div
                key={item.id}
                className="
                  min-w-70
                  rounded-xl overflow-hidden shadow-lg flex-shrink-0
                  bg-white
                "
              >
                <img
                  src={item.image}
                  alt="blog"
                  className="h-[180px] w-full object-cover"
                />

                <div className="p-4">
                  <p className="text-sm font-medium leading-relaxed">
                    {item.disception}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      
    </section>
  );
}

export default GallerySlider;