import React from 'react'
import classes from './styles/FoodList.module.css'

export function FoodList() {
  
  return (
    <div className={classes.foodListContainer}>
      <div className={classes.lotLine}>
        <h2 className={classes.listText}>食品一覧</h2>
      </div>

      <div id="foodList" className={classes.itemContainer}>
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
              <button
                onclick="editFood('carrot')"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                編集
              </button>
              <button
                onclick="deleteFood('carrot')"
                className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                削除
              </button>
            </div>
          </div>
        </div>

        {/* <!-- 食品アイテム2 --> */}
        <div className="p-6 hover:bg-green-50/50 transition-colors duration-200 food-item" data-category="乳製品" data-name="牛乳">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-16 h-16 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-3xl">🥛</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">牛乳</h3>
                <p className="text-sm text-gray-600">カテゴリ: 乳製品</p>
                <p className="text-sm text-gray-600">数量: 1本</p>
                <p className="text-sm text-orange-600 font-medium">賞味期限: 2024/01/12 (あと2日)</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onclick="editFood('milk')"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                編集
              </button>
              <button
                onclick="deleteFood('milk')"
                className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                削除
              </button>
            </div>
          </div>
        </div>

        {/* <!-- 食品アイテム3 --> */}
        <div className="p-6 hover:bg-green-50/50 transition-colors duration-200 food-item" data-category="肉類" data-name="鶏むね肉">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-pink-100 to-red-100 w-16 h-16 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-3xl">🍗</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">鶏むね肉</h3>
                <p className="text-sm text-gray-600">カテゴリ: 肉類</p>
                <p className="text-sm text-gray-600">数量: 500g</p>
                <p className="text-sm text-red-600 font-medium">賞味期限: 2024/01/09 (期限切れ)</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onclick="editFood('chicken')"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                編集
              </button>
              <button
                onclick="deleteFood('chicken')"
                className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                削除
              </button>
            </div>
          </div>
        </div>

        {/* <!-- 食品アイテム4 --> */}
        <div className="p-6 hover:bg-green-50/50 transition-colors duration-200 food-item" data-category="野菜" data-name="レタス">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-3xl">🥬</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">レタス</h3>
                <p className="text-sm text-gray-600">カテゴリ: 野菜</p>
                <p className="text-sm text-gray-600">数量: 1玉</p>
                <p className="text-sm text-green-600 font-medium">賞味期限: 2024/01/20 (あと10日)</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onclick="editFood('lettuce')"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                編集
              </button>
              <button
                onclick="deleteFood('lettuce')"
                className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
