import React from 'react';
import { Navigate } from 'react-router-dom';
import HomePage from '../preceptor/pages/HomePage';

const DashboardRoutes = () => {
  const role = localStorage.getItem("role");

  // Redirige según el rol
  switch (role) {
    case 'student':
      return <Navigate to="home/student" />;
    case 'admin':
      return <Navigate to="home/admin" />;
    case 'preceptor':
      return <HomePage />
    default:
      return <Navigate to="/unauthorized" />; 
  }
}

export default DashboardRoutes;
