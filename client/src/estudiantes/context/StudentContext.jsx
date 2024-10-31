import { createContext, useReducer } from "react";
import { actionsReducer } from "../reducer/ActionsReducer";
import { typeAction } from "../../common/types/type";

export const StudentContext = createContext();

const initialState = { students: [] };

export const StudentProvider = ({ children }) => {
  const [state, dispatchStudents] = useReducer(actionsReducer, initialState);

  const findAllStudents = (data) => {
    try {
      dispatchStudents({ type: typeAction.SET_DATA, payload: data });
    } catch (error) {
      console.error("Error al traer los estudiante. Inténtalo de nuevo.", error);
    }
  }

  const createStudent = (data) => {
    try {
      dispatchStudents({ 
        type: typeAction.ADD_DATA, 
        payload: data 
      });
    } catch (error) {
      console.error("Error al crear el estudiante. Inténtalo de nuevo.", error);
    }
  }

  const deleteStudent = (id) => {
    try {
      dispatchStudents({
        type: typeAction.DELETE_DATA,
        payload: id
      })
    } catch (error) {
      console.error("Error al eliminar el estudiante. Inténtalo de nuevo.", error);
    }
  }

  return (
    <StudentContext.Provider value={{ students: state.students, dispatchStudents, createStudent, deleteStudent, findAllStudents }}>
      {children}
    </StudentContext.Provider>
  );
};
