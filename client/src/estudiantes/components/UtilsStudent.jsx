import React from 'react';

const UtilsStudent = () => {
  return (
    <div className="d-flex align-items-center justify-content-between mb-4 p-3 bg-white shadow-lg border-0">
      <div className="d-flex align-items-center">
        <h4 className="me-3">Estudiantes</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar estudiante"
          style={{ maxWidth: '250px' }}
        />
      </div>
      <button className="btn btn-primary">Agregar</button>
    </div>
  );
};

export default UtilsStudent;
