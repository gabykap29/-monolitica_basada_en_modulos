import React from 'react';
import { Link } from 'react-router-dom';

const UtilsReports = ({selectedType, handleFilterChange}) => {
  return (
    <div className="d-flex align-items-center justify-content-between mb-4 p-3 bg-white shadow-lg border-0 rounded-2">
        <h4 className="me-3">Reportes</h4>
        <select value={selectedType} onChange={handleFilterChange} className="form-select w-auto">
            <option value="Todos">Todos</option>
            <option value="Notificado de faltas">Notificado de faltas</option>
            <option value="Notificado de estado libre">Notificado de estado libre</option>
        </select>
      <Link to={"/IPF/reports/create/"} className="btn btn-primary">Agregar</Link>
    </div>
  );
};

export default UtilsReports;
