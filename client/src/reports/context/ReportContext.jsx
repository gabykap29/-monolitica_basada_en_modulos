import { createContext, useReducer } from "react";
import { reportReducer } from "../reducer/ReportsReducers";
import { typeAction } from "../../common/types/type";

export const ReportContext = createContext()

const initialState = {reports: [] }

export const ReportProvider = ({children}) => {
    const [state, dispatchReports] = useReducer(reportReducer, initialState)

    const findAllReports = (data) => {
        try {
            dispatchReports({type: typeAction.SET_DATA, payload: data})
        } catch (error) {
            console.error("Error al traer los reportes. Inténtalo de nuevo.", error);
        }
    }

    return(
        <ReportContext.Provider
        value={{reports: state.reports, findAllReports, dispatchReports}}
        >
            {children}
        </ReportContext.Provider>
    )
}