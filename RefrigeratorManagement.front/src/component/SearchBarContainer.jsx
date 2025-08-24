import { AddFoodButton } from "./AddFoodButton";
import { CategoryFilter } from "./CategoryFilter";
import { SearchBar } from "./SearchBar";


export function SearchBarContainer() {
  return (
    <div>
      {/* <!-- 検索・フィルター・追加ボタン --> */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* <!-- 検索バー --> */}
            <SearchBar />
            {/* <!-- カテゴリフィルター --> */}
            <CategoryFilter />
            {/* <!-- 食品追加ボタン --> */}
            <AddFoodButton />
          </div>
        </div>
      </div>
    </div>
  );
}
