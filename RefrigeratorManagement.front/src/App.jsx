import "./App.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Home } from "pages/Home";
import { FoodAdd } from "pages/FoodAdd";
import { FoodEdit } from "pages/FoodEdit";
import { Login } from "pages/Login";
import { Register } from "pages/Register"; 
import { CATEGORY_ICONS, ROUTES } from "./const";
import { useEffect, useState } from "react";
import mockFoodData from "./data/MockFoodData";

function App() {
  const [foods, setFoods] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // 検索キーワード用のstate
  const [categorizeKeyword, setCategorizeKeyword] = useState("");
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    // 本来はAPIから取得するが、今回はモックデータを使用
    setFoods(mockFoodData);
  }, []);

  // 食品追加処理
  const handleAddFood = (newFood) => {
    const newId = Date.now(); // タイムスタンプをユニークIDとして使用
    const icon = CATEGORY_ICONS[newFood.category] || CATEGORY_ICONS["その他"];
    const foodWithDetails = { ...newFood, id: newId, icon };
    setFoods([...foods, foodWithDetails]);
  };

  // 食品編集処理
  const handleEditFood = (editedFood) => {
    setFoods(
      foods.map((food) => (food.id === editedFood.id ? editedFood : food))
    );
  };

  // 食品削除処理
  const handleDeleteFood = (foodId) => {
    setFoods(foods.filter((food) => food.id !== foodId));
  };

  // 検索キーワードを更新する処理
  const handleSearchFood = (keyword) => {
    setSearchKeyword(keyword);
  };

  // カテゴリーを更新する処理
  const handleCategorizeFood = (category) => {
    setCategorizeKeyword(category);
  };

  // 表示する食品をフィルタリング
  const filteredFoods = foods.filter((food) => {
    const matchSearch = food.name.includes(searchKeyword);
    const matchCategorize = food.category.includes(categorizeKeyword);
    return matchSearch && matchCategorize;
  });

  return (
    <>
      <Routes location={backgroundLocation || location}>
        {/* アプリの初期表示パス("/")をログインページ("/login")に自動的にリダイレクト */}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
        <Route
          path={ROUTES.HOME} // "/home"ページ
          element={
            <Home
              foods={filteredFoods} // フィルタリング後のfoodsを渡す
              onDelete={handleDeleteFood}
              onSearch={handleSearchFood}
              onCategorize={handleCategorizeFood}
            />
          }
        />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} /> {/* 新規登録ページのルートを追加 */}
      </Routes>

      {/* 以下はモーダル表示用のルーティング */}
      {backgroundLocation && (
        <Routes>
          <Route
            path={ROUTES.FOOD_EDIT}
            element={<FoodEdit onEdit={handleEditFood} />}
          />
          <Route
            path={ROUTES.FOOD_ADD}
            element={<FoodAdd onAdd={handleAddFood} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
