import {
  USER_LOGIN,
  USER_LOGOUT,
  ARTICLES_MY_SET_COUNT,
  NOTIFICATIONS_ALL_SET_NO_READ,
  ARTICLES_TAKING_SET_COUNT,
  NOTIFICATIONS_NOREAD_GET,
} from "../constants";
import store from "../store";
import api from "../../config/api";

export const loginUser = (
  user,
  apiToken,
  myCountsArticles,
  takeCountsArticles,
  noReadNotifications,
  onlyNoRead
) => (dispatch) => {
  user.apiToken = apiToken;
  dispatch({
    type: USER_LOGIN,
    payload: user,
  });
  dispatch({
    type: NOTIFICATIONS_ALL_SET_NO_READ,
    payload: noReadNotifications,
  });
  dispatch({
    type: NOTIFICATIONS_NOREAD_GET,
    payload: onlyNoRead,
  });
  dispatch({
    type: ARTICLES_MY_SET_COUNT,
    payload: { myCountsArticles },
  });
  dispatch({
    type: ARTICLES_TAKING_SET_COUNT,
    payload: { takeCountsArticles },
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
    if (userChange.passportPhoto && userChange.passportPhoto.file)
      formData.append("passportPhoto", userChange.passportPhoto.file);
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
