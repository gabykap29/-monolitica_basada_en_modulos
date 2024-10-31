import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const [title, setTitle] = useState("Panel de Control");

  const { logout } = useContext(AuthContext)

  useEffect(() => {
    // Mapeo de rutas a títulos
    const routeTitles = {
      "/pages/home": "Inicio",
      "/pages/dashboard": "Panel de Control",
      "/pages/persons/upload-records":"Añadir Registros"
      // Agrega más rutas y títulos según sea necesario
    };

    // Obtener la ruta actual
    const currentPath = window.location.pathname;
    console.log(currentPath);
    
    // Actualiza el título según la ruta actual
    setTitle(routeTitles[currentPath] || "Panel de Control"); // Valor predeterminado
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div
      className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom text-white"
      style={{
        background: "linear-gradient(90deg, #212529, #343a40)", // Color de fondo más oscuro
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Sombra más pronunciada
        borderRadius: "2px", // Bordes ligeramente redondeados
      }}
    >
      {/* Título o Logo */}
      <h3 className="h4 m-0">{title}</h3>

      {/* Botones de navegación */}
      <div className="btn-toolbar mb-2 mb-md-0">
        <div className="btn-group me-3">
          {/* Enlace a Inicio */}
          <Link to="/dashboard/">
            <button 
              type="button" 
              className="btn btn-sm btn-outline-light" 
              style={{ 
                marginRight: "10px", 
                borderRadius: "5px", // Bordes ligeramente redondeados
                padding: "0.5rem 1rem",
                background: "#495057", // Color de fondo del botón
                color: "#ffffff", // Color de texto blanco
                border: "none", // Sin borde
                transition: "background-color 0.3s", // Transición suave
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#6c757d"} // Efecto hover
              onMouseLeave={(e) => e.currentTarget.style.background = "#495057"} // Efecto hover
            >
              Inicio
            </button>
          </Link>
        </div>

        {/* Botón de cuenta con ícono */}
        <button
          type="button"
          className="btn btn-sm btn-danger" // Color rojo para el botón de cierre de sesión
          style={{
            marginLeft: "10px", 
            display: "flex", 
            alignItems: "center", 
            padding: "0.5rem 1rem", 
            borderRadius: "5px", // Bordes ligeramente redondeados
            background: "#dc3545", // Color de fondo del botón
            border: "none", // Sin borde
            transition: "background-color 0.3s", // Transición suave
          }}
          onClick={logout}
          onMouseEnter={(e) => e.currentTarget.style.background = "#c82333"} // Efecto hover
          onMouseLeave={(e) => e.currentTarget.style.background = "#dc3545"} // Efecto hover
        >
          <i className="bi bi-box-arrow-right me-2"></i> {/* Icono de salida */}
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Header;
