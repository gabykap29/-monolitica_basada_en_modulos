import { useApiFetch } from '../../common/hooks/apiFetch'
import { useEffect, useState } from 'react'

import { Calendar, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from "dayjs"
import "dayjs/locale/es"

import { FaCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import Sidebar from '../../common/components/Sidebar'
import Header from '../../common/components/Header'
import { StudentSelector } from "../components/StudentSelector"

export const PreceptorCalendar = () => {
    dayjs.locale("es")
    const localizer = dayjsLocalizer(dayjs)
    const [events, setEvents] = useState([])
    const [day, setDay] = useState([])
    const [date, setDate] = useState([])
    const [view, setView] = useState('month');

    useEffect(() => {
        (async () => {

            const month = dayjs().format("YYYY-MM")
            const response = await useApiFetch("/attendancesMonth", "GET", "", month)

            if (response.status === 200) {

                const formatedAttendance = response?.attendances?.map((attendance) => ({
                    id: attendance.id,
                    idStudent: attendance.idStudent._id,
                    student: attendance.idStudent.names + " " + attendance.idStudent.lastname,
                    start: new Date(attendance.end),
                    end: new Date(attendance.end),
                    title: attendance.title ? "Presente" : "Ausente"
                }));

                setEvents(formatedAttendance);
            }
        })()
    }, [])

    const dayPropGetter = (date) => {
        const isToday = dayjs().isSame(date, 'day')
        return isToday ? { style: { backgroundColor: "#38bdf8" } } : {}
    }

    const handleSelectSlot = ({ start }) => {
        setDate(start)
        console.log("Fecha seleccionada:", start);
    }

    const findByDate = async (e) => {
        e.preventDefault();

        const formattedDate = dayjs(date).format("YYYY-MM-DD");

        const response = await useApiFetch("/attendances", "POST", { date: formattedDate })

        if (response.status === 200) {
            const attendances = response.attendances.map(attendance => ({
                id: attendance._id,
                start: dayjs(attendance.createdAt).toDate(),
                end: dayjs(attendance.createdAt).toDate(),
                title: attendance.isPresent ? "Presente" : "Ausente",
                time: dayjs(attendance.createdAt).toDate(),
                student: attendance.idStudent.names + " " + attendance.idStudent.lastname
            }));

            setDay(attendances);
            setView('agenda');
            console.log("Eventos actualizados:", attendances);
        }
    }

    const handleUpdate = async (e, idAttendance) => {
        e.preventDefault()

        const response = await useApiFetch("/attendance", "PUT", null, idAttendance)

        if (response.status === 200) {
            findByDate({ preventDefault: () => { } });
        }
    }

    const handleDelete = async (e, idAttendance) => {
        e.preventDefault()

        const response = await useApiFetch("/attendance", "DELETE", null, idAttendance)

        if (response.status === 200) {
            findByDate({ preventDefault: () => { } });
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

    return (

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

                        {/* // !ACCIONES */}
                        <div className='pb-2 d-flex'>
                            <form onSubmit={findByDate}>
                                <input type="text" placeholder='haga click en una fecha' value={date ? dayjs(date).format("YYYY-MM-DD") : ''} readOnly /> {/* Muestra la fecha en un formato legible */}
                                <button type='submit' className='btn btn-primary'>Buscar por fecha</button>
                            </form>

                            <StudentSelector setEvents={setEvents} />
                        </div>


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

                    </div>
                </main>
            </div>
        </div>
    )
}
