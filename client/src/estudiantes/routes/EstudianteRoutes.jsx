import { Route, Routes } from "react-router-dom";
import { StudentPage } from "../pages/StudentPage";

export const EstudianteRoutes = () => {
    return(
        <Routes>
            <Route path="/students/" element={<StudentPage />}/>
        </Routes>
    )
}