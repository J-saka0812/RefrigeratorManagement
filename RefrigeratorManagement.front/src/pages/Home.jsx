import { StatsCards } from "component/StatsCards";
import { Header } from "component/Header";
import { SearchBarContainer } from "component/SearchBarContainer";
import { FoodList } from "component/FoodList";
import { useEffect, useState } from "react";

export function Home() {
  // データ取得用のオブジェクト
  const [foods, setFoods] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  // TODO: isEditModalOpenの詳細設計
  // TODO: editingFoodの詳細設計

  // データベースから食品情報を取得（モック）

  // 実際のlist取得処理
  // fetch("api/list")
  //   .then((res) => re.json())
  //   .then((data) => setStats(data));

  const mockFoodData = [
    {
      id: "carrot",
      name: "にんじん",
      category: "野菜",
      quantity: 3,
      unit: "本",
      expiryDate: "2024-01-15",
      memo: "冷蔵庫の野菜室に保存",
    },
    {
      id: "milk",
      name: "牛乳",
      category: "乳製品",
      quantity: 1,
      unit: "本",
      expiryDate: "2024-01-12",
      memo: "",
    },
    {
      id: "chicken",
      name: "鶏むね肉",
      category: "肉類",
      quantity: 500,
      unit: "g",
      expiryDate: "2024-01-09",
      memo: "冷凍庫で保存",
    },
    {
      id: "lettuce",
      name: "レタス",
      category: "野菜",
      quantity: 1,
      unit: "玉",
      expiryDate: "2024-01-20",
      memo: "",
    },
  ];

  useEffect(() => {
    setList(mockFoodData);
  }, []);

  const handleEdit = (foodId) => {
    const foodToEdit = foods.find(food => food.id === foodId);
        console.log("Edit this food:", foodToEdit);
        setEditingFood(foodToEdit);
        setIsEditModalOpen(true);
        // この後、状態を使ってモーダルを開き、編集対象のデータを渡します
      };

  return (
    <div className="bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 min-h-screen p-3">
      <Header />
      <StatsCards />
      <SearchBarContainer />
      <FoodList foods={foods} onEdit={handleEdit} />
      

      {/* <EditFoodModal
              isOpen={isEditModalOpen}
              food={editingFood}
              onClose={() => setIsEditModalOpen(false)}> */}
    </div>
  );
}
