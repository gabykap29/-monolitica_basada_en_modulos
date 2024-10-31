import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../../common/hooks/useForm';
import { fetchAuth } from '../services/AuthService';
import { handleLoginFailure, handleLoginSuccess } from '../handlers/HandlersLogin';

const LoginPage = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  // Usamos el hook useForm con valores iniciales
  const { form, handleInputChange, reset } = useForm({
    username: "",
    pass: ""
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const data = await fetchAuth("login", "POST", form)
      // Validamos si el login fue exitoso
      if (data.token) {
        handleLoginSuccess(data, reset, navigate, login);
      } else {
        handleLoginFailure(data.message || "Error interno");
      }
    } catch (error) {
      handleLoginFailure("Error de conexión. Por favor, intenta nuevamente.");
      console.error("Error en el login:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '24rem' }}>
        <h2 className="text-center mb-4">Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name='username'
              id="username"
              placeholder="Ingresa tu correo"
              value={form.username} 
              onChange={handleInputChange} 
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name='pass'
              id="password"
              placeholder="Ingresa tu contraseña"
              value={form.password} 
              onChange={handleInputChange} 
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
