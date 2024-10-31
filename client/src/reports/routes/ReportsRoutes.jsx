import { Route, Routes } from "react-router-dom";
import { ReportsPage } from '../pages/ReportsPage';

export const ReportsRoutes = () => {
    return(
        <Routes>
            <Route path="/reports/" element={<ReportsPage />}/>
        </Routes>
    )
}