import firebase from "../../utils/firebase";
import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

export const setDidTryAL = () => {
  return {
    type: SET_DID_TRY_AL
  };
};

export const authenticate = (userId: string, token: string) => {
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token
  };
};

export const login = (email: string, password: string) => {
  return async dispatch => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const r = await response.user.getIdTokenResult();
      dispatch(authenticate(response.user.uid, r.token));
      saveDataToStorage(r.token, response.user.uid, r.claims.exp);
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT
  };
};

const saveDataToStorage = (
  token: string,
  userId: string,
  expirationDate: number
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate
    })
  );
};
