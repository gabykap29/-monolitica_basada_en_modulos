import React, { useContext, useState } from "react";
import { ReportContext } from "../context/ReportContext";
import { FaTrash } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { handleDeleteReport } from "../handlers/HandlersReports";
import UtilsReports from "./UtilsReports";
import { GraficoReports } from "./GraficoReports";
import { env } from "../../common/config/config";


const CardReports = () => {
  const { reports, deleteReport } = useContext(ReportContext);
  const [selectedType, setSelectedType] = useState("Todos");

  // Funcion para buscar el pdf y descargarlo
  const BuscarPdf = (filename) => {
    const encodedFilename = encodeURIComponent(filename);
    const url = `${env.SERVER_PATH}pdf-reports/${encodedFilename}`;
    // Se usa window.open para abrir la URL en una nueva pestaña
    window.open(url, "_blank");
  };

  const filteredReports = reports.filter((report) =>
    selectedType === "Todos" ? true : report.typeReport === selectedType
  );

  return (
    <div className="d-flex gap-4 justify-content-center">
      <div style={{ width: "80%" }} className="d-flex flex-column justify-content-center align-items-center">
        {/* Filtrador */}
        <UtilsReports selectedType={selectedType} setSelectedType={setSelectedType}/>
        {/* Cards de Reportes */}
        <div className="d-flex flex-wrap gap-4 justify-content-center">
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
                    <button className="btn btn-link text-primary p-0" onClick={() => BuscarPdf(report.pdfFilename)}>
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
      <GraficoReports reports={reports} />
    </div>
  );
};

export default CardReports;
