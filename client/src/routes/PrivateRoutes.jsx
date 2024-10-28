import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
  
    // Muestra una pantalla de carga si isAuthenticated es false
    // if (auth.isAuthenticated === false) {
    //   return <h1>Verificando...</h1>;
    // }
  
    // Redirige a la página de inicio si no está autenticado
    return  children 
  };
  
  export default PrivateRoute;