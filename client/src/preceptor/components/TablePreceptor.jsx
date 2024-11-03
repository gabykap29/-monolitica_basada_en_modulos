import React, { useContext, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { PreceptorContext } from '../context/PreceptorContext';
import InformationPreceptor from "./InformationPreceptor";
import UtilsPreceptor from './UtilsPreceptor';
import { handleDeletePreceptor } from "../handlers/HandlersPreceptor";

const TablePreceptor = () => {
  const { preceptores, deletePreceptor } = useContext(PreceptorContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Mostrar Modal
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // Cerrar Modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <UtilsPreceptor />
      <table className="table table-hover bg-white rounded-2 shadow-lg">
        <thead className="table-dark">
          <tr>
            <th scope="col">Nombres</th>
            <th scope="col">Apellido</th>
            <th scope="col">DNI</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {preceptores && preceptores.length > 0 ? (
            preceptores.map((preceptor) => (
              <tr key={preceptor._id}>
                <td>{preceptor.names}</td>
                <td>{preceptor.lastname}</td>
                <td>{preceptor.dni}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button 
                      onClick={() => handleViewDetails(preceptor)}
                      className="btn btn-link text-primary p-0">
                      <FaEye />
                    </button>
                    <button 
                      className="btn btn-link text-danger p-0"
                      onClick={() => handleDeletePreceptor(preceptor._id, deletePreceptor)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                {preceptores ? "No hay preceptores disponibles" : "Cargando..."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <InformationPreceptor isModalOpen={isModalOpen} closeModal={closeModal} selectedUser={selectedUser} />
    </>
  );
};

export default TablePreceptor;
