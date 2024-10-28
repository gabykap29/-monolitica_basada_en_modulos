import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext';
import { useForm } from '../../common/hooks/useForm';
import { fetchAuth } from '../services/AuthService';

const LoginPage = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  // Usamos el hook useForm con valores iniciales
  const { form, handleInputChange, reset } = useForm({
    email: "",
    password: ""
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    try {

    } catch (error) {
      
    }
    navigate("/IPF/home/")
    
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '24rem' }}>
        <h2 className="text-center mb-4">Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
          </div>
          <div className="mt-3 text-center">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
