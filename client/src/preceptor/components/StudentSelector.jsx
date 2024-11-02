import { useEffect, useState } from 'react'
import { useApiFetch } from '../../common/hooks/apiFetch'

export const StudentSelector = ({ setEvents }) => {

    const [students, setStudents] = useState([])
    const [selectedStudent, setSelectedStudent] = useState('');

    const handleSelectChange = (event) => {
        setSelectedStudent(event.target.value);
    };

    useEffect(() => {
        (async () => {
            const response = await useApiFetch("/users/student", "GET")

            if (response.users) {
                setStudents(response.users)
            }
        })()
    }, [])

    const handleAttendance = async (e, id) => {
        e.preventDefault()

        const response = await useApiFetch("/attendances", "GET", "", id)

        console.log(response);

    }

    return (
        <form onSubmit={(e) => handleAttendance(e, selectedStudent)}>
            <label className='px-2' htmlFor="studentSelect">Selecciona un estudiante: </label>
            <select className='mx-2' id="studentSelect" value={selectedStudent} onChange={handleSelectChange}>
                <option value="">Seleccione un estudiante</option>
                {students.map((student) => (
                    <option key={student._id} value={student._id}>
                        {student.names + " " + student.lastname}
                    </option>
                ))}
            </select>

            <button type='submit' className='btn btn-primary'>Buscar asistencias del estudiante</button>
        </form>
    )
}
