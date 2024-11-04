import React, { useState } from 'react';
import CreateReport from './CreateReport';

const UtilsReports = ({ selectedType, setSelectedType }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Función para filtrar los reportes
  const handleFilterChange = (e) => {
    setSelectedType(e.target.value);
  };

  // Mostrar Form
  const openForm = () => {
    setModalOpen(true);
  };

  // Cerrar Form
  const closeForm = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4 p-3 bg-white shadow-lg border-0 rounded-2" style={{width: "100%"}}>
        <h4 className="me-3">Reportes</h4>
        <select value={selectedType} onChange={handleFilterChange} className="form-select w-auto">
          <option value="Todos">Todos</option>
          <option value="Notificado de faltas">Notificado de faltas</option>
          <option value="Notificado de estado libre">Notificado de estado libre</option>
        </select>
        <button className="btn btn-primary" onClick={openForm}>Agregar</button>
      </div>
      <CreateReport isModalOpen={isModalOpen} closeForm={closeForm} />
    </>
  );
};

export default UtilsReports;
