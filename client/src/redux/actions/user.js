import { USER_LOGIN, USER_LOGOUT } from "../constants";
import store from "../store";
import api from "../../config/api";

export const loginUser = (user, apiToken) => (dispatch) => {
  user.apiToken = apiToken;
  dispatch({
    type: USER_LOGIN,
    payload: user,
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
export const userEdit = (userChange, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("userChange", JSON.stringify(userChange));
    if (userChange.avatar && userChange.avatar.file)
      formData.append("avatar", userChange.avatar.file);
    fetch(`${api.urlApi}/api/user/user-edit`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch({
            type: "USER_EDIT",
            payload: { user: response.user },
          });
          resolve({});
        } else {
          resolve(response);
        }
      });
  });
};
export const passChange = (passObj, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/user/password-change`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ passObj }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          resolve({});
        } else {
          resolve(response);
        }
      });
  });
};
