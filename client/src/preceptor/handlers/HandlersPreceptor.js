import iziToast from "izitoast"
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPreceptor } from "../services/PreceptorService";
import Swal from 'sweetalert2';

// Función auxiliar para manejar un registro exitoso
export const handleRegistroSuccess = (data, reset, navigate, createPreceptor) => {
    createPreceptor(data.user);
  
    // Notifica al usuario
    iziToast.success({
      title: "Éxito",
      message: data.message,
      position: "topRight",
    });
  
    // Reinicia formulario y redirige
    reset();
    navigate("/IPF/preceptores/");
};
  
// Función auxiliar para manejar un error de preceptores
export const handleFailure = (message) => {
    iziToast.error({
        title: "Error",
        message: message || "Error interno en el servidor",
        position: "topRight",
    });
};

export const handleEditSuccess = (data, navigate, updateStudent) => {
    updateStudent(data.user)
    iziToast.success({
      title: "Éxito",
      message: data.message,
      position: "topRight"
    })
    navigate("/IPF/students/")
}

export const handleDeletePreceptor = async (id, deletePreceptor) => {
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
      const data = await fetchPreceptor(`users/${id}`, "DELETE", null);

      deletePreceptor(id);

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
      console.error("Error al eliminar el preceptor", error);
    }
  }
};