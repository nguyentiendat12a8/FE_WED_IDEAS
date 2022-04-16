import { AUTH_LOGIN_FAILED, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from "../types";

const authLoginSuccessAction = (authData) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: authData,
});

const authLoginFailedAction = (error) => ({
  type: AUTH_LOGIN_FAILED,
  payload: error,
});

const authLogoutAction = () => ({
  type: AUTH_LOGOUT,
});

export { authLoginSuccessAction, authLoginFailedAction, authLogoutAction };
