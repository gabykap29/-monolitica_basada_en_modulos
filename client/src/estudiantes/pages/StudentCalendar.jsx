import { useEffect, useState } from 'react'
import { Calendar, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from "dayjs"
import "dayjs/locale/es"
import { FaCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { useApiFetch } from '../../common/hooks/apiFetch'
import { useToggle } from "../../common/hooks/useToggle"

export const StudentCalendar = () => {
    dayjs.locale("es")
    const localizer = dayjsLocalizer(dayjs)
    const [events, setEvents] = useState([])
    const { handleToggle, toggle } = useToggle()

    useEffect(() => {
        (async () => {

            const response = await useApiFetch("/attendances", "GET")

            console.log(response)

            if (response.status === 200) {

                const formatedAttendance = response?.attendances?.map((attendance) => ({
                    id: attendance._id,
                    idStudent: attendance.idStudent,
                    start: new Date(attendance.createdAt),
                    end: new Date(attendance.createdAt),
                    title: attendance.isPresent ? "Presente" : "Ausente"
                }));

                setEvents(formatedAttendance);
            }
        })()
    }, [])

    useEffect(() => {
        console.log("Eventos actuales:", events);
    }, [events]);

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

        if (attendance.status === 200) {
            alert("asistencia marcada correctamente")
            handleToggle(!toggle)
        }
    }

    return (

        <div className='flex '>
            {/* // !ACCIONES */}
            <div className='pb-2'>
                <form onSubmit={markAttendance}>
                    <button className='btn btn-primary' type='submit'>Marcar Presente</button>
                </form>

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
