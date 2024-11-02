import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
      <img 
        src="https://image.freepik.com/free-vector/404-error-page-found_24908-50943.jpg" 
        alt="404 Error" 
        className="img-fluid mb-4" 
        style={{ maxWidth: '200px', borderRadius: 100 }} 
      />
      <h1 className="display-1 text-danger">404</h1>
      <p className="lead">La página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary btn-lg">Volver al inicio</Link>
    </div>
  );
};

export default NotFoundPage;
