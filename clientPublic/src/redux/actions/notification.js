import {
  NOTIFICATIONS_ALL_GET,
  NOTIFICATIONS_ALL_READ,
  NOTIFICATIONS_OFFERS_GET,
  NOTIFICATIONS_OFFERS_READ,
  NOTIFICATIONS_ORDERS_GET,
  NOTIFICATIONS_ORDERS_READ,
  NOTIFICATIONS_SYSTEM_GET,
  NOTIFICATIONS_SYSTEM_READ,
  NOTIFICATIONS_TARRIFS_GET,
  NOTIFICATIONS_TARRIFS_READ,
  NOTIFICATIONS_ALL_LOAD,
  NOTIFICATIONS_OFFERS_LOAD,
  NOTIFICATIONS_ORDERS_LOAD,
  NOTIFICATIONS_SYSTEM_LOAD,
  NOTIFICATIONS_TARRIFS_LOAD,
  NOTIFICATIONS_ALL_LOADING,
  NOTIFICATIONS_OFFERS_LOADING,
  NOTIFICATIONS_ORDERS_LOADING,
  NOTIFICATIONS_SYSTEM_LOADING,
  NOTIFICATIONS_TARRIFS_LOADING,
  NOTIFICATIONS_READ_ALL,
} from "../constants";

import api from "../../config/api";
import store from "../store";
import SocketController from "../../controllers/SocketController";
export const notificationsReadAll = (apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/notification/read-all`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        socketId: SocketController.getSocketId(),
      }),
    })
      .then((response) => response.json())
      .then(({ error }) => {
        if (!error)
          dispatch({
            type: NOTIFICATIONS_READ_ALL,
          });
        resolve();
      });
  });
};
export const notificationsGet = (type, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/notification/get-all`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        type: type,
      }),
    })
      .then((response) => response.json())
      .then(({ notifications }) => {
        let dispType = dispatch({
          type: dipathType(type, "get"),
          payload: notifications,
        });
        resolve();
      });
  });
};

export const notificationRead = (id, type, apiToken) => (dispatch) => {
  dispatch({
    type: dipathType(type, "read"),
    payload: id,
  });
  dispatch({
    type: NOTIFICATIONS_ALL_READ,
    payload: id,
  });

  fetch(`${api.urlApi}/api/notification/read`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      id,
      socketId: SocketController.getSocketId(),
    }),
  });
};
export const notifyLoad = (type, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let offset = store.getState().notifications[type].notifications.length;
    dispatch({ type: dipathType(type, "loading"), payload: {} });

    fetch(`${api.urlApi}/api/notification/get-all`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        type: type,
        offset,
      }),
    })
      .then((response) => response.json())
      .then(({ notifications }) => {
        dispatch({
          type: dipathType(type, "load"),
          payload: { notifications },
        });
        resolve();
      });
  });
};
function dipathType(type, action) {
  if (action === "get")
    switch (type) {
      case "all":
        return NOTIFICATIONS_ALL_GET;
      case "offer":
        return NOTIFICATIONS_OFFERS_GET;
      case "order":
        return NOTIFICATIONS_ORDERS_GET;
      case "system":
        return NOTIFICATIONS_SYSTEM_GET;
      case "tariff":
        return NOTIFICATIONS_TARRIFS_GET;
    }
  if (action === "read")
    switch (type) {
      case "all":
        return NOTIFICATIONS_ALL_READ;
      case "offer":
        return NOTIFICATIONS_OFFERS_READ;
      case "order":
        return NOTIFICATIONS_ORDERS_READ;
      case "system":
        return NOTIFICATIONS_SYSTEM_READ;
      case "tariff":
        return NOTIFICATIONS_TARRIFS_READ;
    }
  if (action === "load")
    switch (type) {
      case "all":
        return NOTIFICATIONS_ALL_LOAD;
      case "offer":
        return NOTIFICATIONS_OFFERS_LOAD;
      case "order":
        return NOTIFICATIONS_ORDERS_LOAD;
      case "system":
        return NOTIFICATIONS_SYSTEM_LOAD;
      case "tariff":
        return NOTIFICATIONS_TARRIFS_LOAD;
    }
  if (action === "loading")
    switch (type) {
      case "all":
        return NOTIFICATIONS_ALL_LOADING;
      case "offer":
        return NOTIFICATIONS_OFFERS_LOADING;
      case "order":
        return NOTIFICATIONS_ORDERS_LOADING;
      case "system":
        return NOTIFICATIONS_SYSTEM_LOADING;
      case "tariff":
        return NOTIFICATIONS_TARRIFS_LOADING;
    }
}
