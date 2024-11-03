import React from 'react';
import { Link } from 'react-router-dom';

const UtilsPreceptor = () => {
  return (
    <div className="d-flex align-items-center justify-content-between mb-4 p-3 bg-white shadow-lg border-0 rounded-2">
      <h4 className="me-3">Preceptores</h4>
      <Link to={"/IPF/preceptores/create/"} className="btn btn-primary">Agregar</Link>
    </div>
  );
};

export default UtilsPreceptor;
