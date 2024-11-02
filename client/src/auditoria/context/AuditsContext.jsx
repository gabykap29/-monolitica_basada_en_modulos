import { createContext, useEffect, useState } from "react";
import { fetchLogs } from "../services/AuditsService";

export const AuditContext = createContext()

export const AuditProvider = ({children}) => {
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])

  const findAllLogs = (data) => {
    try {
      setLogs(data)
      setFilteredLogs(data);
    } catch (error) {
      console.error("Error al traer los estudiantes. Inténtalo de nuevo.", error);
    }
  }

  useEffect(() => {
    const fetchAudit = async() => {
      try {
        const data = await fetchLogs("logs/combined", "GET")
        if (!data.ok) {
          findAllLogs(data.logs);
        } else {
          console.error('Error al obtener los logs:', data);
        }
      } catch (error) {
        console.error('Error interno en el Servidor');
      }
    }
    fetchAudit()
  }, [])

  return(
    <AuditContext.Provider
    value={{logs, setLogs, filteredLogs, setFilteredLogs}}
    >
      {children}
    </AuditContext.Provider>
  )
}