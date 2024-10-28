import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import MainPage from '../pages/MainPage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Principal */}
        <Route 
        path='/'
        element={
            <MainPage />
        }
        />

        {/* Rutas Privadas */}
        <Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
