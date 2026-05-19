import React from "react";

function DiscountBanners() {
  return (
    <section className="py-10 ">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Banner 1 */}
        <div
          className="relative  flex items-center text-white rounded-xl overflow-hidden"
          style={{
            backgroundImage:
              "url('https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/sub-banner-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
         

          <div className="relative z-10 p-6">
            <p className="text-md font-semibold uppercase tracking-widest text-secondary">
              Flat 25% Off
            </p>
            <h2 className="text-2xl md:text-4xl text-black font-bold mt-2">
              Nike Air Force
            </h2>
            <p className="text-secondary text-2xl md:text-3xl">Men's Shoes</p>

            <button className="mt-4 px-5 py-2 bg-primary hover:bg-white hover:text-black transition rounded-md font-semibold">
              Shop Now
            </button>
          </div>
        </div>

        {/* Banner 2 */}
        <div
          className="relative h-[280px] flex items-center text-white rounded-xl overflow-hidden"
          style={{
            backgroundImage:
              "url('https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/sub-banner-2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          

          <div className="relative z-10 p-6">
            <p className="text-md font-semibold uppercase tracking-widest text-secondary">
               Flat 30% Off
            </p>
            <h2 className="text-2xl md:text-4xl text-black font-bold mt-2">
             Trendy Analog
            </h2>
            <p className="text-secondary text-2xl md:text-3xl">Women Watch</p>

            <button className="mt-4 px-5 py-2 bg-primary hover:bg-white hover:text-black transition rounded-md font-semibold">
              Shop Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default DiscountBanners;