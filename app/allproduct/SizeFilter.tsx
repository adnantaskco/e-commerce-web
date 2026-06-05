const sizes = ["XS", "S", "M", "L", "XL"];

function SizeFilter() {
  return (
    <div>
      <h3 className="font-semibold mb-2">Size</h3>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            className="px-3 py-1 border text-sm hover:bg-black hover:text-white"
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
export default SizeFilter;