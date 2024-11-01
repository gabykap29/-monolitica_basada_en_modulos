import React, { useContext, useEffect, useState } from "react";
import { ReportContext } from "../context/ReportContext";
import { fetchReports } from "../services/ReportService";
import { FaTrash } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { handleDeleteReport } from "../handlers/HandlersReports";
import UtilsReports from "./UtilsReports";

// Se registran los elementos para Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const CardReports = () => {
  const { findAllReports, dispatchReports, reports, deleteReport } = useContext(ReportContext);
  const [selectedType, setSelectedType] = useState("Todos");

  useEffect(() => {
    const fetchReportsData = async () => {
      const data = await fetchReports("/reports", "GET", null);
      findAllReports(data);
    };
    fetchReportsData();
  }, [dispatchReports]);

  // Funcion para filtrar los reportes
  const handleFilterChange = (e) => {
    setSelectedType(e.target.value);
  };

  const filteredReports = reports.filter((report) =>
    selectedType === "Todos" ? true : report.typeReport === selectedType
  );

  // Para realizar el gráfico
  const reportTypes = ["Notificado de faltas", "Notificado de estado libre"];
  const reportCounts = reportTypes.map(
    (type) => reports.filter((report) => report.typeReport === type).length
  );

  const data = {
    labels: reportTypes,
    datasets: [
      {
        data: reportCounts,
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="d-flex gap-4 justify-content-center">
      <div style={{ width: "80%" }}>
        {/* Filtrador */}
        <UtilsReports selectedType={selectedType} handleFilterChange={handleFilterChange}/>
        {/* Cards de Reportes */}
        <div className="d-flex flex-wrap gap-4">
          {filteredReports && filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report._id}
                className="card bg-light shadow-sm p-3"
                style={{
                  width: "250px",
                  height: "300px",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{report.student.names} {report.student.lastname}</h5>
                  <p className="card-text"><strong>Fecha:</strong> {report.date}</p>
                  <p className="card-text"><strong>Tipo de Reporte:</strong> {report.typeReport}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-link text-primary p-0">
                      <FaFilePdf size={20} />
                    </button>
                    <button
                      className="btn btn-link text-danger p-0"
                      onClick={() => handleDeleteReport(report._id, deleteReport)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-100">{reports ? "No hay reportes disponibles" : "Cargando..."}</div>
          )}
        </div>
      </div>
      {/* Grafico de torta */}
      <div className="d-flex justify-content-center" style={{ width: "250px", height: "250px" }}>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default CardReports;
