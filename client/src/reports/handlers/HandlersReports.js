import { fetchReports } from "../services/ReportService";
import iziToast from "izitoast";
import Swal from "sweetalert2";

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

export const handleDeleteReport = async (id, deleteReport) => {
  // Muestra la confirmación al usuario
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esto",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

  // Verifica si el usuario confirmó la eliminación
  if (result.isConfirmed) {
    try {
      const data = await fetchReports(`reports/${id}`, "DELETE", null);

      deleteReport(id);

      // Notifica al usuario de éxito
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
      console.error("Error al eliminar el reporte", error);
    }
  }
};