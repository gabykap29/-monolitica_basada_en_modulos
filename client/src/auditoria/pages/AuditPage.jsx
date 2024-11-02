import React, { useEffect, useState } from 'react';
import Sidebar from '../../common/components/Sidebar';
import Header from '../../common/components/Header';
import AuditFilter from '../components/AuditFilter';
import AuditList from '../components/AuditList';
import { fetchLogs } from '../services/AuditsService';

export const AuditPage = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  // Llama a la API para obtener los logs al cargar el componente
  useEffect(() => {
    const fecthAllAudits = async () => {
      try {
        const data = await fetchLogs("logs/combined", "GET")
        if (!data.ok) {
          setLogs(data.logs);
          setFilteredLogs(data.logs);
        } else {
          console.error('Error al obtener los logs:', data);
        }
      } catch (error) {
        
      }
    }
    fecthAllAudits()
  }, []);

  // Filtra los logs según usuario, estado y método seleccionados
  const handleFilter = (filters) => {
    const { usuario, estado, metodo } = filters;
    const filtered = logs.filter(log => {
      return (
        (!usuario || log.message.usuario === usuario) &&
        (!estado || log.message.estado === parseInt(estado)) &&
        (!metodo || log.message.metodo === metodo)
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
  );
};
