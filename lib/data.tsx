
// type Product = {
//   id: number;
//   image: string;
//   brand: string;
//   name: string;
//   rating: number;
//   reviews: number;
//   price: number;
//   oldPrice?: number;
//   discount?: number;
//   hasOffer: boolean;
// };


// export const Product: Product[] = [
//   {
//     id: 1,
//     name: "Benetton Regular Fit Sweatshirt",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/5/15-home_default.jpg",
//     short_description: "A comfortable regular fit sweatshirt made from premium fabric. Perfect for casual wear with excellent comfort and durability.",
//     price: {
//       retail_price: 50,
//       sale_price: 47.5,
//       is_discounted: true,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Sweatshirt",
//     brand: "Top-10",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 2,
//     name: "Premium Cotton Hoodie",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/6/16-home_default.jpg",
//     short_description: "Premium cotton hoodie designed for everyday comfort and warmth with a modern stylish fit.",
//     price: {
//       retail_price: 65,
//       sale_price: 65,
//       is_discounted: false,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Hoodie",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 3,
//     name: "Slim Fit Denim Jacket",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/7/17-home_default.jpg",
//     short_description: "Stylish slim fit denim jacket offering a trendy look and long-lasting durability.",
//     price: {
//       retail_price: 90,
//       sale_price: 80,
//       is_discounted: true,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Jacket",
//     brand: "JARA",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 4,
//     name: "Classic White Shirt",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/8/18-home_default.jpg",
//     short_description: "A timeless white shirt suitable for formal and casual occasions with premium comfort.",
//     price: {
//       retail_price: 35,
//       sale_price: 35,
//       is_discounted: false,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Shirt",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 5,
//     name: "Summer T-Shirt Premium",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/1/9/19-home_default.jpg",
//     short_description: "Lightweight premium t-shirt designed for summer comfort and modern style.",
//     price: {
//       retail_price: 30,
//       sale_price: 25,
//       is_discounted: true,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "T-Shirt",
//     brand: "Ferrari",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 6,
//     name: "Casual Black Hoodie",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/0/20-home_default.jpg",
//     short_description: "Modern black hoodie with a casual look, soft texture, and all-day comfort.",
//     price: {
//       retail_price: 55,
//       sale_price: 55,
//       is_discounted: false,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Hoodie",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 7,
//     name: "Stylish Winter Coat",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/1/21-home_default.jpg",
//     short_description: "Elegant winter coat crafted for warmth, style, and superior comfort during cold seasons.",
//     price: {
//       retail_price: 150,
//       sale_price: 120,
//       is_discounted: true,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Coat",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 8,
//     name: "Sport Jacket",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/2/22-home_default.jpg",
//     short_description: "Sporty jacket offering flexibility, comfort, and a fashionable athletic appearance.",
//     price: {
//       retail_price: 70,
//       sale_price: 70,
//       is_discounted: false,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Jacket",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 9,
//     name: "Premium Hoodie Grey",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/3/23-home_default.jpg",
//     short_description: "Premium grey hoodie designed with soft fabric and a versatile everyday style.",
//     price: {
//       retail_price: 68,
//       sale_price: 60,
//       is_discounted: true,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Hoodie",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 10,
//     name: "Casual Streetwear Tee",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/4/24-home_default.jpg",
//     short_description: "Trendy streetwear tee perfect for daily casual outfits and urban fashion lovers.",
//     price: {
//       retail_price: 28,
//       sale_price: 28,
//       is_discounted: false,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "T-Shirt",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 11,
//     name: "Winter Fashion Hoodie",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/5/25-home_default.jpg",
//     short_description: "Fashionable winter hoodie offering warmth, comfort, and a stylish seasonal look.",
//     price: {
//       retail_price: 80,
//       sale_price: 72,
//       is_discounted: true,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Hoodie",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 12,
//     name: "Premium Casual Jacket",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/6/26-home_default.jpg",
//     short_description: "Premium jacket combining casual elegance with durable and comfortable materials.",
//     price: {
//       retail_price: 85,
//       sale_price: 85,
//       is_discounted: false,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Jacket",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 13,
//     name: "Oversized Sweatshirt",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/7/27-home_default.jpg",
//     short_description: "Oversized sweatshirt with a relaxed fit and modern streetwear-inspired design.",
//     price: {
//       retail_price: 65,
//       sale_price: 58,
//       is_discounted: true,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Sweatshirt",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 14,
//     name: "Modern Street Jacket",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/8/28-home_default.jpg",
//     short_description: "A modern street-style jacket built for comfort and urban fashion enthusiasts.",
//     price: {
//       retail_price: 95,
//       sale_price: 95,
//       is_discounted: false,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Jacket",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 15,
//     name: "Men's Denim Shirt",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/2/9/29-home_default.jpg",
//     short_description: "Classic men's denim shirt featuring a versatile design and premium quality fabric.",
//     price: {
//       retail_price: 50,
//       sale_price: 42,
//       is_discounted: true,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Shirt",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 16,
//     name: "Warm Winter Hoodie",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/0/30-home_default.jpg",
//     short_description: "Warm winter hoodie made for cold weather comfort and everyday practicality.",
//     price: {
//       retail_price: 62,
//       sale_price: 62,
//       is_discounted: false,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Hoodie",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 17,
//     name: "Luxury Cotton T-Shirt",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/1/31-home_default.jpg",
//     short_description: "Luxury cotton t-shirt with superior softness, breathability, and premium styling.",
//     price: {
//       retail_price: 40,
//       sale_price: 33,
//       is_discounted: true,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "T-Shirt",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 18,
//     name: "Urban Style Coat",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/2/32-home_default.jpg",
//     short_description: "Urban-inspired coat offering premium warmth, elegant design, and lasting comfort.",
//     price: {
//       retail_price: 170,
//       sale_price: 140,
//       is_discounted: true,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Coat",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 19,
//     name: "Classic Polo T-Shirt",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/3/33-home_default.jpg",
//     short_description: "Classic polo t-shirt combining timeless style, comfort, and everyday versatility.",
//     price: {
//       retail_price: 38,
//       sale_price: 38,
//       is_discounted: false,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Polo Shirt",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },

//   {
//     id: 20,
//     name: "Fashionable Sports Hoodie",
//     image: "https://prestashop.codezeel.com/PRS05/PRS050101/default/img/p/3/4/34-home_default.jpg",
//     short_description: "Fashionable sports hoodie designed for active lifestyles with modern comfort and style.",
//     price: {
//       retail_price: 75,
//       sale_price: 68,
//       is_discounted: true,
//     },
//     stock: {
//       in_stock: true,
//     },
//     category: "Hoodie",
//     brand: "EcoShop",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//   },
// ];