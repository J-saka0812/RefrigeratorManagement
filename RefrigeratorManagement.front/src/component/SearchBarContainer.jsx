import { CategoryFilter } from "./CategoryFilter";
import { FunctionButton } from "./FunctionButton";
import { SearchBar } from "./SearchBar";

export function SearchBarContainer({ onAdd, onSearch, onCategorize }) {
  return (
    <div>
      {/* <!-- 検索・フィルター・追加ボタン --> */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* <!-- 検索バー --> */}
            <SearchBar onSearch={onSearch} />
            {/* <!-- カテゴリフィルター --> */}
            <CategoryFilter onCategorize={onCategorize} />
            {/* <!-- 食品追加ボタン --> */}
            <FunctionButton
              onClick={onAdd}
              type="button"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-green-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <span class="text-xl pb-1">➕</span>
              <span>食品を追加</span>
            </FunctionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
