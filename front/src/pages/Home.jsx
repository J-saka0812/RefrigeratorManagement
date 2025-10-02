import { useEffect } from "react";
import { StatsCards } from "component/StatsCards";
import { Header } from "component/Header";
import { SearchBarContainer } from "component/SearchBarContainer";
import { FoodList } from "component/FoodList";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../const";
import { useAuth } from "../context/AuthContext";

export function Home({ foods, onDelete, onSearch, onCategorize, stats }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  // currentUser がなければログイン画面に戻す
  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.LOGIN);
    }
  }, [currentUser, navigate]);

  // console.log('【Home.jsx】受け取ったProps:', foods);

  // currentUser がない場合は、早期リターンして何も表示しない
  if (!currentUser) {
    return null;
  }

  const handleAdd = () => {
    navigate(ROUTES.FOOD_ADD, {
      state: { backgroundLocation: location },
    });
  };

  const handleEdit = (foodId) => {
    const foodToEdit = foods.find((food) => food.id === foodId);
    if (foodToEdit) {
      navigate(ROUTES.FOOD_EDIT, {
        state: {
          food: foodToEdit,
          backgroundLocation: location,
        },
      });
    }
  };

  const handleDelete = (foodId) => {
    const foodToDelete = foods.find((food) => food.id === foodId);
    if (
      foodToDelete &&
      confirm(`名前: ${foodToDelete.name}    この食品を削除しますか？`)
    ) {
      onDelete(foodId); // App.jsx の handleDeleteFood を呼び出す
    }
  };

  // App.jsxに検索キーワードを渡すだけ
  const handleSearch = (keyword) => {
    onSearch(keyword);
  };

  // App.jsxに検索キーワードを渡すだけ
  const handleCategorize = (category) => {
    onCategorize(category);
  };

  return (
    <div className="bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 min-h-screen p-3">
      <Header user={currentUser} onClick={() => navigate(ROUTES.LOGIN)} />
      <StatsCards stats={stats} />
      <SearchBarContainer
        onAdd={handleAdd}
        onSearch={handleSearch}
        onCategorize={handleCategorize}
      />
      <FoodList foods={foods} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}