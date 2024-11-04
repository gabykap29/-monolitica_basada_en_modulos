import React from 'react';
import { Navigate } from 'react-router-dom';
import HomePage from '../preceptor/pages/HomePage';
import HomePageStudent from '../estudiantes/HomePageStudent';
import HomePageAdmin from '../directivos/HomePageAdmin';

const DashboardRoutes = () => {
  const role = localStorage.getItem("role");

  // Redirige según el rol
  switch (role) {
    case 'student':
      return <HomePageStudent />;
    case 'admin':
      return <HomePageAdmin />;
    case 'preceptor':
      return <HomePage />
    default:
      return <Navigate to="/" />; 
  }
}

export default DashboardRoutes;
