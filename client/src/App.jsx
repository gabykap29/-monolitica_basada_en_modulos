import { useEffect, useState, useRef } from 'react'
import { Calendar, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from "dayjs"
import "dayjs/locale/es"
import { FaCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";

const App = () => {
  dayjs.locale("es")
  const localizer = dayjsLocalizer(dayjs)
  const [events, setEvents] = useState([])
  const [attendance, setAttendance] = useState(null)
  const [date, setDate] = useState(null)
  const [view, setView] = useState('month');
  const previousCount = useRef(events);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/api/attendances/671fa1df22b4b21baf289d93")
      const data = await response.json()

      const formattedData = data?.attendances?.map((attendance) => ({
        id: attendance._id,
        start: dayjs(attendance.createdAt).toDate(),
        end: dayjs(attendance.createdAt).toDate(),
        title: attendance.isPresent ? "Presente" : "Ausente",
        idStudent: attendance.idStudent,
      }))


      setEvents(formattedData)
    })()
  }, [])

  useEffect(() => {
    console.log("Eventos actuales:", events);
  }, [events]);

  const components = {
    event: ({ event }) => (
      <div style={{ backgroundColor: (event.title === "Presente" ? "green" : "red") }}>
        {event.title === "Presente" ? <FaCheck /> : <MdOutlineCancel />}
        {event.title}
      </div>
    )
  }

  const payload = {
    idStudent: "671fa1df22b4b21baf289d93",
    isPresent: true
  }

  const dayPropGetter = (date) => {
    const isToday = dayjs().isSame(date, 'day')
    return isToday ? { style: { backgroundColor: 'blue' } } : {}
  }

  const markAttendance = async (e) => {
    e.preventDefault()

    setAttendance(payload)

    const response = await fetch("http://localhost:4000/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Asegúrate de incluir la fecha
    })

    const data = await response.json()

    alert(JSON.stringify(data))
    window.location.reload()
  }

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
        end: dayjs(attendance.createdAt).toDate(), // Fecha de fin (un día después)
        title: attendance.isPresent ? "Presente" : "Ausente"
      }));

      setEvents(attendances); // Actualiza el estado de los eventos
      setView('agenda'); // Cambia a la vista de agenda
      console.log("Eventos actualizados:", attendances); // Verifica los eventos
    }
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        style={{
          height: 500,
          width: 1000
        }}
        views={["month", "agenda"]}
        defaultView='month'
        events={events}
        components={components}
        dayPropGetter={dayPropGetter}
        onSelectSlot={handleSelectSlot}
        selectable // Permite la selección de días
        view={view} // Usar el estado de la vista
        onView={setView}
      />

      <form onSubmit={markAttendance}>
        <button type='submit'>Marcar asistencia</button>
      </form>

      <form onSubmit={findByDate}>
        <input type="text" value={date ? dayjs(date).format("YYYY-MM-DD") : ''} readOnly /> {/* Muestra la fecha en un formato legible */}
        <button type='submit'>Buscar por fecha</button>
      </form>
    </div>
  )
}

export default App
