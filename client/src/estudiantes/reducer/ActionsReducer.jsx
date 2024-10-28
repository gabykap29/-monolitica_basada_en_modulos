import { typeAction } from "../types/type";

// Se definen las acciones del reducer
export const actionsReducer = (state, action) => {
  switch (action.type) {
    case typeAction.SET_DATA:
      return { ...state, users: action.payload };
    case typeAction.ADD_DATA:
      return { ...state, users: [...state.users, action.payload] };
    case typeAction.UPDATE_DATA:
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case typeAction.DELETE_DATA:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    default:
      return state;
  }
};
