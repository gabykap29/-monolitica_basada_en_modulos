import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import PublicRoute from './PublicRoutes'
import LoginPage from '../auth/pages/LoginPage';
import { PreceptorRoutes } from '../preceptor/routes/PreceptorRoutes';
import PrivateRoute from './PrivateRoutes';
import { EstudianteRoutes } from '../estudiantes/routes/EstudianteRoutes';

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

        {/* Rutas Privadas */}
        <Route 
          path='/IPF/*'
          element={
            <PrivateRoute>
              <PreceptorRoutes />
              <EstudianteRoutes />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
