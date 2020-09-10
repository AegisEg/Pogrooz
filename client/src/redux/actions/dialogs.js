import {
  DIALOGSALL_GET,
  //DIALOGUSER
  DIALOGS_GET,
  DIALOGS_ADD,
  DIALOGS_ADD_MESSAGE,
  DIALOGS_SUCCESS_MESSAGE,
  DIALOGS_ERROR_MESSAGE,
  DIALOGS_READ_MESSAGES,
  DIALOGS_LOAD,
  DIALOGS_DELETE_MESSAGE,
  DIALOGS_SET_LOADING,
  DIALOGS_LOAD_MESSAGES,
  DIALOGS_UPDATE_ONLINE,
  //DIALOGORDER
  DIALOGSORDER_GET,
  DIALOGSORDER_ADD,
  DIALOGSORDER_ADD_MESSAGE,
  DIALOGSORDER_SUCCESS_MESSAGE,
  DIALOGSORDER_ERROR_MESSAGE,
  DIALOGSORDER_READ_MESSAGES,
  DIALOGSORDER_LOAD,
  DIALOGSORDER_DELETE_MESSAGE,
  DIALOGSORDER_SET_LOADING,
  DIALOGSORDER_LOAD_MESSAGES,
  DIALOGSORDER_UPDATE_ONLINE,
} from "../constants";
import store from "../store";
import { randomInteger } from "../../controllers/FunctionsController";
import SocketController from "../../controllers/SocketController";
import { toast } from "react-toastify";
import api from "../../config/api";

//DIALOGALL
export const dialogsAllGet = (apiToken) => (dispatch) => {
  fetch(`${api.urlApi}/api/dialogsOrder/getAllDialog`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.dialogs.length; i++) {
        let existDialog = store
          .getState()
          .dialogs.dialogsUser.dialogs.find(
            (x) => x._id === data.dialogs[i]._id
          );

        if (existDialog) {
          data.dialogs[i].messages = existDialog.messages;
          data.dialogs[i].isGetted = true;
        }
        data.dialogs[i].user = data.dialogs[i].users.find(
          (user) => user._id !== store.getState().user._id
        );

        if (!data.dialogs[i].user)
          data.dialogs[i].user = data.dialogs[i].users[0];

        data.dialogs[i].typers = [];
      }
      dispatch({
        type: DIALOGSALL_GET,
        payload: data,
      });
    });
};
//DIALOGSUSER
export const dialogsGet = (apiToken) => (dispatch) => {
  fetch(`${api.urlApi}/api/dialog/get-all`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.dialogs.length; i++) {
        let existDialog = store
          .getState()
          .dialogs.dialogsUser.dialogs.find(
            (x) => x._id === data.dialogs[i]._id
          );

        if (existDialog) {
          data.dialogs[i].messages = existDialog.messages;
          data.dialogs[i].isGetted = true;
        }
        data.dialogs[i].user = data.dialogs[i].users.find(
          (user) => user._id !== store.getState().user._id
        );

        if (!data.dialogs[i].user)
          data.dialogs[i].user = data.dialogs[i].users[0];

        data.dialogs[i].typers = [];
      }
      dispatch({
        type: DIALOGS_GET,
        payload: data,
      });
    });
};

export const dialogGet = (userId, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/dialog/get`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        userId,
      }),
    })
      .then((response) => response.json())
      .then(({ dialog, messages }) => {
        if (!dialog.error) {
          dialog.user = dialog.users.find(
            (user) => user._id !== store.getState().user._id
          );
          if (!dialog.user) dialog.user = dialog.users[0];

          dialog.typing = false;

          dialog.isGetted = true;
          dialog.messages = messages.reverse();
          dialog.lastMessage = false;
          dialog.canLoad = messages.length === 50;
          dialog.isLoading = false;

          dispatch({
            type: DIALOGS_ADD,
            payload: dialog,
          });
          resolve();
        } else {
          let dialog = {
            isGetted: true,
            isNotFound: true,
            user: { _id: userId },
          };

          dispatch({
            type: DIALOGS_ADD,
            payload: dialog,
          });
          resolve();
        }
      });
  });
};

export const dialogLoad = (userId, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/dialog/get`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        userId,
      }),
    })
      .then((response) => response.json())
      .then(({ dialog, messages }) => {
        dialog.messages = messages.reverse();

        dispatch({
          type: DIALOGS_LOAD,
          payload: {
            dialogId: dialog._id,
            messages: dialog.messages,
            canLoad: messages.length === 50,
          },
        });
        resolve();
      });
  });
};

export const updateOnline = (userId, apiToken, isOrder) => (dispatch) => {
  let type = isOrder ? DIALOGSORDER_UPDATE_ONLINE : DIALOGS_UPDATE_ONLINE;
  fetch(`${api.urlApi}/api/user/get-online`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      userId,
    }),
  })
    .then((response) => response.json())
    .then(({ online, onlineAt }) => {
      dispatch({
        type: type,
        payload: { userId, online, onlineAt },
      });
    });
};
export const retrySendMessage = (message, apiToken, isOrder) => (dispatch) => {
  let typeDelete = isOrder
    ? DIALOGSORDER_DELETE_MESSAGE
    : DIALOGS_DELETE_MESSAGE;
  let typeAdd = isOrder ? DIALOGSORDER_ADD_MESSAGE : DIALOGS_ADD_MESSAGE;
  let typeError = isOrder ? DIALOGSORDER_ERROR_MESSAGE : DIALOGS_ERROR_MESSAGE;
  let typeSuccessMessage = isOrder
    ? DIALOGSORDER_SUCCESS_MESSAGE
    : DIALOGS_SUCCESS_MESSAGE;
  let dialogId = message.dialogId;
  let formData = new FormData();
  let voiceSound = false;
  if (message.voiceSound) {
    formData.append("voiceSound", message.voiceSound.file);
    formData.append("voiceSoundDuration", message.voiceSound.duration);
    formData.append("voiceSoundRecordLine", message.voiceSound.recordLine);
    voiceSound = message.voiceSound;
  }
  formData.append("images", JSON.stringify(message.images));
  formData.append("files", JSON.stringify(message.files));
  formData.append("sounds", JSON.stringify(message.sounds));
  let localMessage = {
    _id: message._id,
    user: store.getState().user,
    text: message.text,
    images: message.images,
    sounds: message.sounds,
    files: message.files,
    voiceSound: voiceSound,
    isLoading: true,
    isError: false,
    recentMessage: message.recentMessage,
    createdAt: Date.now(),
    type: "message",
  };
  dispatch({
    type: typeDelete,
    payload: { dialogId, messageIds: [message._id], lastMessage: false },
  });

  dispatch({
    type: typeAdd,
    payload: { message: localMessage, dialogId: message.dialogId },
  });

  message.socketId = SocketController.getSocketId();
  formData.append("text", message.text);
  formData.append("recentMessages", message.recentMessages);
  formData.append("userId", message.userId);
  formData.append("dialog", message.dialogId);
  formData.append("socketId", SocketController.getSocketId());

  fetch(`${api.urlApi}/api/dialog/send-message`, {
    method: "post",
    headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((messageRes) => {
      if (messageRes.error) {
        return dispatch({
          type: typeError,
          payload: {
            _id: message._id,
            dialogId: message.dialogId,
            voiceSound: message.voiceSound,
          },
        });
      }
      dispatch({
        type: typeSuccessMessage,
        payload: {
          _id: message._id,
          _newId: messageRes._id,
          dialogId: message.dialogId,
        },
      });
    })
    .catch(() => {
      dispatch({
        type: typeError,
        payload: { _id: message._id, dialogId: message.dialogId },
      });
    });
};
export const deleteLocalMessage = (_id, dialogId, isOrder) => (dispatch) => {
  let messageIds = [_id];
  let dialogs = isOrder
    ? store.getState().dialogs.dialogsOrder
    : store.getState().dialogs.dialogsUser;
  let lastMessage;
  if (
    dialogs.dialogs.find((x) => x._id === dialogId) &&
    !!dialogs.dialogs.find((x) => x._id === dialogId).messages.length
  )
    lastMessage = dialogs.dialogs
      .find((x) => x._id === dialogId)
      .messages.filter((x) => !messageIds.find((y) => y === x._id))
      .pop();
  else lastMessage = false;

  dispatch({
    type: DIALOGS_DELETE_MESSAGE,
    payload: { dialogId, messageIds, lastMessage },
  });
};
export const sendMessage = (message, apiToken, isOrder) => (dispatch) => {
  let typeAdd = isOrder ? DIALOGSORDER_ADD_MESSAGE : DIALOGS_ADD_MESSAGE;
  let typeError = isOrder ? DIALOGSORDER_ERROR_MESSAGE : DIALOGS_ERROR_MESSAGE;
  let typeSuccessMessage = isOrder
    ? DIALOGSORDER_SUCCESS_MESSAGE
    : DIALOGS_SUCCESS_MESSAGE;

  let formData = new FormData();
  let _id = randomInteger(0, 1000000);
  let images = [];
  let files = [];
  let sounds = [];
  let voiceSound = false;

  formData.append("images", JSON.stringify(message.images));
  formData.append("files", JSON.stringify(message.files));
  formData.append("sounds", JSON.stringify(message.sounds));
  if (message.voiceSound) {
    formData.append("voiceSound", message.voiceSound.file);
    formData.append("voiceSoundDuration", message.voiceSound.duration);
    formData.append("voiceSoundRecordLine", message.voiceSound.recordLine);
    voiceSound = message.voiceSound;
  }
  let localMessage = {
    _id,
    user: store.getState().user,
    text: message.text,
    images: message.images,
    sounds: message.sounds,
    files: message.files,
    voiceSound: voiceSound,
    isLoading: true,
    isError: false,
    isRead: false,
    recentMessage: message.recentMessage,
    createdAt: Date.now(),
    type: "message",
  };
  dispatch({
    type: typeAdd,
    payload: { message: localMessage, dialogId: message.dialogId },
  });

  message.socketId = SocketController.getSocketId();

  formData.append("text", message.text);
  formData.append("recentMessage", message.recentMessage._id);
  formData.append("dialog", message.dialogId);
  formData.append("userId", message.userId);
  formData.append("socketId", SocketController.getSocketId());
  fetch(`${api.urlApi}/api/dialog/send-message`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((messageRes) => {
      if (messageRes.error) {
        if (messageRes.errors[0].msg === "max_size") {
          toast.error("Max file size upload 10 Mb.", {
            position: toast.POSITION.TOP_CENTER,
          });
        }

        return dispatch({
          type: typeError,
          payload: { _id, dialogId: message.dialogId },
        });
      }
      dispatch({
        type: typeSuccessMessage,
        payload: {
          _id,
          _newId: messageRes._id,
          dialogId: message.dialogId,
          voiceSound: message.voiceSound,
        },
      });
    })
    .catch(() => {
      dispatch({
        type: typeError,
        payload: { _id, dialogId: message.dialogId },
      });
    });
};
export const readMessages = (
  { dialogId, userId, otherId },
  apiToken,
  isOrder
) => (dispatch) => {
  let typeRead = isOrder ? DIALOGSORDER_READ_MESSAGES : DIALOGS_READ_MESSAGES;
  let dialogs = isOrder
    ? store.getState().dialogs.dialogsOrder
    : store.getState().dialogs.dialogsUser;
  let readMessages = dialogs.dialogs
    .find((dialog) => dialog._id === dialogId)
    .messages.filter((x) => !x.isRead && x.user._id !== userId);

  setTimeout(() => {
    if (!!readMessages.length) {
      dispatch({
        type: typeRead,
        payload: { dialogId, userId: otherId, noRead: true, noReadCount: true },
      });
    }
  }, 1);

  if (!!readMessages.length) {
    fetch(`${api.urlApi}/api/dialog/read-messages`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        dialogId,
        otherId,
        socketId: SocketController.getSocketId(),
      }),
    })
      .then()
      .catch(() => {});
  }
};

export const loadMessages = ({ dialogId }, apiToken, isOrder) => (dispatch) => {
  let typeLoad = isOrder ? DIALOGSORDER_LOAD_MESSAGES : DIALOGS_LOAD_MESSAGES;
  let typeSetLoad = isOrder ? DIALOGSORDER_SET_LOADING : DIALOGS_SET_LOADING;
  let dialogs = isOrder
    ? store.getState().dialogs.dialogsOrder
    : store.getState().dialogs.dialogsUser;
  return new Promise((resolve, reject) => {
    let lastMessage = dialogs.dialogs.find((x) => x._id === dialogId)
      .messages[0];
    dispatch({
      type: typeSetLoad,
      payload: dialogId,
    });

    fetch(`${api.urlApi}/api/dialog/load-messages`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        dialogId,
        lastMessageId: lastMessage._id,
      }),
    })
      .then((response) => response.json())
      .then((messages) => {
        dispatch({
          type: typeLoad,
          payload: {
            dialogId,
            messages: messages.reverse(),
            canLoad: messages.length === 50,
          },
        });
        resolve();
      })
      .catch(() => {});
  });
};

//DIALOGSORDER
export const dialogsOrderGet = (apiToken) => (dispatch) => {
  fetch(`${api.urlApi}/api/dialogsOrder/get-all`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.dialogs.length; i++) {
        let existDialog = store
          .getState()
          .dialogs.dialogsOrder.dialogs.find(
            (x) => x._id === data.dialogs[i]._id
          );

        if (existDialog) {
          data.dialogs[i].messages = existDialog.messages;
          data.dialogs[i].isGetted = true;
        }
        data.dialogs[i].user = data.dialogs[i].users.find(
          (user) => user._id !== store.getState().user._id
        );

        if (!data.dialogs[i].user)
          data.dialogs[i].user = data.dialogs[i].users[0];

        data.dialogs[i].typers = [];
      }
      dispatch({
        type: DIALOGSORDER_GET,
        payload: data,
      });
    });
};

export const dialogOrderGet = (userId, orderId, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/dialogsOrder/get`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        userId,
        orderId,
      }),
    })
      .then((response) => response.json())
      .then(({ dialog, messages }) => {
        if (!dialog.error) {
          dialog.user = dialog.users.find(
            (user) => user._id !== store.getState().user._id
          );
          if (!dialog.user) dialog.user = dialog.users[0];

          dialog.typing = false;

          dialog.isGetted = true;
          dialog.messages = messages.reverse();
          dialog.lastMessage = false;
          dialog.canLoad = messages.length === 50;
          dialog.isLoading = false;

          dispatch({
            type: DIALOGSORDER_ADD,
            payload: dialog,
          });
          resolve();
        } else {
          let dialog = {
            isGetted: true,
            isNotFound: true,
            user: { _id: userId },
          };

          dispatch({
            type: DIALOGSORDER_ADD,
            payload: dialog,
          });
          resolve();
        }
      });
  });
};

export const dialogOrderLoad = (userId, orderId, apiToken) => (dispatch) => {
  fetch(`${api.urlApi}/api/dialogsOrder/get`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      userId,
      orderId,
    }),
  })
    .then((response) => response.json())
    .then(({ dialog, messages }) => {
      dialog.messages = messages.reverse();

      dispatch({
        type: DIALOGSORDER_LOAD,
        payload: {
          dialogId: dialog._id,
          messages: dialog.messages,
          canLoad: messages.length === 50,
        },
      });
    });
};
