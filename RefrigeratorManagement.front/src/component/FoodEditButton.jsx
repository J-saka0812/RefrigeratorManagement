import React from "react";

export function FoodEditButton() {
  return (
    <div>
      <button
        onclick="editFood('carrot')"
        className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        編集
      </button>
    </div>
  );
}
