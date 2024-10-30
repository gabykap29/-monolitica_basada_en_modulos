import React, { useState, useContext, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaIdCard, FaMapMarkerAlt, FaPhone, FaUserCircle, FaLock, FaEnvelope } from "react-icons/fa";
import { StudentContext } from "../context/StudentContext";
import { fetchStudent } from "../services/StudentService";
import { handleRegisterFailure, handleRegistroSuccess } from "../handlers/HandlersStudent";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditFormStudent = () => {
  const { createStudent } = useContext(StudentContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    names: "",
    lastname: "",
    birthdate: "",
    dni: "",
    address: "",
    phone: "",
    username: "",
    pass: "",
    mail: "",
    role: "student"
  });

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const { user } = await fetchStudent(`user/${id}`, "GET", null);

        const formattedData = {
          names: user.names,
          lastname: user.lastname,
          birthdate: formattedDate(user.birthdate),
          dni: user.dni,
          address: user.address,
          phone: user.phone,
          username: user.username,
          pass: user.pass,
          mail: user.mail,
          role: user.role
        }
        setForm(formattedData)
      } catch (error) {
        handleRegisterFailure("Error al cargar los datos del estudiante.");
        console.error("Error al obtener el estudiante:", error);
      }
    };
    getStudentData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const formattedDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedStudent = await fetchStudent(`/users/${id}`, "PUT", form);
      if (updatedStudent) {
        handleRegistroSuccess(updatedStudent, null, navigate, createStudent);
      } else {
        handleRegisterFailure(updatedStudent.message || "Error Interno");
      }
    } catch (error) {
      handleRegisterFailure("Error de conexión. Por favor, intenta nuevamente.");
      console.error("Error al actualizar el estudiante:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2 shadow-lg">
      <h2 className="mb-3 text-center">Editar Estudiante</h2>

      {/* Datos Personales */}
      <h4 className="mt-3">Datos Personales</h4>
      <div className="row">
        <div className="col-md-4 mb-3 d-flex align-items-center">
          <FaUser className="me-2" />
          <input
            type="text"
            name="names"
            value={form.names}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Ingresa el nombre"
            required
          />
        </div>
        <div className="col-md-4 mb-3 d-flex align-items-center">
          <FaUser className="me-2" />
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Ingresa el apellido"
            required
          />
        </div>
        <div className="col-md-4 mb-3 d-flex align-items-center">
          <FaCalendarAlt className="me-2" />
          <input
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4 mb-3 d-flex align-items-center">
          <FaIdCard className="me-2" />
          <input
            type="number"
            name="dni"
            value={form.dni}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Ingresa el DNI"
            required
          />
        </div>
        <div className="col-md-4 mb-3 d-flex align-items-center">
          <FaMapMarkerAlt className="me-2" />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Ingresa la dirección"
            required
          />
        </div>
        <div className="col-md-4 mb-3 d-flex align-items-center">
          <FaPhone className="me-2" />
          <input
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Ingresa el teléfono"
            required
          />
        </div>
      </div>

      <Link to={"/IPF/students/"} className="btn btn-secondary m-2">Volver</Link>
      <button type="submit" className="btn btn-primary m-2">Actualizar Estudiante</button>
    </form>
  );
};

export default EditFormStudent;
