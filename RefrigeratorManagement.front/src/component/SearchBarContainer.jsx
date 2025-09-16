import { CategoryFilter } from "./CategoryFilter";
import { FunctionButton } from "./FunctionButton";
import { SearchBar } from "./SearchBar";

export function SearchBarContainer({ onAdd, onSearch, onCategorize }) {
  return (
    // <!-- 検索・フィルター・追加ボタン -->
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 mb-6">
      <div className="flex flex-row items-center gap-2 sm:gap-4 overflow-x-auto">
        {/* <!-- 検索バー --> */}
        <div className="flex-1 min-w-0">
          <SearchBar onSearch={onSearch} />
        </div>
        
        {/* <!-- カテゴリフィルター --> */}
        <div className="flex-shrink-0">
          <CategoryFilter onCategorize={onCategorize} />
        </div>
        
        {/* <!-- 食品追加ボタン --> */}
        <div className="flex-shrink-0">
          <FunctionButton
            onClick={onAdd}
            type="button"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-3 sm:py-3 sm:px-6 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-green-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap"
          >
            <span className="text-lg sm:text-xl pb-1">➕</span>
            <span className="hidden sm:inline">食品を追加</span>
            <span className="sm:hidden text-sm">追加</span>
          </FunctionButton>
        </div>
      </div>
    </div>
  );
}
