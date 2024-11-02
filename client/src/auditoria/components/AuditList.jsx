import React from 'react';

const AuditList = ({ logs }) => {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Audit Logs</h2>
      <table className="table table-hover table-bordered text-center bg-dark">
        <thead className="thead-dark">
          <tr>
            <th scope="col" style={{ width: '20%' }}>Nivel</th>
            <th scope="col" style={{ width: '60%' }}>Mensaje</th>
            <th scope="col" style={{ width: '20%' }}>Servicio</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className={log.level === 'Error' ? 'table-danger' : ''}>
              <td className="align-middle">{log.level}</td>
              <td className="align-middle text-left">{log.message}</td>
              <td className="align-middle">{log.service}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditList;
