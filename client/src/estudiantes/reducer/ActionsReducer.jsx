import { typeAction } from "../../common/types/type";

// Se definen las acciones del reducer
export const actionsReducer = (state, action) => {
  switch (action.type) {
    case typeAction.SET_DATA:
      return { ...state, students: action.payload.filter(student => student.role === "student") };
    case typeAction.ADD_DATA:
      return { ...state, students: [...state.students, action.payload] };
    case typeAction.UPDATE_DATA:
      return {
        ...state,
        students: state.students.map(student => 
          student._id === action.payload._id ? action.payload : student
        ),
      };
    case typeAction.DELETE_DATA:
      return {
        ...state,
        students: state.students.filter(student => student._id !== action.payload),
      };
    default:
      return state;
  }
};
