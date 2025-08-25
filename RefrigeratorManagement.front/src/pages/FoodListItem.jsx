import React from "react";
import { FoodEditButton } from "./FoodEditButton";
import { FoodDeleteButton } from "./FoodDeleteButton";



export function FoodListItem() {
  return (
    <div>
      {/* <!-- 食品アイテム1 --> */}
        <div className="p-6 hover:bg-green-50/50 transition-colors duration-200 food-item" data-category="野菜" data-name="にんじん">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 w-16 h-16 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-3xl">🥕</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">にんじん</h3>
                <p className="text-sm text-gray-600">カテゴリ: 野菜</p>
                <p className="text-sm text-gray-600">数量: 3本</p>
                <p className="text-sm text-green-600 font-medium">賞味期限: 2024/01/15 (あと5日)</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <FoodEditButton />
              <FoodDeleteButton />
            </div>
          </div>
        </div>
    </div>
  );
}
