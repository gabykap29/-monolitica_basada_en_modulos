import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/api/attendances/671a503ba204c5019ac50b54")
      const data = await response.json()

      const formattedData = data?.attendances?.map((attendance) => ({
        start: dayjs(attendance.createdAt).toDate(),
        end: dayjs(attendance.createdAt).toDate(),
        title: attendance.isPresent ? "Presente" : "Ausente"
      }))

      if (formattedData) {
        addAbsentEvents(formattedData)
      }
    })()
  }, [])

  const addAbsentEvents = (existingEvents) => {
    const startOfMonth = dayjs().startOf("month")
    const endOfMonth = dayjs().endOf("month")
    let currentDate = startOfMonth
    const allEvents = [...existingEvents]

    while (currentDate.isBefore(endOfMonth)) {
      const isWeekend = currentDate.day() === 0 || currentDate.day() === 6
      const dateExists = existingEvents.some(event =>
        dayjs(event.start).isSame(currentDate, 'day')
      )

      if (!isWeekend && !dateExists) {
        allEvents.push({
          start: currentDate.toDate(),
          end: currentDate.toDate(),
          title: "Ausente"
        })
      }
      currentDate = currentDate.add(1, "day")
    }

    setEvents(allEvents)
  }

  const components = {
    event: ({ event }) => (
      <div style={{ backgroundColor: (event.title === "Presente" ? "green" : "red") }}>
        {event.title === "Presente" ? <FaCheck /> : <MdOutlineCancel />}
        {event.title}
      </div>
    )
  }

  const payload = {
    idStudent: "671a503ba204c5019ac50b54",
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
      body: JSON.stringify({ ...attendance, date }), // Asegúrate de incluir la fecha
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
    e.preventDefault()

    // Asegúrate de formatear `date` antes de enviarlo
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    const response = await fetch("http://localhost:4000/api/attendances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: formattedDate }), // Envía el formato correcto
    })

    const data = await response.json()

    console.log(data);
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
