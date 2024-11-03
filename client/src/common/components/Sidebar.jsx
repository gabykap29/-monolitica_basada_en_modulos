import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai'; 
import { BsFillPersonFill } from 'react-icons/bs'; 
import { GiArchiveRegister } from 'react-icons/gi'; 
import { FaUserShield } from 'react-icons/fa'; 
import { RiUserSharedFill } from "react-icons/ri";

const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    // Obtener la ruta actual
    const path = window.location.pathname;
    setCurrentPath(path || '/dashboard/');
  }, []); 

  
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
    e.currentTarget.style.backgroundColor = "#6c757d"; 
    e.currentTarget.style.transform = "scale(1.02)"; 
  };

  const handleMouseLeave = (e) => {
    if (currentPath !== e.currentTarget.pathname) {
      e.currentTarget.style.backgroundColor = "";
    }
    e.currentTarget.style.transform = "scale(1)"; 
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
      <Link
        to="/dashboard/"
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
      </Link>

      <hr style={{ borderColor: "#495057" }} />

      {/* Nav Links */}
      <ul className="nav flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/dashboard/"
            className="nav-link text-white"
            style={{
              ...linkStyle,
              ...(currentPath === "/dashboard/" ? activeLinkStyle : {}),
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AiFillHome className="me-2" size={20} />
            Inicio
          </Link>
        </li>
        {
          (role === "admin" || role === "preceptor") && (
            <li className="nav-item" style={{ marginTop: "10px" }}>
              <Link
                to="/IPF/students/"
                className="nav-link text-white"
                style={{
                  ...linkStyle,
                  ...(currentPath === "/IPF/students/" ? activeLinkStyle : {}),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <BsFillPersonFill className="me-2" size={20} />
                Estudiantes
              </Link>
            </li>
          )
        }
        {
          (role === "admin") && (
            <li className="nav-item" style={{ marginTop: "10px" }}>
              <Link
                to="/IPF/preceptores/"
                className="nav-link text-white"
                style={{
                  ...linkStyle,
                  ...(currentPath === "/IPF/preceptores/" ? activeLinkStyle : {}),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <RiUserSharedFill className="me-2" size={20} />
                Preceptores
              </Link>
            </li>
          )
        }
        {
          (role === "admin" || role === "preceptor") && (
            <li className="nav-item" style={{ marginTop: "10px" }}>
              <Link
                to="/IPF/reports/"
                className="nav-link text-white"
                style={{
                  ...linkStyle,
                  ...(currentPath === "/IPF/reports/" ? activeLinkStyle : {}),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <GiArchiveRegister className="me-2" size={20} />
                Reportes
              </Link>
            </li>
          )
        }
        {
          role === "admin" && (
            <li className="nav-item" style={{ marginTop: "10px" }}>
              <Link
                to="/IPF/audits/"
                className="nav-link text-white"
                style={{
                  ...linkStyle,
                  ...(currentPath === "/IPF/audits/" ? activeLinkStyle : {}),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <FaUserShield className="me-2" size={20} />
                Auditoría
              </Link>
            </li>
          )
        }
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
          <strong>{role}</strong>
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
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
