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

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollAmount = 300;

  const next = () => {
    sliderRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const prev = () => {
    sliderRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 relative">
      <div className="container  mx-auto px-4 sm:px-6 md:px-20">

        {/* Title */}
        <div className="text-center py-5">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <p>You Can Explore Ourself</p>
        </div>

        {/* Prev Button */}
        <button
          onClick={prev}
          className="
            absolute z-10 bg-black/60 text-white px-3 py-2 rounded-full
            left-2 sm:left-4 top-[55%] sm:top-1/2 -translate-y-1/2
          "
        >
          ❮
        </button>

        {/* Next Button */}
        <button
          onClick={next}
          className="
            absolute z-10 bg-black/60 text-white px-3 py-2 rounded-full
            right-2 sm:right-4 top-[55%] sm:top-1/2 -translate-y-1/2
          "
        >
          ❯
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="
            flex gap-4 sm:gap-6
            overflow-x-auto scroll-smooth scrollbar-hide
            px-1 sm:px-0
          "
        >
          {gallery.map((item) => (
            <div
              key={item.id}
              className="
                min-w-3xl sm:min-w-[280px]
                rounded-xl overflow-hidden shadow-lg flex-shrink-0
              "
            >
              <img
                src={item.image}
                alt="blog"
                className="h-[160px] sm:h-[180px] w-full object-cover"
              />

              <div className="p-3 sm:p-4">
                <p className="text-sm font-medium leading-relaxed whitespace-normal">
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