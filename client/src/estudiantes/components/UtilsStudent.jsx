import React from 'react';
import { Link } from 'react-router-dom';

const UtilsStudent = ({filterDNI, setFilterDNI}) => {
  return (
    <div className="d-flex align-items-center justify-content-between mb-4 p-3 bg-white shadow-lg border-0 rounded-2">
      <div className="d-flex align-items-center">
        <h4 className="me-3">Estudiantes</h4>
        <input
          type="text"
          placeholder="Filtrar por DNI"
          value={filterDNI}
          onChange={(e) => setFilterDNI(e.target.value)}
          className="form-control"
          style={{ maxWidth: '250px' }}
        />
      </div>
      <Link to={"/IPF/students/create/"} className="btn btn-primary">Agregar</Link>
    </div>
  );
};

export default UtilsStudent;
