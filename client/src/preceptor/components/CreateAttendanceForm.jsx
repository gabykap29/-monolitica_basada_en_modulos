import { useState, useEffect } from 'react';
import { useForm } from '../../common/hooks/useForm';
import { handleFailure, handleSuccess } from "../handlers/HandlersPreceptor";
import { useApiFetch } from '../../common/hooks/apiFetch';
import { Link } from 'react-router-dom';

export const CreateAttendanceForm = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        (async () => {
            const response = await useApiFetch("/users/student", "GET")

            console.log(response);


            if (response.users) {
                setStudents(response.users)
            }
        })()
    }, [])

    const { form, handleInputChange, reset } = useForm({
        idStudent: "",
        isPresent: "",
    })

    console.log(form);

    const handleSubmitPresent = async (e) => {
        e.preventDefault();
        try {
            const newAttendance = await useApiFetch("/attendance", "POST", form);
            if (newAttendance) {
                handleSuccess("Asitencia creada correctamente");
                reset
            } else {
                handleFailure("Error al crear asitencia")
            }
        } catch (error) {
            handleFailure("Error de conexión. Por favor, intenta nuevamente.");
            console.error("Error de creacion de asistencia:", error);
        }
    };

    const handleSubmitAbsent = async (e) => {
        e.preventDefault();
        try {
            const newAttendance = await useApiFetch("/absent", "POST");
            if (newAttendance) {
                handleSuccess("Asitencias creadas correctamente");
            } else {
                handleFailure("Error al crear asitencias")
            }
        } catch (error) {
            handleFailure("Error de conexión. Por favor, intenta nuevamente.");
            console.error("Error de creacion de asistencias:", error);
        }
    };

    return (
        <div className='bg-white p-4 rounded-2 shadow-lg'>
            <h2 className="mb-3 text-center">Crear Asistencia</h2>
            <Link className='btn btn-secondary' to={"/IPF/preceptor/asistencias"}>Volver atras</Link>

            {/* Datos Personales */}
            <div className="d-flex justify-content-center align-items-start gap-5">

                <form onSubmit={handleSubmitPresent} className="d-flex flex-column justify-content-center me-5">
                    <h4 className="mt-3">Datos del estudiante</h4>

                    <div className="d-flex flex-column align-items-start">
                        <label className='px-2 mt-2' htmlFor="studentSelect">Selecciona un estudiante: </label>
                        <select className='mx-2 mb-2' id="studentSelect" name='idStudent' value={form.idStudent} onChange={handleInputChange}>
                            <option value="">Seleccione un estudiante</option>
                            {students.map((student) => (
                                <option key={student._id} value={student._id}>
                                    {student.names + " " + student.lastname}
                                </option>
                            ))}
                        </select>

                        <label className='px-2 mt-2' htmlFor="studentSelect">Selecciona un estado: </label>

                        <select className='mx-2' id="studentSelect" name='isPresent' value={form.isPresent} onChange={handleInputChange}>
                            <option value="">Seleccione un estado:</option>

                            <option value={true}>
                                Presente
                            </option>

                            <option value={false}>
                                Ausente
                            </option>
                        </select>

                        <button type="submit" className="btn btn-primary m-2">Crear Asistencia</button>
                    </div>
                </form>



                <form onSubmit={handleSubmitAbsent} className='d-flex flex-column justify-content-center ms-5'>
                    <h4 className="mt-3 mb-4">Cargar ausentes del dia</h4>

                    <button className='btn btn-danger'>Cargar ausentes</button>
                </form>

            </div>
        </div>
    );
};
