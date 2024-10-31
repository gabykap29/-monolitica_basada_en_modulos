import Swal from 'sweetalert2';
// Función auxiliar para manejar un inicio de sesión exitoso
export const handleLoginSuccess = (data, reset, navigate, login) => {
    // Actualiza estado global
    login(data);
    console.log(data)
  
    // Guarda datos en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.dataUser.role);
  
    // Notifica al usuario
    Swal.fire({
      icon: "success",
      title: "Excelente",
      text: data.message,
    });
  
    // Reinicia formulario y redirige
    reset();
    navigate("/dashboard/");
  };
  
  // Función auxiliar para manejar un error de inicio de sesión
  export const handleLoginFailure = (message) => {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: message,
  });
};