import { createContext, useReducer, useState } from "react";
import { authReducer } from '../reducer/AuthReducer';
import { typeAuth } from "../../common/types/type";

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

    // Función para manejar el login
  const login = (data) => {
    setLoading(true);
    setError(null);
    try {
      // Guardar token en LocalStorage
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
    localStorage.removeItem("role");
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