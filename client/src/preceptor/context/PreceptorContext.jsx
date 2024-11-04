import { createContext, useEffect, useReducer } from "react";
import { typeAction } from '../../common/types/type';
import { fetchPreceptor } from "../services/PreceptorService";
import { preceptorReducer } from "../reducer/PreceptorReducer";

export const PreceptorContext = createContext()

const initialState = { preceptores: []}

export const PreceptorProvider = ({children}) => {
    const [state, dispatchPreceptor] = useReducer(preceptorReducer, initialState)

    const findAllPreceptor = (data) => {
        try {
            dispatchPreceptor({type: typeAction.SET_DATA, payload: data})
        } catch (error) {
            console.error("Error al obtener los preceptores", error)
        }
    }

    useEffect(() => {
        const fetchAllPreceptores = async() => {
            try {
                const data = await fetchPreceptor("users/preceptor", "GET", null)
                findAllPreceptor(data.users)
            } catch (error) {
                console.error('Error al obtener los preceptores: ', error);
                iziToast.error({
                    title: 'Error',
                    message: 'Error al cargar los preceptores',
                    position: 'topRight',
                });
            }
        }
        fetchAllPreceptores()
    }, [])

    const createPreceptor = (data) => {
        try {
            dispatchPreceptor({ type: typeAction.ADD_DATA, payload: data})
        } catch (error) {
            console.error('Error al crear los preceptores: ', error);
            iziToast.error({
                title: 'Error',
                message: 'Error al crear los preceptores',
                position: 'topRight',
            });
        }
    }

    const deletePreceptor = (id) => {
        try {
          dispatchPreceptor({
            type: typeAction.DELETE_DATA,
            payload: id
          })
        } catch (error) {
          console.error("Error al eliminar el preceptor. Inténtalo de nuevo.", error);
        }
    }

    return(
        <PreceptorContext.Provider
        value={{preceptores: state.preceptores, dispatchPreceptor, createPreceptor, deletePreceptor}}
        >
            {children}
        </PreceptorContext.Provider>
    )
}