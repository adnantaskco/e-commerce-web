function PriceFilter() {
  return (
    <div>
      <h3 className="font-semibold mb-2">Price</h3>

      <input type="range" className="w-full" min={0} max={500} />

      <div className="flex justify-between text-xs text-gray-500">
        <span>$0</span>
        <span>$500</span>
      </div>
    </div>
  );
}
export default PriceFilter;