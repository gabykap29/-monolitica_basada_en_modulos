
import Sidebar from './components/Sidebar';
import Header from "./components/Header";

const App = () => {

  // Colores para las tarjetas
  const cardColors = {
    deteccion: "#74b9ff", // Azul eléctrico para Detección Facial
    registro: "#ff7675",  // Púrpura intenso para Registro de Personas
    monitoreo: "#00d4ff", // Cian brillante para Monitoreo de Actividades
    administracion: "#fdcb6e" // Rojo eléctrico para Administración de Usuarios
  };

  return (
    <>
      <div className="container-fluid" style={{ height: "100vh" }}>
        <div className="row" style={{ height: "100%" }}>
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 px-0" style={{ height: "100vh" }}>
            <Sidebar />
          </div>

          {/* Main content */}
          <main className="col-md-9 col-lg-10 px-0 bg-white" style={{ overflowY: "auto", height: "100%" }}>
            <Header />
            <div className="container mt-4">
              <div className="row g-4">
                {/* Detección Facial Card */}
                <div className="col-md-6">
                  <div className="card shadow-lg border-0" style={{ backgroundColor: cardColors.deteccion, borderRadius: '15px' }}>
                    <div className="card-body text-white">
                      <h5 className="card-title">Detección Facial</h5>
                      <p className="card-text">Sistema avanzado de detección de rostros.</p>
                      <a to="/pages/facial-detection">
                        <button className="btn btn-light">Ver más</button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Registro de Personas Card */}
                <div className="col-md-6">
                  <div className="card shadow-lg border-0" style={{ backgroundColor: cardColors.registro, borderRadius: '15px' }}>
                    <div className="card-body text-white">
                      <h5 className="card-title">Registro de Personas</h5>
                      <p className="card-text">Registro de personas con identificación facial.</p>
                      <a to="/pages/persons-registry">
                        <button className="btn btn-light">Ver más</button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Monitoreo de Actividades Card */}
                <div className="col-md-6">
                  <div className="card shadow-lg border-0" style={{ backgroundColor: cardColors.monitoreo, borderRadius: '15px' }}>
                    <div className="card-body text-white">
                      <h5 className="card-title">Buscar personas</h5>
                      <p className="card-text">Sistema avanzado de búsqueda con análisis facial.</p>
                      <a to="/pages/activity-monitoring">
                        <button className="btn btn-light">Ver más</button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Administración de Usuarios Card */}
                <div className="col-md-6">
                  <div className="card shadow-lg border-0" style={{ backgroundColor: cardColors.administracion, borderRadius: '15px' }}>
                    <div className="card-body text-white">
                      <h5 className="card-title">Administración de Usuarios</h5>
                      <p className="card-text">Gestión y administración de usuarios del sistema.</p>
                      <a to="/pages/user-management">
                        <button className="btn btn-light">Ver más</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
