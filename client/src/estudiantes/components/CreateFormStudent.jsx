import React, { useState, useContext } from "react";
import { FaUser, FaCalendarAlt, FaIdCard, FaMapMarkerAlt, FaPhone, FaUserCircle, FaLock, FaEnvelope } from "react-icons/fa";
import { StudentContext } from "../context/StudentContext";
import { fetchStudent } from "../services/StudentService";
import { useForm } from '../../common/hooks/useForm';
import { handleFailure, handleRegistroSuccess } from "../handlers/HandlersStudent";
import { Link, useNavigate } from "react-router-dom";

const CreateStudentForm = () => {
  const { createStudent } = useContext(StudentContext);
  const navigate = useNavigate();

  const {form, handleInputChange, reset} = useForm({
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
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newStudent = await fetchStudent("/users", "POST", form);
      if (newStudent) {
        handleRegistroSuccess(newStudent, reset, navigate, createStudent);
      } else {
        handleFailure(newStudent.message || "Error Interno" )
      }
    } catch (error) {
      handleFailure("Error de conexión. Por favor, intenta nuevamente.");
      console.error("Error en el login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2 shadow-lg">
      <h2 className="mb-3 text-center">Crear Estudiante</h2>

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

      {/* Datos de Usuario */}
      <h4 className="mt-4">Datos de Usuario</h4>
      <div className="row">
        <div className="col-md-4 mb-3 d-flex align-items-center">
          <FaUserCircle className="me-2" />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Nombre de usuario"
            required
          />
        </div>
        <div className="col-md-4 mb-3 d-flex align-items-center">
          <FaLock className="me-2" />
          <input
            type="password"
            name="pass"
            value={form.pass}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="col-md-4 mb-3 d-flex align-items-center">
          <FaEnvelope className="me-2" />
          <input
            type="email"
            name="mail"
            value={form.mail}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Correo electrónico"
            required
          />
        </div>
      </div>

      <Link to={"/IPF/students/"} className="btn btn-secondary m-2">Volver</Link>
      <button type="submit" className="btn btn-primary m-2">Crear Estudiante</button>
    </form>
  );
};

export default CreateStudentForm;
