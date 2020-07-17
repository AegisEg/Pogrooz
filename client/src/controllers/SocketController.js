import io from "socket.io-client";
import store from "../redux/store";
import api from "../config/api";
import {
  DIALOGS_ADD_MESSAGE,
  DIALOGS_READ_MESSAGES,
  DIALOGS_SET_TYPER,
  DIALOGS_ADD,
  USERS_ADD,
  NOTIFICATIONS_ADD,
  NOTIFICATIONS_READ,
  NOTIFICATIONS_SET_NO_READ,
  NOTIFICATIONS_REMOVE,
} from "../redux/constants";
let socket = null;

export default {
  init: (apiToken) => {
    socket = io(api.urlApi, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("connect", () => {
      socket.emit("auth", apiToken);
    });
    socket.on("typingDialog", (userId) => {
      if (store.getState().dialogs.dialogs.find((x) => x.user._id === userId)) {
        store.dispatch({
          type: DIALOGS_SET_TYPER,
          payload: { userId, typing: true },
        });

        setTimeout(() => {
          store.dispatch({
            type: DIALOGS_SET_TYPER,
            payload: { userId, typing: false },
          });
        }, 2500);
      }
    });
    socket.on("sendMessageDialog", ({ message, otherId }) => {
      if (
        store
          .getState()
          .dialogs.dialogs.find((x) => x.user._id === message.user._id) &&
        store
          .getState()
          .dialogs.dialogs.find((x) => x.user._id === message.user._id).typing
      ) {
        store.dispatch({
          type: DIALOGS_SET_TYPER,
          payload: { userId: message.user._id, typing: false },
        });
      }

      if (
        store.getState().dialogs.dialogs.find((x) => x._id === message.dialogId)
      ) {
        let noReadCount = false;

        if (
          message.user._id !== store.getState().user._id &&
          !store
            .getState()
            .dialogs.dialogs.find((x) => x._id === message.dialogId).noRead
        ) {
          noReadCount = true;
        }

        store.dispatch({
          type: DIALOGS_ADD_MESSAGE,
          payload: {
            message,
            dialogId: message.dialogId,
            noRead: message.user._id !== store.getState().user._id,
            noReadCount,
          },
        });
      } else {
        fetch(`${api.urlApi}/api/user/get`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
          body: JSON.stringify({
            userId: otherId,
          }),
        })
          .then((response) => response.json())
          .then(({ user, friendStatus }) => {
            let dialog = {
              lastMessage: message,
              _id: message.dialogId,
              users: [store.getState().user, user],
              user: user,
              getted: false,
              typing: false,
              noRead: 1,
              messages: [],
            };
            store.dispatch({
              type: DIALOGS_ADD,
              payload: dialog,
            });
          });
      }
    });
    socket.on("readMessagesDialog", ({ dialogId, userId }) => {
      store.dispatch({
        type: DIALOGS_READ_MESSAGES,
        payload: {
          dialogId,
          userId,
          noRead: userId !== store.getState().user._id,
          noReadCount: userId !== store.getState().user._id,
        },
      });
    });
  },
  getSocketId: () => {
    return socket.id;
  },
  typingDialog: (otherId, userId) => {
    socket.emit("typingDialog", { otherId, userId });
  },
};
