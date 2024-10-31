import React, { useContext, useEffect } from "react";
import { ReportContext } from "../context/ReportContext";
import { fetchReports } from "../services/ReportService";
import { FaTrash } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

const TableReports = () => {
  const {findAllReports, dispatchReports, reports} = useContext(ReportContext)
  // Obtiene reportes desde la API (solo una vez al montar el componente)
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchReports("/reports", "GET", null);
      findAllReports(data)
    };
    fetchUsers();
  }, [dispatchReports]);

  return (
    <>
    <table className="table table-hover bg-white rounded-2 shadow-lg">
      <thead className="table-dark">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Fecha</th>
          <th scope="col">Tipo de Reporte</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {reports && reports.length > 0 ? (
          reports.map((report) => (
            <tr key={report._id}>
              <td>{report.student.names}</td>
              <td>{report.student.lastname}</td>
              <td>{report.date}</td>
              <td>{report.typeReport}</td>
              <td>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-link text-primary p-0">
                    <FaFilePdf />
                  </button>
                  <button 
                    className="btn btn-link text-danger p-0"
                    // onClick={() => handleDeletereport(report._id, deletereport)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              {reports ? "No hay reportes disponibles" : "Cargando..."}
            </td>
          </tr>
        )}
      </tbody>
    </table>
    {/* <InformationStudent isModalOpen={isModalOpen} closeModal={closeModal} selectedUser={selectedUser}/> */}
    </>
  );
};

export default TableReports;
