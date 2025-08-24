import React from "react";

export function AddFoodButton() {
  const goToAddFood = () => {
    document.getElementById("addFoodPopup").classList.remove("hidden");
    document.body.style.overflow = "hidden"; // スクロール無効化
  };

  return (
    <div>
      <button
        onclick={goToAddFood}
        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-green-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
      >
        <span class="text-xl">➕</span>
        <span>食品を追加</span>
      </button>
    </div>
  );
}
