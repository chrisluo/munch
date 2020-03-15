import { AUTHENTICATE, SET_DID_TRY_AL, LOGOUT } from "../actions/auth";
import { AuthState } from "..";

const initialState: AuthState = {
  token: null,
  userId: null,
  didTryAutoLogin: false
};

export default (state = initialState, action): AuthState => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      };
    default:
      return state;
  }
};
