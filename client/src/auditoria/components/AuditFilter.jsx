import React, { useState } from 'react';

const AuditFilter = ({ onFilter }) => {
  const [level, setLevel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ level, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-3">
          <label htmlFor="level" className="form-label">Nivel de Log</label>
          <select
            id="level"
            className="form-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="info">Info</option>
            <option value="error">Error</option>
          </select>
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="startDate" className="form-label">Fecha de Inicio</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="endDate" className="form-label">Fecha de Fin</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <button type="submit" className="btn btn-primary w-100">Filtrar</button>
        </div>
      </div>
    </form>
  );
}

export default AuditFilter;
