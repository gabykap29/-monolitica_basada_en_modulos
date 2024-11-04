import { Route, Routes } from "react-router-dom"
import HomePage from '../pages/HomePage';
import { PreceptorCalendar } from "../pages/PreceptorAsistencias"
import { PreceptorPage } from "../pages/PreceptorPage";
import { PreceptorCreate } from "../pages/PreceptorCreate";
import { PreceptorAsistenciasManual } from "../pages/PreceptorAsistenciasManual";


export const PreceptorRoutes = () => {
    return (
        <Routes>
            <Route path="/preceptores/asistencias/" element={<PreceptorCalendar />} />
            <Route path="/preceptor/asistencias/create" element={<PreceptorAsistenciasManual />} />
            <Route path="/preceptores/" element={<PreceptorPage />} />
            <Route path="/preceptores/create/" element={<PreceptorCreate />} />
        </Routes>
    )
}