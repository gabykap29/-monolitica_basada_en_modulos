import { typeAuth } from "../../common/types/type";

export const authReducer = (state, action) => {
    switch (action.type) {
      case typeAuth.LOGIN:
        return {
          ...state,
          token: state.token,
          isAuthenticated: true
        };
      case typeAuth.LOGOUT:
        return {
          ...state,
          token: null,
          isAuthenticated: false
        };
      default:
        return state;
    }
  };