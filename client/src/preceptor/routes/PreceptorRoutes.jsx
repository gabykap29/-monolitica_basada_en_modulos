import { Route, Routes } from "react-router-dom"
import { PreceptorPage } from "../pages/PreceptorPage";
import { PreceptorCreate } from "../pages/PreceptorCreate";

export const PreceptorRoutes = () => {
    return(
        <Routes>
            <Route path="/preceptores/" element={<PreceptorPage />}/>
            <Route path="/preceptores/create/" element={<PreceptorCreate />}/>
        </Routes>
    )
}