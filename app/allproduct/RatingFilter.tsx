import { FaStar } from "react-icons/fa";

function RatingFilter() {
  return (
    <div>
      <h3 className="font-semibold mb-2">Rating</h3>

      <div className="space-y-1 text-sm">
        {[5, 4, 3].map((star) => (
          <div key={star} className="flex items-center gap-1 cursor-pointer">
            {Array.from({ length: star }).map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <span className="text-gray-500">& Up</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RatingFilter;