import { Route, Routes } from "react-router-dom"
import HomePage from '../pages/HomePage';

export const PreceptorRoutes = () => {
    return(
        <Routes>
            <Route path="/home/" element={<HomePage />}/>
        </Routes>
    )
}