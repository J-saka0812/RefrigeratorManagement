import "./App.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Home } from "pages/Home";
import { FoodAdd } from "pages/FoodAdd";
import { FoodEdit } from "pages/FoodEdit";
import { Login } from "pages/Login";
import { Register } from "pages/Register";
import { ROUTES } from "./const";
import { useCallback, useEffect, useState } from "react";
import {
  createFood,
  deleteFood,
  editFood,
  fetchFoods,
} from "./api/FoodListApi";
import { useAuth } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuth(); // AuthContextからcurrentUserを取得
  const [foods, setFoods] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categorizeKeyword, setCategorizeKeyword] = useState("");
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    //StatsCard用オブジェクト
    total: 0,
    expiringSoon: 0,
    expired: 0,
  });
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const loadFoods = useCallback(async () => {
    if (currentUser) {
      try {
        const foodsData = await fetchFoods(currentUser.userId);
        setFoods(foodsData);
      } catch (err) {
        setError("データの取得に失敗しました。");
        console.error(err);
        return (
          <MessageField icon="❌" className={errorMessage}>
            {error}
          </MessageField>
        );
      }
    } else {
      setFoods([]); // ログアウト時などにリストをクリア
    }
  }, [currentUser]); // currentUserが変わるたびに実行

  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  /**
   * 食品を登録する関数
   * @param {object} newFood - FoodFormから渡される新しい食品データ
   */
  const handleAddFood = async (newFood) => {
    if (!currentUser) return;
    try {
      // 1. APIを呼び出して食品を登録する
      await createFood(newFood, currentUser.userId);
      // 2. 登録が成功したら、食品一覧を再フェッチして画面を更新する
      await loadFoods();
    } catch (err) {
      setError("食品の登録に失敗しました。");
      console.error(err);
      return (
        <MessageField icon="❌" className={errorMessage}>
          {error}
        </MessageField>
      );
    }
  };

  // 食品編集処理
  /**
   * 既存の食品を更新
   * @param {number | string} foodId - 更新する食品のID
   * @param {object} foodData - 更新する食品のデータ
   * @param {string} userId
   */
  const handleEditFood = async (editedFood) => {
    if (!currentUser) return;
    try {
      await editFood(editedFood.id, editedFood, currentUser.userId);

      await loadFoods();
    } catch (err) {
      setError("食品の編集に失敗しました。");
      console.error(err);
      return (
        <MessageField icon="❌" className={errorMessage}>
          {error}
        </MessageField>
      );
    }
  };

  // 食品削除処理
  /**
   * @param {number | string} foodId
   * @param {string} userId
   */
  const handleDeleteFood = async (foodId) => {
    if (!currentUser) return;
    try {
      await deleteFood(foodId, currentUser.userId);

      await loadFoods();
    } catch (err) {
      setError("食品の削除に失敗しました。");
      console.error(err);
      return (
        <MessageField icon="❌" className={errorMessage}>
          {error}
        </MessageField>
      );
    }
  };

  // 検索キーワードを更新する処理
  const handleSearchFood = (keyword) => {
    setSearchKeyword(keyword);
  };

  // カテゴリーを更新する処理
  const handleCategorizeFood = (category) => {
    setCategorizeKeyword(category);
  };

  const filteredFoods = (foods || []).filter((food) => {
    // searchKeywordが空文字かつcategorizeKeywordが空文字の場合は、無条件でtrueを返し、全ての食品を表示する
    if (searchKeyword === "" && categorizeKeyword === "") {
      return true;
    }
    // searchKeywordが何か入力されている場合のみ、名前での絞り込みを行う
    // toLowerCase()を使うことで、大文字・小文字を区別しない検索になる
    const matchSearch =
      food && food.name.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchCategorize =
      food &&
      food.category.toLowerCase().includes(categorizeKeyword.toLowerCase());
    return matchSearch && matchCategorize;
  });

  // statsCard用データ取得用のuseEffect
  useEffect(() => {
    if (!currentUser || !foods || foods.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let expiringSoonCount = 0;
    let expiredCount = 0;

    foods.forEach((food) => {
      const expiry = new Date(food.expirationDate);
      expiry.setHours(0, 0, 0, 0);

      const diffTime = expiry.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 2 && diffDays > 0) {
        expiringSoonCount++;
      } else if (diffDays <= 0) {
        expiredCount++;
      }
    });

    // 一度だけstateを更新
    setStats({
      total: foods.length,
      expiringSoon: expiringSoonCount,
      expired: expiredCount,
    });
  }, [foods, currentUser]); // 依存配列はfoodsとcurrentUserのみ

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
              stats={stats}
            />
          }
        />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />{" "}
        {/* 新規登録ページのルートを追加 */}
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
