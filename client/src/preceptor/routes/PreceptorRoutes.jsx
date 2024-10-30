import { Route, Routes } from "react-router-dom"
import HomePage from '../pages/HomePage';
import {PreceptorCalendar} from "../pages/PreceptorAsistencias"

export const PreceptorRoutes = () => {
    return(
        <Routes>
            <Route path="/preceptor" element={<HomePage />}/>
            <Route path="/preceptor/asistencias" element={<PreceptorCalendar />}/>
        </Routes>
    )
}