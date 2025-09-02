import React, { useState } from "react";

export function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const keyword = event.target.value;
    setInputValue(keyword);
    onSearch(keyword); // 入力があるたびに親コンポーネントにキーワードを渡す
  };

  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="食品名で検索..."
        className="w-full px-4 py-3 pl-10 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
        id="searchInput"
        value={inputValue}
        onChange={handleChange}
      />
      <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
    </div>
  );
}
