import {
  USER_LOGIN,
  USER_LOGOUT,
  ARTICLES_MY_SET_COUNT,
  ARTICLES_TAKING_SET_COUNT,
  NOTIFICATIONS_NOREAD_GET,
  NOTIFICATIONS_SET_COUNT,
  DIALOGS_SET_NOREAD,
  USER_SET_GEOLOCATION_ERROR,
  USER_SET_LOCATION_ID,
} from "../constants";
import store from "../store";
import api from "../../config/api";

export const loginUser = (
  user,
  apiToken,
  myCountsArticles,
  takeCountsArticles,
  onlyNoRead,
  notificationCounts,
  dialogsCount
) => (dispatch) => {
  user.apiToken = apiToken;
  dispatch({
    type: USER_LOGIN,
    payload: user,
  });
  dispatch({
    type: NOTIFICATIONS_SET_COUNT,
    payload: notificationCounts,
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
  ///DIALOGS
  dialogsCount = {
    order: {
      count: dialogsCount.find((item) => item._id === "order")
        ? dialogsCount.find((item) => item._id === "order").count
        : 0,
    },
    user: {
      count: dialogsCount.find((item) => item._id === "user")
        ? dialogsCount.find((item) => item._id === "user").count
        : 0,
    },
  };
  dispatch({
    type: DIALOGS_SET_NOREAD,
    payload: { dialogsCount },
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
export const startLocationSent = (apiToken) => (dispatch) => {
  if (navigator.geolocation) {
    if (store.getState().user.geolocationId) {
      navigator.geolocation.clearWatch(id);
      dispatch({ type: USER_SET_LOCATION_ID, payload: { id: false } });
    }
    let id = navigator.geolocation.watchPosition(
      (position) => {
        dispatch({
          type: USER_SET_GEOLOCATION_ERROR,
          payload: { error: false },
        });

        fetch(`${api.urlApi}/api/article/setLocation`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
          body: JSON.stringify({
            position: [position.coords.latitude, position.coords.longitude],
          }),
        });
      },
      () => {
        dispatch({
          type: USER_SET_GEOLOCATION_ERROR,
          payload: { error: true },
        });
      },
      { timeout: 10000, maximumAge: 10000, enableHighAccuracy: true }
    );
    dispatch({ type: USER_SET_LOCATION_ID, payload: { id } });
  } else
    dispatch({
      type: USER_SET_GEOLOCATION_ERROR,
      payload: { error: false },
    });
};
