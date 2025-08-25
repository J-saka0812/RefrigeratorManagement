import React from 'react'

export function FoodList() {
  return (
    <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-800">食品一覧</h2>
      </div>

      <div id="foodList" class="divide-y divide-gray-200">
        {/* <!-- 食品アイテム1 --> */}
        <div class="p-6 hover:bg-green-50/50 transition-colors duration-200 food-item" data-category="野菜" data-name="にんじん">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="bg-gradient-to-br from-orange-100 to-yellow-100 w-16 h-16 rounded-xl flex items-center justify-center shadow-md">
                <span class="text-3xl">🥕</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">にんじん</h3>
                <p class="text-sm text-gray-600">カテゴリ: 野菜</p>
                <p class="text-sm text-gray-600">数量: 3本</p>
                <p class="text-sm text-green-600 font-medium">賞味期限: 2024/01/15 (あと5日)</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                onclick="editFood('carrot')"
                class="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                編集
              </button>
              <button
                onclick="deleteFood('carrot')"
                class="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                削除
              </button>
            </div>
          </div>
        </div>

        {/* <!-- 食品アイテム2 --> */}
        <div class="p-6 hover:bg-green-50/50 transition-colors duration-200 food-item" data-category="乳製品" data-name="牛乳">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="bg-gradient-to-br from-blue-100 to-cyan-100 w-16 h-16 rounded-xl flex items-center justify-center shadow-md">
                <span class="text-3xl">🥛</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">牛乳</h3>
                <p class="text-sm text-gray-600">カテゴリ: 乳製品</p>
                <p class="text-sm text-gray-600">数量: 1本</p>
                <p class="text-sm text-orange-600 font-medium">賞味期限: 2024/01/12 (あと2日)</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                onclick="editFood('milk')"
                class="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                編集
              </button>
              <button
                onclick="deleteFood('milk')"
                class="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                削除
              </button>
            </div>
          </div>
        </div>

        {/* <!-- 食品アイテム3 --> */}
        <div class="p-6 hover:bg-green-50/50 transition-colors duration-200 food-item" data-category="肉類" data-name="鶏むね肉">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="bg-gradient-to-br from-pink-100 to-red-100 w-16 h-16 rounded-xl flex items-center justify-center shadow-md">
                <span class="text-3xl">🍗</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">鶏むね肉</h3>
                <p class="text-sm text-gray-600">カテゴリ: 肉類</p>
                <p class="text-sm text-gray-600">数量: 500g</p>
                <p class="text-sm text-red-600 font-medium">賞味期限: 2024/01/09 (期限切れ)</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                onclick="editFood('chicken')"
                class="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                編集
              </button>
              <button
                onclick="deleteFood('chicken')"
                class="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                削除
              </button>
            </div>
          </div>
        </div>

        {/* <!-- 食品アイテム4 --> */}
        <div class="p-6 hover:bg-green-50/50 transition-colors duration-200 food-item" data-category="野菜" data-name="レタス">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-xl flex items-center justify-center shadow-md">
                <span class="text-3xl">🥬</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">レタス</h3>
                <p class="text-sm text-gray-600">カテゴリ: 野菜</p>
                <p class="text-sm text-gray-600">数量: 1玉</p>
                <p class="text-sm text-green-600 font-medium">賞味期限: 2024/01/20 (あと10日)</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                onclick="editFood('lettuce')"
                class="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                編集
              </button>
              <button
                onclick="deleteFood('lettuce')"
                class="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
