import { createContext, useEffect, useReducer } from "react";
import { reportReducer } from "../reducer/ReportsReducers";
import { typeAction } from "../../common/types/type";
import { fetchReports } from "../services/ReportService";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

    useEffect(() => {
      const fetchReportsData = async () => {
        try {
          const data = await fetchReports("reports", "GET", null);
          findAllReports(data);
        } catch (error) {
          console.error('Error al obtener los reportes:', error);
          iziToast.error({
            title: 'Error',
            message: 'Error al cargar los reportes',
            position: 'topRight',
          });
        }
      };
      fetchReportsData();
    }, []);
  

    const createReport = (data) => {
        try {
          dispatchReports({ 
            type: typeAction.ADD_DATA, 
            payload: data 
          });
        } catch (error) {
          console.error("Error al crear el reporte. Inténtalo de nuevo.", error);
        }
      }

    const deleteReport = (id) => {
        try {
          dispatchReports({
            type: typeAction.DELETE_DATA,
            payload: id
          })
        } catch (error) {
          console.error("Error al eliminar el reporte. Inténtalo de nuevo.", error);
        }
    }

    return(
        <ReportContext.Provider
        value={{reports: state.reports, findAllReports, dispatchReports, deleteReport, createReport}}
        >
            {children}
        </ReportContext.Provider>
    )
}