import React from "react";

function DiscountBanners() {
  const banners = [
    {
      id: 1,
      image:
        "https://shotkit.com/wp-content/uploads/2023/08/tips_how_to_photograph_shoes_horizontal_3.jpg",
      discount: "Flat 25% Off",
      title: "Nike Air Force",
      subtitle: "Men's Shoes",
    },
    {
      id: 2,
      image:
        "https://t3.ftcdn.net/jpg/07/45/43/34/360_F_745433451_oghymUJTDezu6tT1PeCq53vGeyEENxHx.jpg",
      discount: "Flat 30% Off",
      title: "Trendy Analog",
      subtitle: "Women Watch",
    },
  ];

  return (
    <section className="py-8 md:py-12">
      <div className=" container mx-auto px-6 md:px-10 lg:px-20">
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative min-h-64 sm:min-h-80 lg:min-h-90 flex items-center rounded-2xl  transition-transform duration-700 overflow-hidden group"
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
                
                <p className="text-sm sm:text-base font-semibold uppercase tracking-widest text-white">
                  {banner.discount}
                </p>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold mt-2 leading-tight">
                  {banner.title}
                </h2>

                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-50 mt-1">
                  {banner.subtitle}
                </p>

                <button className="mt-5 px-5 py-2 bg-primary hover:bg-white hover:text-black transition duration-300 rounded-md font-semibold text-sm sm:text-base">
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

export default DiscountBanners;