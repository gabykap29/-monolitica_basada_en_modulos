import React from 'react';

const AuditList = ({ logs }) => {
  return (
    <div className="container my-4">
      <table className="table table-hover bg-white rounded-2 shadow-lg text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">Nivel</th>
            <th scope="col">Cliente</th>
            <th scope="col">Usuario</th>
            <th scope="col">Servicio</th>
            <th scope="col">Estado</th>
            <th scope="col">Método</th>
            <th scope="col">Url</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className={log.level === 'Error' ? 'table-danger' : ''}>
              <td>{log.level}</td>
              <td>{log.message.cliente}</td>
              <td>{log.message.usuario}</td>
              <td>{log.service}</td>
              <td>{log.message.estado}</td>
              <td>{log.message.metodo}</td>
              <td>{log.message.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditList;
