import firebase from "../../utils/firebase";

export const AUTHENTICATE = "AUTHENTICATE";

export const login = (email: string, password: string) => {
  return async dispatch => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const accessToken = await response.user.getIdToken();
      dispatch({
        type: AUTHENTICATE,
        userId: response.user.uid,
        token: accessToken
      });
    } catch (error) {
      throw error;
    }
  };
};
