import React, { useState } from "react";

export function CategoryFilter({onCategorize}) {
  const [selectValue, setSelectValue] = useState("");

  const handleChange = (event) => {
    const category = event.target.value;
    setSelectValue(category);
    onCategorize(category);
  }
  
  return (
    <select
      className="px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
      id="categoryFilter"
      value={selectValue}
      onChange={handleChange}
    >
      <option value="">全カテゴリ</option>
      <option value="野菜">野菜</option>
      <option value="肉類">肉類</option>
      <option value="魚類">魚類</option>
      <option value="乳製品">乳製品</option>
      <option value="調味料">調味料</option>
      <option value="その他">その他</option>
    </select>
  );
}
