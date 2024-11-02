import { useApiFetch } from '../../common/hooks/apiFetch'
import { useState } from 'react'

import { Calendar, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from "dayjs"
import "dayjs/locale/es"

import { FaCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export const CalendarAttendance = ({ events, view }) => {
    const localizer = dayjsLocalizer(dayjs)
    const [events, setEvents] = useState([])
    const [day, setDay] = useState([])
    const [date, setDate] = useState([])
    const [view, setView] = useState('month');

    const CustomAgendaTime = ({ event }) => (
        <span>{event.student}</span> // Texto personalizado para la columna "Time"
    );

    const Monthcomponent = {
        event: ({ event }) => (
            <div className={``} >
                {"Ver asistencias"}
            </div >
        ),
    }

    const dayPropGetter = (date) => {
        const isToday = dayjs().isSame(date, 'day')
        return isToday ? { style: { backgroundColor: "#38bdf8" } } : {}
    }

    const handleSelectSlot = ({ start }) => {
        setDate(start)
        console.log("Fecha seleccionada:", start);
    }

    const handleUpdate = async (e, idAttendance, isPersonal) => {
        e.preventDefault()

        const response = await useApiFetch("/attendance", "PUT", null, idAttendance)

        if (response.status === 200) {
            if (isPersonal) {

            } else {
                findByDate({ preventDefault: () => { } });
            }
        }
    }

    const CustomAgendaEvent = ({ event }) => (
        <div className='d-flex gap-3'>
            <div className={`${event.title === "Presente" ? "bg-success" : "bg-danger"} rounded px-1`} >
                <i className='text-white px-2'>
                    {event.title === "Presente" ? <FaCheck /> : <MdOutlineCancel />}
                </i>

                <span className={`text-white pe-3`}>
                    {`${event.title}`}</span>
            </div>

            <div className='d-flex gap-2 ms-auto'>

                <form onSubmit={(e) => handleUpdate(e, event.id)}>
                    <button title='Cambiar asistencia' type='submit' className='text-white px-2 bg-warning rounded border-white'>
                        <i>
                            {<FaRegEdit size={20} />}
                        </i>
                    </button>
                </form>

                <form onSubmit={(e) => handleDelete(e, event.id)}>
                    <button title='Eliminar asistencia' type='submit' className='text-white px-2 bg-danger rounded border-white'>
                        <i>
                            {< MdOutlineDeleteForever size={22} />}
                        </i>
                    </button>
                </form>

            </div>
        </div>
    );

    return (
        <Calendar
            localizer={localizer}
            style={{
                height: 500,
                width: 1000
            }}
            views={["month", 'agenda']}
            defaultView='month'
            events={view === "month" ? events : day}
            components={{
                agenda: { event: CustomAgendaEvent },
                time: CustomAgendaTime,
                month: Monthcomponent
            }}
            dayPropGetter={dayPropGetter}
            onSelectSlot={handleSelectSlot}
            selectable
            view={view}
            onView={setView}
            messages={{
                previous: 'Anterior',
                next: 'Siguiente',
                today: 'Hoy',
                month: "Mes",
                agenda: "Lista",
                time: "Alumno",
                date: "Fecha",
                event: "Asistencia"
            }}
        />
    )
}
