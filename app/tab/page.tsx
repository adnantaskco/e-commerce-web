"use client"

import React from "react"
import ProductCard1 from "../../components/Productcard/Dresscard"
import Sheos from "../../components/Productcard/Babydresscard"
import Jackets from "../../components/Productcard/jacketcard"

export default function SmartCategorySection() {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)
  const [isInsideContent, setIsInsideContent] = React.useState(false)

  const showCategory = (cat: string) => {
    setActiveCategory(cat)
  }

  const resetAll = () => {
    setActiveCategory(null)
    setIsInsideContent(false)
  }

  return (
    <section className="w-full py-10">

      {/* TITLE */}
      <h2 className="text-center text-3xl font-semibold mb-6">
        Shop By Category
      </h2>

      {/* CATEGORY NAV */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          onMouseEnter={() => showCategory("dresses")}
          onClick={() => showCategory("dresses")}
          className="hover:text-primary transition"
        >
          Dresses
        </button>

        <button
          onMouseEnter={() => showCategory("jackets")}
          onClick={() => showCategory("jackets")}
          className="hover:text-primary transition"
        >
          Jackets
        </button>

        <button
          onMouseEnter={() => showCategory("shoes")}
          onClick={() => showCategory("shoes")}
          className="hover:text-primary transition"
        >
          Shoes
        </button>
      </div>

      {/* CONTENT AREA */}
      <div
        onMouseEnter={() => setIsInsideContent(true)}
        onMouseLeave={resetAll}
        className="transition-all duration-500 min-h-[300px]"
      >

        {/* DEFAULT STATE */}
        {!activeCategory && (
          <div className="text-center text-gray-400 py-10">
            Hover or touch a category to explore
          </div>
        )}

        {/* DRESSES */}
        {activeCategory === "dresses" && (
          <div className="animate-fadeIn">
            <ProductCard1 />
          </div>
        )}

        {/* JACKETS */}
        {activeCategory === "jackets" && (
          <div className="animate-fadeIn">
            <Jackets />
          </div>
        )}

        {/* SHOES */}
        {activeCategory === "shoes" && (
          <div className="animate-fadeIn">
            <Sheos />
          </div>
        )}

      </div>

    </section>
  )
}