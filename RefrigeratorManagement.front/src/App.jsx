import './App.css'
import { Route, Routes, useLocation, } from 'react-router-dom'
import { Home } from 'pages/Home'
import { FoodAdd } from 'pages/FoodAdd'
import { FoodEdit } from 'pages/FoodEdit'
import { Login } from 'pages/Login'
import { ROUTES } from './const'


function App() {

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path={ROUTES.HOME} element={ <Home /> } />
        <Route path={ROUTES.LOGIN} element={ <Login /> } />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path={ROUTES.FOOD_EDIT} element={ <FoodEdit /> } />
          <Route path={ROUTES.FOOD_ADD} element={ <FoodAdd /> } />
        </Routes>
      )}
    </>
  )
}

export default App
