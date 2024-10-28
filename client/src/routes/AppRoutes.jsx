import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
// import PrivateRoute from './PrivateRoutes'
// import { LinksRoutes } from './LinksRoutes'
import PublicRoute from './PublicRoutes'
import LoginPage from '../auth/pages/LoginPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Principal */}
        <Route 
        path='/'
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
        />

        {/* Rutas Privadas
        <Route 
          path='/IPF/*'
          element={
            <PrivateRoute>
              <LinksRoutes />
            </PrivateRoute>
          }
        /> */}

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
