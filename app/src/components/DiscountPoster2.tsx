import React from "react";

function DiscountBanners2() {
  return (
    <section className="py-10 ">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-6">

        {/* Banner 1 */}
        <div
          className="relative  flex items-center text-white rounded-xl overflow-hidden"
          style={{
            backgroundImage:
              "url('https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cms-banner-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
         

          <div className="relative z-10 p-6">
            <p className="text-md bg-primary font-semibold uppercase tracking-widest text-secondary">
              FLAT 25% OFF
            </p>
            <h2 className="text-2xl md:text-4xl text-black font-bold mt-2">
              Model Fashion
            </h2>
            <p className="text-secondary text-2xl md:text-3xl">Influencer</p>

            <button className="mt-4 px-5 py-2  underline text-black transition rounded-md font-semibold">
              Shop Now
            </button>
          </div>
        </div>

        {/* Banner 2 */}
        <div
          className="relative h-[280px] flex items-center text-white rounded-xl overflow-hidden"
          style={{
            backgroundImage:
              "url('https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cms-banner-2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          

          <div className="relative z-10 p-6">
            <p className="text-md font-semibold uppercase tracking-widest text-secondary">
               FLAT 25% OFF
            </p>
            <h2 className="text-2xl md:text-4xl text-black font-bold mt-2">
             Feminine Pink
            </h2>
            <p className="text-secondary text-2xl md:text-3xl">Clothes</p>

            <button className="mt-4 px-5 py-2 underline text-black transition rounded-md font-semibold">
              Shop Now
            </button>
          </div>
        </div>

        {/* banner 3 */}
        <div
          className="relative h-[280px] flex items-center text-white rounded-xl overflow-hidden"
          style={{
            backgroundImage:
              "url('https://prestashop.codezeel.com/PRS05/PRS050101/default/img/cms/cms-banner-3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          

          <div className="relative z-10 p-6">
            <p className="text-md font-semibold uppercase tracking-widest text-secondary">
                 FLAT 35% OFF
            </p>
            <h2 className="text-2xl md:text-4xl text-black font-bold mt-2">
             Men's Stylish
            </h2>
            <p className="text-secondary text-2xl md:text-3xl">Half T-Shirt</p>

            <button className="mt-4 px-5 py-2 underline  text-black transition rounded-md font-semibold">
              Shop Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default DiscountBanners2;