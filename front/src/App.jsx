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
import { fetchFoods } from "./api/FoodlistApi";
import { useAuth } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuth(); // AuthContextからcurrentUserを取得
  const [foods, setFoods] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // 検索キーワード用のstate
  const [categorizeKeyword, setCategorizeKeyword] = useState("");
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    const loadFoods = async () => {
      if (currentUser) {
        const foodsData = await fetchFoods(currentUser.userId);
        setFoods(foodsData);
      } else {
        setFoods([]); // ログアウト時などにリストをクリア
      }
    };

    loadFoods();
  }, [currentUser]); // currentUserが変わるたびに実行

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
  // const filteredFoods = (foods || []).filter((food) => {
  //   const matchSearch = food && food.name && food.name.includes(searchKeyword);
  //   const matchCategorize = food && food.category && food.category.includes(categorizeKeyword);
  //   return matchSearch && matchCategorize;
  // });

  const filteredFoods = (foods || []).filter((food) => {
    // searchKeywordが空文字列の場合は、無条件でtrueを返し、全ての食品を表示する
    if (searchKeyword === '') {
      return true;
    }
    // searchKeywordが何か入力されている場合のみ、名前での絞り込みを行う
    // toLowerCase()を使うことで、大文字・小文字を区別しない検索になる
    return food.name.toLowerCase().includes(searchKeyword.toLowerCase());
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
