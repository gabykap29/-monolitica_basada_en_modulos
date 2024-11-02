import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/components/Sidebar'
import Header from '../../common/components/Header'
import AuditFilter from '../components/AuditFilter'
import AuditList from '../components/AuditList';

export const AuditPage = () => {

  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  // Llama a la API para obtener los logs al cargar el componente
  useEffect(() => {
    fetch('http://localhost:4000/api/logs/combined')
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setLogs(data.logs);
          setFilteredLogs(data.logs);
        } else {
          console.error('Error al obtener los logs:', data);
        }
      })
      .catch(error => console.error('Error en la conexión:', error));
  }, []);

  // Filtra los logs según el nivel y las fechas seleccionadas
  const handleFilter = (filters) => {
    const { level, startDate, endDate } = filters;
    const filtered = logs.filter(log => {
      const logDate = new Date(log.timestamp);
      return (
        (!level || log.level === level) &&
        (!startDate || logDate >= new Date(startDate)) &&
        (!endDate || logDate <= new Date(endDate))
      );
    });
    setFilteredLogs(filtered);
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
          <main className="col-md-9 col-lg-10 px-0" style={{ overflowY: "auto", height: "100%", backgroundColor: "#f0f0f0" }}>
            <Header />
            <div className="container mt-4 p-4">
                <AuditFilter onFilter={handleFilter} />
                <AuditList logs={filteredLogs} />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
