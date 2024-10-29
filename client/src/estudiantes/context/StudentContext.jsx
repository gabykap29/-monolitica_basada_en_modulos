import { createContext, useReducer } from "react";
import { actionsReducer } from "../reducer/ActionsReducer";

export const StudentContext = createContext();

const initialState = { students: [] };

export const StudentProvider = ({ children }) => {
  const [state, dispatchStudents] = useReducer(actionsReducer, initialState);

  return (
    <StudentContext.Provider value={{ students: state.students, dispatchStudents }}>
      {children}
    </StudentContext.Provider>
  );
};
