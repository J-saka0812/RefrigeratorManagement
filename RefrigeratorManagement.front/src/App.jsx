import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes,  } from 'react-router-dom'
import { Home } from 'pages/Home'
import { FoodAdd } from 'pages/FoodAdd'
import { FoodEdit } from 'pages/FoodEdit'
import { FoodList } from 'pages/FoodList'
import { Login } from 'pages/Login'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/FoodADD' element={ <FoodAdd /> } />
          <Route path='/FoodEdit' element={ <FoodEdit /> } />
          <Route path='/FoodList' element={ <FoodList /> } />
          <Route path='/Login' element={ <Login /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
