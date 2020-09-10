import io from "socket.io-client";
import store from "../redux/store";
import api from "../config/api";
import settings from "../config/settings";
import { articlesMyLoad, deleteTaking } from "../redux/actions/myarticles";
import {
  DIALOGS_ADD_MESSAGE,
  DIALOGS_READ_MESSAGES,
  DIALOGS_SET_TYPER,
  DIALOGSORDER_SET_TYPER,
  DIALOGSORDER_ADD_MESSAGE,
  DIALOGSORDER_READ_MESSAGES,
  DIALOGSORDER_ADD,
  DIALOGS_ADD,
  ARTICLES_MY_CREATE,
  ARTICLES_MY_CREATE_COUNT,
  ARTICLES_MY_UPDATE,
  ARTICLE_TAKING_REVIEW_CREATE,
  ARTICLE_TAKING_REVIEW_UPDATE,
  ARTICLE_MY_REVIEW_CREATE,
  ARTICLE_MY_REVIEW_UPDATE,
  ARTICLES_TAKING_CREATE,
  ARTICLES_TAKING_CREATE_COUNT,
  ARTICLES_MY_DELETE_EXECUTOR,
  ARTICLES_MY_SET_EXECUTOR,
  ARTICLE_SET_ME_REQUEST,
  ARTICLE_UPDATE_ME_REQUEST,
  ARTICLE_REMOVE_ME_REQUEST,
  ARTICLES_TAKING_DELETE_EXECUTOR,
  ARTICLES_TAKING_SET_EXECUTOR,
  NOTIFICATIONS_READ,
  REVIEWS_ME_CREATE,
  REVIEWS_MY_CREATE,
  REVIEWS_ME_UPDATE,
  REVIEWS_MY_UPDATE,
  //NOTIGICATION
  NOTIFICATIONS_ALL_SET_NO_READ,
  NOTIFICATIONS_OFFERS_ADD,
  NOTIFICATIONS_OFFERS_READ,
  NOTIFICATIONS_OFFERS_SET_NO_READ,
  NOTIFICATIONS_ORDERS_ADD,
  NOTIFICATIONS_ORDERS_READ,
  NOTIFICATIONS_ORDERS_SET_NO_READ,
  NOTIFICATIONS_SYSTEM_ADD,
  NOTIFICATIONS_SYSTEM_READ,
  NOTIFICATIONS_SYSTEM_SET_NO_READ,
  NOTIFICATIONS_TARRIFS_ADD,
  NOTIFICATIONS_TARRIFS_READ,
  NOTIFICATIONS_TARRIFS_SET_NO_READ,
  NOTIFICATIONS_ALL_READ,
  NOTIFICATIONS_ALL_ADD,
  ARTICLE_MY_UPDATE_STATUS,
  ARTICLE_TAKING_UPDATE_STATUS,
} from "../redux/constants";
import { playNewMessage, playBeep } from "./SoundController";
let socket = null;

export default {
  init: (apiToken) => {
    socket = io(api.urlApi, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("connect", () => {
      socket.emit("auth", apiToken);
    });
    //DIALOG
    socket.on("typingDialog", (userId, isOrder) => {
      let orderId;
      if (isOrder) {
        if (
          (orderId = store
            .getState()
            .dialogs.dialogsOrder.dialogs.find((x) => x.user._id === userId))
        ) {
          store.dispatch({
            type: DIALOGSORDER_SET_TYPER,
            payload: { orderId: orderId._id, typing: true },
          });

          setTimeout(() => {
            store.dispatch({
              type: DIALOGSORDER_SET_TYPER,
              payload: { orderId: orderId._id, typing: false },
            });
          }, 2500);
        }
      } else {
        if (
          (orderId = store
            .getState()
            .dialogs.dialogsUser.dialogs.find((x) => x.user._id === userId))
        ) {
          store.dispatch({
            type: DIALOGS_SET_TYPER,
            payload: { orderId: orderId._id, typing: true },
          });

          setTimeout(() => {
            store.dispatch({
              type: DIALOGS_SET_TYPER,
              payload: { orderId: orderId._id, typing: false },
            });
          }, 2500);
        }
      }
    });
    socket.on("sendMessageDialog", ({ message, otherId, isOrder }) => {
      let dialogs = isOrder
        ? store.getState().dialogs.dialogsOrder
        : store.getState().dialogs.dialogsUser;

      if (
        dialogs.dialogs.find((x) => x.user._id === message.user._id) &&
        dialogs.dialogs.find((x) => x.user._id === message.user._id).typing
      ) {
        store.dispatch({
          type: isOrder ? DIALOGSORDER_SET_TYPER : DIALOGS_SET_TYPER,
          payload: { userId: message.user._id, typing: false },
        });
      }

      if (dialogs.dialogs.find((x) => x._id === message.dialogId)) {
        let noReadCount = false;

        if (
          message.user._id !== store.getState().user._id &&
          !dialogs.dialogs.find((x) => x._id === message.dialogId).noRead
        ) {
          noReadCount = true;
        }

        store.dispatch({
          type: isOrder ? DIALOGSORDER_ADD_MESSAGE : DIALOGS_ADD_MESSAGE,
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
          .then(({ user }) => {
            let dialog = {
              lastMessage: message,
              _id: message.dialogId,
              users: [store.getState().user, user],
              user: user,
              isGetted: false,
              typing: false,
              noRead: 1,
              messages: [],
            };
            store.dispatch({
              type: isOrder ? DIALOGSORDER_ADD : DIALOGS_ADD,
              payload: dialog,
            });
          });
      }
      playNewMessage();
    });
    socket.on("readMessagesDialog", ({ dialogId, userId, isOrder }) => {
      if (isOrder)
        store.dispatch({
          type: DIALOGSORDER_READ_MESSAGES,
          payload: {
            dialogId,
            userId,
            noRead: userId !== store.getState().user._id,
            noReadCount: userId !== store.getState().user._id,
          },
        });
      else
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
    /*DIALOG*/
    /*ARTICLES SOKETS*/
    socket.on("createMyArticle", ({ status, article }) => {
      let objStatus = store.getState().myarticles.my[status - 1];
      if (objStatus.isGetted) {
        store.dispatch({
          type: ARTICLES_MY_CREATE,
          payload: { status, article },
        });
      } else {
        store.dispatch({
          type: ARTICLES_MY_CREATE_COUNT,
          payload: { status, article },
        });
      }
    });
    socket.on("createTakingArticle", ({ status, article }) => {
      let objStatus = store.getState().myarticles.taking[status - 2];
      if (objStatus.isGetted) {
        store.dispatch({
          type: ARTICLES_TAKING_CREATE,
          payload: { status, article },
        });
      } else {
        store.dispatch({
          type: ARTICLES_TAKING_CREATE_COUNT,
          payload: { status, article },
        });
      }
    });
    socket.on("editMyArticle", ({ status, article }) => {
      store.dispatch({
        type: ARTICLES_MY_UPDATE,
        payload: { status: status, article },
      });
    });
    socket.on("deleteTaking", ({ lastStatus, status, articleID }) => {
      deleteTaking(store.dispatch, lastStatus, articleID, apiToken);
    });
    socket.on("updateStatusMyArticle", ({ lastStatus, article, isTaking }) => {
      if (isTaking) {
        store.dispatch({
          type: ARTICLE_TAKING_UPDATE_STATUS,
          payload: { lastStatus, article },
        });
      } else {
        store.dispatch({
          type: ARTICLE_MY_UPDATE_STATUS,
          payload: { lastStatus, article },
        });
      }
    });
    socket.on(
      "createArticleReview",
      ({ articleID, articleStatus, newReview, isTaking }) => {
        if (isTaking) {
          store.dispatch({
            type: ARTICLE_TAKING_REVIEW_CREATE,
            payload: {
              article: {
                _id: articleID,
                status: articleStatus,
              },
              newReview,
            },
          });
        } else
          store.dispatch({
            type: ARTICLE_MY_REVIEW_CREATE,
            payload: {
              article: {
                _id: articleID,
                status: articleStatus,
              },
              newReview,
            },
          });
        if (newReview.user._id === store.getState().user._id) {
          store.dispatch({
            type: REVIEWS_ME_CREATE,
            payload: {
              review: newReview,
            },
          });
        }
        if (newReview.author._id === store.getState().user._id) {
          store.dispatch({
            type: REVIEWS_MY_CREATE,
            payload: {
              review: newReview,
            },
          });
        }
      }
    );
    socket.on(
      "deleteExecutor",
      ({ article, executor, lastStatus, isTaking }) => {
        if (!isTaking) {
          if (
            !article.executors.length &&
            article.status === 2 &&
            lastStatus !== 2
          ) {
            store.dispatch({
              type: ARTICLE_MY_UPDATE_STATUS,
              payload: { lastStatus, article },
            });
          }
          store.dispatch({
            type: ARTICLES_MY_DELETE_EXECUTOR,
            payload: { article, executor },
          });
        } else {
          store.dispatch({
            type: ARTICLES_TAKING_DELETE_EXECUTOR,
            payload: { article, executor },
          });
        }
      }
    );
    socket.on("setExecutor", ({ article, executor, lastStatus, isTaking }) => {
      if (!isTaking) {
        if (article.type === "order") {
          store.dispatch({
            type: ARTICLE_MY_UPDATE_STATUS,
            payload: { lastStatus, article },
          });
        }
        store.dispatch({
          type: ARTICLES_MY_SET_EXECUTOR,
          payload: { article, executor },
        });
      } else
        store.dispatch({
          type: ARTICLES_TAKING_SET_EXECUTOR,
          payload: { article, executor },
        });
    });
    socket.on("createRequest", ({ article, request }) => {
      store.dispatch({
        type: ARTICLE_SET_ME_REQUEST,
        payload: { article, request },
      });
    });
    socket.on("deleteRequest", ({ article, requestId }) => {
      store.dispatch({
        type: ARTICLE_REMOVE_ME_REQUEST,
        payload: { article, requestId },
      });
    });
    socket.on("updateRequest", ({ article, request }) => {
      store.dispatch({
        type: ARTICLE_UPDATE_ME_REQUEST,
        payload: { article, request },
      });
    });
    socket.on(
      "updateArticleReview",
      ({ articleID, articleStatus, newReview, isTaking }) => {
        if (isTaking)
          store.dispatch({
            type: ARTICLE_TAKING_REVIEW_UPDATE,
            payload: {
              article: {
                _id: articleID,
                status: articleStatus,
              },
              newReview,
            },
          });
        else
          store.dispatch({
            type: ARTICLE_MY_REVIEW_UPDATE,
            payload: {
              article: {
                _id: articleID,
                status: articleStatus,
              },
              newReview,
            },
          });
        if (newReview.user._id === store.getState().user._id)
          store.dispatch({
            type: REVIEWS_ME_UPDATE,
            payload: {
              review: newReview,
            },
          });

        if (newReview.author._id === store.getState().user._id)
          store.dispatch({
            type: REVIEWS_MY_UPDATE,
            payload: {
              review: newReview,
            },
          });
      }
    );
    /*ARTICLES SOKETS*/
    /*NOTIFICATIONS SOKETS*/
    socket.on("sendNotification", (notification) => {
      if (store.getState().notifications[notification.type].isGetted) {
        store.dispatch({
          type: dipathType(notification.type, "add"),
          payload: notification,
        });
      } else
        store.dispatch({
          type: dipathType(notification.type, "noread"),
          payload: store.getState().notifications[notification.type].noRead + 1,
        });
      if (store.getState().notifications.all.isGetted) {
        store.dispatch({
          type: NOTIFICATIONS_ALL_ADD,
          payload: notification,
        });
      } else
        store.dispatch({
          type: NOTIFICATIONS_ALL_SET_NO_READ,
          payload: store.getState().notifications.all.noRead + 1,
        });
      playBeep();
    });

    socket.on("readNotification", ({ id, type }) => {
      store.dispatch({
        type: dipathType(type, "read"),
        payload: id,
      });
      store.dispatch({
        type: NOTIFICATIONS_ALL_READ,
        payload: id,
      });
    });
  },
  getSocketId: () => {
    return socket.id;
  },
  typingDialog: (otherId, userId, isOrder) => {
    socket.emit("typingDialog", { otherId, userId, isOrder });
  },
};
function dipathType(type, action) {
  if (action === "get")
    switch (type) {
      case "offer":
        return NOTIFICATIONS_OFFERS_ADD;
      case "order":
        return NOTIFICATIONS_ORDERS_ADD;
      case "system":
        return NOTIFICATIONS_SYSTEM_ADD;
      case "tarrif":
        return NOTIFICATIONS_TARRIFS_ADD;
    }
  if (action === "read")
    switch (type) {
      case "offer":
        return NOTIFICATIONS_OFFERS_READ;
      case "order":
        return NOTIFICATIONS_ORDERS_READ;
      case "system":
        return NOTIFICATIONS_SYSTEM_READ;
      case "tarrif":
        return NOTIFICATIONS_TARRIFS_READ;
    }
  if (action === "noread")
    switch (type) {
      case "offer":
        return NOTIFICATIONS_OFFERS_SET_NO_READ;
      case "order":
        return NOTIFICATIONS_ORDERS_SET_NO_READ;
      case "system":
        return NOTIFICATIONS_SYSTEM_SET_NO_READ;
      case "tarrif":
        return NOTIFICATIONS_TARRIFS_SET_NO_READ;
    }
}
