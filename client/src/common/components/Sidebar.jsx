import { useEffect, useState } from "react";

const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Obtener la ruta actual
    const path = window.location.pathname;
    setCurrentPath(path || '/dashboard/');
  }, []); // Se ejecuta solo una vez al montar el componente

  // Estilos y efectos hover
  const activeLinkStyle = {
    backgroundColor: "#495057",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  };

  const linkStyle = {
    padding: "10px 15px",
    borderRadius: "5px",
    color: "white",
    textDecoration: "none",
    transition: "background-color 0.3s, transform 0.2s",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#6c757d"; // Efecto hover
    e.currentTarget.style.transform = "scale(1.02)"; // Efecto de zoom
  };

  const handleMouseLeave = (e) => {
    if (currentPath !== e.currentTarget.pathname) {
      e.currentTarget.style.backgroundColor = ""; // Elimina el fondo al salir
    }
    e.currentTarget.style.transform = "scale(1)"; // Elimina el efecto de zoom
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white"
      style={{
        height: "100vh",
        background: "linear-gradient(180deg, #1c1e22, #343a40)",
        borderRight: "2px solid #495057",
      }}
    >
      {/* Logo */}
      <a
        href="/dashboard/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg
          className="bi pe-none me-2"
          width="40"
          height="32"
          fill="currentColor"
        >
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4 fw-bold">Asistencia IPF</span>
      </a>

      <hr style={{ borderColor: "#495057" }} />

      {/* Nav Links */}
      <ul className="nav flex-column mb-auto">
        <li className="nav-item">
          <a
            href="/dashboard/"
            className="nav-link text-white"
            style={{
              ...linkStyle,
              ...(currentPath === "/pages/home" ? activeLinkStyle : {}),
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              className="bi pe-none me-2"
              width="20"
              height="20"
              fill="currentColor"
            >
              <use xlinkHref="#home" />
            </svg>
            Inicio
          </a>
        </li>
        <li className="nav-item" style={{ marginTop: "10px" }}>
          <a
            href="/pages/persons/upload-records"
            className="nav-link text-white"
            style={{
              ...linkStyle,
              ...(currentPath === "/pages/persons/upload-records" ? activeLinkStyle : {}),
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              className="bi pe-none me-2"
              width="20"
              height="20"
              fill="currentColor"
            >
              <use xlinkHref="#upload-records" />
            </svg>
            Añadir Registros
          </a>
        </li>
      </ul>
      <hr style={{ borderColor: "#495057" }} />

      {/* Admin Section */}
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <strong>Admin</strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
          style={{
            backgroundColor: "#343a40",
            borderRadius: "5px",
          }}
        >
          {["New project...", "Settings", "Profile", "Sign out"].map((item, index) => (
            <li key={index}>
              <a
                className="dropdown-item"
                href="#"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#495057")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#343a40")}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <hr className="dropdown-divider" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
