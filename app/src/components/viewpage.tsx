"use client"

import Image from "next/image"
import { Star, ShoppingCart, Heart, Truck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const product = {
  id: 1,
  name: "Aveeno Baby Daily Wash & Shampoo",
  slug: "aveeno-baby-daily-wash-shampoo",
  image:
    "https://shared-user-bucket.blr1.digitaloceanspaces.com/taskco-ecommerce/sevenone-bd/platform/media/b3e42ea61f7f9d36cf1559cb81ef3fb7.jpg",
  short_description:
    "Gentle enough for cleaning your baby's delicate skin and tender hair. Tear-free formula with oat extract that nourishes and hydrates skin.",
  price: {
    retail_price: 2890,
    sale_price: 2350,
    is_discounted: true,
  },
  stock: {
    in_stock: false,
  },
  category: "Baby Shampoo",
  brand: "Aveeno",
  related_products: [
    {
      id: 2,
      name: "Boots Baby Conditioning Shampoo",
      image:
        "https://shared-user-bucket.blr1.digitaloceanspaces.com/taskco-ecommerce/sevenone-bd/platform/media/6b4f680bc5503cff007dbc6942d9100f.jpg",
      sale_price: 990,
    },
    {
      id: 3,
      name: "Cetaphil Baby Daily Lotion",
      image:
        "https://shared-user-bucket.blr1.digitaloceanspaces.com/taskco-ecommerce/sevenone-bd/platform/media/cd208e0c5f1e27b81600ff412f9a475c.jpg",
      sale_price: 3190,
    },
    {
      id: 4,
      name: "Aveeno Baby Emollient Cream",
      image:
        "https://shared-user-bucket.blr1.digitaloceanspaces.com/taskco-ecommerce/sevenone-bd/platform/media/a44f92cf0fe652e1f080c88dae2dc55a.jpg",
      sale_price: 1990,
    },
  ],
}

export default function ProductViewPage() {
  const discount =
    product.price.retail_price - product.price.sale_price

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl p-6 shadow-sm">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-3xl bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              width={700}
              height={700}
              className="w-full h-full object-cover hover:scale-105 duration-500"
            />

            {product.price.is_discounted && (
              <Badge className="absolute top-4 left-4 text-sm px-4 py-1 rounded-full">
                Save ৳{discount}
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-primary font-medium mb-2">
              {product.category}
            </p>

            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                (120 Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mt-6">
              <h2 className="text-4xl font-bold text-pink-600">
                ৳{product.price.sale_price}
              </h2>

              <p className="text-xl line-through text-gray-400">
                ৳{product.price.retail_price}
              </p>
            </div>

            {/* Stock */}
            <div className="mt-4">
              {product.stock.in_stock ? (
                <p className="text-green-600 font-medium">
                  In Stock
                </p>
              ) : (
                <p className="text-red-500 font-medium">
                  Out of Stock
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-7 mt-6">
              {product.short_description}
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-2xl">
                <Truck className="text-pink-500" />
                <div>
                  <h4 className="font-semibold">Fast Delivery</h4>
                  <p className="text-sm text-gray-500">
                    2-5 Working Days
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-2xl">
                <ShieldCheck className="text-pink-500" />
                <div>
                  <h4 className="font-semibold">100% Original</h4>
                  <p className="text-sm text-gray-500">
                    Trusted Product
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                size="lg"
                className="rounded-2xl px-8 py-6 text-base"
                disabled={!product.stock.in_stock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add To Cart
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-6 py-6"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">
            Related Products
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.related_products.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden rounded-3xl border-0 shadow-sm hover:shadow-xl duration-300 group"
            >
              <CardContent className="p-0">
                <div className="overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="w-full h-[280px] object-cover group-hover:scale-105 duration-500"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-pink-600 text-xl font-bold">
                      ৳{item.sale_price}
                    </p>

                    <Button size="sm" className="rounded-xl">
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}