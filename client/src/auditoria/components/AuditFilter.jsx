import React, { useState } from 'react';

const AuditFilter = ({ onFilter }) => {
  const [usuario, setUsuario] = useState('');
  const [estado, setEstado] = useState('');
  const [metodo, setMetodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ usuario, estado, metodo });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row gx-2">
        {/* Filtro por Usuario */}
        <div className="col-12 col-md-4">
          <label htmlFor="usuario">Usuario</label>
          <select
            id="usuario"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="admin">Admin</option>
            <option value="No logged">No logged</option>
          </select>
        </div>

        {/* Filtro por Estado */}
        <div className="col-12 col-md-4">
          <label htmlFor="estado">Estado</label>
          <input
            type="number"
            id="estado"
            className="form-control"
            value={estado}
            placeholder="e.g., 200, 404"
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>

        {/* Filtro por Método */}
        <div className="col-12 col-md-4">
          <label htmlFor="metodo">Método</label>
          <select
            id="metodo"
            className="form-control"
            value={metodo}
            onChange={(e) => setMetodo(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        {/* Botón de Filtrado */}
        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary w-100">Filtrar</button>
        </div>
      </div>
    </form>
  );
};

export default AuditFilter;
