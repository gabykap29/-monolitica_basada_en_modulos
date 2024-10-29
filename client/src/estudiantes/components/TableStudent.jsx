import React, { useContext, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { fetchStudent } from "../services/StudentService";
import { typeAction } from "../../common/types/type";
import { StudentContext } from "../context/StudentContext";

const TableStudent = () => {
  const { dispatchStudents, students } = useContext(StudentContext);
  console.log(students)
  // Obtiene estudiantes desde la API (solo una vez al montar el componente)
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchStudent("/users", "GET", null);
      dispatchStudents({ type: typeAction.SET_DATA, payload: data.users });
    };
    fetchUsers();
  }, []);

  return (
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
        {students ? (
          students.map((student) => (
            <tr key={student.dni}>
              <td>{student.names}</td>
              <td>{student.lastname}</td>
              <td>{student.dni}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-link text-primary p-0">
                    <FaEye />
                  </button>
                  <button className="btn btn-link text-warning p-0">
                    <FaEdit />
                  </button>
                  <button className="btn btn-link text-danger p-0">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableStudent;
