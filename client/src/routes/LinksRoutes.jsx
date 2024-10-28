import { Route, Routes } from "react-router-dom"
import MainPage from "../pages/MainPage"

export const LinksRoutes = () => {
    return(
        <Routes>
            <Route path="/dashboard/" element={<MainPage />}/>
        </Routes>
    )
}