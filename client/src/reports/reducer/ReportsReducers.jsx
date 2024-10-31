import { typeAction } from "../../common/types/type";

// Se definen las acciones del reducer
export const reportReducer = (state, action) => {
  switch (action.type) {
    case typeAction.SET_DATA:
      return { ...state, reports: action.payload };
    case typeAction.ADD_DATA:
      return { ...state, reports: [...state.reports, action.payload] };
    case typeAction.UPDATE_DATA:
      return {
        ...state,
        reports: state.reports.map(report => 
          report._id === action.payload._id ? action.payload : report
        ),
      };
    case typeAction.DELETE_DATA:
      return {
        ...state,
        reports: state.reports.filter(report => report._id !== action.payload),
      };
    default:
      return state;
  }
};
