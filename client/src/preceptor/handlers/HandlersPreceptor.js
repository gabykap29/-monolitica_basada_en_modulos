import iziToast from "izitoast"
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPreceptor } from "../services/PreceptorService";

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

export const handleDeletePreceptor = async(id, deletePreceptor) => {
  try {
    const data = await fetchPreceptor(`users/${id}`, "DELETE", null)

    deletePreceptor(id)
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
    console.error("Error al eliminar el preceptor", error)
  }
}