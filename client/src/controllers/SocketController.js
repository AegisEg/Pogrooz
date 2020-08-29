import io from "socket.io-client";
import store from "../redux/store";
import api from "../config/api";
import settings from "../config/settings";
import {
  articlesMyLoad,
  deleteAndReload,
  deleteTaking,
} from "../redux/actions/myarticles";
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
  ARTICLES_MY_CREATE_REPLACE,
  ARTICLES_MY_UPDATE,
  ARTICLE_TAKING_REVIEW_CREATE,
  ARTICLE_TAKING_REVIEW_UPDATE,
  ARTICLE_MY_REVIEW_CREATE,
  ARTICLE_MY_REVIEW_UPDATE,
  ARTICLES_TAKING_CREATE_REPLACE,
  ARTICLES_TAKING_CREATE,
  ARTICLES_TAKING_CREATE_COUNT,
  ARTICLES_MY_DELETE_EXECUTOR,
  ARTICLES_MY_SET_EXECUTOR,
  ARTICLE_SET_ME_REQUEST,
  ARTICLE_UPDATE_ME_REQUEST,
  ARTICLE_REMOVE_ME_REQUEST,
  ARTICLES_TAKING_DELETE_EXECUTOR,
  ARTICLES_TAKING_SET_EXECUTOR,
  NOTIFICATIONS_ADD,
  NOTIFICATIONS_SET_NO_READ,
  NOTIFICATIONS_READ,
  REVIEWS_ME_CREATE,
  REVIEWS_MY_CREATE,
  REVIEWS_ME_UPDATE,
  REVIEWS_MY_UPDATE,
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
              getted: false,
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
      if (objStatus.isGetted && objStatus.page === 0) {
        let articles = objStatus.articles;
        if (articles.length === settings.countArticleOnPage)
          store.dispatch({
            type: ARTICLES_MY_CREATE_REPLACE,
            payload: { status, article: article },
          });
        if (articles.length < settings.countArticleOnPage)
          store.dispatch({
            type: ARTICLES_MY_CREATE,
            payload: { status, article: article },
          });
      } else {
        store.dispatch({
          type: ARTICLES_MY_CREATE_COUNT,
          payload: { status, article: article },
        });
      }
    });
    socket.on("createTakingArticle", ({ status, article }) => {
      let objStatus = store.getState().myarticles.taking[status - 2];
      if (objStatus.isGetted && objStatus.page === 0) {
        let articles = objStatus.articles;
        if (articles.length === settings.countArticleOnPage)
          store.dispatch({
            type: ARTICLES_TAKING_CREATE_REPLACE,
            payload: { status, article: article },
          });
        if (articles.length < settings.countArticleOnPage)
          store.dispatch({
            type: ARTICLES_TAKING_CREATE,
            payload: { status, article: article },
          });
      } else {
        store.dispatch({
          type: ARTICLES_TAKING_CREATE_COUNT,
          payload: { status, article: article },
        });
      }
    });
    socket.on("editMyArticle", ({ status, article }) => {
      store.dispatch({
        type: ARTICLES_MY_UPDATE,
        payload: { status: status, article: article },
      });
    });
    socket.on("deleteTaking", ({ lastStatus, status, articleID }) => {
      deleteTaking(store.dispatch, lastStatus, articleID, apiToken);
    });
    socket.on(
      "updateStatusMyArticle",
      ({ lastStatus, status, articleID, isTaking }) => {
        deleteAndReload(
          store.dispatch,
          lastStatus,
          status,
          articleID,
          apiToken,
          isTaking
        );
      }
    );
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
            deleteAndReload(
              store.dispatch,
              lastStatus,
              2,
              article._id,
              store.getState().user.apiToken
            );
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
          deleteAndReload(
            store.dispatch,
            lastStatus,
            3,
            article._id,
            store.getState().user.apiToken
          );
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
      if (store.getState().notifications.getted) {
        store.dispatch({
          type: NOTIFICATIONS_ADD,
          payload: notification,
        });
      } else
        store.dispatch({
          type: NOTIFICATIONS_SET_NO_READ,
          payload: store.getState().notifications.noRead + 1,
        });

      playBeep();
    });

    socket.on("readNotification", (id) => {
      store.dispatch({
        type: NOTIFICATIONS_READ,
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
