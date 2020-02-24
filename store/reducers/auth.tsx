import { AUTHENTICATE } from "../actions/auth";

const initialState = {
  token: null,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        user: action.userId
      };
    default:
      return state;
  }
};
