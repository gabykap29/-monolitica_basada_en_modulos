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
import { useApiFetch } from '../../common/hooks/apiFetch'

export const PreceptorCalendar = () => {
    dayjs.locale("es")
    const localizer = dayjsLocalizer(dayjs)
    const [events, setEvents] = useState([])
    const [attendance, setAttendance] = useState(null)
    const [day, setDay] = useState([])
    const [date, setDate] = useState([])
    const [view, setView] = useState('month');

    useEffect(() => {
        (async () => {

            const month = dayjs().format("YYYY-MM")
            const response = await useApiFetch("/attendancesMonth", "GET", "", month)

            console.log(response)

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

    useEffect(() => {
        console.log("Eventos actuales:", events);
    }, [events]);

    const components = {
        event: ({ event }) => (
            <div className={`bg-danger border border-white`} >
                {event.title === "Presente" ? <FaCheck /> : <MdOutlineCancel />}
                {event.title}
            </div >
        ),
    }

    // const payload = {
    //     idStudent: "671fa1df22b4b21baf289d93",
    //     isPresent: true
    // }

    const dayPropGetter = (date) => {
        const isToday = dayjs().isSame(date, 'day')
        return isToday ? { style: { backgroundColor: "#38bdf8" } } : {}
    }

    // const markAttendance = async (e) => {
    //     e.preventDefault()

    //     setAttendance(payload)

    //     const response = await fetch("http://localhost:4000/api/attendance", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(payload),
    //     })

    //     const data = await response.json()

    //     alert(JSON.stringify(data))
    //     window.location.reload()
    // }

    const handleSelectSlot = ({ start }) => {
        setDate(start) // Guarda la fecha de inicio seleccionada en el estado
        console.log("Fecha seleccionada:", start); // Imprime la fecha seleccionada
    }

    const findByDate = async (e) => {
        e.preventDefault();

        const formattedDate = dayjs(date).format("YYYY-MM-DD");

        const response = await fetch("http://localhost:4000/api/attendances", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ date: formattedDate }),
        });

        const data = await response.json();

        if (data.status === 200) {
            const attendances = data.attendances.map(attendance => ({
                start: dayjs(attendance.createdAt).toDate(), // Fecha de inicio
                end: dayjs(attendance.createdAt).toDate(), // Fecha de fin
                title: attendance.isPresent ? "Presente" : "Ausente",
                time: dayjs(attendance.createdAt).toDate(),
                student: attendance.idStudent.names + " " + attendance.idStudent.lastname // Añadir nombre completo del estudiante
            }));

            setDay(attendances); // Actualiza el estado de los eventos
            setView('agenda'); // Cambia a la vista de agenda
            console.log("Eventos actualizados:", attendances); // Verifica los eventos
        }
    }

    const CustomAgendaEvent = ({ event }) => (
        <div className='d-flex gap-3'>
            <div className={`${event.title === "Student" ? "bg-succcess" : "bg-danger"} rounded px-1`} >
                <i className='text-white px-2'>
                    {event.title === "Presente" ? <FaCheck /> : <MdOutlineCancel />}
                </i>

                <span className={`${event.title === "Student" ? "bg-succcess" : "bg-danger"} rounded text-white pe-3`}>
                    {`${event.title}`}</span>
            </div>

            <div className='d-flex gap-2 ms-auto'>
                <i className='text-white px-2 bg-warning rounded'>
                    {<FaRegEdit size={20} />}
                </i>

                <i className='text-white px-2 bg-danger rounded'>
                    {< MdOutlineDeleteForever size={22} />}
                </i>
            </div>
        </div>
    );

    const CustomAgendaTime = ({ event }) => (
        <span>{event.student}</span> // Texto personalizado para la columna "Time"
    );

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
                        <div className='pb-2'>
                            {/*    <form onSubmit={markAttendance}>
                                <button type='submit'>Marcar asistencia</button>
                            </form> */}

                            <form onSubmit={findByDate}>
                                <input type="text" placeholder='haga click en una fecha' value={date ? dayjs(date).format("YYYY-MM-DD") : ''} readOnly /> {/* Muestra la fecha en un formato legible */}
                                <button type='submit' className='btn btn-primary'>Buscar por fecha</button>
                            </form>
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
                                month: components
                            }}
                            dayPropGetter={dayPropGetter}
                            onSelectSlot={handleSelectSlot}
                            selectable // Permite la selección de días
                            view={view} // Usar el estado de la vista
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
