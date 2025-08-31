import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Home } from 'pages/Home'
import { FoodAdd } from 'pages/FoodAdd'
import { FoodEdit } from 'pages/FoodEdit'
import { Login } from 'pages/Login'
import { CATEGORY_ICONS, ROUTES } from './const'
import { useEffect, useState } from 'react'
import mockFoodData from './data/MockFoodData'

function App() {
  const [foods, setFoods] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
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
    setFoods(foods.map(food => food.id === editedFood.id ? editedFood : food));
  };

  // 食品削除処理
  const handleDeleteFood = (foodId) => {
    setFoods(foods.filter(food => food.id !== foodId));
  };


  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route 
          path={ROUTES.HOME} 
          element={
            <Home 
              foods={foods} 
              onDelete={handleDeleteFood} 
            />
          } 
        />
        <Route path={ROUTES.LOGIN} element={ <Login /> } />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route 
            path={ROUTES.FOOD_EDIT} 
            element={<FoodEdit onEdit={handleEditFood} />} 
          />
          <Route 
            path={ROUTES.FOOD_ADD} 
            element={<FoodAdd onAdd={handleAddFood}/>} 
          />
        </Routes>
      )}
    </>
  )
}

export default App
