import { createContext, useEffect, useReducer } from "react";
import { actionsReducer } from "../reducer/ActionsReducer";
import { typeAction } from "../../common/types/type";
import { fetchStudent } from "../services/StudentService";

export const StudentContext = createContext();

const initialState = { students: [] };

export const StudentProvider = ({ children }) => {
  const [state, dispatchStudents] = useReducer(actionsReducer, initialState);

  const findAllStudents = (data) => {
    try {
      dispatchStudents({ type: typeAction.SET_DATA, payload: data });
    } catch (error) {
      console.error("Error al traer los estudiantes. Inténtalo de nuevo.", error);
    }
  }

  // Carga los estudiantes cuando se carga el componente
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchStudent("users/student", "GET", null);
      findAllStudents(data.users)
    };
    fetchUsers();
  }, []);

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

  const updateStudent = (data) => {
    try {
      dispatchStudents({
        type: typeAction.UPDATE_DATA,
        payload: data
      })
    } catch (error) {
      console.error("Error al actualizar el estudiante. Inténtalo de nuevo.", error);
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
    <StudentContext.Provider value={{ students: state.students, dispatchStudents, createStudent, deleteStudent, findAllStudents, updateStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
