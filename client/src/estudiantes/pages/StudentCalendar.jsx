import { useEffect, useState } from 'react'
import { Calendar, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from "dayjs"
import "dayjs/locale/es"
import { FaCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { useApiFetch } from '../../common/hooks/apiFetch'
import { useToggle } from "../../common/hooks/useToggle"
import { handleFailure } from '../../preceptor/handlers/HandlersPreceptor'

export const StudentCalendar = () => {
    dayjs.locale("es")
    const localizer = dayjsLocalizer(dayjs)
    const [events, setEvents] = useState([])
    const { handleToggle, toggle } = useToggle()
    const [absents, setAbsents] = useState(0)
    const [fullAbsents, setFullAbsents] = useState(6)

    useEffect(() => {
        (async () => {

            const response = await useApiFetch("/attendances", "GET")

            const absentCount = response.attendances?.filter(attendance => !attendance.isPresent).length || 0;

            if (response.status === 200) {

                const formatedAttendance = response?.attendances?.map((attendance) => ({
                    id: attendance._id,
                    idStudent: attendance.idStudent,
                    start: new Date(attendance.createdAt),
                    end: new Date(attendance.createdAt),
                    title: attendance.isPresent ? "Presente" : "Ausente"
                }));

                setEvents(formatedAttendance);
                setAbsents(absentCount);
                setFullAbsents(fullAbsents - absentCount)
            }
        })()
    }, [toggle])

    const components = {
        event: ({ event }) => (
            <div className={`${event.title === "Presente" ? "bg-success" : "bg-danger"}  border border-white`} >
                {event.title === "Presente" ? <FaCheck /> : <MdOutlineCancel />}
                {event.title}
            </div >
        ),
    }

    const markAttendance = async (e) => {
        e.preventDefault()

        const attendance = await useApiFetch("/attendance", "POST", { isPresent: true })

        if (attendance.status !== 200) {
            handleFailure(attendance.attendance)
            handleToggle(!toggle)
        } else {
            handleFailure(attendance.attendance)
            handleToggle(!toggle)
        }
    }

    return (

        <div className='flex '>
            {/* // !ACCIONES */}
            <div className='pb-2 d-flex align-items-start gap-5'>
                <form onSubmit={markAttendance}>
                    <button className='btn btn-primary' type='submit'>Marcar Presente</button>
                </form>

                <p>Cantidad de faltas: <span className={`${absents > 6 && "text-danger"}`}>{absents}</span></p>

                <p>Cantidad de faltas restantes para quedar libre: <span className={`${absents > 6 && "text-danger"}`} >{fullAbsents > 0 ? fullAbsents : "Estas libre"}</span></p>

            </div>

            <Calendar
                localizer={localizer}
                style={{
                    height: 500,
                    width: 1000
                }}
                views={["month"]}
                defaultView='month'
                events={events}
                components={{
                    month: components
                }}
                view={"month"}
                messages={{
                    previous: 'Anterior',
                    next: 'Siguiente',
                    today: 'Hoy',
                    month: "Mes",
                }}
            />
        </div>
    )
}
