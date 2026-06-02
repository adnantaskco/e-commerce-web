import React from "react";

function DiscountBanners2() {
  const banners = [
    {
      id: 1,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cms-banner-1.jpg",
      discount: "FLAT 25% OFF",
      title: "Model Fashion",
      subtitle: "Influencer",
    },
    {
      id: 2,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cms-banner-2.jpg",
      discount: "FLAT 25% OFF",
      title: "Feminine Pink",
      subtitle: "Clothes",
    },
    {
      id: 3,
      image:
        "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cms-banner-3.jpg",
      discount: "FLAT 35% OFF",
      title: "Men's Stylish",
      subtitle: "Half T-Shirt",
    },
  ];

  return (
    <section className="py-8 md:py-12">
      <div className=" mx-auto ">
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative min-h-70 sm:min-h-80 lg:min-h-90 flex items-center rounded-2xl overflow-hidden group"
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300"></div>

              {/* Content */}
              <div className="relative z-10 p-5 sm:p-7">
                <p className="text-xs sm:text-sm md:text-base bg-primary text-secondary w-fit px-4 py-2 rounded-full font-semibold uppercase tracking-wider">
                  {banner.discount}
                </p>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-black font-bold mt-3 leading-tight">
                  {banner.title}
                </h2>

                <p className="text-secondary text-xl sm:text-2xl lg:text-3xl mt-1">
                  {banner.subtitle}
                </p>

                <button className="mt-5 underline text-black font-semibold hover:translate-x-1 transition duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default DiscountBanners2;