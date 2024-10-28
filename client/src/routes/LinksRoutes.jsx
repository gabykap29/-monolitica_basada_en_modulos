import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/Home/HomePage"
import { StudentPage} from "../pages/Users/StudentPage"

export const LinksRoutes = () => {
    return(
        <Routes>
            <Route path="/home/" element={<HomePage />}/>
            <Route path="/student/" element={<StudentPage />}/>
        </Routes>
    )
}