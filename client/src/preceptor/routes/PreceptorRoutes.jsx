import { Route, Routes } from "react-router-dom"
<<<<<<< HEAD
import HomePage from '../pages/HomePage';
import {PreceptorCalendar} from "../pages/PreceptorAsistencias"
=======
import { PreceptorPage } from "../pages/PreceptorPage";
import { PreceptorCreate } from "../pages/PreceptorCreate";
>>>>>>> develop-Ezequiel

export const PreceptorRoutes = () => {
    return(
        <Routes>
<<<<<<< HEAD
            <Route path="/preceptor" element={<HomePage />}/>
            <Route path="/preceptor/asistencias" element={<PreceptorCalendar />}/>
=======
            <Route path="/preceptores/" element={<PreceptorPage />}/>
            <Route path="/preceptores/create/" element={<PreceptorCreate />}/>
>>>>>>> develop-Ezequiel
        </Routes>
    )
}