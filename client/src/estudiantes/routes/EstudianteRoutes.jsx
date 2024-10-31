import { Route, Routes } from "react-router-dom";
import { StudentPage } from "../pages/StudentPage";
import { StudentCreate } from "../pages/StudentCreate";
import { StudentEdit } from "../pages/StudentEdit";
import { StudentCalendar } from "../pages/StudentCalendar";

export const EstudianteRoutes = () => {
    return (
        <Routes>
            <Route path="/students" element={<StudentPage />} />
            <Route path="/students/calendar" element={<StudentCalendar />} />
            <Route path="/students/create/" element={<StudentCreate />} />
            <Route path="/students/edit/:id" element={<StudentEdit />} />
        </Routes>
    )
}