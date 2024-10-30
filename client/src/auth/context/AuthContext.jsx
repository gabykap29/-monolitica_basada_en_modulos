import { createContext, useReducer, useState } from "react";
import { authReducer } from '../reducer/AuthReducer';

// Se crea el contexto
export const AuthContext = createContext(null)

// Proveedor
export const AuthProvider = ({children}) => {
    const token = localStorage.getItem("token") || null
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [auth, dispatchAuth] = useReducer(authReducer, {
      token: token,
      isAuthenticated: token ? true: false
    })

    console.log("Auth: ", auth)

    // Función para manejar el login
  const login = (data) => {
    setLoading(true);
    setError(null);
    try {
      // Guardar token y usuario en localStorage
      localStorage.setItem("token", data.token);

      dispatchAuth({
        type: typeAuth.LOGIN,
        payload: {
          token: data.token,
        },
      });
    } catch (error) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el logout
  const logout = () => {
    localStorage.removeItem("token");
    dispatchAuth({
      type: typeAuth.LOGOUT,
      payload: {
        token: null,
        isAuthenticated: false,
      },
    });
  };

  return (
    <AuthContext.Provider
        value={{
            auth, 
            login, 
            logout
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}