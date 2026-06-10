"use client";

export default function FilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 border-b pb-4">
      
      {/* Category */}
      <select className="border rounded-md px-3 py-2">
        <option>All Categories</option>
        <option>T-Shirts</option>
        <option>Hoodies</option>
        <option>Jeans</option>
         <option>Shoes</option>
         
      </select>
 

      {/* Brand */}
      <select className="border rounded-md px-3 py-2">
        <option>All Brands</option>
        <option>Nike</option>
        <option>Zara</option>
        <option>H&M</option>
         <option>Levi's</option>
      </select>

      {/* Price */}
      <select className="border rounded-md px-3 py-2">
        <option>Price Range</option>
        <option>$0 - $15</option>
        <option>$15 - $20</option>
        <option>$20-$100</option>
      </select>

      {/* Offers */}
      <select className="border rounded-md px-3 py-2">
        <option>Offers</option>
        <option>Sale Items</option>
        <option>New Arrival</option>
        <option>Best Seller</option>
      </select>

      {/* Rating */}
      <select className="border rounded-md px-3 py-2">
        <option>Rating</option>
        <option>⭐ 4 & Up</option>
        <option>⭐ 3 & Up</option>
      </select>

      {/* Sort */}
      <div className="ml-auto">
        <select className="border rounded-md px-3 py-2">
          <option>Sort By</option>
          <option>Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Best Selling</option>
        </select>
      </div>
    </div>
  );
}