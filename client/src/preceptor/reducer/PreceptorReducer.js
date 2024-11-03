import { typeAction } from "../../common/types/type";

// Se definen las acciones del reducer
export const preceptorReducer = (state, action) => {
  switch (action.type) {
    case typeAction.SET_DATA:
      return { ...state, preceptores: action.payload };
    case typeAction.ADD_DATA:
      return { ...state, preceptores: [...state.preceptores, action.payload] };
    case typeAction.UPDATE_DATA:
      return {
        ...state,
        preceptores: state.preceptores.map(preceptor => 
          preceptor._id === action.payload._id ? action.payload : preceptor
        ),
      };
    case typeAction.DELETE_DATA:
      return {
        ...state,
        preceptores: state.preceptores.filter(preceptor => preceptor._id !== action.payload),
      };
    default:
      return state;
  }
};
