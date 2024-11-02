import { fetchReports } from "../services/ReportService";
import iziToast from "izitoast";

// Función auxiliar para manejar un registro exitoso
export const handleCreateReportSuccess = (reset) => {

  // Notifica al usuario
  iziToast.success({
    title: "Éxito",
    message: "Reporte creado Exitosamente",
    position: "topRight",
  });

  // Reinicia formulario y redirige
  reset();
};

// Función auxiliar para manejar un error de estudiantes
export const handleReportFailure = (message) => {
    iziToast.error({
        title: "Error",
        message: message || "Error interno en el servidor",
        position: "topRight",
    });
};

export const handleDeleteReport = async(id, deleteReport) => {
    try {
      const data = await fetchReports(`reports/${id}`, "DELETE", null)
  
      deleteReport(id)
      // Notifica al usuario
      iziToast.success({
        title: "Éxito",
        message: data.message,
        position: "topRight",
      });
      
    } catch (error) {
      iziToast.error({
          title: "Error",
          message: "Error interno en el servidor",
          position: "topRight",
      });
      console.error("Error al eliminar el estudiante", error)
    }
}