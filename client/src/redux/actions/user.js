import { USER_LOGIN, USER_LOGOUT } from "../constants";

export const loginUser = (user, apiToken) => (dispatch) => {
  dispatch({
    type: USER_LOGIN,
    payload: { user, apiToken },
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
