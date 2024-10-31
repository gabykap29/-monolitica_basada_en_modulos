import iziToast from "izitoast"
import 'izitoast/dist/css/iziToast.min.css';

// Función auxiliar para manejar un registro exitoso
export const handleRegistroSuccess = (data, reset, navigate, createStudent) => {
    createStudent(data);
  
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
  
  // Función auxiliar para manejar un error de inicio de sesión
export const handleFailure = (message) => {
    iziToast.error({
        title: "Error",
        message: message || "Error interno en el servidor",
        position: "topRight",
    });
};

export const handleEditSuccess = (message, navigate) => {
    iziToast.success({
      title: "Éxito",
      message: message,
      position: "topRight"
    })

    navigate("/IPF/students/")
}