import React from "react";

export function FoodDeleteButton() {
  return (
    <div>
      <button
        onclick="deleteFood('carrot')"
        className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        削除
      </button>
    </div>
  );
}
