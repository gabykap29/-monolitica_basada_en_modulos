import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import PublicRoute from './PublicRoutes'
import LoginPage from '../auth/pages/LoginPage';
import { PreceptorRoutes } from '../preceptor/routes/PreceptorRoutes';
import PrivateRoute from './PrivateRoutes';
import { EstudianteRoutes } from '../estudiantes/routes/EstudianteRoutes';
import DashboardRoutes from './DashboardRoutes';
import { ReportsRoutes } from '../reports/routes/ReportsRoutes';
import { AuditsRoutes } from '../auditoria/routes/AuditRoutes';
import NotFoundPage from '../common/pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Principal del Login */}
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
          path='/dashboard/*'
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
        <Route
         path='/IPF/*'
          element={
            <PrivateRoute>
              <PreceptorRoutes />
              <EstudianteRoutes />
              <ReportsRoutes/>
              <AuditsRoutes />
            </PrivateRoute>
          }
        />

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
