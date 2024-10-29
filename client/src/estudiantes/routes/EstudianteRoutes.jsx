import { Route, Routes } from "react-router-dom";
import { StudentPage } from "../pages/StudentPage";
import { StudentCreate } from "../pages/StudentCreate";

export const EstudianteRoutes = () => {
    return(
        <Routes>
            <Route path="/students/" element={<StudentPage />}/>
            <Route path="/students/create/" element={<StudentCreate />}/>
        </Routes>
    )
}