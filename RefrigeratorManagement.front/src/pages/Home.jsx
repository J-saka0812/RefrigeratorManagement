import { StatsCards } from "component/StatsCards";
import { Header } from "component/Header";
import { SearchBarContainer } from "component/SearchBarContainer";
import { FoodList } from "component/FoodList";
import { useEffect, useState } from "react";
import mockFoodData from "../data/MockFoodData";

export function Home() {
  // データ取得用のオブジェクト
  const [foods, setFoods] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  // TODO: isEditModalOpenの詳細設計

  // データベースから食品情報を取得（モック）

  // 実際のlist取得処理
  // fetch("api/list")
  //   .then((res) => re.json())
  //   .then((data) => setStats(data));

  useEffect(() => {
    setFoods(mockFoodData);
  }, []);

  const handleEdit = (foodId) => {
    const foodToEdit = foods.find((food) => food.id === foodId);
    console.log("Edit this food:", foodToEdit);
    setEditingFood(foodToEdit);
    setIsEditModalOpen(true);
    // この後、状態を使ってモーダルを開き、編集対象のデータを渡す
    // TODO: 編集画面遷移処理実装
  };

  const handleDelete = (foodId) => {
    // foodId を使って、foods配列から該当する食品オブジェクトを探す
    const foodToDelete = foods.find((food) => food.id === foodId)
    if (
      foodToDelete &&
      confirm(`名前: ${foodToDelete.name}    この食品を削除しますか？`)
    ) {
      // 実際のアプリでは削除処理を実行
      // `foods` 配列から特定のID(food.id === foodId)を持つ要素を取り除いた
      // 《新しい配列(food.id !== foodId)》で、現在の `foods` の状態を丸ごと上書き」
      setFoods(foods.filter((food) => food.id !== foodId));
      alert(`食品を削除しました (ID: ${foodId} 名前: ${foodToDelete.name})`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 min-h-screen p-3">
      <Header />
      <StatsCards />
      <SearchBarContainer />
      <FoodList foods={foods} onEdit={handleEdit} onDelete={handleDelete} />

      {/* <EditFoodModal
              isOpen={isEditModalOpen}
              food={editingFood}
              onClose={() => setIsEditModalOpen(false)}> */}
    </div>
  );
}
