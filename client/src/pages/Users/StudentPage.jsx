import React from 'react'
import Sidebar from '../../components/utils/Sidebar'
import Header from '../../components/utils/Header'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export const StudentPage = () => {
  return (
    <>
      <div className="container-fluid" style={{ height: "100vh" }}>
        <div className="row" style={{ height: "100%" }}>
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 px-0" style={{ height: "100vh" }}>
            <Sidebar />
          </div>

          {/* Main content */}
          <main className="col-md-9 col-lg-10 px-0" style={{ overflowY: "auto", height: "100%", backgroundColor: "#f0f0f0" }}>
            <Header />
            <div className="container mt-4 p-4">
              {/* Buscador */}
                
              {/* Table */}
                <table className="table table-hover bg-white rounded-2">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Nombres</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Teléfono</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td>Eze</td>
                        <td>eze</td>
                        <td>eze</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              // onClick={() => handleViewDetails(user)}
                              className="btn btn-link text-primary p-0"
                            >
                              <FaEye />
                            </button>
                            <button
                              // onClick={() => handleViewEdit(user)}
                              className="btn btn-link text-warning p-0"
                            >
                              <FaEdit />
                            </button>
                            <button className="btn btn-link text-danger p-0">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                  </tbody>
                </table>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
