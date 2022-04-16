import { loadItemFromStorage, persistItemToStorage } from "../../utils/storage";
import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILED, AUTH_LOGOUT } from "../types";

const authData = loadItemFromStorage("authData");

const initialState = authData
  ? {
      token: authData.token,
      refreshToken: authData.refreshToken,
      email: authData.email,
      role: authData.role,
      error: null,
    }
  : {
      token: null,
      refreshToken: null,
      role: null,
      error: null,
      email: "",
    };

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN_SUCCESS:
      persistItemToStorage("authData", payload);
      return {
        token: payload.token,
        refreshToken: payload.refreshToken,
        role: payload.role,
        email: payload.email,
        error: null,
      };
    case AUTH_LOGIN_FAILED:
      return {
        ...state,
        error: payload,
      };
    case AUTH_LOGOUT:
      persistItemToStorage("authData", "");
      return {
        ...state,
        token: null,
        refreshToken: null,
        role: null,
        email: "",
      };
    default:
      return state;
  }
};

export default authReducer;
