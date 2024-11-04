import { useEffect, useState } from 'react'
import { useApiFetch } from '../../common/hooks/apiFetch'
import { FaSearch } from 'react-icons/fa'

export const StudentSelector = ({ handleAttendance }) => {

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

    return (
        <div className='d-flex flex-column'>
            <label className='px-2' htmlFor="studentSelect">Selecciona un estudiante: </label>
            <form onSubmit={(e) => handleAttendance && handleAttendance(e, selectedStudent)} className='d-flex gap-2'>
                <select className='mx-2' id="studentSelect" value={selectedStudent} onChange={handleSelectChange}>
                    <option value="">Seleccione un estudiante</option>
                    {students.map((student) => (
                        <option key={student._id} value={student._id}>
                            {student.names + " " + student.lastname}
                        </option>
                    ))}
                </select>

                <button type='submit' className='btn btn-primary btn-sm'><FaSearch /></button>
            </form>
        </div>
    )
}
