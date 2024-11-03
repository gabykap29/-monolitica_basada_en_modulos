import iziToast from "izitoast"
import 'izitoast/dist/css/iziToast.min.css';
import { fetchStudent } from "../services/StudentService";
import Swal from 'sweetalert2';

// Función auxiliar para manejar un registro exitoso
export const handleRegistroSuccess = (data, reset, navigate, createStudent) => {
    createStudent(data.user);
  
    // Notifica al usuario
    iziToast.success({
      title: "Éxito",
      message: data.message,
      position: "topRight",
    });
  
    // Reinicia formulario y redirige
    reset();
    navigate("/IPF/students/");
};
  
  // Función auxiliar para manejar un error de estudiantes
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

export const handleDeleteStudent = async (id, deleteStudent) => {
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
      const data = await fetchStudent(`users/${id}`, "DELETE", null);

      deleteStudent(id);

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
      console.error("Error al eliminar el estudiante", error);
    }
  }
};