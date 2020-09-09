import {
  NOTIFICATIONS_ALL_GET,
  NOTIFICATIONS_ALL_ADD,
  NOTIFICATIONS_ALL_READ,
  NOTIFICATIONS_OFFERS_GET,
  NOTIFICATIONS_OFFERS_ADD,
  NOTIFICATIONS_OFFERS_READ,
  NOTIFICATIONS_OFFERS_SET_NO_READ,
  NOTIFICATIONS_ORDERS_GET,
  NOTIFICATIONS_ORDERS_ADD,
  NOTIFICATIONS_ORDERS_READ,
  NOTIFICATIONS_ORDERS_SET_NO_READ,
  NOTIFICATIONS_SYSTEM_GET,
  NOTIFICATIONS_SYSTEM_ADD,
  NOTIFICATIONS_SYSTEM_READ,
  NOTIFICATIONS_SYSTEM_SET_NO_READ,
  NOTIFICATIONS_TARRIFS_GET,
  NOTIFICATIONS_TARRIFS_ADD,
  NOTIFICATIONS_TARRIFS_READ,
  NOTIFICATIONS_TARRIFS_SET_NO_READ,
} from "../constants";

import api from "../../config/api";
import SocketController from "../../controllers/SocketController";

export const notificationsGet = (type, apiToken) => (dispatch) => {
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
    .then((notifications) => {
      let dispType = dispatch({
        type: dipathType(type, "get"),
        payload: notifications,
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
      case "tarrif":
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
      case "tarrif":
        return NOTIFICATIONS_TARRIFS_READ;
    }
}
