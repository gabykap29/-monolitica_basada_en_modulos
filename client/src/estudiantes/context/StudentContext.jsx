import { createContext, useReducer } from "react";
import { actionsReducer } from "../reducer/ActionsReducer";
import { typeAction } from "../../common/types/type";

export const StudentContext = createContext();

const initialState = { students: [] };

export const StudentProvider = ({ children }) => {
  const [state, dispatchStudents] = useReducer(actionsReducer, initialState);

  const createStudent = (data) => {
    try {
      dispatchStudents({ 
        type: typeAction.ADD_DATA, 
        payload: data 
      });
    } catch (error) {
      console.error("Error al iniciar sesión. Inténtalo de nuevo.", error);
    }
  }

  return (
    <StudentContext.Provider value={{ students: state.students, dispatchStudents, createStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
