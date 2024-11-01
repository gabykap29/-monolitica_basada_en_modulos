import React, { useContext } from 'react';
import { StudentContext } from '../../estudiantes/context/StudentContext';
import { fetchReports } from '../services/ReportService';
import { ReportContext } from '../context/ReportContext';
import { useForm } from '../../common/hooks/useForm';
import { handleCreateReportSuccess, handleReportFailure } from '../handlers/HandlersReports';
import { useNavigate } from 'react-router-dom';

const CreateReport = ({ isModalOpen, closeForm }) => {

  const {students} = useContext(StudentContext)
  const { createReport } = useContext(ReportContext)
  const navigate = useNavigate()

  const { form, handleInputChange, reset } = useForm({
    studentId: "",
    typeReport: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        // Encuentra el estudiante correspondiente al studentId
        const student = students.find(s => s._id === form.studentId);

        // Crea un nuevo reporte con los datos del estudiante
        const newReport = {
            ...form,
            date: new Date().toISOString(), 
            student: {
                names: student?.names,
                lastname: student?.lastname
            }
        };

        const createdReport = await fetchReports("reports/", "POST", form)
        if(createdReport) {
            handleCreateReportSuccess(newReport, reset, createReport)
        } else {
            handleReportFailure(createdReport.message || "Error Interno en el servidor" )
        }
    } catch (error) {
        handleReportFailure(newReport.message || "Error Interno en el servidor" )
    }
    
    
    closeForm(); 
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Reporte</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="studentSelect" className="form-label">Seleccionar Estudiante</label>
                    <select id="studentSelect" className="form-select" name='studentId' value={form.studentId} onChange={handleInputChange} required>
                        <option value="" disabled>Seleccione un estudiante</option>
                        {students.map(student => (
                            <option key={student._id} value={student._id}>
                            {student.dni} - {student.lastname} {student.names}
                            </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="reportType" className="form-label">Tipo de Reporte</label>
                    <select id="reportSelect" className="form-select" name='typeReport' value={form.typeReport} onChange={handleInputChange} required>
                        <option value="" disabled>Seleccione un tipo de Reporte</option>
                        <option value="Notificado de faltas">Notificado de faltas</option>
                        <option value="Notificado de estado libre">Notificado de estado libre</option>
                    </select>
                  </div>
                  <div className='gap-3 d-flex justify-content-end'>
                    <button onClick={closeForm} className="btn btn-secondary">Cerrar</button>
                    <button type="submit" className="btn btn-primary">Crear Reporte</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateReport;
