import { Route, Routes } from "react-router-dom";
import { AuditPage } from "../pages/AuditPage";

export const AuditsRoutes = () => {
    return(
        <Routes>
            <Route path="/audits/" element={<AuditPage />}/>
        </Routes>
    )
}