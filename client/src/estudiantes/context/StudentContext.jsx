import { createContext, useReducer } from "react";
import { actionsReducer } from "../reducer/ActionsReducer";

export const StudentContext = createContext()

export const StudentProvider = ({children}) => {
    // Estado inicial de los usuarios
    const initialState = {
        users: [],
    };
    const [user, dispatchUser] = useReducer(actionsReducer, initialState)

    return(
        <StudentContext.Provider 
            value={{user, dispatchUser}}
        >
            {children}
        </StudentContext.Provider>
    )
}